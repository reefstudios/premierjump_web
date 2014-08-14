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
                        <?php echo lang('questions');?>
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
                                    <a id="sample_editable_1_new" href="<?php echo site_url("question/question_create"); ?>" class="btn green">
                                    Create New Question <i class="icon-plus"></i>
                                    </a>
                                </div>
                				<div style="float:right;">
                                	<a href="<?php echo site_url("question/clear_question_status"); ?>" class="btn green">Clear</a>
                				</div>
                            </div>
                			<div class="clearfix">
                				<div class="control-group">
								<?php foreach ($category_list as $key=>$val):?>
									<?php if($key>0){?>
										<label style="display:inline;"><?php echo $val->name?><input type="checkbox" id="cat_switch_<?php echo $val->id ;?>" value="<?php echo $key;?>" onclick = "category_onoff(<?php echo $val->id ;?>)"  <?php echo $val->on_off ? "checked" : ""; ?>  /></label>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<?php }?>
								<?php endforeach;?>
								</div>
                			</div>
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                    <tr>
                                        <th class="center">ID</th>
                                        <th width="80%" class="center">Question String</th>
                                    	<th class="center" onclick="sort_list('cid')" style="cursor:pointer;">Category</th>
										<th class="center" onclick="sort_list('answered_percent')" style="cursor:pointer;">Answered Correctly</th>
										<th class="center">ON/OFF</th>
                                        <th class="center">Edit</th>
                                        <th class="center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
    <?php foreach ($questions as $v):?>
									<?php 
										if($v->on_off){
											$enabled_questions_count++;
										}
									?>
                                    <tr class="odd gradeX">
                                        <td class="text-right"><?php echo $v->id;?></td>
                                        <td><?php echo $v->name;?></td>
                                        <td class="center"><?php echo $category_list[$v->cid]->name;?></td>
										<td class="center"><?php echo round($v->answered_percent,2)." %";?></td>
										<td class="center"><input type="checkbox"  id="switch_<?php echo $v->id ;?>"onclick = "switch_onoff(<?php echo $v->id ;?>)" <?php echo $v->on_off ? "checked" : ""; ?> /></td>
                                        <td class="center">
                                        <?php
                                            echo 
                                            '<a class="btn mini purple" href="'.site_url('question/question_edit/'.$v->id).'">'.
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
        <form id= "sort_form" method="post" action="">
	        <input type="hidden" id = "sort_type" name = "sort_type" value="<?php echo $sort_type?>"/>
	        <input type="hidden" id = "sort_value" name = "sort_value" value="<?php echo $sort_value?>"/>
        </form>
            
        </div>
        <!-- END PAGE CONTAINER-->
</div>
<!-- END PAGE -->
<?php echo "<script> var enabled_questions_count=".$enabled_questions_count."</script>";?>
<script>
    function confirm_del(id) {
        if(confirm("Do you want to delete this question?")) {
            document.location.href = "<?php echo site_url('question/question_del'); ?>/" + id;
        }
    }
    function sort_list(sorttype){
    	if($("#sort_type").val() == sorttype){
    		if($("#sort_value").val()=="ASC"){
    			$("#sort_value").val("DESC");
    		}else{
    			$("#sort_value").val("ASC");
    		}	
    	}else{
    		$("#sort_type").val(sorttype);
			$("#sort_value").val("ASC");
    	}
    	$("#sort_form").submit();
    }
    
    function switch_onoff(id){
    	s_val = 0;
    	if($("#switch_"+id).is(":checked")){
    		s_val = 1;
    	}else{
	    	if(enabled_questions_count < 2){
	    		alert("Should be enable least one!");
	    		$("#switch_"+id).prop('checked', true);	
	    		return;
	    	}
    	}
    	document.location.href = "<?php echo site_url('question/question_switch'); ?>/"+id + "/" + s_val;
    }
    function category_onoff(id){
    	s_val = 0;
    	if($("#cat_switch_"+id).is(":checked")){
    		s_val = 1;
    	}else{
    	}
    	
    	document.location.href = "<?php echo site_url('question/category_switch'); ?>/"+id + "/" + s_val;
    }
</script>
