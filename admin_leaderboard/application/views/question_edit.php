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
                     Edit Question
                  </h3>
                  <ul class="breadcrumb">
                    <li><a href="<?php echo site_url("question/question_list"); ?>">Question</a></li>
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
    echo form_open_multipart("question/question_edit/".$question['id'],'class="form-horizontal"');
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
            <?php echo form_dropdown("category", $category, $question["cid"], 'class="span6 m-wrap"');?>
            </div>
      </div>
      <div class="control-group">
            <label class="control-label" for="question_name">Question String</label>
            <div class="controls">
            <?php  echo form_input($question_name,'','class="span6 m-wrap"');?>
            <?php echo form_submit('submit', "Submit",' class="btn blue"');?>
            </div>
      </div>
                            <div class="clearfix">
                                <div class="btn-group">
                                    <a id="sample_editable_1_new" href="<?php echo site_url("answer/answer_create/".$question['id']); ?>" class="btn green">
                                    Create New Answer <i class="icon-plus"></i>
                                    </a>
                                </div>
                            </div>
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                    <tr>
                                        <th class="center">ID</th>
                                        <th width="80%" class="center">Answer String</th>
                                        <th class="center">Correct</th>
                                        <th class="center">Edit</th>
                                        <th class="center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
    <?php 
        foreach($answers as $v1){
    ?>

                                    <tr class="odd gradeX">
                                        <td class="text-right"><?php echo $v1->id;?></td>
                                        <td><?php echo stripslashes($v1->name);?></td>
                                        <td class="center"><?php echo $v1->is_correct ? "Yes" : "No";?></td>
                                        <td class="center">
                                        <?php
                                            echo 
                                            '<a class="btn mini purple" href="'.site_url('answer/answer_edit/'.$v1->id).'">'.
                                            '<i class="icon-edit"></i>Edit'.
                                            '</a> ';
                                        ?>
                                        </td>
                                        <td class="center">
                                        <?php
                                            echo 
                                            '<a class="btn mini black" href="javascript:confirm_del('.$v1->id.')">'.
                                            '<i class="icon-trash"></i>Delete'.
                                            '</a>';
                                        ?>
                                        </td>
                                    </tr>
    <?php 
        }
    ?>

                                </tbody>
                            </table>
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
