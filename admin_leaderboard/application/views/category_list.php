<!-- BEGIN PAGE -->
<div class="page-content">
        <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
        <!--<div id="portlet-config" class="modal hide">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"></button>
                <h3>Questions</h3>
            </div>
            <div class="modal-body">
                <p>Here will be a configuration form</p>
            </div>
        </div>-->
        <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->

        <!-- BEGIN PAGE CONTAINER-->            
        <div class="container-fluid">

            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
<?php
	$enabled_questions_count = 0;
    $this->load->view("style_v.php"); 
?>
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->            
                    <h3 class="page-title">
                        Question Category
                        <small></small>
                    </h3>
                    <?php // echo $message;?>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- END PAGE HEADER-->
        
            <!-- BEGIN PAGE CONTENT-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box ">
                        <div class="portlet-body">
                            <div class="clearfix">
                                <div class="btn-group">
                                    <a id="sample_editable_1_new" href="<?php echo site_url("question/category_create"); ?>" class="btn green">
                                    Create New Category <i class="icon-plus"></i>
                                    </a>
                                </div>
                            </div>
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                    <tr>
                                        <th class="center">ID</th>
                                        <th width="80%" class="center">Category String</th>
                                        <th class="center">Edit</th>
                                        <th class="center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
    <?php foreach ($category_list as $v):?>
                                    <tr class="odd gradeX">
                                        <td class="text-right"><?php echo $v->id;?></td>
                                        <td><?php echo $v->name;?></td>
                                        <td class="center">
                                        <?php
                                            echo 
                                            '<a class="btn mini purple" href="'.site_url('question/category_edit/'.$v->id).'">'.
                                            '<i class="icon-edit"></i>Edit'.
                                            '</a> ';
                                        ?>
                                        </td>
                                        <td class="center">
                                        <?php
                                            echo 
                                            '<a class="btn mini black" href="javascript:confirm_del('.$v->id.')">'.
                                            '<i class="icon-trash"></i>Delete'.
                                            '</a>';
                                        ?>
                                        </td>
                                    </tr>
    <?php endforeach;?>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
            <!-- END PAGE CONTENT-->
            
        </div>
        <!-- END PAGE CONTAINER-->
</div>
<!-- END PAGE -->
<script>
    function confirm_del(id) {
        if(confirm("Do you want to delete this question?")) {
            document.location.href = "<?php echo site_url('question/category_del'); ?>/" + id;
        }
    }
</script>
