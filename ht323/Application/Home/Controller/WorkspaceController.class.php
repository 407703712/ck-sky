<?php
namespace Home\Controller;
use Think\Controller;
class WorkspaceController extends Controller
{
    public function index()
    {
        # code...
        return $this->display();
    }
    public function getWorkspaceData()
    {
        $map['workid'] = 1;
        $data=db('workspace')->select();
//        var_dump($data);
        return ['datas'=>$data];
    }
    public function updateData(){//���±༭������
        $request = request();
        $addDatas=['workname'=>$request->get('workname'),
            'workuser'=>$request->get('workuser'),
            'worktime'=>$request->get('worktime'),
            'status'=>$request->get('status'),
        ];
        $workid=intval($request->get('workid'));
//        var_dump($addDatas);
        $map['workid'] = $workid;
        db('workspace')->where($map)->update($addDatas);
    }
    public function addData(){ //��ӻ���������
        $request = request();
        $addDatas=['workname'=>$request->get('workname'),
                   'workuser'=>$request->get('workuser'),
                   'worktime'=>$request->get('worktime'),
                   'status'=>$request->get('status'),
                  ];
        db('workspace')->insert($addDatas);
        return ['info'=>200];
    }
    public function searchData(){ //�ļ�����ģ��ƥ��
        $param=I('filename');
        $map['projecttype']=array('neq','');
        $data=M('collect_data')->where('filename|projecttype|devicetype|datetype','like','%'.$param.'%')
            ->select();
        $this->ajaxReturn(['datas'=>$data]);
    }
}
