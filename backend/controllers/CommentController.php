<?php

namespace app\controllers;

use yii\filters\Cors;

class CommentController extends \yii\rest\ActiveController
{
   public $modelClass = 'app\models\Comment';

   public function behaviors()
   {
     $behaviours = parent::behaviors();
     $behaviours['authenticator']['except'] = ['options'];
     $behaviours['cors'] = [
       'class' => Cors::class
     ];
     return $behaviours;
   }
}
