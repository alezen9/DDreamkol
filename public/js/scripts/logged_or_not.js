var logged = true;
var logged_yes = '\
				                <span class="btn btn-info btn-pill"> \
				                    Hello <b>User</b> \
				                </span>';

var not_logged = '\
				                <button type="button" class="btn btn-success btn-pill d-table ml-auto mr-auto" data-toggle="modal" data-target="#exampleModal"> \
				                    Login \
				                </button> \
		 \
				                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> \
				                    <div class="modal-dialog" role="document"> \
				                        <div class="modal-content"> \
				                            <div class="modal-header"> \
				                                <h5 class="modal-title" id="exampleModalLabel">Login</h5> \
				                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
				                                    <span aria-hidden="true">&times;</span> \
				                                </button> \
				                            </div> \
				                            <div class="modal-body"> \
					                            <div class="alert alert-warning alert-dismissible fade show" role="alert"> \
								                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
								                        <span aria-hidden="true">&times;</span> \
								                    </button> \
								                    <i class="fa fa-warning"></i> <strong>Oops!</strong> NOT AVAILABLE at the moment \
					                			</div> \
												<form>  \
						                            <div class="row">  \
						                                <div class="form-group col-md-6">  \
						                                    <div class="input-group with-addon-icon-left">  \
						                                        <span class="input-group-addon">  \
						                                            <i class="fa fa-user"></i>  \
						                                        </span> \
						                                        <input type="text" class="form-control" id="form1-username" placeholder="Username or email"> \
						                                    </div> \
						                                </div> \
						                                <div class="form-group col-md-6"> \
						                                    <div class="input-group with-addon-icon-left"> \
						                                        <input type="password" class="form-control" id="form1-password" placeholder="Password"> \
						                                        <span class="input-group-addon"> \
						                                            <i class="fa fa-lock"></i> \
						                                        </span> \
						                                    </div> \
						                                </div> \
						                            </div> \
						                        </form> \
						                        <div class="modal-footer"> \
					                                <button type="button" class="btn btn-success btn-pill align-self-center" data-dismiss="modal">Login</button> \
				                            	</div>\
				                            </div>\
				                        </div>\
				                    </div>\
				                </div>\
		                    </div>\
							<div style=" padding-left: 20px">\
\
				                <button type="button" class="btn btn-success btn-pill d-table ml-auto mr-auto" data-toggle="modal" data-target="#exampleModal"> \
				                    Register \
				                </button> \
		 \
				                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> \
				                    <div class="modal-dialog" role="document"> \
				                        <div class="modal-content"> \
				                            <div class="modal-header"> \
				                                <h5 class="modal-title" id="exampleModalLabel">Login or register</h5> \
				                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
				                                    <span aria-hidden="true">&times;</span> \
				                                </button> \
				                            </div> \
				                            <div class="modal-body"> \
				                            <div class="alert alert-warning alert-dismissible fade show" role="alert"> \
							                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
							                        <span aria-hidden="true">&times;</span> \
							                    </button> \
							                    <i class="fa fa-warning"></i> <strong>Oops!</strong> NOT AVAILABLE at the moment \
				                			</div> \
												<form>  \
						                            <div class="row">  \
						                                <div class="form-group col-md-6"> \
						                                    <div class="input-group with-addon-icon-left"> \
						                                        <span class="input-group-addon"> \
						                                            <i class="fa fa-user"></i> \
						                                        </span> \
						                                        <input type="text" class="form-control" id="form1-username" placeholder="Username or email"> \
						                                    </div> \
						                                </div> \
						                                <div class="form-group col-md-6"> \
						                                    <div class="input-group with-addon-icon-left"> \
						                                        <input type="password" class="form-control" id="form1-password" placeholder="Password"> \
						                                        <span class="input-group-addon"> \
						                                            <i class="fa fa-lock"></i> \
						                                        </span> \
						                                    </div> \
						                                </div>\
						                                <div class="form-group col-md-6"> \
						                                    <div class="input-group with-addon-icon-left"> \
						                                        <input type="password" class="form-control" id="form1-password" placeholder="Password"> \
						                                        <span class="input-group-addon"> \
						                                            <i class="fa fa-lock"></i> \
						                                        </span> \
						                                    </div> \
						                                </div> \
						                                <div class="form-group col-md-6"> \
						                                    <div class="input-group with-addon-icon-left"> \
						                                        <input type="text" class="form-control" id="form1-village" placeholder="Village"> \
						                                        <span class="input-group-addon"> \
						                                            <i class="fa fa-book"></i> \
						                                        </span> \
						                                    </div> \
						                                </div> \
						                            </div> \
						                        </form> \
						                        <div class="modal-footer"> \
					                                <button type="button" class="btn btn-success btn-pill align-self-center" data-dismiss="modal">Register</button> \
				                            	</div>\
				                            </div>\
				                        </div>\
				                    </div> \
				                </div>';
								if (logged){
									document.write(logged_yes);
								}
								else{
									document.write(not_logged);
								}