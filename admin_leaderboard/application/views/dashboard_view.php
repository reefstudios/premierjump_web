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
                        <!--<li class="pull-right no-text-shadow">
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
            <div class="row-fluid">
                    <div class="portlet box yellow">
                        <div class="portlet-title">
                            <h4><i class="icon-reorder"></i>Dashboard Table</h4>
                            <div class="tools" style="display: none;">
                                <a href="javascript:;" class="collapse"></a>
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Unique Users</td>
                                        <td><?php echo $unique_users; ?></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Total time of game</td>
                                        <td><?php echo $totaltimeofgame ?></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Average time</td>
                                        <td><?php echo $avgtime; ?></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Number of questions submitted</td>
                                        <td><?php echo $numberofquestions; ?></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Number of correct answer</td>
                                        <td><?php echo $numberofanswered; ?></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Number of incorrect answer</td>
                                        <td><?php echo $numberofquestions-$numberofanswered; ?></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Which questions are most difficult</td>
                                        <td><?php echo $difficultquestion; ?></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            <!--<div class="row-fluid">
                <div class="span6">
                    <div class="portlet box yellow">
                        <div class="portlet-title">
                            <h4><i class="icon-reorder"></i>Usage by geography</h4>
                            <div class="tools">
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="graph_1" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="portlet box purple">
                        <div class="portlet-title">
                            <h4><i class="icon-reorder"></i>Usage by role</h4>
                            <div class="tools">
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="graph_2" class="chart"></div>
                        </div>
                    </div>
                </div>
                
                <!--<div class="span6">
                    <div class="portlet responsive" data-tablet="span6" data-desktop="">
                        <div class="dashboard-stat blue">
                            <div class="details">
                                <div class="number">
                                    <?php echo $unique_users; ?>
                                </div>
                                <div class="desc">                                    
                                    Unique Users
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="portlet responsive" data-tablet="span6" data-desktop="">
                        <div class="dashboard-stat green">
                            <div class="details">
                                <div class="number"><?php echo $totaltimeofgame ?></div>
                                <div class="desc">Total time of game</div>
                            </div>
                        </div>
                    </div>
                    <div class="portlet responsive" data-tablet="span6" data-desktop="">
                        <div class="dashboard-stat purple">
                            <div class="details">
                                <div class="number"><?php echo $avgtime; ?></div>
                                <div class="desc">Average time</div>
                            </div>
                        </div>
                    </div>
                    <div class="portlet responsive" data-tablet="span6" data-desktop="">
                        <div class="dashboard-stat green">
                            <div class="details">
                                <div class="number"><?php echo $numberofquestions; ?></div>
                                <div class="desc">Number of questions submitted</div>
                                <div class="number"><?php echo $numberofanswered; ?></div>
                                <div class="desc">Number of correct answer</div>
                                <div class="number"><?php echo $numberofquestions-$numberofanswered; ?></div>
                                <div class="desc">Number of incorrect answer</div>
                            </div>
                        </div>
                    </div>
                    <div class="portlet responsive" data-tablet="span6" data-desktop="">
                        <div class="dashboard-stat yellow">
                            <div id="difficulty_question"><?php echo $difficultquestion; ?></div>
                            <div class="details">
                                <div class="desc">Which questions are most difficult</div>
                            </div>
                        </div>
                    </div>
                </div>-->
            <!--</div>-->
            <div class="row-fluid">
                <div class="span6">
                    <div class="portlet box yellow">
                        <div class="portlet-title">
                            <h4><i class="icon-bullhorn"></i>Usage by role</h4>
                            <div class="tools">
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="site_activities_loading">
                                <!--<img src="<?php echo base_url(); ?>/assets/img/loading.gif" alt="loading" />-->
                            </div>
                            <div lass="hide">
                                <div id="usagebyrole"  class="chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div class="span6">
                    <div class="portlet box yellow">
                        <div class="portlet-title">
                            <h4><i class="icon-bullhorn"></i>Usage by region</h4>
                            <div class="tools">
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="site_activities_loading">
                                <!--<img src="<?php echo base_url(); ?>/assets/img/loading.gif" alt="loading" />-->
                            </div>
                            <div lass="hide">
                                <div id="usagebyregion"  class="chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END PAGE CONTENT-->
            <div class="row-fluid">
                <div class="span12">
                    <ul class="breadcrumb">
                        <li><a href="">&nbsp;</a></li>
                        <li class="pull-right no-text-shadow">
                            <div id="dashboard-report-range" class="dashboard-date-range tooltips no-tooltip-on-touch-device responsive" data-tablet="" data-desktop="tooltips" data-placement="top" data-original-title="Change dashboard date range">
                                <i class="icon-calendar"></i>
                                <span></span>
                                <i class="icon-angle-down"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="portlet box yellow">
                    <div class="portlet-title">
                        <h4><i class="icon-bullhorn"></i>Usage by date</h4>
                        <div class="tools">
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div lass="hide">
                            <div id="usagebydate"  class="chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END PAGE CONTAINER-->
