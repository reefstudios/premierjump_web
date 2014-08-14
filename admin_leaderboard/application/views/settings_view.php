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
                        Settings
                        <small></small>
                    </h3>
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
                        <h4><i class="icon-reorder"></i>Game</h4>
                    </div>
                    <div class="portlet-body">
			            <div class="row-fluid">
			    			<div class="span6">
				                <div class="portlet box yellow">
				                    <div class="portlet-title">
				                        <h4><i class="icon-reorder"></i>Turn</h4>
				                    </div>
				                    <div class="portlet-body">
				                		<label for="game_turnon" style="display:inline;margin:10px;">Turn On</label><input id="game_turnon" type="radio" name="game_turn_status" value="1" <?php echo $settings["game_turn_status"] ? "checked":"";?> />
				                		<label for="game_turnoff" style="display:inline;margin:10px;">Turn OFF</label><input id="game_turnoff" type="radio" name="game_turn_status" value="0" <?php echo $settings["game_turn_status"] ? "":"checked";?>/>
	                				</div>
	                			</div>
				                <div class="portlet box yellow">
				                    <div class="portlet-title">
				                        <h4><i class="icon-reorder"></i>Obstacle</h4>
				                    </div>
				                    <div class="portlet-body">
				                		<label for="obstacle_bucket" style="display:inline;margin:10px;">Bucket</label><input id="obstacle_bucket" type="radio" name="game_obstacle" value="1" <?php echo $settings["game_obstacle"] == 1 ? "checked":"";?> />
				                		<label for="obstacle_rain" style="display:inline;margin:10px;">Rain Cloud</label><input id="obstacle_rain" type="radio" name="game_obstacle" value="2" <?php echo $settings["game_obstacle"] == 2 ? "checked":"";?>/>
	                				</div>
	                			</div>
	            				
			    			</div>
			    			<div class="span6" >
				                <div class="portlet box yellow">
				                    <div class="portlet-title">
				                        <h4><i class="icon-reorder"></i>TurnOff Image</h4>
										<div class="tools" style="margin-top:-1px;">
											<label>Use TurnOff Image<input type="checkbox" id="use_turnoff_img" name="use_turnoff_img" <?php echo $settings["use_turnoff_img"] ? "checked":"";?>/></label>
										</div>
				                    </div>
				                    <div class="portlet-body">
						        		<?php
				                			if(isset($success) && !$success){
				                				echo $show_errors;
				            				}
				                		?>
										<form action="" method="POST" enctype="multipart/form-data">
					        				<input type="file" id="turnoff_img" name="turnoff_img"/>
					                        <div class="btn-group">
					        					<input type="submit" class="btn green" value="Upload">
					                        </div>
										</form>
										<img src="./upload/turnoff_img.png?<?php echo time();?>" />
	                				</div>
	                			</div>
			    			</div>
                		</div>
                    </div>
                </div>
            </div>
			<div class="row-fluid">
                <div class="span6">
	                <div class="portlet box yellow">
	                    <div class="portlet-title">
	                        <h4><i class="icon-reorder"></i>Assist Animations</h4>
	                    </div>
	                    <div class="portlet-body">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th class="center">No</th>
                                        <th class="center">Name</th>
                                        <th class="center">ON/OFF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                	<tr>
                                		<td class="center">1</td>
                                		<td class="center">TAM</td>
                                		<td class="center"><input type="checkbox" class="assist_chk" id = "tam_assist" onclick = "update_assit('tam_assist')" <?php echo $settings["tam_assist"] ? "checked":"";?>/></td>
                                	</tr>
                                	<tr>
                                		<td class="center">2</td>
                                		<td class="center">Seller</td>
                                		<td class="center"><input type="checkbox" class="assist_chk" id ="seller_assist" onclick = "update_assit('seller_assist')"<?php echo $settings["seller_assist"] ? "checked":"";?>/></td>
                                	</tr>
                                	<tr>
                                		<td class="center">3</td>
                                		<td class="center">ATS</td>
                                		<td class="center"><input type="checkbox" class="assist_chk" id ="ats_assist" onclick = "update_assit('ats_assist')"<?php echo $settings["ats_assist"] ? "checked":"";?>/></td>
                                	</tr>
                                	<tr>
                                		<td class="center">4</td>
                                		<td class="center">SSP</td>
                                		<td class="center"><input type="checkbox" class="assist_chk" id ="ssp_assist" onclick = "update_assit('ssp_assist')"<?php echo $settings["ssp_assist"] ? "checked":"";?>/></td>
                                	</tr>
                                </tbody>
                            </table>
						</div>
	                </div>
                </div>
                <div class="span6">
	                <div class="portlet box yellow">
	                    <div class="portlet-title">
	                        <h4><i class="icon-reorder"></i>Assist Characters</h4>
	                    </div>
	                    <div class="portlet-body">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th class="center">No</th>
                                        <th class="center">Name</th>
                                        <th class="center">ON/OFF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                	<tr>
                                		<td class="center">1</td>
                                		<td class="center">White Character</td>
                                		<td class="center"><input type="checkbox" class="char_chk" id="white_assist_char" onclick= "update_char('white_assist_char')" <?php echo $settings["white_assist_char"] ? "checked":"";?>/></td>
                                	</tr>
                                	<tr>
                                		<td class="center">2</td>
                                		<td class="center">Brown Character</td>
                                		<td class="center"><input type="checkbox" class="char_chk" id="brown_assist_char" onclick= "update_char('brown_assist_char')" <?php echo $settings["brown_assist_char"] ? "checked":"";?>/></td>
                                	</tr>
                                	<tr>
                                		<td class="center">3</td>
                                		<td class="center">Black Character</td>
                                		<td class="center"><input type="checkbox" class="char_chk" id="black_assist_char" onclick= "update_char('black_assist_char')" <?php echo $settings["black_assist_char"] ? "checked":"";?>/></td>
                                	</tr>
                                	<tr>
                                		<td class="center">3</td>
                                		<td class="center">Female Character</td>
                                		<td class="center"><input type="checkbox" class="char_chk" id="female_assist_char" onclick= "update_char('female_assist_char')" <?php echo $settings["female_assist_char"] ? "checked":"";?>/></td>
                                	</tr>
                                </tbody>
                            </table>
	                    </div>
	                </div>
	           	</div>
			</div>
        </div>
        <!-- END PAGE CONTAINER-->
