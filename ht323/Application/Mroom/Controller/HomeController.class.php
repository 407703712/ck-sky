<?php
namespace Mroom\Controller;
use Think\Controller;

class HomeController extends Controller
{
    public function index()
    {
        # code...
        return $this->display();
    }
    public function welcome()
    {
        # code...
        return $this->display();
    }
}