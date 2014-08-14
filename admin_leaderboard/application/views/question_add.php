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
                     Create Question
                  </h3>
               </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->

            <div class="row-fluid">
               <div class="span12">

<!-- BEGIN SAMPLE FORM PORTLET-->   
                  <div class="portlet box blue">
                     <div class="portlet-title">
                        <h4><i class="icon-reorder"></i>Create Form</h4>
                        <div class="tools">
                        </div>
                     </div>
                     <div class="portlet-body form">
                        <!-- BEGIN FORM-->
                        
<?php 
    echo form_open_multipart("question/question_create",'class="form-horizontal"');
//    
        echo form_error($question_name['name']);
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
      <div class="control-group">
            <label class="control-label" for="category">Category</label>
            <div class="controls">
            <?php echo form_dropdown("category", $category, $cid, 'class="span6 m-wrap"');?>
            </div>
      </div>

      <div class="control-group">
            <label class="control-label" for="question_name">Question String</label>
            <div class="controls">
            <?php  echo form_input($question_name,'','class="span6 m-wrap"');?>
            </div>
      </div>

        <div class="form-actions">
              <?php echo form_submit('submit', "Create Question",' class="btn blue"');?>
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

