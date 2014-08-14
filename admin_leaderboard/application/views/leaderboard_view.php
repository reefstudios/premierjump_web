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
        <div class="container-fluid" id="dashboard">

            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
<?php
    $this->load->view("style_v.php"); 
?>
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->            
                    <h3 class="page-title">
                        Analytics Dashboard
                        <small></small>
                    </h3>
                    <ul class="breadcrumb">
<!--                        <li>
                            <i class="icon-home"></i>
                            <a href="index-2.html">Home</a> 
                            <i class="icon-angle-right"></i>
                        </li>-->
                        <li><a href="<?php echo site_url("dashboard/index"); ?>">Dashboard</a></li>
<!--                        <li class="pull-right no-text-shadow">
                            <div id="dashboard-report-range" class="dashboard-date-range tooltips no-tooltip-on-touch-device responsive" data-tablet="" data-desktop="tooltips" data-placement="top" data-original-title="Change dashboard date range">
                                <i class="icon-calendar"></i>
                                <span></span>
                                <i class="icon-angle-down"></i>
                            </div>
                        </li>-->
                    </ul>
                    <?php // echo $message;?>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- END PAGE HEADER-->
        
            <!-- BEGIN PAGE CONTENT-->
<!--            <div class="row-fluid">
                <div class="control-group">
                   <span class="control-label">User Type</span>
                   <span class="controls">
                      <select id="usertype" class="small m-wrap" tabindex="1">
                         <option value="all">All</option>
                         <option <?php if($usertype==1) echo "selected"; ?> value="1">TAM</option>
                         <option <?php if($usertype==2) echo "selected"; ?> value="2">Seller</option>
                         <option <?php if($usertype==3) echo "selected"; ?> value="3">Other</option>
                      </select>
                   </span>
                   &nbsp;&nbsp;&nbsp;
                   <span class="control-label">Level</span>
                   <span class="controls">
                      <select id="level" class="small m-wrap" tabindex="1">
<!--                         <option value="all">All</option>
                         <option <?php if($level==1) echo "selected"; ?> value="1">Easy</option>
                         <option <?php if($level==2) echo "selected"; ?> value="2">Medium</option>
                         <option <?php if($level==3) echo "selected"; ?> value="3">Hard</option>
                      </select>
                   </span>
                </div>
            </div>-->
    
            <div class="row-fluid">
                    <div class="portlet box yellow">
                        <div class="portlet-title">
                            <h4><i class="icon-reorder"></i>Leaderboard</h4>
                            <div class="tools" style="margin-top:-5px;">
                                <a href="<?php echo site_url("question/clear_leaderboard"); ?>" class="btn green">Clear</a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th onclick="sort_list('user_name')" style="cursor:pointer">Name</th>
                                        <th onclick="sort_list('score')" style="cursor:pointer">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <?php
//                                    print_r($datas);exit;
                                 foreach($datas as $key=>$data): ?>
                                    <tr>
                                        <td><?php echo ++$key; ?></td>
                                        <td><?php echo $data['user_name']; ?></td>
                                        <td class="text-right"><?php echo $data['score']; ?></td>
                                    </tr>
                                <?php endforeach;?>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            
        </div>
        <form id= "sort_form" method="post" action="">
	        <input type="hidden" id = "sort_type" name = "sort_type" value="<?php echo $sort_type?>"/>
	        <input type="hidden" id = "sort_value" name = "sort_value" value="<?php echo $sort_value?>"/>
        </form>
        <!-- END PAGE CONTAINER-->
</div>
<!-- END PAGE -->
<script>
    $('#usertype').change(function(){
        document.location.href = '<?php echo site_url("question/leaderboard_view"); ?>/'+$("#usertype").val()+"/"+$("#level").val();
    })
    $('#level').change(function(){
        document.location.href = '<?php echo site_url("question/leaderboard_view"); ?>/'+$("#usertype").val()+"/"+$("#level").val();
    })
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
</script>