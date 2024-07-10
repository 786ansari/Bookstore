import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../contextProvider";
import { logoutContext } from "../../../context/logout.js";
// import AuthService from "../../../api/services/AuthService";
// import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
const Dashboard = () => {
  const [profileState] = useContext(ProfileContext);
  console.log("profileStateprofileState",profileState)
  const myPermission = localStorage.getItem("permissions");
  const permissions = Object.keys(profileState).length>0 ?profileState.permissions: myPermission ? JSON.parse(myPermission):[]
  const userType = localStorage.getItem("userType");

  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [totalUser, setTotalUser] = useState("");
  const [totalVerified, setTotalVerified] = useState("");
  const [totalPanding, setTotalPanding] = useState("");
  const [registration, setRegistration] = useState("");
  const [totalDeposit, setTotalDeposit] = useState("");
  const [totalWithdraw, setTotalWithdraw] = useState("");

  const [toDayDepositRequest, setToDayDepositRequest] = useState("");
  const [totalSupport, setTotalSupport] = useState("");
  const [todayWithdrawal, setTodayWithdrawal] = useState("");
  const { isLogout } = useContext(logoutContext)
console.log("isLogoutisLogoutisLogoutisLogout",isLogout)

  return(
    <>
      <div id="layoutSidenav_content">
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      <div className="page-header-icon">
                        <i className="fa fa-th"></i>
                      </div>
                      Dashboard
                    </h1>
                    {/* <div className="page-header-subtitle">Example dashboard overview and content summary</div> */}
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              {permissions.includes(1) || userType === "1" ? (
                <div className="col-lg-6 col-xl-4 mb-4">
                  <div className="card bg-primary text-white h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                          <div className="text-white-75">Total Users</div>
                          <div className="display-4 fw-bold">{totalUser}</div>
                        </div>
                        <i className="feather-xl text-white-50 fa fa-user-friends"></i>
                      </div>
                    </div>

                    <div className="card-footer d-flex align-items-center justify-content-between small">
                      <Link
                        className="text-white stretched-link"
                        to=""
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveScreen("totaluser")}
                      >
                        View All
                      </Link>

                      <div className="text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {permissions.includes(2) || userType === "1" ? (
                <>
                  {/* <div className="col-lg-6 col-xl-4 mb-4">
                    <div className="card bg-success text-white h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="me-3">
                            <div className="text-white-75">
                              Total Verified Users
                            </div>
                            <div className="display-4 fw-bold">
                              {totalVerified}
                            </div>
                          </div>
                          <i className="feather-xl text-white-50 fa fa-user-check"></i>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between small">
                        <Link
                          className="text-white stretched-link"
                          to=""
                          style={{ cursor: "pointer" }}
                          onClick={() => setActiveScreen("totalVerified")}
                        >
                          View All
                        </Link>
                        <div className="text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6 col-xl-4 mb-4">
                    <div className="card bg-danger text-white h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="me-3">
                            <div className="text-white-75 ">
                              Total Pending Kyc's
                            </div>
                            <div className="display-4 fw-bold">
                              {totalPanding}
                            </div>
                          </div>
                          <i className="feather-xl text-white-50 fa fa-user-slash "></i>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between small">
                        <Link
                          className="text-white stretched-link"
                          to=""
                          style={{ cursor: "pointer" }}
                          onClick={() => setActiveScreen("pendingkyc")}
                        >
                          View All
                        </Link>
                        <div className="text-white">
                          <i className="fa fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              ) : null}
            </div>

            <div className="row">
              {/* {userType === "1" ? (
                <div className="col-lg-6 col-xl-4 mb-4">
                  <div className="card bg-dark text-white h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                          <div className="text-white-75 ">
                            Today's New Registrations
                          </div>
                          <div className="display-4 fw-bold">
                            {registration}
                          </div>
                        </div>
                        <i className="feather-xl text-white-50 fa fa-user-plus"></i>
                      </div>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between small">
                      <Link
                        className="text-white stretched-link"
                        to=""
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveScreen("newRegistrations")}
                      >
                        View All
                      </Link>
                      <div className="text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null} */}

              {/* <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-secondary text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75 ">Today's Deposit Request</div>
                                                    <div className="display-4 fw-bold">{toDayDepositRequest}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fa fa-wallet"></i>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("toDayDeposit")}>View All</Link>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>*/}
              {/* <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-warning text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75 ">Today's Withdrawal Request</div>
                                                    <div className="display-4 fw-bold">{todayWithdrawal}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fa fa-wallet "></i>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("todayWithdrawl")}>View All</Link>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div> */}

              {permissions.includes(9) || userType === "1" ? (
                <>
                  {/* <div className="col-lg-6 col-xl-4 mb-4">
                    <div className="card bg-danger text-white h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="me-3">
                            <div className="text-white-75 ">
                              Total Fiat Withdrawl Request
                            </div>
                            <div className="display-4 fw-bold">
                              {totalWithdraw}
                            </div>
                          </div>
                          <i className="feather-xl text-white-50 fa fa fa-wallet"></i>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between small">
                        <Link
                          className="text-white stretched-link"
                          to=""
                          style={{ cursor: "pointer" }}
                          onClick={() => setActiveScreen("totalWithdraw")}
                        >
                          View All
                        </Link>
                        <div className="text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6 col-xl-4 mb-4">
                    <div className="card bg-info text-white h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="me-3">
                            <div className="text-white-75 ">
                              Total Fiat Deposit Request
                            </div>
                            <div className="display-4 fw-bold">
                              {totalDeposit}
                            </div>
                          </div>
                          <i className="feather-xl text-white-50 fa fa fa-wallet"></i>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-between small">
                        <Link
                          className="text-white stretched-link"
                          to=""
                          style={{ cursor: "pointer" }}
                          onClick={() => setActiveScreen("totalDeposit")}
                        >
                          View All
                        </Link>
                        <div className="text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              ) : null}

              {/*                                 <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-gradient-primary-to-secondary text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75 ">Suport</div>
                                                    <div className="display-4 fw-bold">{totalSupport}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fas fa-headset "></i>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("supportpage")}>View All</Link>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div> */}
            </div>
          </div>
        </main>
      </div>
    </>
  )
};
export default Dashboard;
