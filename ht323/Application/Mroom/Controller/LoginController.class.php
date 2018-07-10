<?php
namespace Mroom\Controller;
use Think\Controller;

class LoginController extends Controller
{
    public function index()
    {
        // $httpReferer = request()->server('http_referer');
        // $redirect    = $httpReferer ? $httpReferer : url('/admin/home/index');
        // return is_login() ? redirect($redirect) : $this->display();
        $this->display();
    }

    // 登陆请求
    public function do_login(){
        // $authMemberModel = model('AuthMember');
        // $authMemberRes = $authMemberModel->accountLogin();
        // $authMemberRes!==true ? $this->error($authMemberRes) : $this->success('登陆成功', url('/collect/home/index'));
        $map['account']=I('param.account');
        $map['password']=I('param.password');
        $userAdmin = M('collect_auth')->where($map)->select();
        $this->success('新增成功', '/Mroom/Home/index');
    }

    // 退出登陆
    public function out_login()
    {
        session(null);
        return redirect(url('/mroom/login/index'));
    }
}
