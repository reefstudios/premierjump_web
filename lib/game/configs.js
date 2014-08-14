ig.module(
	'game.configs'
)
.defines(function(){
		Configs = {
			//screen size.
			SCREEN_WIDTH			: 640,//window.innerWidth,
			SCREEN_HEIGHT			: 1138,//window.innerHeight,
			block_tam_assit_height  :{"before":78,"after":132},
			vnext_height            :48,
			img_background		    : 'res/images/background.png',
            img_Player	  			: 'res/images/player.png',
            img_block	  			: 'res/images/block.png',
            img_bucket	  			: 'res/images/bucket.png',
            img_rain	  			: 'res/images/rain.png',
            img_stormy_cloud		: 'res/images/stormy_cloud.png',
            img_bucket_alert		: 'res/images/bucket_alert.png',
            img_cloud				: 'res/images/cloud.png',
            img_sun				    : 'res/images/sun.png',
            img_tam_text		    : 'res/images/tam_text.png',
            img_seller_text		    : 'res/images/seller_text.png',
			img_ats_text		    : 'res/images/ats_text.png',
			img_ssp_text		    : 'res/images/ssp_text.png',
			img_pause_btn 			: 'res/images/pause_btn.png',            	
            img_pause_again_btn 	: 'res/images/pause_again_btn.png',
            img_pause_resume_btn 	: 'res/images/pause_resume_btn.png',
            img_pause_menu_btn 	    : 'res/images/pause_menu_btn.png',
            img_pause_mute_btn 	    : 'res/images/pause_mute_btn.png',
            img_pause_unmute_btn 	: 'res/images/pause_unmute_btn.png',
            img_tutorial 			: 'res/images/tutorial.png',
            img_hard_tutorial 		: 'res/images/hard_tutorial.png',
            img_tutorial_bucket 	: 'res/images/tutorial_bucket.png',	
            img_tutorial_stormy_cloud 	: 'res/images/tutorial_stormy_cloud.png',	
            	
            img_got_btn	 			: 'res/images/got_it.png',
            img_setting_btn    	    : 'res/images/setting_btn.png',
            img_saveLive			: 'res/images/live_icon.png',
            // Questions
            img_question_back 		: 'res/images/question.png',
            img_answer_btn	        : 'res/images/answer_btn.png',
            img_question_arrow      : 'res/images/question_arrow.png',
			img_question_continue_btn:'res/images/question_continue_btn.png',
			img_question_blast_btn	:'res/images/question_blast_btn.png',
            img_question_timer_progress:'res/images/timer_progress.png',
            img_question_timer_progress_1:'res/images/timer_progress_1.png',
            img_correct_answer_back   :'res/images/correct_answer_back.png',
            img_answer_check		:'res/images/answer_check_mark.png',
            //// GAME OVER	
			img_gameover		    : 'res/images/gameover.png',
			img_submit_btn		    : 'res/images/submit_score.png',
			img_main_menu_btn	    : 'res/images/main_menu_btn.png',
			img_again_btn		    : 'res/images/again_btn.png',
			img_go_progress_wrapper : 'res/images/go_progress_wrapper.png',
			img_go_progress 		: 'res/images/go_progress.png'
		};
});
