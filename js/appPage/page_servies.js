var desand = function () {
    $("div.mbclass").click(function () {
        $(this).parent().parent().parent().find(".mbclass").removeClass("focus");
        var e = $(this).data("index");
        $(this).parent().parent().parent().find('.mbclass[data-index="' + e + '"]').addClass("focus")
    })
}(function () {
    var e = angular.module("maka", ["ngResource", "hmTouchEvents", "ui.sortable", "textAngular", "angularFileUpload", "ui.bootstrap", "ipCookie"]);
    e.config(["$httpProvider", function (e) {
        e.defaults.useXDomain = !1, e.defaults.withCredentials = !1, e.defaults.headers.put["Content-Type"] = "application/x-www-form- urlencoded", e.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded", e.defaults.transformRequest = [function (e) {
            var t = function (e) {
                var a, n, o, l, i, r, s, c = "";
                for (a in e) if (n = e[a], n instanceof Array) for (console.log(n), s = 0; s < n.length; ++s) i = n[s], o = a + "[" + s + "]", r = {}, r[o] = i, c += t(r) + "&"; else if (n instanceof Object) for (l in n) i = n[l], o = a + "[" + l + "]", r = {}, r[o] = i, c += t(r) + "&"; else void 0 !== n && null !== n && (c += encodeURIComponent(a) + "=" + encodeURIComponent(n) + "&");
                return c.length ? c.substr(0, c.length - 1) : c
            };
            return angular.isObject(e) && "[object File]" !== String(e) ? t(e) : e
        }]
    }]), e.factory("maka", ["$resource", function (e) {
        return e("", {}, {
            getMyPicData: {
                method: "get",
                url: "http://img.maka.im/maka/app/gfile/public/p/getlist?uid=6&version=1"
            },
            getModelById: {method: "post", url: "../../makagit/maka/app/plat/public/admin/event/ajax_get_mbdata"},
            getModel: {method: "get", url: "http://card.maka.im/json/HIA2AGN81061.json"},
            getMyUploadImg: {method: "get", url: "http://img.maka.im/maka/app/gfile/public/p/getlist"},
            getModelOne: {method: "get", url: "http://card.maka.im/json/HIA2AGN81061.json"},
            getModelTwo: {method: "get", url: "http://card.maka.im/json/W9CFM1IB.json"},
            getModelThree: {method: "get", url: "http://card.maka.im/json/J6KOYV0Q.json"},
            getProjectData: {method: "get", url: "http://card.maka.im/json/6U5SGENL944.json"},
            getPicCatalog: {method: "get", url: "../ext/picture/api/category"},
            getPicByCatalog: {method: "get", url: "../ext/picture/api/list"},
            projectSave: {method: "post", url: "../../makagit/maka/app/plat/public/admin/event/ajax_save"}
        })
    }]), e.factory("makaService", ["maka", "$q", "$http", function (e, t, a) {
        var n = function (e) {
            var n = t.defer(), o = e;
            return a.post("../admin/event/ajax_get_mbdata", o).success(function (e) {
                n.resolve(e)
            }).error(function (e) {
                n.reject(e)
            }), n.promise
        }, o = function (e) {
            var n = t.defer(), o = e.data;
            return a.post("../admin/event/ajax_save", o).success(function (e) {
                n.resolve(e)
            }).error(function (e) {
                n.reject(e)
            }), n.promise
        }, l = function (e) {
            var n = t.defer(), o = "../admin/event/ajax_get_real_data?id=" + e.id;
            return a.get(o).success(function (e) {
                n.resolve(e)
            }).error(function (e) {
                n.reject(e)
            }), n.promise
        };
        return {getModel: n, saveProject: o, getProjectData: l}
    }]), e.controller("create", ["$scope", "$location", "maka", "$interval", "FileUploader", "$timeout", "$rootScope", "makaService", "$modal", "ipCookie", function (e, t, a, n, o, l, i, r, s, c) {
        var p, d, m, u, g, f, h, v, b, w, y, T = !1, E = 0, C = 0;
        e.showPicView = !1, e.showShapeView = !1, e.locked = !0, e.movementList = [], e.shape_url = "http://create.maka.im/mobile/res/shape/", e.system_call = !1, e.showModelView = !1, e.showQr = !1, e.showHelp = !1, e.selectedCatalog = {name: "mine"}, e.myUploadingMusic = [], i.bgScale = window.innerHeight / 1008 * .7, i.windowHeight = window.innerHeight, i.rightHeight = window.innerHeight - 50, e.preAddingTemplate = !1, e.fontbold = "normal", e.changingShape = !1, e.changingImg = !1, e.audio = new Audio, e.uploadError = "", e.templateClass = 0, e.allModel = [], e.showCankao = !1, e.loading = !0, e.isBack = !1, e.formdata = [], e.copyData = "", e.effects = [{
            name: "无效果",
            "class": "noeffect"
        }, {name: "淡入", "class": "fadeInNormal"}, {name: "弹性放大", "class": "fadeIn"}, {
            name: "弹性缩小",
            "class": "expandOpen"
        }, {name: "放大", "class": "zoomIn"}, {name: "下落放大", "class": "zoomInDown"}, {
            name: "从左滚入",
            "class": "rotateInDownLeft"
        }, {name: "从右滚入", "class": "rotateInDownRight"}, {name: "向右飞入", "class": "moveRight"}, {
            name: "向左飞入",
            "class": "moveLeft"
        }, {name: "向上飞入", "class": "moveUp"}, {name: "向下飞入", "class": "moveDown"}, {
            name: "向右滑入",
            "class": "slideRight"
        }, {name: "向左滑入", "class": "slideLeft"}, {name: "向上滑入", "class": "slideUp"}, {
            name: "向下滑入",
            "class": "slideDown"
        }, {name: "刹车", "class": "lightSpeedIn"}, {name: "左右翻转", "class": "flipInY"}, {
            name: "上下翻转",
            "class": "flipInX"
        }, {name: "旋转出现", "class": "rotateIn"}, {name: "向右展开", "class": "stretchRight"}, {
            name: "向左展开",
            "class": "stretchLeft"
        }, {name: "向上展开", "class": "pullUp"}, {
            name: "向下展开",
            "class": "pullDown"
        }], e.themeColors = ["#3C495F", "#FF6C6C", "#FBC600", "#90D356", "#2B90ED", "#6E5993"], e.colorModel = ["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "rgba(0,255,209,100)", "#00ffff", "#0000ff", "#9900ff", "#ff00ff", "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#BFF9F2", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc", "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#7DDFD4", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd", "#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#42C2B3", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0", "#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#0BA492", "#45818e", "#3d85c6", "#674ea7", "#a64d79", "#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#007466", "#0c343d", "#073763", "#20124d", "#4c1130"], e.colorModel2 = ["rgb(255,255,255)", "rgb(225,225,225)", "rgb(195,195,195)", "rgb(165,165,165)", "rgb(135,135,135)", "rgb(105,105,105)", "rgb(75,75,75)", "rgb(35,35,35)", "rgb(0,0,0)"], e.fontSizes = [12, 14, 16, 18, 20, 24, 26, 28, 36, 40, 42, 44, 46, 50, 60, 64, 72, 96, 106, 120, 144, 288, 366, 477, 566], e.lineHeights = [1, 1.2, 1.35, 1.5, 2, 2.5], e.textAligns = [{
            name: "左对齐",
            value: "left"
        }, {name: "居中", value: "center"}, {name: "右对齐", value: "right"}, {
            name: "两端",
            value: "justify"
        }], e.shapeNum = ["1.svg", "2.svg", "3.svg", "4.svg", "5.svg", "6.svg", "7.svg", "8.svg", "9.svg", "10.svg", "11.svg", "12.svg"];
        var k = ["pt-page- rotateCubeTopOut", "pt-page-rotateCubeTopIn", "pt-page-rotateCubeBottomOut", "pt- page-rotateCubeBottomIn", "swipedown", "swipeup"], I = ["pt-page- rotateCubeBottomOut", "pt-page- rotateCubeBottomIn", "pt-page- rotateCubeTopOut", "pt-page- rotateCubeTopIn", "swipeup", "swipedown"], x = ["pt-page- rotateCubeLeftOut", "pt-page- rotateCubeLeftIn", "pt-page- rotateCubeRightOut", "pt-page-rotateCubeRightIn", "swiperight", "swipeleft"], D = ["pt-page-rotateCubeRightOut", "pt-page-rotateCubeRightIn", "pt-page- rotateCubeLeftOut", "pt-page-rotateCubeLeftIn", "swipeleft", "swiperight"], N = ["pt-page- flipOutTop", "pt-page- flipInBottom pt-page-delay500", "pt-page- flipOutBottom ", "pt-page-flipInTop pt-page-delay500", "swipedown", "swipeup"], S = ["pt-page-moveToTop", "pt-page- moveFromBottom", "pt-page-moveToBottom", "pt-page- moveFromTop", "swipedown", "swipeup"], V = ["pt-page-rotatePushTop", "pt-page- moveFromBottom pt-page-delay100", "pt- page- rotatePushBottom", "pt-page- moveFromTop pt-page-delay100", "swipedown", "swipeup"], M = ["pt-page- rotateOutNewspaper", "pt-page-rotateInNewspaper pt-page-delay500", "pt-page- rotateOutNewspaper", "pt-page- rotateInNewspaper pt-page-delay500", "swipedown", "swipeup"], P = ["pt-page-scaleDown", "pt-page- scaleUpDown pt-page- delay300", "pt-page-scaleDownUp", "pt-page- scaleUp pt- page-delay300", "swipedown", "swipeup"], A = ["pt-page- rotateRoomTopOut pt-page-ontop", "pt-page-rotateRoomTopIn", "pt-page- rotateRoomBottomOut pt-page-ontop", "pt-page- rotateRoomBottomIn", "swipedown", "swipeup"], j = ["pt-page-rotateCarouselTopOut pt- page- ontop", "pt-page-rotateCarouselTopIn", "pt-page-rotateCarouselBottomOut pt-page- ontop", "pt- page- rotateCarouselBottomIn", "swipedown", "swipeup"], B = ["pt-page-rotateFall pt-page-ontop", "pt- page-scaleUp", "pt-page- scaleDown", "pt-page-moveFromBottom", "swipeup", "swipedown"], R = ["pt- page-moveToTopSlow", "noeffect", "noeffect", "pt-page- moveFromTopSlow", "swipeup", "swipedown"], O = {
            cubedown: k,
            cubeup: I,
            cubeleft: x,
            cuberight: D,
            flipup: N,
            moveup: S,
            pushup: V,
            scaleup: P,
            roomup: A,
            carouup: j,
            fall: B,
            news: M,
            toup: R,
            noeffect: R
        };
        e.effectList = [{name: "翻页", "class": "toup"}, {name: "魔方", "class": "cubedown"}, {
            name: "折叠",
            "class": "flipup"
        }, {name: "上滑", "class": "moveup"}, {name: "推上", "class": "pushup"}, {
            name: "旋转",
            "class": "news"
        }, {name: "淡出淡出", "class": "scaleup"}, {name: "立体", "class": "roomup"}, {
            name: "缩放",
            "class": "carouup"
        }, {name: "掉落", "class": "fall"}], e.systemMusic = [{name: "拥抱光明", id: 1}, {name: "缠绵悦耳", id: 2}, {
            name: "憧憬星空",
            id: 3
        }, {name: "激进奋起", id: 4}, {name: "欢快跳跃", id: 5}, {name: "温柔浪漫", id: 6}], e.init = function () {
            e.projectId = window.location.search.substr(4), e.previewurl = "../display/preview/event?id=" + e.projectId, r.getProjectData({id: e.projectId}).then(function (t) {
                return e.allData = t, t ? 1 == t.error && "Error, No this data." == t.msg ? void alert("错误项目") : (l(function () {
                    e.loading = !1
                }, 1500), e.templateData = angular.fromJson(t.data.json ? t.data.json : t.data), e.allData.data.music && (e.projectMusic = e.allData.data.music), e.templateDataProcessing("allTemplate", e.templateData), e.chooseTemplate(0), void e.$broadcast("templateChange")) : (alert("重新登陆"), e.loading = !0, void(window.location.href = "../"))
            }, function (e) {
                console.log(e)
            }), a.getModel(function (t) {
                e.modelData = angular.fromJson(t.data.json)
            }), a.getPicCatalog(function (t) {
                e.picCatalogs = t.data
            }), e.uid = e.clone(c("Makauid")), a.getMyUploadImg({uid: e.uid, version: 1}, function (t) {
                e.myUploadingImg = t.result ? t.result.data : []
            }), document.onmousemove = function (e) {
                e || event
            }, document.ontouchmove = function (t) {
                var a = t || event;
                a.returnValue = e.system_call
            };
            var t = r.getModel({id: "HIA2AGN8"}).then(function (t) {
                if (t.data.json) {
                    e.modelOne = angular.fromJson(t.data.json);
                    for (var a in e.modelOne) e.allModel.push(e.modelOne[a])
                }
            }, function () {
            }), n = t.then(r.getModel({id: "W9CFM1IB"}).then(function (t) {
                if (t.data.json) {
                    e.modelTwo = angular.fromJson(t.data.json);
                    for (var a in e.modelTwo) e.allModel.push(e.modelTwo[a])
                }
            }, function () {
            })), o = n.then(r.getModel({id: "J6KOYV0Q"}).then(function (t) {
                if (t.data.json) {
                    e.modelThree = angular.fromJson(t.data.json);
                    for (var a in e.modelThree) e.allModel.push(e.modelThree[a])
                }
            }, function () {
            }));
            o.then(r.getModel({id: "4XGZ0LEP"}).then(function (t) {
                if (t.data.json) {
                    e.modelFour = angular.fromJson(t.data.json);
                    for (var a in e.modelFour) e.allModel.push(e.modelFour[a])
                }
            }, function () {
            }))
        }, e.changeLocked = function () {
            e.locked = !e.locked, e.selectedTemplate.lock = e.locked
        }, e.templateDataProcessing = function (t, a) {
            if ("allTemplate" == t) _.each(a, function (e) {
                e.opacity = parseInt(100 * (1 - e.opacity));
                var t = {imgData: [], textData: [], buttonData: [], shapeData: [], formData: ""};
                _.each(e.content, function (e, a) {
                    return e.opacity = parseInt(100 * (1 - e.opacity)), "pic" == e.type ? (e.key = a, void t.imgData.push(e)) : "ptext" == e.type ? (e.key = a, void t.textData.push(e)) : "btn" == e.type ? (e.key = a, void t.buttonData.push(e)) : "pshape" == e.type ? (e.key = a, void t.shapeData.push(e)) : void("eleform" == e.type && (e.key = a, t.formData = e))
                }), e.elementData = t
            }); else if ("template" == t) {
                e.isDelete || (a.opacity = parseInt(100 * (1 - a.opacity)));
                var n = {imgData: [], textData: [], buttonData: [], shapeData: [], formData: ""};
                _.each(a.content, function (e, t) {
                    return "pic" == e.type ? (e.key = t, void n.imgData.push(e)) : "ptext" == e.type ? (e.key = t, void n.textData.push(e)) : "btn" == e.type ? (e.key = t, void n.buttonData.push(e)) : "pshape" == e.type ? (e.key = t, void n.shapeData.push(e)) : void("eleform" == e.type && (e.key = t, n.formData = e))
                }), a.elementData = n
            }
            e.isDelete = !0
        }, e.addTemplateProcessing = function (e) {
            return e.opacity = parseInt(100 * (1 - e.opacity)), _.each(e.content, function (e) {
                e.opacity = parseInt(100 * (1 - e.opacity))
            }), e
        }, e.chooseMusic = function (t) {
            e.projectMusic = t, e.showMusicView = !1
        }, e.musicView = function () {
            e.showMusicView = !e.showMusicView, e.audio.pause(), e.showModelView = !1, e.showPicView = !1, e.showShapeView = !1, e.showBgColorView = !1, e.showTextColorView = !1, e.changingShape = !1, e.changingImg = !1
        }, e.chooseTemplateclass = function (t) {
            e.templateClass = t
        }, e.chooseTemplate = function (t) {
            e.selectedTemplateNum = t, m = null, e.imgData = [], e.textData = [], e.buttonData = [], e.shapeData = [], e.selectedTemplate = e.templateData[t], e.selectedTemplate.effect && (e.selectedTemplate.showeffect = O[e.selectedTemplate.effect][1]), e.selectedElement = {type: "bg"}, e.selectedTemplate.justShoweffect = "null", e.templateNum = t, e.selectedTemplate.bgpicheight = e.selectedTemplate.bgpicheight ? e.selectedTemplate.bgpicheight : "auto", e.selectedTemplate.bgpicwidth = e.selectedTemplate.bgpicwidth && "auto" != e.selectedTemplate.bgpicwidth ? e.selectedTemplate.bgpicwidth : 640, e.selectedTemplate.bgpicleft = e.selectedTemplate.bgpicleft ? e.selectedTemplate.bgpicleft : 0, e.selectedTemplate.bgpictop = e.selectedTemplate.bgpictop ? e.selectedTemplate.bgpictop : 0, e.locked = e.selectedTemplate.lock, e.isBack || e.preAddingTemplate ? (e.selectedTemplate.justShoweffect = e.selectedTemplate.showeffect, _.each(e.selectedTemplate.content, function (t, a) {
                return "pic" == t.type ? (t.key = a, void e.imgData.push(t)) : "ptext" == t.type || "text" == t.type ? (t.key = a, void e.textData.push(t)) : "btn" == t.type ? (t.key = a, void e.buttonData.push(t)) : "pshape" == t.type ? (t.key = a, void e.shapeData.push(t)) : void 0
            })) : l(function () {
                e.selectedTemplate.justShoweffect = e.selectedTemplate.showeffect, _.each(e.selectedTemplate.content, function (a, n) {
                    l(function () {
                        return e.selectedTemplateNum == t ? "pic" == a.type ? (a.key = n, void e.imgData.push(a)) : "ptext" == a.type || "text" == a.type ? (a.key = n, void e.textData.push(a)) : "btn" == a.type ? (a.key = n, void e.buttonData.push(a)) : "pshape" == a.type ? (a.key = n, void e.shapeData.push(a)) : void 0 : void 0
                    }, a.delay)
                })
            }, 10), "form" == e.selectedTemplate.type && (e.formList = e.selectedTemplate.content[e.selectedTemplate.content.length - 1], e.formList.btn_name = e.formList.btn_name || "提交"), e.isBack = !1
        }, e.$on("noRefresh", function () {
            e.isBack = !0
        }), e.chooseTemplateEffect = function () {
            e.selectedTemplate.justShoweffect = O[e.selectedTemplate.effect][1]
        }, e.preAddTemplate = function (t, a) {
            e.inAddingTemplate = !0;
            var n;
            if (e.preIdx = a, a % 2 == 0) switch (t) {
                case "allModel":
                    n = e.clone(e.allModel[a + 1]);
                    break;
                case "modelOne":
                    n = e.clone(e.modelOne[a + 1]);
                    break;
                case "modelTwo":
                    n = e.clone(e.modelTwo[a + 1]);
                    break;
                case "modelThree":
                    n = e.clone(e.modelThree[a + 1]);
                    break;
                case "modelFour":
                    n = e.clone(e.modelFour[a + 1])
            } else switch (t) {
                case "allModel":
                    n = e.clone(e.allModel[a]);
                    break;
                case "modelOne":
                    n = e.clone(e.modelOne[a]);
                    break;
                case "modelTwo":
                    n = e.clone(e.modelTwo[a]);
                    break;
                case "modelThree":
                    n = e.clone(e.modelThree[a]);
                    break;
                case "modelFour":
                    n = e.clone(e.modelFour[a])
            }
            if (n.content[n.content.length - 1].qlist && (n.type = "form", n.content[n.content.length - 1].formid = Math.floor(1e8 * Math.random()), n.content[n.content.length - 1].btn_name = "提交"), e.preAddingTemplate) e.preAddingTemplate && (e.templateData[e.selectedTemplateNum] = e.addTemplateProcessing(n), e.chooseTemplate(e.selectedTemplateNum)); else {
                e.$broadcast("templateChange"), n.lock = !0;
                var o = e.selectedTemplateNum;
                e.templateData.splice(o + 1, 0, e.addTemplateProcessing(n)), e.chooseTemplate(o + 1), e.preAddingTemplate = !0
            }
            e.templateDataProcessing("template", e.templateData[e.selectedTemplateNum])
        }, e.addTemplate = function () {
            e.showModelView = !1, e.preAddingTemplate = !1, e.inAddingTemplate = !1
        }, e.addEmptyTemplate = function () {
            var t = {
                bgpictop: "0",
                bgpicleft: "0",
                bgpicheight: "auto",
                bgpicwidth: "640",
                content: [],
                lock: !0,
                bgpic: "",
                bgcolor: "#ffffff",
                opacity: .5
            };
            if (0 == e.templateData.length) return e.templateData.push(t), void e.chooseTemplate(0);
            if (e.preAddingTemplate) e.preAddingTemplate && (e.templateData[e.selectedTemplateNum] = e.addTemplateProcessing(t), e.chooseTemplate(e.selectedTemplateNum)); else {
                e.$broadcast("templateChange");
                var a = e.selectedTemplateNum;
                e.templateData.splice(a + 1, 0, e.addTemplateProcessing(t)), e.chooseTemplate(a + 1)
            }
            e.showModelView = !1, e.preAddingTemplate = !1
        }, e.removeBgBackground = function () {
            e.$broadcast("templateChange"), e.selectedTemplate.bgpic && "" != e.selectedTemplate.bgpic && (e.selectedTemplate.bgpic = "")
        }, e.cancelAddTemplate = function () {
            e.movementBack(), e.showModelView = !1, e.preAddingTemplate = !1, e.inAddingTemplate = !1
        }, e.copyTemplate = function () {
            e.$broadcast("templateChange");
            var t = e.clone(e.templateData[e.templateNum]);
            e.templateData.splice(e.templateNum, 0, t), e.selectedTemplateNum += 1, e.chooseTemplate(e.selectedTemplateNum)
        }, e.deleteTemplate = function (t) {
            var a = s.open({
                template: '<div class="modal- body" >是否删除当前页面？</div><div class="modal-footer"><button class="btn btn-danger" ng- click="delete()">确定</button><button class="btn btn- success" ng-click="cancel()">取消</button></div>',
                controller: "ModalInstanceCtrl"
            });
            a.result.then(function () {
                return e.$broadcast("templateChange"), e.templateData.splice(t, 1), 0 == e.templateData.length ? void e.addEmptyTemplate() : (0 != t && e.chooseTemplate(t - 1), void(0 == t && e.chooseTemplate(t)))
            })
        }, e.showqr = function () {
        }, e.templateUp = function (t) {
            if (0 != t) {
                e.$broadcast("templateChange");
                var a = e.templateData.splice(t - 1, 2).reverse();
                e.templateData.splice(t - 1, 0, a[0], a[1])
            }
        }, e.templateDown = function (t) {
            if (t != e.templateData.length - 1) {
                e.$broadcast("templateChange");
                var a = e.templateData.splice(t, 2).reverse();
                e.templateData.splice(t, 0, a[0], a[1])
            }
        }, e.dataProcessing = function (t) {
            var a = {};
            return _.each(t, function (n) {
                n.opacity = (100 - n.opacity) / 100, t.elementData = "", _.each(n.content, function (t) {
                    t.opacity = (100 - t.opacity) / 100, "ptext" == t.type && (t.ftsize = parseInt(t.ftsize) + "px"), "btn" == t.type && (t.ftsize = parseInt(t.ftsize) + "px"), "pshape" != t.type || "1.svg" != t.shape && "2.svg" != t.shape || (t.shape = null), "eleform" == t.type && (a.formid = t.formid, a.title = n.content[0].con, a.fields = [], _.each(t.qlist, function (e) {
                        var t = {};
                        t.id = e.id, t.name = e.name, a.fields.push(t)
                    }), e.formdata.push(a))
                })
            }), t
        }, e.openModelView = function () {
            e.showModelView = !0
        }, e.onWhiteBgTap = function (t) {
            var a = t.target;
            "whitebg" == a.getAttribute("dataType") && (m && e.selectedElement && "bg" != e.selectedElement.type && $(m).removeClass("edit"), e.selectedElement && "bg" != e.selectedElement.type && (e.selectedElement = {type: "bg"}, m && $(m).removeClass("edit")), e.showModelView && e.cancelAddTemplate(), e.showModelView = !1, e.showPicView = !1, e.showShapeView = !1, e.showBgColorView = !1, e.showTextColorView = !1, e.borderColorView = !1, e.changingShape = !1, e.changingImg = !1, e.showMusicView = !1, e.formColorView = !1, e.audio.pause())
        }, e.cleanRightClick = function () {
            $(m).removeClass("edit")
        }, e.onPanStart = function (t) {
            if (!e.locked) {
                !m || m == t.target && m == t.target.parentNode || $(m).removeClass("edit"), m = t.target.getAttribute("dataNum") ? t.target.parentNode.parentNode : t.target.parentNode.parentNode.parentNode, $(m).addClass("edit"), T || (E = parseInt(m.style.left.substring(0, m.style.left.length - 2)), C = parseInt(m.style.top.substring(0, m.style.top.length - 2)), T = !0), e.selectedElementNum = t.target.getAttribute("dataNum") || t.target.parentNode.getAttribute("dataNum");
                var a = t.target.getAttribute("dataNum") ? t.target : t.target.parentNode;
                e.selectedElement = e.selectedTemplate.content[e.selectedElementNum];
                var n = {
                    elementData: e.clone(e.selectedElement),
                    templateNum: e.clone(e.templateNum),
                    movementType: "element"
                };
                e.movementList.push(n), a.getAttribute("dataType") && "text" == a.getAttribute("dataType") && (e.selectedElement.height = a.offsetHeight)
            }
        }, e.textOnPanStart = function (t) {
            if (!e.locked) {
                !m || m == t.target && m == t.target.parentNode || $(m).removeClass("edit");
                var a = t.target;
                if (!t.target.getAttribute("dataNum")) for (var n = 0; 10 > n && (a.getAttribute("dataNum") || (a = a.parentNode), !a.getAttribute("dataNum")); n++);
                m = a.parentNode.parentNode, $(m).addClass("edit"), e.selectedElementNum = a.getAttribute("dataNum"), e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.selectedElement.height = a.offsetHeight, T || (E = parseInt(m.style.left.substring(0, m.style.left.length - 2)), C = parseInt(m.style.top.substring(0, m.style.top.length - 2)), T = !0), e.selectedElement = e.selectedTemplate.content[e.selectedElementNum];
                var o = {
                    elementData: e.clone(e.selectedElement),
                    templateNum: e.clone(e.templateNum),
                    movementType: "element"
                };
                e.movementList.push(o)
            }
        }, e.onPan = function (t) {
            e.locked || (p = E + t.deltaX / i.bgScale, d = C + t.deltaY / i.bgScale, e.updateElement())
        }, e.updateElement = function () {
            e.selectedElement && (e.selectedElement.left = p, e.selectedElement.top = d)
        }, e.endPan = function () {
            if (T = !1, E = 0, C = 0, e.movementList && e.movementList.length > 0) {
                var t = {
                    elementData: e.clone(e.selectedElement),
                    templateNum: e.clone(e.templateNum),
                    movementType: "element"
                };
                t == e.movementList[e.movementList.length - 1] && e.movementList.pop(), e.movementList.length > 100 && e.movementList.shift()
            }
        }, e.onBlockPanStart = function () {
            var t = {
                elementData: e.clone(e.selectedElement),
                templateNum: e.clone(e.templateNum),
                movementType: "element"
            };
            e.movementList.push(t)
        }, e.onImgCornerPan = function (t) {
            if (!e.locked) {
                if (T || (E = parseInt(m.style.left.substring(0, m.style.left.length - 2)), C = parseInt(m.style.top.substring(0, m.style.top.length - 2)), f = e.selectedElement.w, h = e.selectedElement.h, w = e.selectedElement.inLeft, y = e.selectedElement.inTop, T = !0), 1 == t.target.getAttribute("num")) {
                    var a = (-t.deltaX >= -t.deltaY * (h / f) ? -t.deltaX : -t.deltaY) / i.bgScale;
                    p = E - a, d = C - a * (h / f), u = parseInt(f) + a, g = parseInt(h) + a * (h / f), v = w * (u / f), b = y * (u / f)
                } else if (2 == t.target.getAttribute("num")) {
                    var a = (t.deltaX >= -t.deltaY * (h / f) ? t.deltaX : -t.deltaY) / i.bgScale;
                    p = E, d = C - a * (h / f), u = parseInt(f) + a, g = parseInt(h) + a * (h / f), v = w * (u / f), b = y * (u / f)
                } else if (3 == t.target.getAttribute("num")) {
                    var a = (-t.deltaX >= t.deltaY * (h / f) ? -t.deltaX : t.deltaY) / i.bgScale;
                    p = E - a, d = C, u = parseInt(f) + a, g = parseInt(h) + a * (h / f), v = w * (u / f), b = y * (u / f)
                } else {
                    var a = (t.deltaX >= t.deltaY * (h / f) ? t.deltaX : t.deltaY) / i.bgScale;
                    p = E, d = C, u = parseInt(f) + a, g = parseInt(h) + a * (h / f), v = w * (u / f), b = y * (u / f)
                }
                e.imgUpdateEle()
            }
        }, e.imgUpdateEle = function () {
            e.selectedElement.left = p, e.selectedElement.top = d, e.selectedElement.inw = u / e.selectedElement.w * e.selectedElement.inw, e.selectedElement.inLeft = v, e.selectedElement.inTop = b, e.selectedElement.w = u, e.selectedElement.h = g
        }, e.onShapeCornerPan = function (t) {
            if (!e.locked) {
                if (T || (E = parseInt(m.style.left.substring(0, m.style.left.length - 2)), C = parseInt(m.style.top.substring(0, m.style.top.length - 2)), f = e.selectedElement.w, h = e.selectedElement.h, T = !0), 1 == t.target.getAttribute("num")) {
                    if (parseInt(f) + -t.deltaX / i.bgScale <= 0 || parseInt(h) + -t.deltaY / i.bgScale <= 0) return;
                    p = E - -t.deltaX / i.bgScale, d = C - -t.deltaY / i.bgScale, u = parseInt(f) + -t.deltaX / i.bgScale, g = parseInt(h) + -t.deltaY / i.bgScale
                } else if (2 == t.target.getAttribute("num")) {
                    if (parseInt(f) + t.deltaX / i.bgScale <= 0 || parseInt(h) + -t.deltaY / i.bgScale <= 0) return;
                    p = E, d = C - -t.deltaY / i.bgScale, u = parseInt(f) + t.deltaX / i.bgScale, g = parseInt(h) + -t.deltaY / i.bgScale
                } else if (3 == t.target.getAttribute("num")) {
                    if (parseInt(f) + -t.deltaX / i.bgScale <= 0 || parseInt(h) + t.deltaY / i.bgScale <= 0) return;
                    p = E - -t.deltaX / i.bgScale, d = C, u = parseInt(f) + -t.deltaX / i.bgScale, g = parseInt(h) + t.deltaY / i.bgScale
                } else {
                    if (parseInt(f) + t.deltaX / i.bgScale <= 0 || parseInt(h) + t.deltaY / i.bgScale <= 0) return;
                    p = E, d = C, u = parseInt(f) + t.deltaX / i.bgScale, g = parseInt(h) + t.deltaY / i.bgScale
                }
                e.shapeUpdateEle()
            }
        }, e.shapeUpdateEle = function () {
            e.selectedElement.left = p, e.selectedElement.top = d, e.selectedElement.w = u, e.selectedElement.h = g
        }, e.onTextPan = function (t) {
            e.locked || (T || (E = parseInt(m.style.left.substring(0, m.style.left.length - 2)), C = parseInt(m.style.top.substring(0, m.style.top.length - 2)), f = e.selectedElement.w, h = e.selectedElement.h, T = !0), "left" == t.target.getAttribute("dataType") ? (u = parseInt(f) + 2 * -t.deltaX, g = h, p = E + t.deltaX, d = C) : (u = parseInt(f) + 2 * t.deltaX, g = h, p = E - t.deltaX, d = C), e.updateEle())
        }, e.updateEle = function () {
            e.selectedElement.left = p, e.selectedElement.top = d, e.selectedElement.w = u, e.selectedElement.h = g
        }, e.onTap = function (t) {
            !m || m == t.target && m == t.target.parentNode || $(m).removeClass("edit");
            var a = t.target.getAttribute("dataNum") ? t.target : t.target.parentNode;
            m = a.parentNode.parentNode, $(m).addClass("edit"), e.selectedElementNum = a.getAttribute("dataNum"), e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], a.getAttribute("dataType") && "text" == a.getAttribute("dataType") && (e.selectedElement.height = a.offsetHeight)
        }, e.onTextTap = function (t) {
            !m || m == t.target && m == t.target.parentNode || $(m).removeClass("edit");
            var a = t.target;
            if (!t.target.getAttribute("dataNum")) for (var n = 0; 10 > n && (a.getAttribute("dataNum") || (a = a.parentNode), !a.getAttribute("dataNum")); n++);
            m = a.parentNode.parentNode, $(m).addClass("edit"), e.selectedElementNum = a.getAttribute("dataNum"), e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], a.getAttribute("dataType") && "text" == a.getAttribute("dataType") && (e.selectedElement.height = a.offsetHeight)
        }, e.onFormListTap = function (t) {
            !m || m == t.target && m == t.target.parentNode || $(m).removeClass("edit"), m = null, e.selectedElementNum = e.selectedTemplate.content.length - 1, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum]
        }, e.onPress = function (t) {
            m = t.target, e.selectedElement = e.selectedTemplate.content[m.getAttribute("dataNum")]
        }, e.onBgTap = function () {
            m && e.selectedElement && "bg" != e.selectedElement.type && $(m).removeClass("edit"), e.selectedElement && "bg" != e.selectedElement.type && (e.selectedElement = {type: "bg"}, m && $(m.parentNode.parentNode).removeClass("edit")), console.log(e.selectedTemplate)
        }, e.onBgPress = function () {
        }, e.chooseElementEffect = function (t) {
            e.selectedElement.show = t
        }, e.copyElement = function (t) {
            e.copyData = e.clone(t)
        }, e.pasteElement = function () {
            if (e.copyData) {
                var t = e.clone(e.copyData);
                switch (t.key = e.selectedTemplate.length, e.selectedTemplate.content.push(t), e.copyData.type) {
                    case "ptext":
                        e.textData.push(t);
                        break;
                    case "pic":
                        e.imgData.push(t);
                        break;
                    case "pshape":
                        e.shapeData.push(t);
                        break;
                    case "btn":
                        e.buttonData.push(t)
                }
                e.selectedElementNum = t.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.templateDataProcessing("template", e.selectedTemplate)
            }
        }, e.elementToTop = function () {
        }, e.elementToBottom = function () {
        }, e.chooseTextAlign = function (t) {
            e.selectedElement.textalign = t
        }, e.save = function () {
            if (e.templateData.length > 30) {
                var t = s.open({
                    template: '<div class="modal- body" >作品不可超过30页</div><div class="modal- footer"><button class="btn btn-primary" ng- click="ok()">确定</button>',
                    controller: "ModalInstanceCtrl"
                });
                return void t.result.then(function () {
                })
            }
            e.saving = !0;
            var a = e.clone(e.templateData), n = e.projectMusic ? {
                name: e.projectMusic.name,
                id: e.projectMusic.id
            } : null, o = {
                id: e.projectId,
                "data[json]": JSON.stringify(e.dataProcessing(a)),
                "data[music]": n,
                "data[pdata]": 2,
                uid: e.uid,
                "data[form]": e.formdata
            };
            r.saveProject({data: o}).then(function (t) {
                return console.log("res" + t), t && 0 == t.error && "Success." == t.msg ? void(e.saving = !1) : 500 == t.code ? (alert("这不是您的项目~无权限进行编辑"), void(window.location.href = "../")) : void(e.needrelogin = !0)
            }, function (e) {
                console.log(e)
            })
        }, e.preView = function () {
            if (e.templateData.length > 30) {
                var t = s.open({
                    template: '<div class="modal- body">作品不可超过30页</div><div class="modal- footer"><button class="btn btn-primary" ng- click="ok()">确定</button>',
                    controller: "ModalInstanceCtrl"
                });
                return void t.result.then(function () {
                })
            }
            e.saving = !0;
            var a = e.clone(e.templateData), n = e.projectMusic ? {
                name: e.projectMusic.name,
                id: e.projectMusic.id
            } : null, o = {
                id: e.projectId,
                "data[json]": JSON.stringify(e.dataProcessing(a)),
                "data[music]": n,
                "data[pdata]": 2,
                uid: e.uid,
                "data[form]": e.formdata
            };
            r.saveProject({data: o}).then(function (t) {
                return console.log("success+    " + t), $("#previewarea").attr("src", e.previewurl + "&_=" + Math.random()), e.saving = !1, e.previewAreashow = !0, console.log(t), t && 0 == t.error && "Success." == t.msg ? (e.saving = !1, void(e.previewAreashow = !0)) : void(e.needrelogin = !0)
            }, function (e) {
                console.log(e)
            })
        }, e.closePreview = function () {
            e.previewAreashow = !1
        }, e.reloginsucess = function () {
            e.needrelogin = !1
        }, e.chooseBorderColor = function (t) {
            e.$broadcast("templateChange"), e.selectedElement["border- color"] = t, e.borderColorView = !1
        }, e.openBorderColorView = function () {
            e.borderColorView = !e.borderColorView
        }, e.openFormColorView = function () {
            e.formColorView = !e.formColorView
        }, e.chooseFormColor = function (t) {
            e.$broadcast("templateChange"), e.formList.formcolor = t, e.formColorView = !1
        }, e.postMyForm = function (e) {
            console.log(e)
        }, e.$on("addElement", function () {
            var e = s.open({
                template: '<div class="modal-body">元素个数超过20个了哟，请尽量保持单页面元素不多于20个~</div><div class ="modal-footer"><button class="btn btn-primary" ng- click="ok()">确定</button>',
                controller: "ModalInstanceCtrl"
            });
            e.result.then(function () {
            })
        }), e.addText = function () {
            e.$broadcast("templateChange");
            var t = {
                top: 397,
                left: 124.42857142857143,
                w: "400",
                h: "100",
                rotate: "0",
                bgcolor: "rgba(25,25,25,0)",
                opacity: 0,
                type: "ptext",
                con: "请输入文本",
                show: "fadeIn",
                speed: 1e3,
                delay: "600",
                borderradius: 0,
                boxshadow: 0,
                "border-style": "none",
                "border-color": "black",
                "border-width": "0px",
                lineheight: 1.5,
                textalign: "center",
                textvalign: "middle",
                prepara: "0",
                afterpara: "0",
                ftcolor: "#F2F2F2",
                ftsize: 40,
                tl: 60,
                fontbold: !1,
                fontitalic: !1,
                udl: !1,
                height: 0
            };
            t.key = e.selectedTemplate.content.length || 0, e.selectedTemplate.bgpic || (t.ftcolor = "#909090"), e.selectedTemplate.content.push(t), e.textData.push(t), e.selectedElementNum = t.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.templateDataProcessing("template", e.selectedTemplate)
        }, e.addShape = function (t) {
            if (e.$broadcast("templateChange"), e.changingShape && "pshape" == e.selectedElement.type) return e.changingShape = !1, e.selectedElement.shape = t, e.selectedElement.borderradius = "2.svg" == t ? 40 : 0, void(e.showShapeView = !1);
            var a = {
                top: 248.57142857142856,
                left: 167.14285714285714,
                w: "300",
                h: "300",
                rotate: 0,
                opacity: 0,
                type: "pshape",
                show: "fadeIn",
                speed: 1e3,
                delay: 600,
                borderradius: 0,
                shapecolor: "#42C2B3",
                shape: "4.svg",
                height: 200
            };
            a.shape = t, a.key = e.selectedTemplate.content.length || 0, "2.svg" == t && (a.borderradius = 40), e.selectedTemplate.content.push(a), e.shapeData.push(a), e.selectedElementNum = a.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.showShapeView = !1, e.templateDataProcessing("template", e.selectedTemplate)
        }, e.changeShape = function () {
            e.changingShape = !0, e.openShapeView()
        }, e.openShapeView = function () {
            e.showShapeView = e.changingShape ? !0 : !e.showShapeView, e.showPicView = !1, e.showBgColorView = !1, e.showTextColorView = !1, e.borderColorView = !1, e.changingImg = !1, e.showMusicView = !1, e.audio.pause()
        }, e.addImg = function () {
            if (e.pic) {
                e.$broadcast("templateChange");
                var t = e.clone(e.pic), a = new Image;
                a.src = "http://7sbsoj.com2.z0.glb.qiniucdn.com/maka/app/gfile/public/pic%3fget=id/" + e.pic.id + "/thumb/100";
                var n = 100, o = 100;
                if (a.complete) {
                    if (n = a.width, o = a.height, e.changingImg && "pic" == e.selectedElement.type) return e.changingImg = !1, e.selectedElement.picid = e.pic.id, e.selectedElement.inw = n, e.locked || (e.selectedElement.w = n, e.selectedElement.h = o), void(e.showPicView = !1);
                    var l = {
                        top: 459.14285714285717,
                        left: 316.2857142857143,
                        w: 256,
                        h: 256,
                        rotate: "0",
                        opacity: "0",
                        type: "pic",
                        con: "http://img.maka.mobi/maka/app/gfile/public/pic?get=id/XCVO5BH75RS072ORVA Z6LR/thumb/100",
                        show: "fadeInNormal",
                        speed: "1000",
                        delay: "600",
                        borderradius: 0,
                        shape: 0,
                        inw: 256,
                        inh: "auto",
                        intop: 0,
                        inleft: 0,
                        picid: "XCVO5BH75RS072ORVAZ6LR",
                        stylecolor: "rgba(0,0,0,0)",
                        styleopacity: 0,
                        height: 256
                    };
                    l.picid = e.pic.id, l.inw = n, e.locked || (l.w = n, l.h = o), l.top = (1008 - o) / 2, l.left = (640 - n) / 2, l.key = e.selectedTemplate.content.length || 0, e.selectedTemplate.content.push(l), e.imgData.push(l), e.selectedElementNum = l.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.showPicView = !1, e.templateDataProcessing("template", e.selectedTemplate)
                } else a.onload = function () {
                    if (n = a.width, o = a.height, e.changingImg && "pic" == e.selectedElement.type) return e.changingImg = !1, e.selectedElement.picid = e.pic.id, e.selectedElement.inw = n, e.locked || (e.selectedElement.w = n, e.selectedElement.h = o), void(e.showPicView = !1);
                    var l = {
                        top: 459.14285714285717,
                        left: 316.2857142857143,
                        w: 256,
                        h: 256,
                        rotate: "0",
                        opacity: "0",
                        type: "pic",
                        con: "http://img.maka.mobi/maka/app/g file/public/pic?get=id/XCVO5BH75RS072ORVAZ6LR/thumb/100",
                        show: "fadeInNormal",
                        speed: "1000",
                        delay: "600",
                        borderradius: 0,
                        shape: 0,
                        inw: 256,
                        inh: "auto",
                        intop: 0,
                        inleft: 0,
                        picid: "XCVO5BH75RS072ORVAZ6LR",
                        stylecolor: "rgba(0,0,0,0)",
                        styleopacity: 0,
                        height: 256
                    };
                    l.picid = t.id, l.inw = n, e.locked || (l.w = n, l.h = o), l.top = (1008 - o) / 2, l.left = (640 - n) / 2, l.key = e.selectedTemplate.content.length || 0, e.selectedTemplate.content.push(l), e.$apply(function () {
                        e.imgData.push(l)
                    }), e.selectedElementNum = l.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.showPicView = !1, e.templateDataProcessing("template", e.selectedTemplate)
                };
                a.onerror = function () {
                }, e.showPicView = !1
            }
        }, e.dbclickAddImg = function (t) {
            e.$broadcast("templateChange");
            var a = "http://7sbsoj.com2.z0.glb.qiniucdn.com/maka/app/gfile/public/pic%3fget=id/" + t.id + "/thumb/100", n = new Image;
            n.src = a;
            var o = 100, l = 100;
            if (n.complete) {
                if (o = n.width, l = n.height, e.changingImg && "pic" == e.selectedElement.type) return e.changingImg = !1, e.selectedElement.picid = t.id, e.selectedElement.inw = o, e.locked || (e.selectedElement.w = o, e.selectedElement.h = l), void(e.showPicView = !1);
                if (e.changingBg && "bg" == e.selectedElement.type) return e.changingBg = !1, e.selectedTemplate.bgpic = a, void(e.showPicView = !1);
                var i = {
                    top: 459.14285714285717,
                    left: 316.2857142857143,
                    w: 256,
                    h: 256,
                    rotate: "0",
                    opacity: "1",
                    type: "pic",
                    con: "http:/ /img.maka.mobi/maka/app/gfile/public/pic?get=id/XCVO5BH75RS072ORVAZ6LR/thumb/1 00",
                    show: "fadeInNormal",
                    speed: "1000",
                    delay: "600",
                    borderradius: 0,
                    shape: 0,
                    inw: 256,
                    inh: "auto",
                    intop: 0,
                    inleft: 0,
                    picid: "XCVO5BH75RS072ORVAZ6LR",
                    stylecolor: "rgba(0,0,0,0)",
                    styleopacity: 0,
                    height: 256
                };
                i.picid = t.id, i.inw = o, e.locked || (i.w = o, i.h = l), i.top = (1008 - l) / 2, i.left = (640 - o) / 2, i.key = e.selectedTemplate.content.length || 0, e.selectedTemplate.content.push(i), e.imgData.push(i), e.selectedElementNum = i.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.showPicView = !1, e.templateDataProcessing("template", e.selectedTemplate)
            } else n.onload = function () {
                if (o = n.width, l = n.height, e.changingImg && "pic" == e.selectedElement.type) return e.changingImg = !1, e.selectedElement.picid = t.id, e.selectedElement.inw = o, e.locked || (e.selectedElement.w = o, e.selectedElement.h = l), void(e.showPicView = !1);
                if (e.changingBg && "bg" == e.selectedElement.type) return e.changingBg = !1, e.selectedTemplate.bgpic = a, void(e.showPicView = !1);
                var i = {
                    top: 459.14285714285717,
                    left: 316.2857142857143,
                    w: 256,
                    h: 256,
                    rotate: "0",
                    opacity: "1",
                    type: "pic",
                    con: "http://img.maka.mobi/maka/app/gfile/public/pic?get=id/XCVO5BH75RS072ORVA Z6LR/thumb/100",
                    show: "fadeInNormal",
                    speed: "1000",
                    delay: "600",
                    borderradius: 0,
                    shape: 0,
                    inw: 256,
                    inh: "auto",
                    intop: 0,
                    inleft: 0,
                    picid: "XCVO5BH75RS072ORVAZ6LR",
                    stylecolor: "rgba(0,0,0,0)",
                    styleopacity: 0,
                    height: 256
                };
                i.picid = t.id, i.inw = o, e.locked || (i.w = o, i.h = l), i.top = (1008 - l) / 2, i.left = (640 - o) / 2, i.key = e.selectedTemplate.content.length || 0, e.selectedTemplate.content.push(i), e.$apply(function () {
                    e.imgData.push(i)
                }), e.selectedElementNum = i.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.showPicView = !1, e.templateDataProcessing("template", e.selectedTemplate)
            };
            n.onerror = function () {
            }, e.showPicView = !1
        }, e.openPicView = function () {
            e.showPicView = e.changingImg ? !0 : !e.showPicView, e.showShapeView = !1, e.showBgColorView = !1, e.showTextColorView = !1, e.borderColorView = !1, e.changingShape = !1, e.showMusicView = !1, e.audio.pause()
        }, e.changeImg = function () {
            e.changingImg = !0, e.openPicView()
        }, e.changeBg = function () {
            e.changingBg = !0, e.openPicView()
        }, e.addButton = function () {
            e.$broadcast("templateChange");
            var t = {
                top: 840.5714285714286,
                left: 222.42857142857142,
                w: "220",
                h: "80",
                rotate: "0",
                ftcolor: "#585858",
                bgcolor: "rgba(255,255,255,1)",
                opacity: "20",
                type: "btn",
                con: "<div>按钮</div>",
                ftsize: 40,
                show: "fadeIn",
                speed: "1000",
                delay: "600",
                borderradius: "30",
                boxshadow: 16,
                "border-style": "solid",
                "border-color": "black",
                "border-width": "0px",
                udl: !1,
                lineheight: 2,
                textalign: "center",
                textvalign: "middle",
                prepara: "0",
                afterpara: "0",
                url: "www.maka.im",
                tl: 80,
                height: 60
            };
            t.key = e.selectedTemplate.content.length || 0, e.selectedTemplate.content.push(t), e.buttonData.push(t), e.selectedElementNum = t.key, e.selectedElement = e.selectedTemplate.content[e.selectedElementNum], e.templateDataProcessing("template", e.selectedTemplate)
        }, e.setBgImg = function () {
            if (e.pic) {
                e.$broadcast("templateChange");
                var t = "http://7sbsoj.com2.z0.glb.qiniucdn.com/maka/app/gfile/public/pic%3fget=id/" + e.pic.id + "/thumb/100";
                e.selectedTemplate.bgpic = t, e.showPicView = !1
            }
        }, e.openTextColorPanel = function () {
            e.showTextColorView = !e.showTextColorView
        }, e.openBgColorPanel = function () {
            e.showBgColorView = !e.showBgColorView
        }, e.chooseBgColor = function (t) {
            "bg" != e.selectedElement.type && "pshape" != e.selectedElement.type ? e.selectedElement.bgcolor = t : "bg" == e.selectedElement.type ? (e.selectedTemplate.bgcolor = t, e.selectedTemplate.opacity <= 20 && (e.selectedTemplate.opacity = 30)) : "pshape" == e.selectedElement.type && (e.selectedElement.shapecolor = t), e.showBgColorView = !1
        }, e.chooseTextColor = function (t) {
            e.selectedElement.ftcolor = t, e.showTextColorView = !e.showTextColorView
        }, e.choosePicCatalog = function (t) {
            return "mine" == t ? void(e.selectedCatalog = {name: t}) : (e.selectedCatalog = e.picCatalogs[t], void e.getPicByCatalog(e.selectedCatalog.id, e.selectedCatalog.tag[0]))
        }, e.choosePic = function (t) {
            e.pic = t
        }, e.getPicByCatalog = function (t, n) {
            e.selectedTag = n, e.picData = [], a.getPicByCatalog({category: t, tag: n}, function (t) {
                e.picData = t.data
            })
        }, e.$watch("showPicView", function () {
            0 == e.showPicView && (e.pic = null)
        }, !0), e.$watch("selectedElement ['border-style']", function (t) {
            t && "ptext" == e.selectedElement.type && 0 == e.selectedElement["border-width"] && (e.selectedElement["border-width"] = 2)
        }), e.movementBack = function () {
            if (0 == e.movementList.length) return void console.log("no movement");
            m && $(m)[0].className.indexOf("edit") > 0 && $(m).removeClass("edit");
            var t = e.movementList.pop();
            e.$broadcast("noRefresh"), "element" == t.movementType ? (e.templateData[t.templateNum].content[t.elementData.key] = t.elementData, e.chooseTemplate(t.templateNum), e.selectedElement = e.selectedTemplate.content[t.elementData.key]) : "template" == t.movementType && (e.templateData = t.templateData, e.chooseTemplate(t.templateNum))
        }, e.deleteElement = function () {
            console.log("111")
        }, e.sortableOptions = {
            update: function () {
                e.$broadcast("templateChange")
            }, containment: "parent", scroll: !0, scrollSensitivity: -20
        }, e.$on("templateChange", function () {
            var t = {
                templateData: e.clone(e.templateData),
                templateNum: e.clone(e.templateNum),
                movementType: "template"
            };
            e.movementList.push(t), e.movementList.length > 100 && e.movementList.shift()
        }), e.clone = function (e) {
            var t;
            if (e instanceof Array) {
                t = [];
                for (var a = e.length; a--;) t[a] = arguments.callee(e[a]);
                return t
            }
            if ("function" == typeof e) return e;
            if (e instanceof Object) {
                t = {};
                for (var n in e) t[n] = arguments.callee(e[n]);
                return t
            }
            return e
        };
        var L = e.musicUploader = new o({
            url: "http://music.maka.im/maka/app/gfile/public/music/upload",
            formData: [{uid: c("Makauid")}],
            method: "post",
            autoUpload: !0
        });
        L.filters.push({
            name: "musicFilter", fn: function (t) {
                var a = "|" + t.type.slice(t.type.lastIndexOf("/") + 1) + "|";
                return t.size >= 2097152 && (e.uploadError = "文件太大啦亲，音乐文件不能大于2M哦"), -1 == "|mp3|wma|m4a|".indexOf(a) && (e.uploadError = "文件格式错误啦亲"), -1 !== "|mp3|wma|m4a|".indexOf(a) && t.size <= 2097152
            }
        }), L.onSuccessItem = function (t, a) {
            var n = ("http://resource.maka.im/get?music=id/" + a.id + "/thumb/100", a.name.indexOf(".")), o = {
                id: a.id,
                name: a.name.substr(0, n)
            };
            e.projectMusic = o, e.showMusicView = !1
        }, L.onWhenAddingFileFailed = function () {
            e.uploadErrorMsg()
        };
        var F = e.imgUploader = new o({
            url: "http://img.maka.im/maka/app/gfile/public/p/upload",
            formData: [{uid: c("Makauid")}],
            method: "post",
            autoUpload: !0
        });
        F.filters.push({
            name: "imageFilter", fn: function (t) {
                var a = "|" + t.type.slice(t.type.lastIndexOf("/") + 1) + "|";
                return t.size >= 2097152 && (e.uploadError = "文件太大啦亲，图片文件不能大于2M哦"), -1 == "|jpg|png|jpeg|bmp|gif|".indexOf(a) && (e.uploadError = "文件格式错误啦亲"), -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf(a) && t.size <= 2097152
            }
        }), F.onSuccessItem = function (t, a) {
            var n = {id: a.id, name: a.filename};
            e.myUploadingImg.unshift(n), e.imgUploading = !1
        }, F.onProgressItem = function (t, a) {
            e.imgUploading = !0, e.imgUploadProgress = a
        }, F.onWhenAddingFileFailed = function () {
            e.uploadErrorMsg()
        }, e.uploadErrorMsg = function () {
            var t = s.open({
                template: '<div class="modal-body" >' + e.uploadError + '</div><div class="modal- footer"><button class="btn btn- primary" ng- click="ok()">确定</button>',
                controller: "ModalInstanceCtrl"
            });
            t.result.then(function () {
            })
        }, e.help = !1, e.showHelp = function () {
            e.help = !e.help
        }
    }]), e.controller("ModalInstanceCtrl", ["$scope", "$modalInstance", function (e, t) {
        e.ok = function () {
            t.close()
        }, e["delete"] = function () {
            t.close(!0)
        }, e.cancel = function () {
            t.dismiss()
        }
    }]), e.filter("addpx", function () {
        return function (e) {
            return "auto" == e ? "auto" : parseInt(e) + "px"
        }
    }), e.filter("addrotate", function () {
        return function (e) {
            return parseInt(e) + "deg"
        }
    }), e.filter("editlayer", function () {
        return function (e) {
            return parseInt(e - 25) + "px"
        }
    }), e.filter("texteditlayertop", function () {
        return function (e) {
            return parseInt(e / 2) + "px"
        }
    }), e.filter("texteditlayerleft", function () {
        return function (e) {
            return parseInt(e - 10) + "px"
        }
    }), e.filter("picurl", function () {
        return function (e) {
            var t = "http://7sbsoj.com2.z0.glb.qiniucdn.com/maka/app/gfile/public/pic%3fget=id/" + e + "/thumb/100";
            return t
        }
    }), e.filter("imgurl", function () {
        return function (e) {
            var t = "http://7sbsoj.com2.z0.glb.qiniucdn.com/maka/app/gfile/public/pic%3fget=id/" + e + "/thumb/100";
            return t
        }
    }), e.filter("opacity", function () {
        return function (e) {
            var t = (100 - e) / 100;
            return t
        }
    }), e.filter("center", ["$rootScope", function (e) {
        return function (t) {
            return t * e.bgScale
        }
    }]), e.filter("fontbold", function () {
        return function (e) {
            var t = e ? "bold" : "normal";
            return t
        }
    }), e.filter("fontitalic", function () {
        return function (e) {
            var t = e ? "italic" : "normal";
            return t
        }
    }), e.filter("underline", function () {
        return function (e) {
            var t = e ? "underline" : "none";
            return t
        }
    }), e.filter("speed", function () {
        return function (e) {
            return e ? 300 + parseInt(e) : 300
        }
    }), e.filter("tagName", function () {
        return function (e) {
            return "__OTHER__" == e ? "其他" : e
        }
    }), e.filter("shapeurl", function () {
        return function (e) {
            return "1.svg" == e || "2.svg" == e ? null : 0 != e ? "url(http://card.maka.im/mobile/res/shape/" + e + ")" : null
        }
    }), e.filter("uploadimgurl", function () {
        return function (e) {
            var t = "http://img.maka.mobi/maka/app/gfile/public/pic?get=id/" + e + "/thumb/100";
            return t
        }
    }), e.filter("codeToHtml", ["$sce", function (e) {
        return function (t) {
            return e.trustAsHtml(t)
        }
    }]), e.directive("onWindowResize", ["$window", "$rootScope", function (e, t) {
        return {
            link: function (a) {
                $(e).on("resize", function () {
                    {
                        var n = e.innerHeight;
                        e.innerWidth
                    }
                    a.$apply(function () {
                        t.bgScale = window.innerHeight / 1008 * .7, t.rightHeight = n - 50
                    })
                })
            }
        }
    }]), e.directive("ngWechat", function () {
        return {
            link: function (e, t) {
                $(t).on("click", function () {
                    console.log("111"), $(t).popover({
                        html: !0,
                        content: $("#ds-wechat").html(),
                        trigger: "click",
                        placement: "left"
                    })
                })
            }
        }
    }), e.directive("ngPx", function () {
        return {
            require: "?ngModel", link: function (e, t, a, n) {
                n.$render = function () {
                    return n.$modelValue ? void(t[0].value = parseInt(n.$modelValue) + "px") : void(t[0].value = "0px")
                }, t.bind("blur", function (t) {
                    var a = t.target;
                    if (a.value = n.$modelValue ? a.value + "px" : "0px", e.$parent.movementList && e.$parent.movementList.length > 0) {
                        var o = {
                            elementData: e.$parent.clone(e.$parent.selectedElement),
                            templateNum: e.$parent.clone(e.$parent.templateNum),
                            movementType: "element"
                        };
                        o == e.$parent.movementList[e.$parent.movementList.length - 1] && e.$parent.movementList.pop()
                    }
                }), t.bind("focusin", function (t) {
                    var a = t.target;
                    a.value = parseInt(a.value);
                    var n = {
                        elementData: e.$parent.clone(e.$parent.selectedElement),
                        templateNum: e.$parent.clone(e.$parent.templateNum),
                        movementType: "element"
                    };
                    e.$parent.movementList.push(n)
                })
            }
        }
    }), e.directive("ngPercent", function () {
        return {
            require: "?ngModel", link: function (e, t, a, n) {
                n.$render = function () {
                    return n.$modelValue ? void(t[0].value = parseInt(n.$modelValue) + "%") : (t[0].value = "0%", void(e.$parent.selectedElement.opacity = 0))
                }, t.bind("blur", function (t) {
                    var a = t.target;
                    if (a.value = n.$modelValue ? a.value + "%" : "0%", e.$parent.movementList && e.$parent.movementList.length > 0) {
                        var o = {
                            elementData: e.$parent.clone(e.$parent.selectedElement),
                            templateNum: e.$parent.clone(e.$parent.templateNum),
                            movementType: "element"
                        };
                        o == e.$parent.movementList[e.$parent.movementList.length - 1] && e.$parent.movementList.pop()
                    }
                }), t.bind("focusin", function (t) {
                    var a = t.target;
                    a.value = parseInt(a.value);
                    var n = {
                        elementData: e.$parent.clone(e.$parent.selectedElement),
                        templateNum: e.$parent.clone(e.$parent.templateNum),
                        movementType: "element"
                    };
                    e.$parent.movementList.push(n)
                })
            }
        }
    }), e.directive("ngRotate", function () {
        return {
            require: "?ngModel", link: function (e, t, a, n) {
                n.$render = function () {
                    return n.$modelValue ? void(t[0].value = parseInt(n.$modelValue) + "度") : (t[0].value = "0度", void(e.$parent.selectedElement.rotate = 0))
                }, t.bind("blur", function (t) {
                    var a = t.target;
                    if (a.value = n.$modelValue ? a.value + "度" : "0度", e.$parent.movementList && e.$parent.movementList.length > 0) {
                        var o = {
                            elementData: e.$parent.clone(e.$parent.selectedElement),
                            templateNum: e.$parent.clone(e.$parent.templateNum),
                            movementType: "element"
                        };
                        o == e.$parent.movementList[e.$parent.movementList.length - 1] && e.$parent.movementList.pop()
                    }
                }), t.bind("focusin", function (t) {
                    var a = t.target;
                    a.value = parseInt(a.value);
                    var n = {
                        elementData: e.$parent.clone(e.$parent.selectedElement),
                        templateNum: e.$parent.clone(e.$parent.templateNum),
                        movementType: "element"
                    };
                    e.$parent.movementList.push(n)
                })
            }
        }
    }), e.directive("ngSecond", function () {
        return {
            require: "?ngModel", link: function (e, t, a, n) {
                n.$render = function () {
                    return n.$modelValue ? void(t[0].value = parseInt(n.$modelValue) + "ms") : void(t[0].value = "0ms")
                }, t.bind("blur", function (e) {
                    var t = e.target;
                    t.value = n.$modelValue ? t.value + "ms" : "0ms"
                }), t.bind("focusin", function (e) {
                    var t = e.target;
                    t.value = parseInt(t.value)
                })
            }
        }
    }), e.directive("nicescroll", function () {
        return {
            link: function (e, t) {
                $(t).niceScroll({cursorcolor: "#a3a3a3", cursorwidth: "10px", horizrailenabled: !1}).resize()
            }
        }
    }), e.directive("ngBgrightclick", function () {
        return function (e, t) {
            $(t).contextMenu("myMenu2", {
                bindings: {
                    paste: function () {
                        e.$apply(function () {
                            e.$parent.pasteElement()
                        })
                    }
                }
            })
        }
    }), e.directive("ngRightClick", function () {
        return function (e, t) {
            $(t).contextMenu("myMenu1", {
                bindings: {
                    copy: function (t) {
                        var a = t.getAttribute("dataNum");
                        e.$apply(function () {
                            e.$parent.copyElement(e.$parent.selectedTemplate.content[a])
                        })
                    }, up: function (t) {
                        var a = t.getAttribute("dataNum");
                        a != e.$parent.selectedTemplate.content.length - 1 && e.$apply(function () {
                            e.$emit("templateChange");
                            var t = e.$parent.selectedTemplate.content.splice(a, 2).reverse();
                            e.$parent.selectedTemplate.content.splice(a, 0, t[0], t[1]), e.$emit("noRefresh"), e.$parent.cleanRightClick(), e.$parent.templateDataProcessing("template", e.$parent.selectedTemplate), e.$parent.chooseTemplate(e.$parent.selectedTemplateNum)
                        })
                    }, down: function (t) {
                        var a = t.getAttribute("dataNum");
                        0 != a && e.$apply(function () {
                            e.$emit("templateChange");
                            var t = e.$parent.selectedTemplate.content.splice(a - 1, 2).reverse();
                            e.$parent.selectedTemplate.content.splice(a - 1, 0, t[0], t[1]), e.$emit("noRefresh"), e.$parent.cleanRightClick(), e.$parent.templateDataProcessing("template", e.$parent.selectedTemplate), e.$parent.chooseTemplate(e.$parent.selectedTemplateNum)
                        })
                    }, top: function (t) {
                        var a = t.getAttribute("dataNum");
                        a != e.$parent.selectedTemplate.content.length - 1 && e.$apply(function () {
                            e.$emit("templateChange");
                            var t = e.$parent.selectedTemplate.content.splice(a, 1);
                            e.$parent.selectedTemplate.content.push(t[0]), e.$emit("noRefresh"), e.$parent.cleanRightClick("top"), e.$parent.templateDataProcessing("template", e.$parent.selectedTemplate), e.$parent.chooseTemplate(e.$parent.selectedTemplateNum)
                        })
                    }, bottom: function (t) {
                        var a = t.getAttribute("dataNum");
                        0 != a && e.$apply(function () {
                            e.$emit("templateChange");
                            var t = e.$parent.selectedTemplate.content.splice(a, 1);
                            e.$parent.selectedTemplate.content.unshift(t[0]), e.$emit("noRefresh"), e.$parent.cleanRightClick("bottom"), e.$parent.templateDataProcessing("template", e.$parent.selectedTemplate), e.$parent.chooseTemplate(e.$parent.selectedTemplateNum)
                        })
                    }, "delete": function (t) {
                        var a = t.getAttribute("dataNum");
                        e.$apply(function () {
                            e.$emit("templateChange"), e.$parent.selectedTemplate.content.splice(a, 1), e.$emit("noRefresh"), e.$parent.isDelete = !0, e.$parent.templateDataProcessing("template", e.$parent.selectedTemplate), e.$parent.chooseTemplate(e.$parent.selectedTemplateNum)
                        })
                    }
                }
            })
        }
    }), e.directive("ngKeyup", ["$document", function (e) {
        return {
            restrict: "A", link: function (t) {
                e.on("keyup", function (e) {
                    t.$apply(function () {
                        if (46 == e.keyCode && "bg" != t.selectedElement.type) {
                            t.$broadcast("templateChange");
                            var a = t.selectedElement.key;
                            t.selectedTemplate.content.splice(a, 1), t.$emit("noRefresh"), t.isDelete = !0, t.templateDataProcessing("template", t.selectedTemplate), t.chooseTemplate(t.selectedTemplateNum)
                        }
                    })
                })
            }
        }
    }]), e.directive("ngMusic", function () {
        return {
            restrict: "A", link: function (e, t) {
                var a;
                $(t).on("click", function (t) {
                    if (-1 != $(t.target)[0].className.indexOf("play")) {
                        a && a.getAttribute("num") != t.target.getAttribute("num") && ($(a).removeClass("fa-pause"), $(a).addClass("fa-play")), a = t.target, $(a).removeClass("fa- play"), $(a).addClass("fa-pause");
                        var n = a.getAttribute("num"), o = "http://123.57.81.60/music?id=id/" + n;
                        e.$parent.audio.src = o, e.$parent.audio.play()
                    } else $(a).removeClass("fa- pause"), $(a).addClass("fa-play"), e.$parent.audio.pause()
                })
            }
        }
    }), e.directive("slider", function () {
        return {
            restrict: "A", link: function (e, t, a) {
                if ("rotate_slider" == a.type) {
                    var n = !1;
                    $(t).slider({
                        min: 0, max: 360, slide: function (t, a) {
                            e.$apply(function () {
                                e.$parent.selectedElement.rotate = a.value, n = !0
                            })
                        }, stop: function () {
                            n = !1
                        }, value: e.$parent.selectedElement.rotate
                    }), a.$observe("value", function (e) {
                        $(t).slider("value", e)
                    })
                } else if ("opacity_slider" == a.type) {
                    var n = !1;
                    $(t).slider({
                        min: 0,
                        max: 100,
                        slide: function (t, a) {
                            e.$apply(function () {
                                "bg" != e.$parent.selectedElement.type ? e.$parent.selectedElement.opacity = a.value : "bg" == e.$parent.selectedElement.type && (e.$parent.selectedTemplate.opacity = a.value), n = !0
                            })
                        },
                        stop: function () {
                            n = !1
                        },
                        value: "bg" == e.$parent.selectedElement.type ? e.$parent.selectedTemplate.opacity : e.$parent.selectedElement.opacity
                    }), a.$observe("value", function (e) {
                        $(t).slider("value", e)
                    })
                } else if ("shadow_slider" == a.type) {
                    var n = !1;
                    $(t).slider({
                        min: -1, max: 100, slide: function (t, a) {
                            e.$apply(function () {
                                e.$parent.selectedElement.boxshadow = a.value, n = !0
                            })
                        }, stop: function () {
                            n = !1
                        }, value: e.$parent.selectedElement.boxshadow
                    }), a.$observe("value", function (e) {
                        $(t).slider("value", e)
                    })
                } else if ("borderradius_slider" == a.type) {
                    var n = !1;
                    $(t).slider({
                        min: 0, max: 100, slide: function (t, a) {
                            e.$apply(function () {
                                e.$parent.selectedElement.borderradius = a.value, n = !0
                            })
                        }, stop: function () {
                            n = !1
                        }, value: e.$parent.selectedElement.borderradius
                    }), a.$observe("value", function (e) {
                        $(t).slider("value", e)
                    })
                } else if ("speed_slider" == a.type) {
                    var n = !1;
                    $(t).slider({
                        min: 0, max: 1e4, slide: function () {
                        }, stop: function (t, a) {
                            e.$apply(function () {
                                e.$parent.selectedElement.speed = a.value, n = !1
                            })
                        }, value: e.$parent.selectedElement.speed
                    }), a.$observe("value", function (e) {
                        $(t).slider("value", e)
                    })
                } else if ("delay_slider" == a.type) {
                    var n = !1;
                    $(t).slider({
                        min: 0, max: 1e4, slide: function () {
                        }, stop: function (t, a) {
                            e.$apply(function () {
                                e.$parent.selectedElement.delay = a.value, n = !1
                            })
                        }, value: e.$parent.selectedElement.delay
                    }), a.$observe("value", function (e) {
                        $(t).slider("value", e)
                    })
                }
            }
        }
    }), e.directive("imgJcrop", function () {
        return {
            restrict: "A",
            template: '<div><div style="border:dashed 2px rgba(57,187,170,1)""><img src="{{src}}"id="picImg"></div><div class="jcroplist" style="position: relative"><span>自由</ span><span>正方形</span><span>4:3</span><span>3:4</span><span>16:9</span></div></ div>',
            replace: !0,
            link: function (e, t, a) {
                function n(t) {
                    if (e.$parent.locked) {
                        m = e.$parent.selectedElement.w, u = e.$parent.selectedElement.h;
                        var a = m / (t.w / i), n = u / (t.h / r);
                        e.$apply(function () {
                            e.$parent.selectedElement.inw = a, e.$parent.selectedElement.inh = n, e.$parent.selectedElement.inleft = -(a * (t.x / i)), e.$parent.selectedElement.intop = -(n * (t.y / r))
                        })
                    } else e.$apply(function () {
                        e.$parent.selectedElement.w = t.w, e.$parent.selectedElement.h = t.h, e.$parent.selectedElement.inw = i, e.$parent.selectedElement.inh = r, e.$parent.selectedElement.inleft = -t.x, e.$parent.selectedElement.intop = -t.y
                    })
                }

                function o() {
                    if (e.$parent.locked) {
                        if (g.aspectRatio == e.$parent.selectedElement.w / e.$parent.selectedElement.h) return;
                        g.aspectRatio = e.$parent.selectedElement.w / e.$parent.selectedElement.h, l.setOptions(g)
                    }
                }

                e.src = a.value;
                var l, i, r, s, c = 0, p = 0, d = e.$parent.selectedElement.w / e.$parent.selectedElement.h, m = e.$parent.selectedElement.w, u = e.$parent.selectedElement.h, g = {
                    aspectRatio: 0,
                    boxWidth: 240,
                    boxHeight: 240,
                    onChange: n,
                    onSelect: o,
                    bgColor: "rgba(0,0,0,0.1)"
                };
                $("#picImg").Jcrop(g, function () {
                    l = this, i = l.getBounds()[0], r = l.getBounds()[1]
                }), a.$observe("value", function (e) {
                    l && l.setImage(e, function () {
                        i = l.getBounds()[0], r = l.getBounds()[1]
                    })
                }), $(".jcroplist span").on("click", function (t) {
                    if (e.$parent.locked) return g.aspectRatio = e.$parent.selectedElement.w / e.$parent.selectedElement.h, void l.setOptions(g);
                    var a = t.target.innerHTML;
                    return "自由" == a ? ($(s).removeClass("proportionselected"), d = 0, g.aspectRatio = d, l.setOptions(g), l.animateTo([c, p, c + i, p + r]), s = t.target, void $(s).addClass("proportionselected")) : "正方形" == a ? ($(s).removeClass("proportionselected"), d = 1, g.aspectRatio = d, l.setOptions(g), l.animateTo(i == r ? [c, p, c + i, p + r] : i > r ? [c, p, c + r, p + r] : [c, p, c + i, p + i]), s = t.target, void $(s).addClass("proportionselected")) : "4:3" == a ? ($(s).removeClass("proportionselected"), d = 4 / 3, l.animateTo(i > r * d ? [c, p, c + r * d, p + r] : r * d > i ? [c, p, c + i, p + i / d] : [c, p, c + i, p + r]), g.aspectRatio = d, l.setOptions(g), s = t.target, void $(s).addClass("proportionselected")) : "3:4" == a ? ($(s).removeClass("proportionselected"), d = .75, l.animateTo(i > r * d ? [c, p, c + r * d, p + r] : r * d > i ? [c, p, c + i, p + i / d] : [c, p, c + i, p + r]), g.aspectRatio = d, l.setOptions(g), s = t.target, void $(s).addClass("proportionselected")) : "16:9" == a ? ($(s).removeClass("proportionselected"), d = 16 / 9, l.animateTo(i > r * d ? [c, p, c + r * d, p + r] : r * d > i ? [c, p, c + i, p + i / d] : [c, p, c + i, p + r]), g.aspectRatio = d, l.setOptions(g), s = t.target, void $(s).addClass("proportionselected")) : void 0
                })
            }
        }
    }), e.directive("bgJcrop", function () {
        return {
            restrict: "A",
            template: '<div><div  style="border:dashed 2px rgba(57,187,170,1)"><img src="{{src}}" id="bgImg"></div></div>',
            replace: !0,
            link: function (e, t, a) {
                function n(t) {
                    var a = 640 / (t.w / l), n = 1008 / (t.h / i);
                    e.$apply(function () {
                        e.$parent.selectedTemplate.bgpicwidth = a, e.$parent.selectedTemplate.bgpicheight = n, e.$parent.selectedTemplate.bgpicleft = -(a * (t.x / l)), e.$parent.selectedTemplate.bgpictop = -(n * (t.y / i))
                    })
                }

                e.src = a.value;
                var o, l, i, r = 640 / 1008, s = {
                    aspectRatio: r,
                    boxWidth: 240,
                    boxHeight: 240,
                    onChange: n,
                    onSelect: n,
                    bgColor: "rgba(0,0,0,0.1)"
                };
                a.$observe("value", function (e) {
                    o && o.setImage(e, function () {
                        l = o.getBounds()[0], i = o.getBounds()[1]
                    })
                }), $("#bgImg").Jcrop(s, function () {
                    o = this, l = o.getBounds()[0], i = o.getBounds()[1]
                })
            }
        }
    }), e.directive("ngThumb", ["$window", function (e) {
        var t = {
            support: !(!e.FileReader || !e.CanvasRenderingContext2D), isFile: function (t) {
                return angular.isObject(t) && t instanceof e.File
            }, isImage: function (e) {
                var t = "|" + e.type.slice(e.type.lastIndexOf("/") + 1) + "|";
                return -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf(t)
            }
        };
        return {
            restrict: "A", template: "<canvas/>", link: function (e, a, n) {
                function o(e) {
                    var t = new Image;
                    t.onload = l, t.src = e.target.result
                }

                function l() {
                    var e = i.width || this.width / this.height * i.height, t = i.height || this.height / this.width * i.width;
                    r.attr({width: e, height: t}), r[0].getContext("2d").drawImage(this, 0, 0, e, t)
                }

                if (t.support) {
                    var i = e.$eval(n.ngThumb);
                    if (t.isFile(i.file) && t.isImage(i.file)) {
                        var r = a.find("canvas"), s = new FileReader;
                        s.onload = o, s.readAsDataURL(i.file)
                    }
                }
            }
        }
    }])
}());
angular.module("ui.sortable", []).value("uiSortableConfig", {}).directive("uiSortable", ["uiSortableConfig", "$timeout", "$log", function (e, t, a) {
    return {
        require: "?ngModel", scope: {ngModel: "=", uiSortable: "="}, link: function (n, o, l, i) {
            function r(e, t) {
                return t && "function" == typeof t ? function () {
                    e.apply(this, arguments), t.apply(this, arguments)
                } : e
            }

            function s(e) {
                var t = e.data("ui-sortable");
                return t && "object" == typeof t && "ui-sortable" === t.widgetFullName ? t : null
            }

            function c(e, t) {
                var a = e.sortable("option", "helper");
                return "clone" === a || "function" == typeof a && t.item.sortable.isCustomHelperUsed()
            }

            function p(e) {
                return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
            }

            function d(e, t) {
                for (var a = null, n = 0; n < e.length; n++) {
                    var o = e[n];
                    if (o.element[0] === t[0]) {
                        a = o.scope;
                        break
                    }
                }
                return a
            }

            function m(e, t) {
                t.item.sortable._destroy()
            }

            var u, g = {}, f = {"ui-floating": void 0}, h = {
                receive: null,
                remove: null,
                start: null,
                stop: null,
                update: null
            }, v = {helper: null};
            return angular.extend(g, f, e, n.uiSortable), angular.element.fn && angular.element.fn.jquery ? (i ? (n.$watch("ngModel.length", function () {
                t(function () {
                    s(o) && o.sortable("refresh")
                }, 0, !1)
            }), h.start = function (e, t) {
                if ("auto" === g["ui-floating"]) {
                    var a = t.item.siblings(), n = s(angular.element(e.target));
                    n.floating = p(a)
                }
                t.item.sortable = {
                    model: i.$modelValue[t.item.index()],
                    index: t.item.index(),
                    source: t.item.parent(),
                    sourceModel: i.$modelValue,
                    cancel: function () {
                        t.item.sortable._isCanceled = !0
                    },
                    isCanceled: function () {
                        return t.item.sortable._isCanceled
                    },
                    isCustomHelperUsed: function () {
                        return !!t.item.sortable._isCustomHelperUsed
                    },
                    _isCanceled: !1,
                    _isCustomHelperUsed: t.item.sortable._isCustomHelperUsed,
                    _destroy: function () {
                        angular.forEach(t.item.sortable, function (e, a) {
                            t.item.sortable[a] = void 0
                        })
                    }
                }
            }, h.activate = function (e, t) {
                u = o.contents();
                var a = o.sortable("option", "placeholder");
                if (a && a.element && "function" == typeof a.element) {
                    var l = a.element();
                    l = angular.element(l);
                    var i = o.find('[class="' + l.attr("class") + '"]:not([ng-repeat], [data-ng-repeat])');
                    u = u.not(i)
                }
                var r = t.item.sortable._connectedSortables || [];
                r.push({element: o, scope: n}), t.item.sortable._connectedSortables = r
            }, h.update = function (e, t) {
                if (!t.item.sortable.received) {
                    t.item.sortable.dropindex = t.item.index();
                    var a = t.item.parent();
                    t.item.sortable.droptarget = a;
                    var l = d(t.item.sortable._connectedSortables, a);
                    t.item.sortable.droptargetModel = l.ngModel, o.sortable("cancel")
                }
                c(o, t) && !t.item.sortable.received && "parent" === o.sortable("option", "appendTo") && (u = u.not(u.last())), u.appendTo(o), t.item.sortable.received && (u = null), t.item.sortable.received && !t.item.sortable.isCanceled() && n.$apply(function () {
                    i.$modelValue.splice(t.item.sortable.dropindex, 0, t.item.sortable.moved)
                })
            }, h.stop = function (e, t) {
                !t.item.sortable.received && "dropindex" in t.item.sortable && !t.item.sortable.isCanceled() ? n.$apply(function () {
                    i.$modelValue.splice(t.item.sortable.dropindex, 0, i.$modelValue.splice(t.item.sortable.index, 1)[0])
                }) : "dropindex" in t.item.sortable && !t.item.sortable.isCanceled() || c(o, t) || u.appendTo(o), u = null
            }, h.receive = function (e, t) {
                t.item.sortable.received = !0
            }, h.remove = function (e, t) {
                "dropindex" in t.item.sortable || (o.sortable("cancel"), t.item.sortable.cancel()), t.item.sortable.isCanceled() || n.$apply(function () {
                    t.item.sortable.moved = i.$modelValue.splice(t.item.sortable.index, 1)[0]
                })
            }, v.helper = function (e) {
                return e && "function" == typeof e ? function (t, a) {
                    var n = e.apply(this, arguments);
                    return a.sortable._isCustomHelperUsed = a !== n, n
                } : e
            }, n.$watch("uiSortable", function (e) {
                var t = s(o);
                t && angular.forEach(e, function (e, a) {
                    return a in f ? ("ui-floating" !== a || e !== !1 && e !== !0 || (t.floating = e), void(g[a] = e)) : (h[a] ? ("stop" === a && (e = r(e, function () {
                        n.$apply()
                    }), e = r(e, m)), e = r(h[a], e)) : v[a] && (e = v[a](e)), g[a] = e, void o.sortable("option", a, e))
                })
            }, !0), angular.forEach(h, function (e, t) {
                g[t] = r(e, g[t]), "stop" === t && (g[t] = r(g[t], m))
            })) : a.info("ui.sortable: ngModel not provided!", o), void o.sortable(g)) : void a.error("ui.sortable: jQuery should be included before AngularJS!")
        }
    }
}]), function (e) {
    function t(t, s, c) {
        var p = i[t];
        l = e("#" + p.id).find("ul:first").clone(!0), l.css(p.menuStyle).find("li").css(p.itemStyle).hover(function () {
            e(this).css(p.itemHoverStyle)
        }, function () {
            e(this).css(p.itemStyle)
        }).find("img").css({
            verticalAlign: "middle",
            paddingRight: "2px"
        }), n.html(l), p.onShowMenu && (n = p.onShowMenu(c, n)), e.each(p.bindings, function (t, o) {
            e("#" + t, n).bind("click", function () {
                a(), o(s, r)
            })
        }), n.css({left: c[p.eventPosX], top: c[p.eventPosY]}).show(), p.shadow && o.css({
            width: n.width(),
            height: n.height(),
            left: c.pageX + 2,
            top: c.pageY + 2
        }).show(), e(document).one("click", a)
    }

    function a() {
        n.hide(), o.hide()
    }

    var n, o, l, i, r, s = {
        menuStyle: {
            listStyle: "none",
            padding: "1px",
            margin: "0px",
            backgroundColor: "#fff",
            border: "1px solid #999",
            width: "100px"
        },
        itemStyle: {
            margin: "0px",
            color: "#000",
            display: "block",
            cursor: "default",
            padding: "3px",
            border: "1px solid #fff",
            backgroundColor: "transparent"
        },
        itemHoverStyle: {border: "1px solid #0a246a", backgroundColor: "#b6bdd2"},
        eventPosX: "pageX",
        eventPosY: "pageY",
        shadow: !0,
        onContextMenu: null,
        onShowMenu: null
    };
    e.fn.contextMenu = function (a, l) {
        n || (n = e('<div id="jqContextMenu"></div>').hide().css({
            position: "absolute",
            zIndex: "500"
        }).appendTo("body").bind("click", function (e) {
            e.stopPropagation()
        })), o || (o = e("<div></div>").css({
            backgroundColor: "#000",
            position: "absolute",
            opacity: .2,
            zIndex: 499
        }).appendTo("body").hide()), i = i || [], i.push({
            id: a,
            menuStyle: e.extend({}, s.menuStyle, l.menuStyle || {}),
            itemStyle: e.extend({}, s.itemStyle, l.itemStyle || {}),
            itemHoverStyle: e.extend({}, s.itemHoverStyle, l.itemHoverStyle || {}),
            bindings: l.bindings || {},
            shadow: l.shadow || l.shadow === !1 ? l.shadow : s.shadow,
            onContextMenu: l.onContextMenu || s.onContextMenu,
            onShowMenu: l.onShowMenu || s.onShowMenu,
            eventPosX: l.eventPosX || s.eventPosX,
            eventPosY: l.eventPosY || s.eventPosY
        });
        var r = i.length - 1;
        return e(this).bind("contextmenu", function (e) {
            var a = i[r].onContextMenu ? i[r].onContextMenu(e) : !0;
            return a && t(r, this, e, l), !1
        }), this
    }, e.contextMenu = {
        defaults: function (t) {
            e.each(t, function (t, a) {
                "object" == typeof a && s[t] ? e.extend(s[t], a) : s[t] = a
            })
        }
    }
}(jQuery), $(function () {
    $("div.contextMenu").hide()
});