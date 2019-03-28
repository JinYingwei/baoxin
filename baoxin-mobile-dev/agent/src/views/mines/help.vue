<template>
    <div>
        <div @click="changeKefu" class="char-heads">
            <img src="../../assets/img/kefu.png">
            <span>在线客服</span>
        </div>
        <iframe v-show="show" id="kefu" src="http://ii.sinelinked.com/sub/kefu.help/index.html" frameborder="0"></iframe>
        <div v-show="!show" class="shadow-box center">
            <!-- <h3 class="shareTitle">帮助说明</h3> -->
            <div class="helpCon">
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>接单流程</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="text-align:center;margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    保险顾问接单流程：
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    A.在接单页面接受需求信息;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    B.选择感兴趣的订单进行接单。接单后，系统平台会将接单顾问信息以短信方式发送给客户;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    C.接单后，查看咨询客户的联系方式，需及时联系咨询客户，就咨询问题进行沟通答复;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    D.联系后点击已联系按钮，系统将再次发送一条短信给咨询客户，提示可进行服务满意度评价;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    E.此订单完成，保险顾问可以进行新一轮的接单流程;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section class="tool-border">
                        <section></section>
                        <section></section>
                        <section></section>
                        <section></section>
                    </section>
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>订单主要来源有：</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    A.&nbsp;个人名片推广带来的客户咨询订单;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    B.&nbsp;所在团队名片推广带来的客户咨询订单;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    C.&nbsp;晟联平台用户的大量咨询订单;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>收费</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    A.保险顾问可以免费使用本系统，包括报信云顾问小程序名片、展业工具等;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                     B.保险顾问可以免费获得个人名片推广所带来的咨询信息;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                     C.保险顾问还可以选择购买接单平台所带来的咨询信息;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>资质审核</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    保险顾问注册登陆后，需尽快将资质信息补充完整，提交系统审核，审核完成后可进行接单。每次修改信息后，系统将重新进行审核;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>加入团队</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    通过展业模块按团队名称搜索团队，并申请加入，团队管理者对申请信息予以审核管理;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>消息</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    消息栏目可以获得系统及团队发送的通知、红包、活动等内容，是顾问与团队和系统交互的途径;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>展业</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    展业模块为保险顾问提供多种展业辅助工具;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>学习</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    为保险顾问自我提升，增强业务能力，提供学习材料;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>我的</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    进行功能配置及信息维护;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>保信云顾问名片</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    保信云顾问小程序名片以简洁而生动的形式，为顾问提供了与用户密切交流的工具和手段;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>保信云顾问名片的调出</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    可以在配置完后，在“我的”里面通过识别太阳码调出;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    可以通过晟联保信公众号-保险顾问-顾问名片，调出;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>保信云顾问名片的分享</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    配置完分享封面后，可以用分享小程序的方式，将名片分享出去;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    通过分享，顾问可以有效的降低交流的门槛，并与广泛的用户建立联系。同时为用户咨询提供便捷的入口，为顾问带来潜在的客户资源;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor">
                    <section style="background-color: #ffffff;">
                        <section style="margin-top: 10px;margin-bottom: 10px;text-align: center;">
                            <section style="display: inline-block;vertical-align: top;">
                                <section style="display: inline-block;vertical-align: top;border-right: 0.35em solid #ffca00;border-bottom: 0.65em solid #ffca00;max-width: 5% !important;border-top: 0.65em solid transparent !important;border-left: 0.35em solid transparent !important;box-sizing: border-box;"></section>
                                <section style="display: inline-block;vertical-align: top;padding-right: 5px;padding-left: 5px;font-size: 19px;color: #ffffff;background-color: #f3f3f3;max-width: 100% !important;box-sizing: border-box;">
                                    <section>
                                        <p style="margin:3px;">
                                            <span style="color: #888888;"><strong>保信云顾问名片的配置</strong></span>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    名片内容可以在“我的”里面灵活配置和维护;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    l&nbsp;个人秀：名片“我秀”栏目展示内容配置;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    l&nbsp;转 &nbsp;发：以小程序方式转发顾问名片时，转发标题及封面配置，封面可选择上传图片或系统模板图片;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="_editor" style="margin: 20px 0px;">
                    <section style="padding: 5px;box-sizing: border-box;">
                        <section style="text-align: center;border-width: 1px;border-style: dashed;border-color: #cccccc;background: #f8f8f8;box-shadow: #e5e5e5 -1px 5px 7px;letter-spacing: 1.5px;padding: 1em;color: #3f3e3f;box-sizing: border-box;">
                            <section style="text-align: justify;padding: 2px 0.8em;line-height: 1.75em;font-size: 14px;box-sizing: border-box;">
                                <p>
                                    l&nbsp;产 &nbsp;品：名片中“产品”栏目显示内容配置;
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
        </div>
        <br>
        <br>
    </div>
</template>

<script>
export default {
    
  data() {
    return {
      checked: false,
      activeChecked: true,
      show:false
    };
  },
  methods: {
      changeKefu(){
          this.show = !this.show
      }
  }
};
</script>

<style scoped>
.shareTitle {
  text-align: center;
}
.char-heads {
  position: fixed;
  width: 1.50rem;
  height: 1.01rem;
  border-radius: 50%;
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
  right: 0.266667rem /* 20/75 */;
  bottom: 4rem /* 300/75 */;
  z-index: 100;
}
#kefu{
    width: 100%;
    height: 100vh;
    transition: .3s;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
