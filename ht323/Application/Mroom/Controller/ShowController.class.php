<?php
namespace Mroom\Controller;
use Think\Controller;

class ShowController extends Controller
{
    public function index()
    {
        # code...
        $data=M('workspace')->select();
        $this->assign('list',$data);
        $this->display();
    }
    public function datetime()
    {
        # code...
        $this->display();
    }

    public function upshenQing(){
        $workid=intval(I('workid'));
        $addDatas=['workname'=>I('workname'),
            'workuser'=>I('workuser'),
            'worktime'=>I('worktime'),
            'workid'=>$workid,
        ];
        M('workapply')->add($addDatas);
        // return ["info"=>"200"];
        $this->ajaxReturn(["info"=>"200"]);
    }
}