</div>
<div style="display: none;">
    <textarea id="usagesbyregion" ><?php echo $usagesbyregion; ?></textarea>
    <textarea id="usagesbyusertype" ><?php echo $usagesbyusertype; ?></textarea>
</div>
<!-- END PAGE -->
<script>
/***********************************/
//        $('#dashboard-report-range').daterangepicker({
//            onSelect : function(){
//                alert("sdfsdf")
//            }
//        });
        var stack = 0,
            bars = true,
            lines = false,
            steps = false;

        var usagesbyusertype = $("#usagesbyusertype").val();
        usages = $.parseJSON(usagesbyusertype);
        var roles = ["Tam", "Easy", "Label"];
        var chart1 = [];
        for(var key in roles){
            var val = 0;
            for(var key1 in usages){
                if(roles[key] == usages[key1].label){
                    val = usages[key1].gametime;
                    break;
                }
            }
            chart1.push([key, val]);
        }
        console.log(chart1)

        function plotWithOptions() {
            $.plot($("#usagebyrole"), [chart1], {
                series: {
                    stack: stack,
                    lines: {
                        show: lines,
                        fill: true,
                        steps: steps
                    },
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 0.4,
                    //    fillColor: { colors: ['#ff0000','#00ff00','#0000ff'] }
                        fillColor: {colors: [{ opacity: 0.8 }, { opacity: 0.1 }, { opacity: 0.5 }]}
                    }
                },
                xaxis: {
                    ticks: [[0,'Tam'], [1, "Seller"], [2, "other"] ],
                //    tickColor:['#ff0000','#00ff00','#0000ff']
                }
                
            });
        }
        plotWithOptions()
        var stack = 0,
            bars = true,
            lines = false,
            steps = false;

        var usagesbyregion = $("#usagesbyregion").val();
        usages = $.parseJSON(usagesbyregion);
        var chart2 = [];
        var label2 = [];
        for(var key in usages){
            val = usages[key].gametime;
            chart2.push([val, key]);
            label2.push([key,usages[key].label]);
        }

        function plotWithOptions2() {
            $.plot($("#usagebyregion"), [chart2], {
                series: {
                    stack: stack,
                    lines: {
                        show: lines,
                        fill: true,
                        steps: steps
                    },
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 0.6,
                        horizontal : true
                    }
                },
                yaxis: {
                    ticks: label2
                }
                
            });
        }
        plotWithOptions2();
        call_api("getUsagesByDate", {start:Date.today().add({days: -29}).getTime()/1000, end:Date.today().getTime()/1000} ,App.plotWithOptions3 );
        
/***********************************/

//    $(document).ready(function() {        
        var graphData1 = [];
        var usagesbyregion = $("#usagesbyregion").val();
        var usages = $.parseJSON(usagesbyregion);
        var i = 0;
        for(var key in usages){
            graphData1[i] = {
                label:usages[key].label, data:Number(usages[key].gametime)
            }
            i++;
        }
        var graphData2 = [];
        var usagesbyusertype = $("#usagesbyusertype").val();
        usages = $.parseJSON(usagesbyusertype);
        i = 0;
        for(var key in usages){
            graphData2[i] = {
                label:usages[key].label, data:Number(usages[key].gametime)
            }
            i++;
        }

        $.plot($("#graph_1"), graphData1, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: function (label, series) {
                            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.5
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });
        
        $.plot($("#graph_2"), graphData2, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: function (label, series) {
                            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.5
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });
        
//    });                
</script>