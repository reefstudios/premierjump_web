      <!-- BEGIN PAGE -->  
      <div class="page-content">

         <!-- BEGIN PAGE CONTAINER-->
         <div class="container-fluid">
            <!-- BEGIN PAGE HEADER-->   
            <div class="row-fluid">
               <div class="span12">
<?php
    $this->load->view("style_v.php"); 
?>
                  <h3 class="page-title">
                     Edit Answer
                  </h3>
                  <ul class="breadcrumb">
                    <li><a href="<?php echo site_url("question/question_list"); ?>">Question</a></li>
                    <li>&raquo;</li>
                    <li><a href="<?php echo site_url("question/question_edit/".$question[0]->qid); ?>">Edit Question</a></li>
                  </ul>
               </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->

            <div class="row-fluid">
               <div class="span12">

<!-- BEGIN SAMPLE FORM PORTLET-->   
                  <div class="portlet box blue">
                     <div class="portlet-title">
                        <h4><i class="icon-reorder"></i>Edit Form</h4>
                        <div class="tools">
                        </div>
                     </div>
                     <div class="portlet-body form">
                        <!-- BEGIN FORM-->
                        
<?php 
    echo form_open_multipart("answer/answer_edit/".$question[0]->id,'class="form-horizontal"');
//    
        echo form_error($answer_name['name']);
        if(isset($show_errors)) {
            if (is_array($show_errors)) {
                foreach($show_errors as $error) {
                    echo "<div class='alert alert-error'>".$error."</div>";
                }
            }
            else{
                echo "<div class='alert alert-error'>".$show_errors."</div>";
            }
        }
?>
      <?php if(isset($success_message)): ?> 
        <div class="alert alert-block alert-success fade in"><?php echo $success_message; ?></div>
      <?php endif; ?>

      <div class="control-group">
            <div class="controls">
            <h4><?php echo $question[0]->question ?></h4>
            </div>
      </div>

      <div class="control-group">
            <label class="control-label" for="is_correct">Correct</label>
            <div class="controls">
            <?php 
            echo form_dropdown("is_correct",array('No', 'Yes'),$question[0]->is_correct, 'class="span6 m-wrap"');?>
            </div>
      </div>

      <div class="control-group">
            <label class="control-label" for="answer_name">Answer String</label>
            <div class="controls">
            <?php  echo form_input($answer_name,'','class="span6 m-wrap"');?>
            </div>
      </div>

        <div class="form-actions">
              <?php echo form_submit('submit', "Edit Answer",' class="btn blue"');?>
          </div>

<?php echo form_close();?>
                        <!-- END FORM-->
                     </div>
                  </div>
                  <!-- END SAMPLE FORM PORTLET-->
        </div>
    </div>
    <!-- END PAGE CONTENT--> 
    
    </div>
    <!-- END PAGE CONTAINER-->
</div>
<!-- END PAGE --> 

