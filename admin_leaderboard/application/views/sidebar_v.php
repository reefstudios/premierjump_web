<?php

	$curPage = $this->router->fetch_class().'/'.$this->router->fetch_method();

	$side_menus = array(
/*		0	=>	array( 'dashboard/index',	 'Dashboard', 'icon-home'	),
		1	=>	array( '#', 'News', 'icon-th-list', 
					array(
						0	=>	array('news/news_list',			'News List'),
						1	=>	array('news/news_create',	'Create News'),
					) 
				),
		2	=>	array( '#', 'Partners / Companies', 'icon-th-list', 
					array(
						0	=>	array('main/company_list',			'Company List'),
						1	=>	array('main/company_create',	'Create Company'),
					) 
				),
		3	=>	array( '#', 'Congress', 'icon-th-list', 
					array(
						0	=>	array('congress/congress_list',	'Congress List'),
						1	=>	array('congress/congress_create',	'Create Congress'),
					) 
				),*/
	  4	   =>	array( 'question/leaderboard_view',	 'LeaderBoard', 'icon-th-list'	),
      5    =>    array( '#', 'Manage Question', 'icon-th-list', 
                    array(
                        0    =>    array('question/category_list',    'Category List'),
                        1    =>    array('question/question_list',    'Question List'),
                        2    =>    array('question/question_create',    'Create Question'),
                        3    =>    array('answer/answer_create',    'Create Answer'),
                    ) 
                ),
      6    =>    array( '#', 'Users', 'icon-th-list', 
                    array(
                        0    =>    array('auth/index',            'User List'),
                        1    =>    array('auth/create_user',    'Create User'),
                    ) 
                ),
	  7	   =>	array( 'question/settings_view',	 'Settings', 'icon-th-list'	),				
		12	=>	array( 'auth/logout',	 'Logout', 'icon-user'	),
	); 
?>
		<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar nav-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->        	
			<ul>
				<li>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<div class="sidebar-toggler hidden-phone"></div>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
				</li>
				<li>
					<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
					<form class="sidebar-search">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" placeholder="Search..." />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
					<!-- END RESPONSIVE QUICK SEARCH FORM -->
				</li>
<?php
	
//	print_r($side_menus);exit;
	 foreach($side_menus as $item) {
	 	
		$cls1 = "";
		$cls2 = "";
		$sel1 = "";
		$lnk = "";
		
	 	if($item[0] == $curPage) {
	 		$cls1 = 'active';
	 		$sel1 = '<span class="selected"></span>';
	 		$lnk = site_url($item[0]);
	 	}else{
	 		$cls1 = '';
	 		$sel1 = '';
	 		if($item[0]=="#") {
	 			$lnk = "javascript:;";
	 			foreach ($item[3] as $subitem) {
	 				if($subitem[0] == $curPage) {
	 					$cls1 = 'active';
	 					$cls2 = 'open';
	 					$sel1 = '<span class="selected"></span>';
	 					break;
	 				}
	 			}
	 		}else{
	 			$lnk = site_url($item[0]);
	 		}
	 	}
	 	
	 	if(count($item)<4) {
				echo '<li class="'.$cls1.'">'.
							'<a href="'.$lnk.'">'.
							'<i class="'.$item[2].'"></i> '.
							'<span class="title">'.$item[1].'</span>'.
							$sel1.
							'</a>'.
						'</li>';
	 	}else{
	 		$cls1 .= " has-sub";
	 		echo '<li class="'.$cls1.'">'.
						'<a href="'.$lnk.'">'.
						'<i class="'.$item[2].'"></i>'.
						'<span class="title">'.$item[1].'</span>'.
	 					$sel1.
						'<span class="arrow '.$cls2.'"></span>'.
						'</a>'.
						'<ul class="sub">';
				 		foreach ($item[3] as $subitem) {
				 			$cls1 =	$subitem[0]==$curPage? 'class="active"' : '';
							echo '<li '.$cls1.'><a href="'.site_url($subitem[0]).'">'.$subitem[1].'</a></li>';
				 		}
						echo '</ul>'.
					'</li>';
	 	}
	 }
?>

			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
		<!-- END SIDEBAR -->