</div>
<!-- END PAGE -->
<?php echo "<script> var game_turn_status=".$settings["game_turn_status"]."</script>"; ?>
<script>
	function update_settings(field,val){
		document.location.href = '<?php echo site_url("question/settings_val"); ?>/'+field+"/"+val;
	}
	function update_assit(field){
		check_state = $("#"+field).is(":checked");
		   if(game_turn_status){
		   	   alert("Please turn off game before modify!");
		   	   $("#"+field).prop('checked', !check_state);
		   	   return;
		   }
			val = 0;
			if(check_state){
				val = 1;
			}else{
				count = $(".assist_chk:checked").length;
				if(count < 1){
					alert("Should be enable least one!");
					$("#"+field).prop('checked', true);
					return;
				}
			}
			update_settings(field,val);
	}
	function update_char(field){
			check_state = $("#"+field).is(":checked");
		   if(game_turn_status){
		   	   alert("Please turn off game before modify!");
		   	   
		   	   $("#"+field).prop('checked', !check_state);
		   	   return;
		   }
			val = 0;
			if(check_state){
				val = 1;
			}else{
				count = $(".char_chk:checked").length;
				if(count < 1){
					alert("Should be enable least one!");
					$("#"+field).prop('checked', true);
					return;
				}
			}
			update_settings(field,val);
	}
	
	$(function(){
		$("#game_turnon,#game_turnoff").change(function(){
			update_settings("game_turn_status",$(this).val());
		});
		$("#obstacle_bucket,#obstacle_rain").change(function(){
			check_state = $(this).is(":checked");
		   if(game_turn_status){
		   	   alert("Please turn off game before modify!");
		   	   $(this).prop('checked', !check_state);
				return;
			}			
			update_settings("game_obstacle",$(this).val());
		});
		
		$("#use_turnoff_img").click(function(){
			val = 0;
			if($(this).is(":checked")){
				val = 1;
			}
			update_settings("use_turnoff_img",val);
		});
	});
	
</script>