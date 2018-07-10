<?php
namespace Mroom\Controller;
use Think\Controller;

class WorkspaceController extends Controller
{
    public function index()
    {
        # code...
        return $this->display();
    }
    public function showlist()
    {
        # code...
        $data=M('workapply')->select();
        $this->assign('list',$data);
        return $this->display();
    }
    public function getlistNum()
    {
        $data=M('workapply')->select();
        // return ["datas"=>$data];
        $this->ajaxReturn(['datas'=>$data]);
    }
    public function getWorkspaceData()
    {
        $map['workid'] = 1;
        $data=M('workspace')->select();
//        var_dump($data);
        // return ['datas'=>$data];
        $this->ajaxReturn(['datas'=>$data]);
    }
    public function updateData(){//更新编辑室数据
        $addDatas=['workname'=>I('workname'),
            'workuser'=>I('workuser'),
            'worktime'=>I('worktime'),
            'status'=>I('status'),
        ];
        $workid=intval(I('workid'));
        $map['workid'] = $workid;
        M('workspace')->where($map)->save($addDatas);
    }
    public function addData(){ //添加会议室数据
        $addDatas=['workname'=>I('workname'),
                   'workuser'=>I('workuser'),
                   'worktime'=>I('worktime'),
                   'status'=>I('status'),
                  ];
        M('workspace')->add($addDatas);
        // return ['info'=>200];
        $this->ajaxReturn(['info'=>200]);
    }
    public function passSq(){ //通过别人的申请
        $addDatas=['workname'=>I('workname'),
            'workuser'=>I('workuser'),
            'worktime'=>I('worktime'),
            'status'=>I('status'),
        ];
        $workid=intval(I('workid'));
        $applyid=intval(I('applyid'));
        $map['workid'] = $workid;
        $map1['applyid'] = $applyid;
        M('workspace')->where($map)->save($addDatas);
        M('workapply')->where($map1)->delete();
        // return ['info'=>200,'datas'=>$addDatas];
        $this->ajaxReturn(['info'=>200,'datas'=>$addDatas]);
    }
    public function delSample(){
        $workid=intval(I('workid'));
        $map['workid'] = $workid;
        M('workspace')->where($map)->delete();
        // return ['info'=>200];
        $this->ajaxReturn(['info'=>200]);
    }
    public function delAll(){
        M('workspace')->where('1')->delete();
        // return ['info'=>200];
        $this->ajaxReturn(['info'=>200]);
    }
}
