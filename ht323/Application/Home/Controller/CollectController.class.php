<?php
namespace Home\Controller;

use Think\Controller;
use Think\auth\Auth;
use Think\Session;
use Think\Loader;

class CollectController extends Controller
{
    public function _initialize()
    {
        $authMemberId = session('authMemberId');
        if ($authMemberId) {
            if (!is_super()) {
                $authCheck = $this->accessControl();
                if($authCheck===true){
                    // 直接跳过权限验证
                } else if($authCheck===false){
                    $this->error("您没有访问权限！");
                } else {
                    $auth = new Auth();
                    if (!$auth->check(request()->url(), $authMemberId)) {
                        $this->error("您没有访问权限！");
                    }
                }
            }
        } else {
            $loginPage = url("/collet/login/index");
            if (request()->isPost()) {
                $this->error("您还没有登录！", $loginPage);
            } else {
                $this->error("登陆已过期", $loginPage);
                exit();
            }
        }

        $this->request = request();
        $this->menu();
    }

    /**
     * action访问控制,在 **登陆成功** 后执行的第一项权限检测任务
     *
     * @return boolean|null  返回值必须使用 `===` 进行判断
     *
     *   返回 **false**, 不允许任何人访问(超管除外)
     *   返回 **true**, 允许任何管理员访问,无需执行节点权限检测
     *   返回 **null**, 需要继续执行节点权限检测决定是否允许访问
     * @author 朱亚杰  <xcoolcc@gmail.com>
     */
    final protected function accessControl(){
        $allow = config('ALLOW_VISIT');
        $deny  = config('DENY_VISIT');
        $check = request()->url();
        if ( !empty($deny)  && in_array_case($check,$deny) ) {
            return false;//非超管禁止访问deny中的方法
        }
        if ( !empty($allow) && in_array_case($check,$allow) ) {
            return true;
        }
        return null;//需要检测节点权限
    }

    /**
     * 根据用户账号获取菜单栏
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function menu()
    {
        if (!Session::has('menu')) {
            $userAdminRuleModel = model('AuthMember');
            $userAdminRuleInfo  = $userAdminRuleModel->getMenu();
            $menuTree           = list_to_tree($userAdminRuleInfo);
            Session::set('menu', $menuTree);
        }
        return Session::get('menu');
    }

    /**
     * 根据表单生成查询条件
     * 进行列表过滤
     * @access protected
     * @return array
     */
    protected function search()
    {
        $map = array();
        $get = $this->request->get();
        foreach ($get as $key => $item) {
            $item = trim($item);
            if($item==='' || in_array($key, ['page']))
                continue;

            switch ($key){
                case 'exp':
                    $value = explode('-', $item);
                    foreach ($value as $val){
                        $param = explode('_', $val);
                        $field = strtolower(loader::parseName(array_shift($param), 1));   // 将驼峰写法改成下划线写法
                        $map[$field] = count($param)==1 ? $param[0] : array($param[0],$param[1]);
                    }
                    break;
                default: // 时间示例 beginTime_date_begin=20170912
                    $exp = explode('_', $key);  // key表达式获取
                    $field = strtolower(loader::parseName($exp[0]));    // field字段获取
                    if(count($exp)==1){  // 普通的字段对应值的写法
                        $map[$field] = $item;
                        continue;
                    }

                    $type = $exp[1]; // 类型获取
                    $posi = $exp[2];    // 位置获取
                    switch ($type){
                        case 'date': // 如果是时间格式，则要求是区间
                            $minKey = $exp[0].'_'.$type.'_begin';
                            $maxKey = $exp[0].'_'.$type.'_end';
                            $minValue = $this->request->get($minKey);
                            $maxValue = $this->request->get($maxKey);
                            if( $minValue=='' || $maxValue=='' ){
                                continue;
                            } else {
                                $map[$field] = array('between time', [$minValue.' 00:00:00', $maxValue.' 23:59:59']);
                            }
                            break;
                        case 'like': // 模糊查询
                            if($posi=='left'){
                                $map[$field] = array('like', "%{$item}");
                            } elseif ($posi=='right'){
                                $map[$field] = array('like', "{$item}%");
                            } else {
                                $map[$field] = array('like', "%{$item}%");
                            }
                            break;
                        default:
                            $map[loader::parseName($key, 1)] = trim($item);
                            break;
                    }
                    break;
            }
        }
        if (method_exists($this, '_filter')) {
            $this->_filter($map);
        }
        $model = model($this->analysisModel());
        if(method_exists($model,'defaultListCondition')){
            $default = $model->defaultListCondition();
            $map = array_merge($default, $map);
        }
        return $map;
    }

