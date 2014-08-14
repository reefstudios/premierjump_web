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
                     Edit Category
                  </h3>
                  <ul class="breadcrumb">
                    <li><a href="<?php echo site_url("question/category_list"); ?>">Category</a></li>
                    <!--<li>&raquo;</li>
                    <li><a href="<?php echo site_url("question/question_list"); ?>">Question</a></li>-->
                  </ul>
<!--                  <small><li>&raquo;</li></small>-->
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
    echo form_open_multipart("question/category_edit/".$category['id'],'class="form-horizontal"');
//    
        echo form_error($category_name['name']);
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
            <label class="control-label" for="question_name">Category String</label>
            <div class="controls">
            <?php  echo form_input($category_name,'','class="span6 m-wrap"');?>
            <?php echo form_submit('submit', "Submit",' class="btn blue"');?>
            </div>
      </div>
        <!--<div class="form-actions">
              
          </div>-->
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

<script>
    function confirm_del(id) {
        if(confirm("Do you want to delete this answer?")) {
            document.location.href = "<?php echo site_url('answer/answer_del'); ?>/" + id;
        }
    }
</script>
