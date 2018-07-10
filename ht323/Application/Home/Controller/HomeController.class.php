<?php
namespace Home\Controller;
use Think\Controller;

class HomeController extends Controller
{
    public function index()
    {
        # code...
        return $this->display();
    }
    public function menuDatas(){
        $map=array('projecttype'=>array('neq',''));
        $menu1=M('collect_data')->field('projecttype')->where($map)->distinct(true)->select();
        $menu=M('collect_data')->where($map)->select();
        // return ['datas'=>$menu,'menu1'=>$menu1];
        // $this->assign('datas',$menu);
        // $this->assign('datas',$menu);
        $this->ajaxReturn(['datas'=>$menu,'menu1'=>$menu1]);
    }
    public function welcome()
    {
        # code...
        return $this->display();
    }
    public function searchFileDtas(){
        $params=$_GET;
        $data=M('collect_data')->where($params)->select();
        $this->ajaxReturn(['datas'=>$data]);
    }
}