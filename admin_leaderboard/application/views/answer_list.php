<!-- BEGIN PAGE -->
<div class="page-content">
        <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
        <!--<div id="portlet-config" class="modal hide">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"></button>
                <h3>Answer List</h3>
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
    $this->load->view("style_v.php"); 
?>
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->            
                    <h3 class="page-title">
                        Answers
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
                                    <a id="sample_editable_1_new" href="<?php echo site_url("answer/answer_create"); ?>" class="btn green">
                                    Create New Answer <i class="icon-plus"></i>
                                    </a>
                                </div>
                            </div>
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                    <tr>
                                        <th width="80%" class="center">Name</th>
                                        <th class="center">Correct</th>
                                        <th width="120px"></th>
                                    </tr>
                                </thead>
                                <tbody>
    <?php 
        foreach($answers as $v1){
            if(!count($v1['answers']))
                continue;
    ?>
            <tr class="odd gradeX question ">
                <td class="center"><span ><?php echo $v1['question'] ?></span></td>
                <td></td>
                <td></td>
            </tr>
    <?php
            foreach ($v1['answers'] as $v2){
    ?>

                                    <tr class="odd gradeX">
                                        <td><?php echo $v2->name;?></td>
                                        <td class="center"><?php echo $v2->is_correct ? "Yes" : "No";?></td>
                                        <td class="center">
                                        <?php
                                            echo 
                                            '<a class="btn mini purple" href="'.site_url('answer/answer_edit/'.$v2->id).'">'.
                                            '<i class="icon-edit"></i>Edit'.
                                            '</a> '.
                                            '<a class="btn mini black" href="javascript:confirm_del('.$v2->id.')">'.
                                            '<i class="icon-trash"></i>Delete'.
                                            '</a>';
                                        ?>
                                        </td>
                                    </tr>
    <?php 
            }
        }
    ?>

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
        if(confirm("Do you want to delete this answer?")) {
            document.location.href = "<?php echo site_url('answer/answer_del'); ?>/" + id;
        }
    }
</script>