    /**
     * 根据搜索条件完成排序
     * @access protected
     * @return string
     */
    protected function sort(){
        $ord = '';
        if($this->request->get('sort')!='') {
            $order = explode(',', $this->request->get('sort'));
            foreach ($order as $key => $item) {
                $param = explode('_', $item);
                $key = loader::parseName(array_shift($param), 1);   // 将驼峰写法改成下划线写法
                $ord .= $key.' '.$param[0].',';
            }
        } else {
            $model = model($this->analysisModel());
            $pk = $model->getPk();
            $order[$pk] = 'desc';
            if(method_exists($model,'defaultOrder')){
                $default = $model->defaultOrder();
                $order = array_merge($order, $default);
            }
            foreach ($order as $key=>$item){
                $ord = $key.' '.$item.',';
            }
        }
        return rtrim($ord, ',');
    }

    /**
     * 通用分页列表数据集获取方法
     * 返回数据集
     */
    protected function lists (){
        $model = model($this->analysisModel());
        if( method_exists($model, 'lists') ){
            return $model->lists();
        }

        $map = $this->search();
        $ord = $this->sort();

        $list = $model->where($map)->order($ord)->paginate(null, false, ['query'=>$this->request->get()]);
        return $list;
    }

    /**
     * 通用查询详情
     * @return mixed
     */
    public function detail(){

    }

    /**
     * 空操作
     */
    public function _empty(){
        switch ($this->analysisOperate()){
            case 'list':
                $this->assign('list', $this->lists());
                return $this->display();
            break;
            case 'status':
                $model = $this->analysisModel();
                $id = $this->request->get('id');
                $status = $this->request->post('status');
                $res = model($model)->where('id', $id)->update(['status'=>$status]);
                $res == false ? $this->error('操作失败') : $this->success('操作成功');
            break;
            case 'add':
                $model = model($this->analysisModel());
                if($this->request->isPost()) {
                    if(method_exists($model, 'add')) {
                        $res = $model->add();
                    } else {
                        $data = $this->request->post();
                        $validate = validate($this->analysisModel());
                        $validateRes = $validate->scene('add')->check($data);
                        if($validateRes === false) {
                            $this->error($validate->getError());
                        }

                        $allowField = true;
                        if(method_exists($model, 'getAddAllowField')) {
                            $allowField = $model->getAddAllowField();
                        }

                        $res = $model->allowField($allowField)->isUpdate(false)->save($data);
                    }
                    $res == false ? $this->error('操作失败') : $this->success('操作成功');
                } else {
                    if(method_exists($model, 'addRead')) {
                        $data = $model->addRead();
                        $this->assign('data', $data);
                    }
                    return $this->display();
                }
            break;
            case 'edit':
                $model = model($this->analysisModel());
                if($this->request->isPost()) {
                    if(method_exists($model, 'edit')) {
                        $res = $model->edit();
                    } else {
                        $data = $this->request->post();
                        $validate = validate($this->analysisModel());
                        $validateRes = $validate->scene('edit')->check($data);
                        if($validateRes === false) {
                            $this->error($validate->getError());
                        }

                        $allowField = true;
                        if(method_exists($model, 'getAddAllowField')) {
                            $allowField = $model->getAddAllowField();
                        }

                        $res = $model->allowField($allowField)->isUpdate()->save($data);
                    }
                    $res == false ? $this->error('操作失败') : $this->success('操作成功');
                } else {
                    if(method_exists($model, 'editRead')) {
                        $data = $model->editRead();
                    } else {
                        $id = $this->request->get('id');
                        $data = $model->where('id', $id)->find();
                    }
                    $this->assign('data', $data);
                    return $this->display();
                }
                break;
            default: return $this->display(); break;
        }
    }

    /**
     * 解析操作模型
     * 返回：null没有操作模型。
     */
    public function analysisModel(){
        $action = $this->request->action();   // 操作方法，规则：不带前缀的表明+操作名称
        $controller = $this->request->controller();   // 对应表的前缀
        $detail = explode('_', strtolower($action));
        $operate = array_pop($detail);
        return count($detail)==0 ? $controller : \think\Loader::parseName($controller.'_'.implode('_', $detail));
    }

    /**
     * 解析操作类型
     * 返回：null 没有操作类型
     */
    public function analysisOperate(){
        $action = $this->request->action();   // 操作方法，规则：不带前缀的表名+操作名称
        $detail = explode('_', strtolower($action));
        $operate = array_pop($detail);
        return $operate;
    }
}