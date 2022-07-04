(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mxwidgets = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientWidgetApi = void 0;

var _events = require("events");

var _PostmessageTransport = require("./transport/PostmessageTransport");

var _WidgetApiDirection = require("./interfaces/WidgetApiDirection");

var _WidgetApiAction = require("./interfaces/WidgetApiAction");

var _Capabilities = require("./interfaces/Capabilities");

var _ApiVersion = require("./interfaces/ApiVersion");

var _WidgetEventCapability = require("./models/WidgetEventCapability");

var _GetOpenIDAction = require("./interfaces/GetOpenIDAction");

var _SimpleObservable = require("./util/SimpleObservable");

var _Symbols = require("./Symbols");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * API handler for the client side of widgets. This raises events
 * for each action received as `action:${action}` (eg: "action:screenshot").
 * Default handling can be prevented by using preventDefault() on the
 * raised event. The default handling varies for each action: ones
 * which the SDK can handle safely are acknowledged appropriately and
 * ones which are unhandled (custom or require the client to do something)
 * are rejected with an error.
 *
 * Events which are preventDefault()ed must reply using the transport.
 * The events raised will have a default of an IWidgetApiRequest
 * interface.
 *
 * When the ClientWidgetApi is ready to start sending requests, it will
 * raise a "ready" CustomEvent. After the ready event fires, actions can
 * be sent and the transport will be ready.
 *
 * When the widget has indicated it has loaded, this class raises a
 * "preparing" CustomEvent. The preparing event does not indicate that
 * the widget is ready to receive communications - that is signified by
 * the ready event exclusively.
 *
 * This class only handles one widget at a time.
 */
var ClientWidgetApi = /*#__PURE__*/function (_EventEmitter) {
  _inherits(ClientWidgetApi, _EventEmitter);

  var _super = _createSuper(ClientWidgetApi);

  /**
   * Creates a new client widget API. This will instantiate the transport
   * and start everything. When the iframe is loaded under the widget's
   * conditions, a "ready" event will be raised.
   * @param {Widget} widget The widget to communicate with.
   * @param {HTMLIFrameElement} iframe The iframe the widget is in.
   * @param {WidgetDriver} driver The driver for this widget/client.
   */
  function ClientWidgetApi(widget, iframe, driver) {
    var _iframe;

    var _this;

    _classCallCheck(this, ClientWidgetApi);

    _this = _super.call(this);
    _this.widget = widget;
    _this.iframe = iframe;
    _this.driver = driver;

    _defineProperty(_assertThisInitialized(_this), "transport", void 0);

    _defineProperty(_assertThisInitialized(_this), "capabilitiesFinished", false);

    _defineProperty(_assertThisInitialized(_this), "allowedCapabilities", new Set());

    _defineProperty(_assertThisInitialized(_this), "allowedEvents", []);

    _defineProperty(_assertThisInitialized(_this), "isStopped", false);

    if (!((_iframe = iframe) === null || _iframe === void 0 ? void 0 : _iframe.contentWindow)) {
      throw new Error("No iframe supplied");
    }

    if (!widget) {
      throw new Error("Invalid widget");
    }

    if (!driver) {
      throw new Error("Invalid driver");
    }

    _this.transport = new _PostmessageTransport.PostmessageTransport(_WidgetApiDirection.WidgetApiDirection.ToWidget, widget.id, iframe.contentWindow, window);
    _this.transport.targetOrigin = widget.origin;

    _this.transport.on("message", _this.handleMessage.bind(_assertThisInitialized(_this)));

    if (widget.waitForIframeLoad) {
      iframe.addEventListener("load", _this.onIframeLoad.bind(_assertThisInitialized(_this)));
    }

    _this.transport.start();

    return _this;
  }

  _createClass(ClientWidgetApi, [{
    key: "hasCapability",
    value: function hasCapability(capability) {
      return this.allowedCapabilities.has(capability);
    }
  }, {
    key: "canUseRoomTimeline",
    value: function canUseRoomTimeline(roomId) {
      return this.hasCapability("org.matrix.msc2762.timeline:".concat(_Symbols.Symbols.AnyRoom)) || this.hasCapability("org.matrix.msc2762.timeline:".concat(roomId));
    }
  }, {
    key: "canSendRoomEvent",
    value: function canSendRoomEvent(eventType) {
      var msgtype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.allowedEvents.some(function (e) {
        return e.matchesAsRoomEvent(eventType, msgtype) && e.direction === _WidgetEventCapability.EventDirection.Send;
      });
    }
  }, {
    key: "canSendStateEvent",
    value: function canSendStateEvent(eventType, stateKey) {
      return this.allowedEvents.some(function (e) {
        return e.matchesAsStateEvent(eventType, stateKey) && e.direction === _WidgetEventCapability.EventDirection.Send;
      });
    }
  }, {
    key: "canReceiveRoomEvent",
    value: function canReceiveRoomEvent(eventType) {
      var msgtype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.allowedEvents.some(function (e) {
        return e.matchesAsRoomEvent(eventType, msgtype) && e.direction === _WidgetEventCapability.EventDirection.Receive;
      });
    }
  }, {
    key: "canReceiveStateEvent",
    value: function canReceiveStateEvent(eventType, stateKey) {
      return this.allowedEvents.some(function (e) {
        return e.matchesAsStateEvent(eventType, stateKey) && e.direction === _WidgetEventCapability.EventDirection.Receive;
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isStopped = true;
      this.transport.stop();
    }
  }, {
    key: "onIframeLoad",
    value: function onIframeLoad(ev) {
      this.beginCapabilities(); // We don't need the listener anymore

      this.iframe.removeEventListener("onload", this.onIframeLoad.bind(this));
    }
  }, {
    key: "beginCapabilities",
    value: function beginCapabilities() {
      var _this2 = this;

      if (this.capabilitiesFinished) {
        throw new Error("Capabilities exchange already completed");
      } // widget has loaded - tell all the listeners that


      this.emit("preparing");
      var requestedCaps;
      this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.Capabilities, {}).then(function (caps) {
        requestedCaps = caps.capabilities;
        return _this2.driver.validateCapabilities(new Set(caps.capabilities));
      }).then(function (allowedCaps) {
        console.log("Widget ".concat(_this2.widget.id, " is allowed capabilities:"), Array.from(allowedCaps));
        _this2.allowedCapabilities = allowedCaps;
        _this2.allowedEvents = _WidgetEventCapability.WidgetEventCapability.findEventCapabilities(allowedCaps);
        _this2.capabilitiesFinished = true;

        _this2.notifyCapabilities(requestedCaps);

        _this2.emit("ready");
      });
    }
  }, {
    key: "notifyCapabilities",
    value: function notifyCapabilities(requested) {
      var _this3 = this;

      this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities, {
        requested: requested,
        approved: Array.from(this.allowedCapabilities)
      })["catch"](function (e) {
        console.warn("non-fatal error notifying widget of approved capabilities:", e);
      }).then(function () {
        _this3.emit("capabilitiesNotified");
      });
    }
  }, {
    key: "handleContentLoadedAction",
    value: function handleContentLoadedAction(action) {
      if (this.widget.waitForIframeLoad) {
        this.transport.reply(action, {
          error: {
            message: "Improper sequence: not expecting load event"
          }
        });
      } else {
        this.transport.reply(action, {});
        this.beginCapabilities();
      }
    }
  }, {
    key: "replyVersions",
    value: function replyVersions(request) {
      this.transport.reply(request, {
        supported_versions: _ApiVersion.CurrentApiVersions
      });
    }
  }, {
    key: "handleCapabilitiesRenegotiate",
    value: function handleCapabilitiesRenegotiate(request) {
      var _request$data,
          _this4 = this;

      // acknowledge first
      this.transport.reply(request, {});
      var requested = ((_request$data = request.data) === null || _request$data === void 0 ? void 0 : _request$data.capabilities) || [];
      var newlyRequested = new Set(requested.filter(function (r) {
        return !_this4.hasCapability(r);
      }));

      if (newlyRequested.size === 0) {
        // Nothing to do - notify capabilities
        return this.notifyCapabilities([]);
      }

      this.driver.validateCapabilities(newlyRequested).then(function (allowed) {
        allowed.forEach(function (c) {
          return _this4.allowedCapabilities.add(c);
        });

        var allowedEvents = _WidgetEventCapability.WidgetEventCapability.findEventCapabilities(allowed);

        allowedEvents.forEach(function (c) {
          return _this4.allowedEvents.push(c);
        });
        return _this4.notifyCapabilities(Array.from(newlyRequested));
      });
    }
  }, {
    key: "handleNavigate",
    value: function handleNavigate(request) {
      var _request$data2,
          _request$data3,
          _this5 = this;

      if (!this.hasCapability(_Capabilities.MatrixCapabilities.MSC2931Navigate)) {
        return this.transport.reply(request, {
          error: {
            message: "Missing capability"
          }
        });
      }

      if (!((_request$data2 = request.data) === null || _request$data2 === void 0 ? void 0 : _request$data2.uri) || !((_request$data3 = request.data) === null || _request$data3 === void 0 ? void 0 : _request$data3.uri.toString().startsWith("https://matrix.to/#"))) {
        return this.transport.reply(request, {
          error: {
            message: "Invalid matrix.to URI"
          }
        });
      }

      var onErr = function onErr(e) {
        console.error("[ClientWidgetApi] Failed to handle navigation: ", e);
        return _this5.transport.reply(request, {
          error: {
            message: "Error handling navigation"
          }
        });
      };

      try {
        this.driver.navigate(request.data.uri.toString())["catch"](function (e) {
          return onErr(e);
        }).then(function () {
          return _this5.transport.reply(request, {});
        });
      } catch (e) {
        return onErr(e);
      }
    }
  }, {
    key: "handleOIDC",
    value: function handleOIDC(request) {
      var _this6 = this;

      var phase = 1; // 1 = initial request, 2 = after user manual confirmation

      var replyState = function replyState(state, credential) {
        credential = credential || {};

        if (phase > 1) {
          return _this6.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials, _objectSpread({
            state: state,
            original_request_id: request.requestId
          }, credential));
        } else {
          return _this6.transport.reply(request, _objectSpread({
            state: state
          }, credential));
        }
      };

      var replyError = function replyError(msg) {
        console.error("[ClientWidgetApi] Failed to handle OIDC: ", msg);

        if (phase > 1) {
          // We don't have a way to indicate that a random error happened in this flow, so
          // just block the attempt.
          return replyState(_GetOpenIDAction.OpenIDRequestState.Blocked);
        } else {
          return _this6.transport.reply(request, {
            error: {
              message: msg
            }
          });
        }
      };

      var observer = new _SimpleObservable.SimpleObservable(function (update) {
        if (update.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation && phase > 1) {
          observer.close();
          return replyError("client provided out-of-phase response to OIDC flow");
        }

        if (update.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation) {
          replyState(update.state);
          phase++;
          return;
        }

        if (update.state === _GetOpenIDAction.OpenIDRequestState.Allowed && !update.token) {
          return replyError("client provided invalid OIDC token for an allowed request");
        }

        if (update.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
          update.token = null; // just in case the client did something weird
        }

        observer.close();
        return replyState(update.state, update.token);
      });
      this.driver.askOpenID(observer);
    }
  }, {
    key: "handleReadEvents",
    value: function handleReadEvents(request) {
      var _this7 = this;

      if (!request.data.type) {
        return this.transport.reply(request, {
          error: {
            message: "Invalid request - missing event type"
          }
        });
      }

      if (request.data.limit !== undefined && (!request.data.limit || request.data.limit < 0)) {
        return this.transport.reply(request, {
          error: {
            message: "Invalid request - limit out of range"
          }
        });
      }

      var askRoomIds = null; // null denotes current room only

      if (request.data.room_ids) {
        askRoomIds = request.data.room_ids;

        if (!Array.isArray(askRoomIds)) {
          askRoomIds = [askRoomIds];
        }

        var _iterator = _createForOfIteratorHelper(askRoomIds),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var roomId = _step.value;

            if (!this.canUseRoomTimeline(roomId)) {
              return this.transport.reply(request, {
                error: {
                  message: "Unable to access room timeline: ".concat(roomId)
                }
              });
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var limit = request.data.limit || 0;
      var events = Promise.resolve([]);

      if (request.data.state_key !== undefined) {
        var stateKey = request.data.state_key === true ? undefined : request.data.state_key.toString();

        if (!this.canReceiveStateEvent(request.data.type, stateKey)) {
          return this.transport.reply(request, {
            error: {
              message: "Cannot read state events of this type"
            }
          });
        }

        events = this.driver.readStateEvents(request.data.type, stateKey, limit, askRoomIds);
      } else {
        if (!this.canReceiveRoomEvent(request.data.type, request.data.msgtype)) {
          return this.transport.reply(request, {
            error: {
              message: "Cannot read room events of this type"
            }
          });
        }

        events = this.driver.readRoomEvents(request.data.type, request.data.msgtype, limit, askRoomIds);
      }

      return events.then(function (evs) {
        return _this7.transport.reply(request, {
          events: evs
        });
      });
    }
  }, {
    key: "handleSendEvent",
    value: function handleSendEvent(request) {
      var _this8 = this;

      if (!request.data.type) {
        return this.transport.reply(request, {
          error: {
            message: "Invalid request - missing event type"
          }
        });
      }

      if (!!request.data.room_id && !this.canUseRoomTimeline(request.data.room_id)) {
        return this.transport.reply(request, {
          error: {
            message: "Unable to access room timeline: ".concat(request.data.room_id)
          }
        });
      }

      var isState = request.data.state_key !== null && request.data.state_key !== undefined;
      var sendEventPromise;

      if (isState) {
        if (!this.canSendStateEvent(request.data.type, request.data.state_key)) {
          return this.transport.reply(request, {
            error: {
              message: "Cannot send state events of this type"
            }
          });
        }

        sendEventPromise = this.driver.sendEvent(request.data.type, request.data.content || {}, request.data.state_key, request.data.room_id);
      } else {
        var content = request.data.content || {};
        var msgtype = content['msgtype'];

        if (!this.canSendRoomEvent(request.data.type, msgtype)) {
          return this.transport.reply(request, {
            error: {
              message: "Cannot send room events of this type"
            }
          });
        }

        sendEventPromise = this.driver.sendEvent(request.data.type, content, null, // not sending a state event
        request.data.room_id);
      }

      sendEventPromise.then(function (sentEvent) {
        return _this8.transport.reply(request, {
          room_id: sentEvent.roomId,
          event_id: sentEvent.eventId
        });
      })["catch"](function (e) {
        console.error("error sending event: ", e);
        return _this8.transport.reply(request, {
          error: {
            message: "Error sending event"
          }
        });
      });
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(ev) {
      if (this.isStopped) return;
      var actionEv = new CustomEvent("action:".concat(ev.detail.action), {
        detail: ev.detail,
        cancelable: true
      });
      this.emit("action:".concat(ev.detail.action), actionEv);

      if (!actionEv.defaultPrevented) {
        switch (ev.detail.action) {
          case _WidgetApiAction.WidgetApiFromWidgetAction.ContentLoaded:
            return this.handleContentLoadedAction(ev.detail);

          case _WidgetApiAction.WidgetApiFromWidgetAction.SupportedApiVersions:
            return this.replyVersions(ev.detail);

          case _WidgetApiAction.WidgetApiFromWidgetAction.SendEvent:
            return this.handleSendEvent(ev.detail);

          case _WidgetApiAction.WidgetApiFromWidgetAction.GetOpenIDCredentials:
            return this.handleOIDC(ev.detail);

          case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2931Navigate:
            return this.handleNavigate(ev.detail);

          case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2974RenegotiateCapabilities:
            return this.handleCapabilitiesRenegotiate(ev.detail);

          case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents:
            return this.handleReadEvents(ev.detail);

          default:
            return this.transport.reply(ev.detail, {
              error: {
                message: "Unknown or unsupported action: " + ev.detail.action
              }
            });
        }
      }
    }
    /**
     * Takes a screenshot of the widget.
     * @returns Resolves to the widget's screenshot.
     * @throws Throws if there is a problem.
     */

  }, {
    key: "takeScreenshot",
    value: function takeScreenshot() {
      return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.TakeScreenshot, {});
    }
    /**
     * Alerts the widget to whether or not it is currently visible.
     * @param {boolean} isVisible Whether the widget is visible or not.
     * @returns {Promise<IWidgetApiResponseData>} Resolves when the widget acknowledges the update.
     */

  }, {
    key: "updateVisibility",
    value: function updateVisibility(isVisible) {
      return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateVisibility, {
        visible: isVisible
      });
    }
  }, {
    key: "sendWidgetConfig",
    value: function sendWidgetConfig(data) {
      return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.WidgetConfig, data).then();
    }
  }, {
    key: "notifyModalWidgetButtonClicked",
    value: function notifyModalWidgetButtonClicked(id) {
      return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.ButtonClicked, {
        id: id
      }).then();
    }
  }, {
    key: "notifyModalWidgetClose",
    value: function notifyModalWidgetClose(data) {
      return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.CloseModalWidget, data).then();
    }
    /**
     * Feeds an event to the widget. If the widget is not able to accept the event due to
     * permissions, this will no-op and return calmly. If the widget failed to handle the
     * event, this will raise an error.
     * @param {IRoomEvent} rawEvent The event to (try to) send to the widget.
     * @param {string} currentViewedRoomId The room ID the user is currently interacting with.
     * Not the room ID of the event.
     * @returns {Promise<void>} Resolves when complete, rejects if there was an error sending.
     */

  }, {
    key: "feedEvent",
    value: function feedEvent(rawEvent, currentViewedRoomId) {
      if (rawEvent.room_id !== currentViewedRoomId && !this.canUseRoomTimeline(rawEvent.room_id)) {
        return Promise.resolve(); // no-op
      }

      if (rawEvent.state_key !== undefined && rawEvent.state_key !== null) {
        // state event
        if (!this.canReceiveStateEvent(rawEvent.type, rawEvent.state_key)) {
          return Promise.resolve(); // no-op
        }
      } else {
        // message event
        if (!this.canReceiveRoomEvent(rawEvent.type, (rawEvent.content || {})['msgtype'])) {
          return Promise.resolve(); // no-op
        }
      } // Feed the event into the widget


      return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.SendEvent, rawEvent // it's compatible, but missing the index signature
      ).then();
    }
  }]);

  return ClientWidgetApi;
}(_events.EventEmitter);

exports.ClientWidgetApi = ClientWidgetApi;
},{"./Symbols":2,"./interfaces/ApiVersion":6,"./interfaces/Capabilities":7,"./interfaces/GetOpenIDAction":10,"./interfaces/WidgetApiAction":31,"./interfaces/WidgetApiDirection":32,"./models/WidgetEventCapability":37,"./transport/PostmessageTransport":43,"./util/SimpleObservable":44,"events":45}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Symbols = void 0;

/*
 * Copyright 2021 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Symbols;
exports.Symbols = Symbols;

(function (Symbols) {
  Symbols["AnyRoom"] = "*";
})(Symbols || (exports.Symbols = Symbols = {}));
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetApi = void 0;

var _events = require("events");

var _WidgetApiDirection = require("./interfaces/WidgetApiDirection");

var _ApiVersion = require("./interfaces/ApiVersion");

var _PostmessageTransport = require("./transport/PostmessageTransport");

var _WidgetApiAction = require("./interfaces/WidgetApiAction");

var _GetOpenIDAction = require("./interfaces/GetOpenIDAction");

var _WidgetType = require("./interfaces/WidgetType");

var _ModalWidgetActions = require("./interfaces/ModalWidgetActions");

var _WidgetEventCapability = require("./models/WidgetEventCapability");

var _Symbols = require("./Symbols");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * API handler for widgets. This raises events for each action
 * received as `action:${action}` (eg: "action:screenshot").
 * Default handling can be prevented by using preventDefault()
 * on the raised event. The default handling varies for each
 * action: ones which the SDK can handle safely are acknowledged
 * appropriately and ones which are unhandled (custom or require
 * the widget to do something) are rejected with an error.
 *
 * Events which are preventDefault()ed must reply using the
 * transport. The events raised will have a detail of an
 * IWidgetApiRequest interface.
 *
 * When the WidgetApi is ready to start sending requests, it will
 * raise a "ready" CustomEvent. After the ready event fires, actions
 * can be sent and the transport will be ready.
 */
var WidgetApi = /*#__PURE__*/function (_EventEmitter) {
  _inherits(WidgetApi, _EventEmitter);

  var _super = _createSuper(WidgetApi);

  /**
   * Creates a new API handler for the given widget.
   * @param {string} widgetId The widget ID to listen for. If not supplied then
   * the API will use the widget ID from the first valid request it receives.
   * @param {string} clientOrigin The origin of the client, or null if not known.
   */
  function WidgetApi() {
    var _this;

    var widgetId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var clientOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, WidgetApi);

    _this = _super.call(this);
    _this.clientOrigin = clientOrigin;

    _defineProperty(_assertThisInitialized(_this), "transport", void 0);

    _defineProperty(_assertThisInitialized(_this), "capabilitiesFinished", false);

    _defineProperty(_assertThisInitialized(_this), "supportsMSC2974Renegotiate", false);

    _defineProperty(_assertThisInitialized(_this), "requestedCapabilities", []);

    _defineProperty(_assertThisInitialized(_this), "approvedCapabilities", void 0);

    _defineProperty(_assertThisInitialized(_this), "cachedClientVersions", void 0);

    if (!window.parent) {
      throw new Error("No parent window. This widget doesn't appear to be embedded properly.");
    }

    _this.transport = new _PostmessageTransport.PostmessageTransport(_WidgetApiDirection.WidgetApiDirection.FromWidget, widgetId, window.parent, window);
    _this.transport.targetOrigin = clientOrigin;

    _this.transport.on("message", _this.handleMessage.bind(_assertThisInitialized(_this)));

    return _this;
  }
  /**
   * Determines if the widget was granted a particular capability. Note that on
   * clients where the capabilities are not fed back to the widget this function
   * will rely on requested capabilities instead.
   * @param {Capability} capability The capability to check for approval of.
   * @returns {boolean} True if the widget has approval for the given capability.
   */


  _createClass(WidgetApi, [{
    key: "hasCapability",
    value: function hasCapability(capability) {
      if (Array.isArray(this.approvedCapabilities)) {
        return this.approvedCapabilities.includes(capability);
      }

      return this.requestedCapabilities.includes(capability);
    }
    /**
     * Request a capability from the client. It is not guaranteed to be allowed,
     * but will be asked for.
     * @param {Capability} capability The capability to request.
     * @throws Throws if the capabilities negotiation has already started and the
     * widget is unable to request additional capabilities.
     */

  }, {
    key: "requestCapability",
    value: function requestCapability(capability) {
      if (this.capabilitiesFinished && !this.supportsMSC2974Renegotiate) {
        throw new Error("Capabilities have already been negotiated");
      }

      this.requestedCapabilities.push(capability);
    }
    /**
     * Request capabilities from the client. They are not guaranteed to be allowed,
     * but will be asked for if the negotiation has not already happened.
     * @param {Capability[]} capabilities The capabilities to request.
     * @throws Throws if the capabilities negotiation has already started.
     */

  }, {
    key: "requestCapabilities",
    value: function requestCapabilities(capabilities) {
      var _this2 = this;

      capabilities.forEach(function (cap) {
        return _this2.requestCapability(cap);
      });
    }
    /**
     * Requests the capability to interact with rooms other than the user's currently
     * viewed room. Applies to event receiving and sending.
     * @param {string | Symbols.AnyRoom} roomId The room ID, or `Symbols.AnyRoom` to
     * denote all known rooms.
     */

  }, {
    key: "requestCapabilityForRoomTimeline",
    value: function requestCapabilityForRoomTimeline(roomId) {
      this.requestCapability("org.matrix.msc2762.timeline:".concat(roomId));
    }
    /**
     * Requests the capability to send a given state event with optional explicit
     * state key. It is not guaranteed to be allowed, but will be asked for if the
     * negotiation has not already happened.
     * @param {string} eventType The state event type to ask for.
     * @param {string} stateKey If specified, the specific state key to request.
     * Otherwise all state keys will be requested.
     */

  }, {
    key: "requestCapabilityToSendState",
    value: function requestCapabilityToSendState(eventType, stateKey) {
      this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forStateEvent(_WidgetEventCapability.EventDirection.Send, eventType, stateKey).raw);
    }
    /**
     * Requests the capability to receive a given state event with optional explicit
     * state key. It is not guaranteed to be allowed, but will be asked for if the
     * negotiation has not already happened.
     * @param {string} eventType The state event type to ask for.
     * @param {string} stateKey If specified, the specific state key to request.
     * Otherwise all state keys will be requested.
     */

  }, {
    key: "requestCapabilityToReceiveState",
    value: function requestCapabilityToReceiveState(eventType, stateKey) {
      this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forStateEvent(_WidgetEventCapability.EventDirection.Receive, eventType, stateKey).raw);
    }
    /**
     * Requests the capability to send a given room event. It is not guaranteed to be
     * allowed, but will be asked for if the negotiation has not already happened.
     * @param {string} eventType The room event type to ask for.
     */

  }, {
    key: "requestCapabilityToSendEvent",
    value: function requestCapabilityToSendEvent(eventType) {
      this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomEvent(_WidgetEventCapability.EventDirection.Send, eventType).raw);
    }
    /**
     * Requests the capability to receive a given room event. It is not guaranteed to be
     * allowed, but will be asked for if the negotiation has not already happened.
     * @param {string} eventType The room event type to ask for.
     */

  }, {
    key: "requestCapabilityToReceiveEvent",
    value: function requestCapabilityToReceiveEvent(eventType) {
      this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomEvent(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
    }
    /**
     * Requests the capability to send a given message event with optional explicit
     * `msgtype`. It is not guaranteed to be allowed, but will be asked for if the
     * negotiation has not already happened.
     * @param {string} msgtype If specified, the specific msgtype to request.
     * Otherwise all message types will be requested.
     */

  }, {
    key: "requestCapabilityToSendMessage",
    value: function requestCapabilityToSendMessage(msgtype) {
      this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomMessageEvent(_WidgetEventCapability.EventDirection.Send, msgtype).raw);
    }
    /**
     * Requests the capability to receive a given message event with optional explicit
     * `msgtype`. It is not guaranteed to be allowed, but will be asked for if the
     * negotiation has not already happened.
     * @param {string} msgtype If specified, the specific msgtype to request.
     * Otherwise all message types will be requested.
     */

  }, {
    key: "requestCapabilityToReceiveMessage",
    value: function requestCapabilityToReceiveMessage(msgtype) {
      this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomMessageEvent(_WidgetEventCapability.EventDirection.Receive, msgtype).raw);
    }
    /**
     * Requests an OpenID Connect token from the client for the currently logged in
     * user. This token can be validated server-side with the federation API. Note
     * that the widget is responsible for validating the token and caching any results
     * it needs.
     * @returns {Promise<IOpenIDCredentials>} Resolves to a token for verification.
     * @throws Throws if the user rejected the request or the request failed.
     */

  }, {
    key: "requestOpenIDConnectToken",
    value: function requestOpenIDConnectToken() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.transport.sendComplete(_WidgetApiAction.WidgetApiFromWidgetAction.GetOpenIDCredentials, {}).then(function (response) {
          var rdata = response.response;

          if (rdata.state === _GetOpenIDAction.OpenIDRequestState.Allowed) {
            resolve(rdata);
          } else if (rdata.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
            reject(new Error("User declined to verify their identity"));
          } else if (rdata.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation) {
            var handlerFn = function handlerFn(ev) {
              ev.preventDefault();
              var request = ev.detail;
              if (request.data.original_request_id !== response.requestId) return;

              if (request.data.state === _GetOpenIDAction.OpenIDRequestState.Allowed) {
                resolve(request.data);

                _this3.transport.reply(request, {}); // ack

              } else if (request.data.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
                reject(new Error("User declined to verify their identity"));

                _this3.transport.reply(request, {}); // ack

              } else {
                reject(new Error("Invalid state on reply: " + rdata.state));

                _this3.transport.reply(request, {
                  error: {
                    message: "Invalid state"
                  }
                });
              }

              _this3.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials), handlerFn);
            };

            _this3.on("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials), handlerFn);
          } else {
            reject(new Error("Invalid state: " + rdata.state));
          }
        })["catch"](reject);
      });
    }
    /**
     * Asks the client for additional capabilities. Capabilities can be queued for this
     * request with the requestCapability() functions.
     * @returns {Promise<void>} Resolves when complete. Note that the promise resolves when
     * the capabilities request has gone through, not when the capabilities are approved/denied.
     * Use the WidgetApiToWidgetAction.NotifyCapabilities action to detect changes.
     */

  }, {
    key: "updateRequestedCapabilities",
    value: function updateRequestedCapabilities() {
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2974RenegotiateCapabilities, {
        capabilities: this.requestedCapabilities
      }).then();
    }
    /**
     * Tell the client that the content has been loaded.
     * @returns {Promise} Resolves when the client acknowledges the request.
     */

  }, {
    key: "sendContentLoaded",
    value: function sendContentLoaded() {
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.ContentLoaded, {}).then();
    }
    /**
     * Sends a sticker to the client.
     * @param {IStickerActionRequestData} sticker The sticker to send.
     * @returns {Promise} Resolves when the client acknowledges the request.
     */

  }, {
    key: "sendSticker",
    value: function sendSticker(sticker) {
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendSticker, sticker).then();
    }
    /**
     * Asks the client to set the always-on-screen status for this widget.
     * @param {boolean} value The new state to request.
     * @returns {Promise<boolean>} Resolve with true if the client was able to fulfill
     * the request, resolves to false otherwise. Rejects if an error occurred.
     */

  }, {
    key: "setAlwaysOnScreen",
    value: function setAlwaysOnScreen(value) {
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.UpdateAlwaysOnScreen, {
        value: value
      }).then(function (res) {
        return res.success;
      });
    }
    /**
     * Opens a modal widget.
     * @param {string} url The URL to the modal widget.
     * @param {string} name The name of the widget.
     * @param {IModalWidgetOpenRequestDataButton[]} buttons The buttons to have on the widget.
     * @param {IModalWidgetCreateData} data Data to supply to the modal widget.
     * @param {WidgetType} type The type of modal widget.
     * @returns {Promise<void>} Resolves when the modal widget has been opened.
     */

  }, {
    key: "openModalWidget",
    value: function openModalWidget(url, name) {
      var buttons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _WidgetType.MatrixWidgetType.Custom;
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.OpenModalWidget, {
        type: type,
        url: url,
        name: name,
        buttons: buttons,
        data: data
      }).then();
    }
    /**
     * Closes the modal widget. The widget's session will be terminated shortly after.
     * @param {IModalWidgetReturnData} data Optional data to close the modal widget with.
     * @returns {Promise<void>} Resolves when complete.
     */

  }, {
    key: "closeModalWidget",
    value: function closeModalWidget() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.CloseModalWidget, data).then();
    }
  }, {
    key: "sendRoomEvent",
    value: function sendRoomEvent(eventType, content, roomId) {
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendEvent, {
        type: eventType,
        content: content,
        room_id: roomId
      });
    }
  }, {
    key: "sendStateEvent",
    value: function sendStateEvent(eventType, stateKey, content, roomId) {
      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendEvent, {
        type: eventType,
        content: content,
        state_key: stateKey,
        room_id: roomId
      });
    }
  }, {
    key: "readRoomEvents",
    value: function readRoomEvents(eventType) {
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
      var msgtype = arguments.length > 2 ? arguments[2] : undefined;
      var roomIds = arguments.length > 3 ? arguments[3] : undefined;
      var data = {
        type: eventType,
        msgtype: msgtype,
        limit: limit
      };

      if (roomIds) {
        if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
          data.room_ids = _Symbols.Symbols.AnyRoom;
        } else {
          data.room_ids = roomIds;
        }
      }

      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents, data).then(function (r) {
        return r.events;
      });
    }
  }, {
    key: "readStateEvents",
    value: function readStateEvents(eventType) {
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
      var stateKey = arguments.length > 2 ? arguments[2] : undefined;
      var roomIds = arguments.length > 3 ? arguments[3] : undefined;
      var data = {
        type: eventType,
        state_key: stateKey === undefined ? true : stateKey,
        limit: limit
      };

      if (roomIds) {
        if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
          data.room_ids = _Symbols.Symbols.AnyRoom;
        } else {
          data.room_ids = roomIds;
        }
      }

      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents, data).then(function (r) {
        return r.events;
      });
    }
    /**
     * Sets a button as disabled or enabled on the modal widget. Buttons are enabled by default.
     * @param {ModalButtonID} buttonId The button ID to enable/disable.
     * @param {boolean} isEnabled Whether or not the button is enabled.
     * @returns {Promise<void>} Resolves when complete.
     * @throws Throws if the button cannot be disabled, or the client refuses to disable the button.
     */

  }, {
    key: "setModalButtonEnabled",
    value: function setModalButtonEnabled(buttonId, isEnabled) {
      if (buttonId === _ModalWidgetActions.BuiltInModalButtonID.Close) {
        throw new Error("The close button cannot be disabled");
      }

      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SetModalButtonEnabled, {
        button: buttonId,
        enabled: isEnabled
      }).then();
    }
    /**
     * Attempts to navigate the client to the given URI. This can only be called with Matrix URIs
     * (currently only matrix.to, but in future a Matrix URI scheme will be defined).
     * @param {string} uri The URI to navigate to.
     * @returns {Promise<void>} Resolves when complete.
     * @throws Throws if the URI is invalid or cannot be processed.
     * @deprecated This currently relies on an unstable MSC (MSC2931).
     */

  }, {
    key: "navigateTo",
    value: function navigateTo(uri) {
      if (!uri || !uri.startsWith("https://matrix.to/#")) {
        throw new Error("Invalid matrix.to URI");
      }

      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2931Navigate, {
        uri: uri
      }).then();
    }
    /**
     * Starts the communication channel. This should be done early to ensure
     * that messages are not missed. Communication can only be stopped by the client.
     */

  }, {
    key: "start",
    value: function start() {
      var _this4 = this;

      this.transport.start();
      this.getClientVersions().then(function (v) {
        if (v.includes(_ApiVersion.UnstableApiVersion.MSC2974)) {
          _this4.supportsMSC2974Renegotiate = true;
        }
      });
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(ev) {
      var actionEv = new CustomEvent("action:".concat(ev.detail.action), {
        detail: ev.detail,
        cancelable: true
      });
      this.emit("action:".concat(ev.detail.action), actionEv);

      if (!actionEv.defaultPrevented) {
        switch (ev.detail.action) {
          case _WidgetApiAction.WidgetApiToWidgetAction.SupportedApiVersions:
            return this.replyVersions(ev.detail);

          case _WidgetApiAction.WidgetApiToWidgetAction.Capabilities:
            return this.handleCapabilities(ev.detail);

          case _WidgetApiAction.WidgetApiToWidgetAction.UpdateVisibility:
            return this.transport.reply(ev.detail, {});
          // ack to avoid error spam

          case _WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities:
            return this.transport.reply(ev.detail, {});
          // ack to avoid error spam

          default:
            return this.transport.reply(ev.detail, {
              error: {
                message: "Unknown or unsupported action: " + ev.detail.action
              }
            });
        }
      }
    }
  }, {
    key: "replyVersions",
    value: function replyVersions(request) {
      this.transport.reply(request, {
        supported_versions: _ApiVersion.CurrentApiVersions
      });
    }
  }, {
    key: "getClientVersions",
    value: function getClientVersions() {
      var _this5 = this;

      if (Array.isArray(this.cachedClientVersions)) {
        return Promise.resolve(this.cachedClientVersions);
      }

      return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SupportedApiVersions, {}).then(function (r) {
        _this5.cachedClientVersions = r.supported_versions;
        return r.supported_versions;
      })["catch"](function (e) {
        console.warn("non-fatal error getting supported client versions: ", e);
        return [];
      });
    }
  }, {
    key: "handleCapabilities",
    value: function handleCapabilities(request) {
      var _this6 = this;

      if (this.capabilitiesFinished) {
        return this.transport.reply(request, {
          error: {
            message: "Capability negotiation already completed"
          }
        });
      } // See if we can expect a capabilities notification or not


      return this.getClientVersions().then(function (v) {
        if (v.includes(_ApiVersion.UnstableApiVersion.MSC2871)) {
          _this6.once("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities), function (ev) {
            _this6.approvedCapabilities = ev.detail.data.approved;

            _this6.emit("ready");
          });
        } else {
          // if we can't expect notification, we're as done as we can be
          _this6.emit("ready");
        } // in either case, reply to that capabilities request


        _this6.capabilitiesFinished = true;
        return _this6.transport.reply(request, {
          capabilities: _this6.requestedCapabilities
        });
      });
    }
  }]);

  return WidgetApi;
}(_events.EventEmitter);

exports.WidgetApi = WidgetApi;
},{"./Symbols":2,"./interfaces/ApiVersion":6,"./interfaces/GetOpenIDAction":10,"./interfaces/ModalWidgetActions":20,"./interfaces/WidgetApiAction":31,"./interfaces/WidgetApiDirection":32,"./interfaces/WidgetType":35,"./models/WidgetEventCapability":37,"./transport/PostmessageTransport":43,"events":45}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetDriver = void 0;

var _ = require("..");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents the functions and behaviour the widget-api is unable to
 * do, such as prompting the user for information or interacting with
 * the UI. Clients are expected to implement this class and override
 * any functions they need/want to support.
 *
 * This class assumes the client will have a context of a Widget
 * instance already.
 */
var WidgetDriver = /*#__PURE__*/function () {
  function WidgetDriver() {
    _classCallCheck(this, WidgetDriver);
  }

  _createClass(WidgetDriver, [{
    key: "validateCapabilities",

    /**
     * Verifies the widget's requested capabilities, returning the ones
     * it is approved to use. Mutating the requested capabilities will
     * have no effect.
     *
     * This SHOULD result in the user being prompted to approve/deny
     * capabilities.
     *
     * By default this rejects all capabilities (returns an empty set).
     * @param {Set<Capability>} requested The set of requested capabilities.
     * @returns {Promise<Set<Capability>>} Resolves to the allowed capabilities.
     */
    value: function validateCapabilities(requested) {
      return Promise.resolve(new Set());
    }
    /**
     * Sends an event into a room. If `roomId` is falsy, the client should send the event
     * into the room the user is currently looking at. The widget API will have already
     * verified that the widget is capable of sending the event to that room.
     * @param {string} eventType The event type to be sent.
     * @param {*} content The content for the event.
     * @param {string|null} stateKey The state key if this is a state event, otherwise null.
     * May be an empty string.
     * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
     * user is currently looking at.
     * @returns {Promise<ISendEventDetails>} Resolves when the event has been sent with
     * details of that event.
     * @throws Rejected when the event could not be sent.
     */

  }, {
    key: "sendEvent",
    value: function sendEvent(eventType, content) {
      var stateKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var roomId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return Promise.reject(new Error("Failed to override function"));
    }
    /**
     * Reads all events of the given type, and optionally `msgtype` (if applicable/defined),
     * the user has access to. The widget API will have already verified that the widget is
     * capable of receiving the events. Less events than the limit are allowed to be returned,
     * but not more. If `roomIds` is supplied, it may contain `Symbols.AnyRoom` to denote that
     * `limit` in each of the client's known rooms should be returned. When `null`, only the
     * room the user is currently looking at should be considered.
     * @param eventType The event type to be read.
     * @param msgtype The msgtype of the events to be read, if applicable/defined.
     * @param limit The maximum number of events to retrieve per room. Will be zero to denote "as many
     * as possible".
     * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
     * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
     * @returns {Promise<*[]>} Resolves to the room events, or an empty array.
     */

  }, {
    key: "readRoomEvents",
    value: function readRoomEvents(eventType, msgtype, limit) {
      var roomIds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return Promise.resolve([]);
    }
    /**
     * Reads all events of the given type, and optionally state key (if applicable/defined),
     * the user has access to. The widget API will have already verified that the widget is
     * capable of receiving the events. Less events than the limit are allowed to be returned,
     * but not more. If `roomIds` is supplied, it may contain `Symbols.AnyRoom` to denote that
     * `limit` in each of the client's known rooms should be returned. When `null`, only the
     * room the user is currently looking at should be considered.
     * @param eventType The event type to be read.
     * @param stateKey The state key of the events to be read, if applicable/defined.
     * @param limit The maximum number of events to retrieve. Will be zero to denote "as many
     * as possible".
     * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
     * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
     * @returns {Promise<*[]>} Resolves to the state events, or an empty array.
     */

  }, {
    key: "readStateEvents",
    value: function readStateEvents(eventType, stateKey, limit) {
      var roomIds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return Promise.resolve([]);
    }
    /**
     * Asks the user for permission to validate their identity through OpenID Connect. The
     * interface for this function is an observable which accepts the state machine of the
     * OIDC exchange flow. For example, if the client/user blocks the request then it would
     * feed back a `{state: Blocked}` into the observable. Similarly, if the user already
     * approved the widget then a `{state: Allowed}` would be fed into the observable alongside
     * the token itself. If the client is asking for permission, it should feed in a
     * `{state: PendingUserConfirmation}` followed by the relevant Allowed or Blocked state.
     *
     * The widget API will reject the widget's request with an error if this contract is not
     * met properly. By default, the widget driver will block all OIDC requests.
     * @param {SimpleObservable<IOpenIDUpdate>} observer The observable to feed updates into.
     */

  }, {
    key: "askOpenID",
    value: function askOpenID(observer) {
      observer.update({
        state: _.OpenIDRequestState.Blocked
      });
    }
    /**
     * Navigates the client with a matrix.to URI. In future this function will also be provided
     * with the Matrix URIs once matrix.to is replaced. The given URI will have already been
     * lightly checked to ensure it looks like a valid URI, though the implementation is recommended
     * to do further checks on the URI.
     * @param {string} uri The URI to navigate to.
     * @returns {Promise<void>} Resolves when complete.
     * @throws Throws if there's a problem with the navigation, such as invalid format.
     */

  }, {
    key: "navigate",
    value: function navigate(uri) {
      throw new Error("Navigation is not implemented");
    }
  }]);

  return WidgetDriver;
}();

exports.WidgetDriver = WidgetDriver;
},{"..":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WidgetApi = require("./WidgetApi");

Object.keys(_WidgetApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetApi[key];
    }
  });
});

var _ClientWidgetApi = require("./ClientWidgetApi");

Object.keys(_ClientWidgetApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ClientWidgetApi[key];
    }
  });
});

var _Symbols = require("./Symbols");

Object.keys(_Symbols).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Symbols[key];
    }
  });
});

var _ITransport = require("./transport/ITransport");

Object.keys(_ITransport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ITransport[key];
    }
  });
});

var _PostmessageTransport = require("./transport/PostmessageTransport");

Object.keys(_PostmessageTransport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PostmessageTransport[key];
    }
  });
});

var _ICustomWidgetData = require("./interfaces/ICustomWidgetData");

Object.keys(_ICustomWidgetData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ICustomWidgetData[key];
    }
  });
});

var _IJitsiWidgetData = require("./interfaces/IJitsiWidgetData");

Object.keys(_IJitsiWidgetData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IJitsiWidgetData[key];
    }
  });
});

var _IStickerpickerWidgetData = require("./interfaces/IStickerpickerWidgetData");

Object.keys(_IStickerpickerWidgetData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IStickerpickerWidgetData[key];
    }
  });
});

var _IWidget = require("./interfaces/IWidget");

Object.keys(_IWidget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IWidget[key];
    }
  });
});

var _WidgetType = require("./interfaces/WidgetType");

Object.keys(_WidgetType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetType[key];
    }
  });
});

var _IWidgetApiErrorResponse = require("./interfaces/IWidgetApiErrorResponse");

Object.keys(_IWidgetApiErrorResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IWidgetApiErrorResponse[key];
    }
  });
});

var _IWidgetApiRequest = require("./interfaces/IWidgetApiRequest");

Object.keys(_IWidgetApiRequest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IWidgetApiRequest[key];
    }
  });
});

var _IWidgetApiResponse = require("./interfaces/IWidgetApiResponse");

Object.keys(_IWidgetApiResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IWidgetApiResponse[key];
    }
  });
});

var _WidgetApiAction = require("./interfaces/WidgetApiAction");

Object.keys(_WidgetApiAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetApiAction[key];
    }
  });
});

var _WidgetApiDirection = require("./interfaces/WidgetApiDirection");

Object.keys(_WidgetApiDirection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetApiDirection[key];
    }
  });
});

var _ApiVersion = require("./interfaces/ApiVersion");

Object.keys(_ApiVersion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ApiVersion[key];
    }
  });
});

var _Capabilities = require("./interfaces/Capabilities");

Object.keys(_Capabilities).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Capabilities[key];
    }
  });
});

var _CapabilitiesAction = require("./interfaces/CapabilitiesAction");

Object.keys(_CapabilitiesAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CapabilitiesAction[key];
    }
  });
});

var _ContentLoadedAction = require("./interfaces/ContentLoadedAction");

Object.keys(_ContentLoadedAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContentLoadedAction[key];
    }
  });
});

var _ScreenshotAction = require("./interfaces/ScreenshotAction");

Object.keys(_ScreenshotAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ScreenshotAction[key];
    }
  });
});

var _StickerAction = require("./interfaces/StickerAction");

Object.keys(_StickerAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StickerAction[key];
    }
  });
});

var _StickyAction = require("./interfaces/StickyAction");

Object.keys(_StickyAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StickyAction[key];
    }
  });
});

var _SupportedVersionsAction = require("./interfaces/SupportedVersionsAction");

Object.keys(_SupportedVersionsAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SupportedVersionsAction[key];
    }
  });
});

var _VisibilityAction = require("./interfaces/VisibilityAction");

Object.keys(_VisibilityAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VisibilityAction[key];
    }
  });
});

var _GetOpenIDAction = require("./interfaces/GetOpenIDAction");

Object.keys(_GetOpenIDAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GetOpenIDAction[key];
    }
  });
});

var _OpenIDCredentialsAction = require("./interfaces/OpenIDCredentialsAction");

Object.keys(_OpenIDCredentialsAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OpenIDCredentialsAction[key];
    }
  });
});

var _WidgetKind = require("./interfaces/WidgetKind");

Object.keys(_WidgetKind).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetKind[key];
    }
  });
});

var _ModalButtonKind = require("./interfaces/ModalButtonKind");

Object.keys(_ModalButtonKind).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ModalButtonKind[key];
    }
  });
});

var _ModalWidgetActions = require("./interfaces/ModalWidgetActions");

Object.keys(_ModalWidgetActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ModalWidgetActions[key];
    }
  });
});

var _SetModalButtonEnabledAction = require("./interfaces/SetModalButtonEnabledAction");

Object.keys(_SetModalButtonEnabledAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SetModalButtonEnabledAction[key];
    }
  });
});

var _WidgetConfigAction = require("./interfaces/WidgetConfigAction");

Object.keys(_WidgetConfigAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetConfigAction[key];
    }
  });
});

var _SendEventAction = require("./interfaces/SendEventAction");

Object.keys(_SendEventAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SendEventAction[key];
    }
  });
});

var _ReadEventAction = require("./interfaces/ReadEventAction");

Object.keys(_ReadEventAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReadEventAction[key];
    }
  });
});

var _IRoomEvent = require("./interfaces/IRoomEvent");

Object.keys(_IRoomEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IRoomEvent[key];
    }
  });
});

var _NavigateAction = require("./interfaces/NavigateAction");

Object.keys(_NavigateAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NavigateAction[key];
    }
  });
});

var _WidgetEventCapability = require("./models/WidgetEventCapability");

Object.keys(_WidgetEventCapability).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetEventCapability[key];
    }
  });
});

var _url = require("./models/validation/url");

Object.keys(_url).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _url[key];
    }
  });
});

var _utils = require("./models/validation/utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _Widget = require("./models/Widget");

Object.keys(_Widget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Widget[key];
    }
  });
});

var _WidgetParser = require("./models/WidgetParser");

Object.keys(_WidgetParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetParser[key];
    }
  });
});

var _urlTemplate = require("./templating/url-template");

Object.keys(_urlTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _urlTemplate[key];
    }
  });
});

var _SimpleObservable = require("./util/SimpleObservable");

Object.keys(_SimpleObservable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SimpleObservable[key];
    }
  });
});

var _WidgetDriver = require("./driver/WidgetDriver");

Object.keys(_WidgetDriver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WidgetDriver[key];
    }
  });
});
},{"./ClientWidgetApi":1,"./Symbols":2,"./WidgetApi":3,"./driver/WidgetDriver":4,"./interfaces/ApiVersion":6,"./interfaces/Capabilities":7,"./interfaces/CapabilitiesAction":8,"./interfaces/ContentLoadedAction":9,"./interfaces/GetOpenIDAction":10,"./interfaces/ICustomWidgetData":11,"./interfaces/IJitsiWidgetData":12,"./interfaces/IRoomEvent":13,"./interfaces/IStickerpickerWidgetData":14,"./interfaces/IWidget":15,"./interfaces/IWidgetApiErrorResponse":16,"./interfaces/IWidgetApiRequest":17,"./interfaces/IWidgetApiResponse":18,"./interfaces/ModalButtonKind":19,"./interfaces/ModalWidgetActions":20,"./interfaces/NavigateAction":21,"./interfaces/OpenIDCredentialsAction":22,"./interfaces/ReadEventAction":23,"./interfaces/ScreenshotAction":24,"./interfaces/SendEventAction":25,"./interfaces/SetModalButtonEnabledAction":26,"./interfaces/StickerAction":27,"./interfaces/StickyAction":28,"./interfaces/SupportedVersionsAction":29,"./interfaces/VisibilityAction":30,"./interfaces/WidgetApiAction":31,"./interfaces/WidgetApiDirection":32,"./interfaces/WidgetConfigAction":33,"./interfaces/WidgetKind":34,"./interfaces/WidgetType":35,"./models/Widget":36,"./models/WidgetEventCapability":37,"./models/WidgetParser":38,"./models/validation/url":39,"./models/validation/utils":40,"./templating/url-template":41,"./transport/ITransport":42,"./transport/PostmessageTransport":43,"./util/SimpleObservable":44}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrentApiVersions = exports.UnstableApiVersion = exports.MatrixApiVersion = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MatrixApiVersion;
exports.MatrixApiVersion = MatrixApiVersion;

(function (MatrixApiVersion) {
  MatrixApiVersion["Prerelease1"] = "0.0.1";
  MatrixApiVersion["Prerelease2"] = "0.0.2";
})(MatrixApiVersion || (exports.MatrixApiVersion = MatrixApiVersion = {}));

var UnstableApiVersion;
exports.UnstableApiVersion = UnstableApiVersion;

(function (UnstableApiVersion) {
  UnstableApiVersion["MSC2762"] = "org.matrix.msc2762";
  UnstableApiVersion["MSC2871"] = "org.matrix.msc2871";
  UnstableApiVersion["MSC2931"] = "org.matrix.msc2931";
  UnstableApiVersion["MSC2974"] = "org.matrix.msc2974";
  UnstableApiVersion["MSC2876"] = "org.matrix.msc2876";
})(UnstableApiVersion || (exports.UnstableApiVersion = UnstableApiVersion = {}));

var CurrentApiVersions = [MatrixApiVersion.Prerelease1, MatrixApiVersion.Prerelease2, //MatrixApiVersion.V010,
UnstableApiVersion.MSC2762, UnstableApiVersion.MSC2871, UnstableApiVersion.MSC2931, UnstableApiVersion.MSC2974, UnstableApiVersion.MSC2876];
exports.CurrentApiVersions = CurrentApiVersions;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTimelineCapability = isTimelineCapability;
exports.isTimelineCapabilityFor = isTimelineCapabilityFor;
exports.getTimelineRoomIDFromCapability = getTimelineRoomIDFromCapability;
exports.VideoConferenceCapabilities = exports.StickerpickerCapabilities = exports.MatrixCapabilities = void 0;

/*
 * Copyright 2020 - 2021 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MatrixCapabilities;
exports.MatrixCapabilities = MatrixCapabilities;

(function (MatrixCapabilities) {
  MatrixCapabilities["Screenshots"] = "m.capability.screenshot";
  MatrixCapabilities["StickerSending"] = "m.sticker";
  MatrixCapabilities["AlwaysOnScreen"] = "m.always_on_screen";
  MatrixCapabilities["RequiresClient"] = "io.element.requires_client";
  MatrixCapabilities["MSC2931Navigate"] = "org.matrix.msc2931.navigate";
})(MatrixCapabilities || (exports.MatrixCapabilities = MatrixCapabilities = {}));

var StickerpickerCapabilities = [MatrixCapabilities.StickerSending];
exports.StickerpickerCapabilities = StickerpickerCapabilities;
var VideoConferenceCapabilities = [MatrixCapabilities.AlwaysOnScreen];
/**
 * Determines if a capability is a capability for a timeline.
 * @param {Capability} capability The capability to test.
 * @returns {boolean} True if a timeline capability, false otherwise.
 */

exports.VideoConferenceCapabilities = VideoConferenceCapabilities;

function isTimelineCapability(capability) {
  // TODO: Change when MSC2762 becomes stable.
  return capability === null || capability === void 0 ? void 0 : capability.startsWith("org.matrix.msc2762.timeline:");
}
/**
 * Determines if a capability is a timeline capability for the given room.
 * @param {Capability} capability The capability to test.
 * @param {string | Symbols.AnyRoom} roomId The room ID, or `Symbols.AnyRoom` for that designation.
 * @returns {boolean} True if a matching capability, false otherwise.
 */


function isTimelineCapabilityFor(capability, roomId) {
  return capability === "org.matrix.msc2762.timeline:".concat(roomId);
}
/**
 * Gets the room ID described by a timeline capability.
 * @param {string} capability The capability to parse.
 * @returns {string} The room ID.
 */


function getTimelineRoomIDFromCapability(capability) {
  return capability.substring(capability.indexOf(":") + 1);
}
},{}],8:[function(require,module,exports){
"use strict";
},{}],9:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenIDRequestState = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OpenIDRequestState;
exports.OpenIDRequestState = OpenIDRequestState;

(function (OpenIDRequestState) {
  OpenIDRequestState["Allowed"] = "allowed";
  OpenIDRequestState["Blocked"] = "blocked";
  OpenIDRequestState["PendingUserConfirmation"] = "request";
})(OpenIDRequestState || (exports.OpenIDRequestState = OpenIDRequestState = {}));
},{}],11:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],12:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],13:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],14:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],15:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isErrorResponse = isErrorResponse;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isErrorResponse(responseData) {
  if ("error" in responseData) {
    var err = responseData;
    return !!err.error.message;
  }

  return false;
}
},{}],17:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],18:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalButtonKind = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ModalButtonKind;
exports.ModalButtonKind = ModalButtonKind;

(function (ModalButtonKind) {
  ModalButtonKind["Primary"] = "m.primary";
  ModalButtonKind["Secondary"] = "m.secondary";
  ModalButtonKind["Warning"] = "m.warning";
  ModalButtonKind["Danger"] = "m.danger";
  ModalButtonKind["Link"] = "m.link";
})(ModalButtonKind || (exports.ModalButtonKind = ModalButtonKind = {}));
},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltInModalButtonID = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var BuiltInModalButtonID;
exports.BuiltInModalButtonID = BuiltInModalButtonID;

(function (BuiltInModalButtonID) {
  BuiltInModalButtonID["Close"] = "m.close";
})(BuiltInModalButtonID || (exports.BuiltInModalButtonID = BuiltInModalButtonID = {}));
},{}],21:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],22:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],23:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],24:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],25:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],26:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],27:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],28:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],29:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],30:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetApiFromWidgetAction = exports.WidgetApiToWidgetAction = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var WidgetApiToWidgetAction;
exports.WidgetApiToWidgetAction = WidgetApiToWidgetAction;

(function (WidgetApiToWidgetAction) {
  WidgetApiToWidgetAction["SupportedApiVersions"] = "supported_api_versions";
  WidgetApiToWidgetAction["Capabilities"] = "capabilities";
  WidgetApiToWidgetAction["NotifyCapabilities"] = "notify_capabilities";
  WidgetApiToWidgetAction["TakeScreenshot"] = "screenshot";
  WidgetApiToWidgetAction["UpdateVisibility"] = "visibility";
  WidgetApiToWidgetAction["OpenIDCredentials"] = "openid_credentials";
  WidgetApiToWidgetAction["WidgetConfig"] = "widget_config";
  WidgetApiToWidgetAction["CloseModalWidget"] = "close_modal";
  WidgetApiToWidgetAction["ButtonClicked"] = "button_clicked";
  WidgetApiToWidgetAction["SendEvent"] = "send_event";
})(WidgetApiToWidgetAction || (exports.WidgetApiToWidgetAction = WidgetApiToWidgetAction = {}));

var WidgetApiFromWidgetAction;
exports.WidgetApiFromWidgetAction = WidgetApiFromWidgetAction;

(function (WidgetApiFromWidgetAction) {
  WidgetApiFromWidgetAction["SupportedApiVersions"] = "supported_api_versions";
  WidgetApiFromWidgetAction["ContentLoaded"] = "content_loaded";
  WidgetApiFromWidgetAction["SendSticker"] = "m.sticker";
  WidgetApiFromWidgetAction["UpdateAlwaysOnScreen"] = "set_always_on_screen";
  WidgetApiFromWidgetAction["GetOpenIDCredentials"] = "get_openid";
  WidgetApiFromWidgetAction["CloseModalWidget"] = "close_modal";
  WidgetApiFromWidgetAction["OpenModalWidget"] = "open_modal";
  WidgetApiFromWidgetAction["SetModalButtonEnabled"] = "set_button_enabled";
  WidgetApiFromWidgetAction["SendEvent"] = "send_event";
  WidgetApiFromWidgetAction["MSC2876ReadEvents"] = "org.matrix.msc2876.read_events";
  WidgetApiFromWidgetAction["MSC2931Navigate"] = "org.matrix.msc2931.navigate";
  WidgetApiFromWidgetAction["MSC2974RenegotiateCapabilities"] = "org.matrix.msc2974.request_capabilities";
})(WidgetApiFromWidgetAction || (exports.WidgetApiFromWidgetAction = WidgetApiFromWidgetAction = {}));
},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertedDirection = invertedDirection;
exports.WidgetApiDirection = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var WidgetApiDirection;
exports.WidgetApiDirection = WidgetApiDirection;

(function (WidgetApiDirection) {
  WidgetApiDirection["ToWidget"] = "toWidget";
  WidgetApiDirection["FromWidget"] = "fromWidget";
})(WidgetApiDirection || (exports.WidgetApiDirection = WidgetApiDirection = {}));

function invertedDirection(dir) {
  if (dir === WidgetApiDirection.ToWidget) {
    return WidgetApiDirection.FromWidget;
  } else if (dir === WidgetApiDirection.FromWidget) {
    return WidgetApiDirection.ToWidget;
  } else {
    throw new Error("Invalid direction");
  }
}
},{}],33:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetKind = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var WidgetKind;
exports.WidgetKind = WidgetKind;

(function (WidgetKind) {
  WidgetKind["Room"] = "room";
  WidgetKind["Account"] = "account";
  WidgetKind["Modal"] = "modal";
})(WidgetKind || (exports.WidgetKind = WidgetKind = {}));
},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatrixWidgetType = void 0;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MatrixWidgetType;
exports.MatrixWidgetType = MatrixWidgetType;

(function (MatrixWidgetType) {
  MatrixWidgetType["Custom"] = "m.custom";
  MatrixWidgetType["JitsiMeet"] = "m.jitsi";
  MatrixWidgetType["Stickerpicker"] = "m.stickerpicker";
})(MatrixWidgetType || (exports.MatrixWidgetType = MatrixWidgetType = {}));
},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Widget = void 0;

var _utils = require("./validation/utils");

var _ = require("..");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents the barest form of widget.
 */
var Widget = /*#__PURE__*/function () {
  function Widget(definition) {
    _classCallCheck(this, Widget);

    this.definition = definition;
    if (!this.definition) throw new Error("Definition is required");
    (0, _utils.assertPresent)(definition, "id");
    (0, _utils.assertPresent)(definition, "creatorUserId");
    (0, _utils.assertPresent)(definition, "type");
    (0, _utils.assertPresent)(definition, "url");
  }
  /**
   * The user ID who created the widget.
   */


  _createClass(Widget, [{
    key: "getCompleteUrl",

    /**
     * Gets a complete widget URL for the client to render.
     * @param {ITemplateParams} params The template parameters.
     * @returns {string} A templated URL.
     */
    value: function getCompleteUrl(params) {
      return (0, _.runTemplate)(this.templateUrl, this.definition, params);
    }
  }, {
    key: "creatorUserId",
    get: function get() {
      return this.definition.creatorUserId;
    }
    /**
     * The type of widget.
     */

  }, {
    key: "type",
    get: function get() {
      return this.definition.type;
    }
    /**
     * The ID of the widget.
     */

  }, {
    key: "id",
    get: function get() {
      return this.definition.id;
    }
    /**
     * The name of the widget, or null if not set.
     */

  }, {
    key: "name",
    get: function get() {
      return this.definition.name || null;
    }
    /**
     * The title for the widget, or null if not set.
     */

  }, {
    key: "title",
    get: function get() {
      return this.rawData.title || null;
    }
    /**
     * The templated URL for the widget.
     */

  }, {
    key: "templateUrl",
    get: function get() {
      return this.definition.url;
    }
    /**
     * The origin for this widget.
     */

  }, {
    key: "origin",
    get: function get() {
      return new URL(this.templateUrl).origin;
    }
    /**
     * Whether or not the client should wait for the iframe to load. Defaults
     * to true.
     */

  }, {
    key: "waitForIframeLoad",
    get: function get() {
      if (this.definition.waitForIframeLoad === false) return false;
      if (this.definition.waitForIframeLoad === true) return true;
      return true; // default true
    }
    /**
     * The raw data for the widget. This will always be defined, though
     * may be empty.
     */

  }, {
    key: "rawData",
    get: function get() {
      return this.definition.data || {};
    }
  }]);

  return Widget;
}();

exports.Widget = Widget;
},{"..":5,"./validation/utils":40}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetEventCapability = exports.EventDirection = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var EventDirection;
exports.EventDirection = EventDirection;

(function (EventDirection) {
  EventDirection["Send"] = "send";
  EventDirection["Receive"] = "receive";
})(EventDirection || (exports.EventDirection = EventDirection = {}));

var WidgetEventCapability = /*#__PURE__*/function () {
  function WidgetEventCapability(direction, eventType, isState, keyStr, raw) {
    _classCallCheck(this, WidgetEventCapability);

    this.direction = direction;
    this.eventType = eventType;
    this.isState = isState;
    this.keyStr = keyStr;
    this.raw = raw;
  }

  _createClass(WidgetEventCapability, [{
    key: "matchesAsStateEvent",
    value: function matchesAsStateEvent(eventType, stateKey) {
      if (!this.isState) return false; // looking for state, not state

      if (this.eventType !== eventType) return false; // event type mismatch

      if (this.keyStr === null) return true; // all state keys are allowed

      if (this.keyStr === stateKey) return true; // this state key is allowed
      // Default not allowed

      return false;
    }
  }, {
    key: "matchesAsRoomEvent",
    value: function matchesAsRoomEvent(eventType) {
      var msgtype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this.isState) return false; // looking for not-state, is state

      if (this.eventType !== eventType) return false; // event type mismatch

      if (this.eventType === "m.room.message") {
        if (this.keyStr === null) return true; // all message types are allowed

        if (this.keyStr === msgtype) return true; // this message type is allowed
      } else {
        return true; // already passed the check for if the event is allowed
      } // Default not allowed


      return false;
    }
  }], [{
    key: "forStateEvent",
    value: function forStateEvent(direction, eventType, stateKey) {
      // TODO: Enable support for m.* namespace once the MSC lands.
      // https://github.com/matrix-org/matrix-widget-api/issues/22
      eventType = eventType.replace(/#/g, '\\#');
      stateKey = stateKey !== null && stateKey !== undefined ? "#".concat(stateKey) : '';
      var str = "org.matrix.msc2762.".concat(direction, ".state_event:").concat(eventType).concat(stateKey); // cheat by sending it through the processor

      return WidgetEventCapability.findEventCapabilities([str])[0];
    }
  }, {
    key: "forRoomEvent",
    value: function forRoomEvent(direction, eventType) {
      // TODO: Enable support for m.* namespace once the MSC lands.
      // https://github.com/matrix-org/matrix-widget-api/issues/22
      var str = "org.matrix.msc2762.".concat(direction, ".event:").concat(eventType); // cheat by sending it through the processor

      return WidgetEventCapability.findEventCapabilities([str])[0];
    }
  }, {
    key: "forRoomMessageEvent",
    value: function forRoomMessageEvent(direction, msgtype) {
      // TODO: Enable support for m.* namespace once the MSC lands.
      // https://github.com/matrix-org/matrix-widget-api/issues/22
      msgtype = msgtype === null || msgtype === undefined ? '' : msgtype;
      var str = "org.matrix.msc2762.".concat(direction, ".event:m.room.message#").concat(msgtype); // cheat by sending it through the processor

      return WidgetEventCapability.findEventCapabilities([str])[0];
    }
    /**
     * Parses a capabilities request to find all the event capability requests.
     * @param {Iterable<Capability>} capabilities The capabilities requested/to parse.
     * @returns {WidgetEventCapability[]} An array of event capability requests. May be empty, but never null.
     */

  }, {
    key: "findEventCapabilities",
    value: function findEventCapabilities(capabilities) {
      var parsed = [];

      var _iterator = _createForOfIteratorHelper(capabilities),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cap = _step.value;
          var _direction = null;
          var eventSegment = void 0;
          var _isState = false; // TODO: Enable support for m.* namespace once the MSC lands.
          // https://github.com/matrix-org/matrix-widget-api/issues/22

          if (cap.startsWith("org.matrix.msc2762.send.")) {
            if (cap.startsWith("org.matrix.msc2762.send.event:")) {
              _direction = EventDirection.Send;
              eventSegment = cap.substring("org.matrix.msc2762.send.event:".length);
            } else if (cap.startsWith("org.matrix.msc2762.send.state_event:")) {
              _direction = EventDirection.Send;
              _isState = true;
              eventSegment = cap.substring("org.matrix.msc2762.send.state_event:".length);
            }
          } else if (cap.startsWith("org.matrix.msc2762.receive.")) {
            if (cap.startsWith("org.matrix.msc2762.receive.event:")) {
              _direction = EventDirection.Receive;
              eventSegment = cap.substring("org.matrix.msc2762.receive.event:".length);
            } else if (cap.startsWith("org.matrix.msc2762.receive.state_event:")) {
              _direction = EventDirection.Receive;
              _isState = true;
              eventSegment = cap.substring("org.matrix.msc2762.receive.state_event:".length);
            }
          }

          if (_direction === null) continue; // The capability uses `#` as a separator between event type and state key/msgtype,
          // so we split on that. However, a # is also valid in either one of those so we
          // join accordingly.
          // Eg: `m.room.message##m.text` is "m.room.message" event with msgtype "#m.text".

          var expectingKeyStr = eventSegment.startsWith("m.room.message#") || _isState;

          var _keyStr = null;

          if (eventSegment.includes('#') && expectingKeyStr) {
            // Dev note: regex is difficult to write, so instead the rules are manually written
            // out. This is probably just as understandable as a boring regex though, so win-win?
            // Test cases:
            // str                      eventSegment        keyStr
            // -------------------------------------------------------------
            // m.room.message#          m.room.message      <empty string>
            // m.room.message#test      m.room.message      test
            // m.room.message\#         m.room.message#     test
            // m.room.message##test     m.room.message      #test
            // m.room.message\##test    m.room.message#     test
            // m.room.message\\##test   m.room.message\#    test
            // m.room.message\\###test  m.room.message\#    #test
            // First step: explode the string
            var parts = eventSegment.split('#'); // To form the eventSegment, we'll keep finding parts of the exploded string until
            // there's one that doesn't end with the escape character (\). We'll then join those
            // segments together with the exploding character. We have to remember to consume the
            // escape character as well.

            var idx = parts.findIndex(function (p) {
              return !p.endsWith("\\");
            });
            eventSegment = parts.slice(0, idx + 1).map(function (p) {
              return p.endsWith('\\') ? p.substring(0, p.length - 1) : p;
            }).join('#'); // The keyStr is whatever is left over.

            _keyStr = parts.slice(idx + 1).join('#');
          }

          parsed.push(new WidgetEventCapability(_direction, eventSegment, _isState, _keyStr, cap));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return parsed;
    }
  }]);

  return WidgetEventCapability;
}();

exports.WidgetEventCapability = WidgetEventCapability;
},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetParser = void 0;

var _Widget = require("./Widget");

var _url = require("./validation/url");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WidgetParser = /*#__PURE__*/function () {
  function WidgetParser() {// private constructor because this is a util class

    _classCallCheck(this, WidgetParser);
  }
  /**
   * Parses widgets from the "m.widgets" account data event. This will always
   * return an array, though may be empty if no valid widgets were found.
   * @param {IAccountDataWidgets} content The content of the "m.widgets" account data.
   * @returns {Widget[]} The widgets in account data, or an empty array.
   */


  _createClass(WidgetParser, null, [{
    key: "parseAccountData",
    value: function parseAccountData(content) {
      if (!content) return [];
      var result = [];

      for (var _i = 0, _Object$keys = Object.keys(content); _i < _Object$keys.length; _i++) {
        var _widgetId = _Object$keys[_i];
        var roughWidget = content[_widgetId];
        if (!roughWidget) continue;
        if (roughWidget.type !== "m.widget" && roughWidget.type !== "im.vector.modular.widgets") continue;
        if (!roughWidget.sender) continue;
        var probableWidgetId = roughWidget.state_key || roughWidget.id;
        if (probableWidgetId !== _widgetId) continue;
        var asStateEvent = {
          content: roughWidget.content,
          sender: roughWidget.sender,
          type: "m.widget",
          state_key: _widgetId,
          event_id: "$example",
          room_id: "!example",
          origin_server_ts: 1
        };
        var widget = WidgetParser.parseRoomWidget(asStateEvent);
        if (widget) result.push(widget);
      }

      return result;
    }
    /**
     * Parses all the widgets possible in the given array. This will always return
     * an array, though may be empty if no widgets could be parsed.
     * @param {IStateEvent[]} currentState The room state to parse.
     * @returns {Widget[]} The widgets in the state, or an empty array.
     */

  }, {
    key: "parseWidgetsFromRoomState",
    value: function parseWidgetsFromRoomState(currentState) {
      if (!currentState) return [];
      var result = [];

      var _iterator = _createForOfIteratorHelper(currentState),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var state = _step.value;
          var widget = WidgetParser.parseRoomWidget(state);
          if (widget) result.push(widget);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }
    /**
     * Parses a state event into a widget. If the state event does not represent
     * a widget (wrong event type, invalid widget, etc) then null is returned.
     * @param {IStateEvent} stateEvent The state event.
     * @returns {Widget|null} The widget, or null if invalid
     */

  }, {
    key: "parseRoomWidget",
    value: function parseRoomWidget(stateEvent) {
      if (!stateEvent) return null; // TODO: [Legacy] Remove legacy support

      if (stateEvent.type !== "m.widget" && stateEvent.type !== "im.vector.modular.widgets") {
        return null;
      } // Dev note: Throughout this function we have null safety to ensure that
      // if the caller did not supply something useful that we don't error. This
      // is done against the requirements of the interface because not everyone
      // will have an interface to validate against.


      var content = stateEvent.content || {}; // Form our best approximation of a widget with the information we have

      var estimatedWidget = {
        id: stateEvent.state_key,
        creatorUserId: content['creatorUserId'] || stateEvent.sender,
        name: content['name'],
        type: content['type'],
        url: content['url'],
        waitForIframeLoad: content['waitForIframeLoad'],
        data: content['data']
      }; // Finally, process that widget

      return WidgetParser.processEstimatedWidget(estimatedWidget);
    }
  }, {
    key: "processEstimatedWidget",
    value: function processEstimatedWidget(widget) {
      // Validate that the widget has the best chance of passing as a widget
      if (!widget.id || !widget.creatorUserId || !widget.type) {
        return null;
      }

      if (!(0, _url.isValidUrl)(widget.url)) {
        return null;
      } // TODO: Validate data for known widget types


      return new _Widget.Widget(widget);
    }
  }]);

  return WidgetParser;
}();

exports.WidgetParser = WidgetParser;
},{"./Widget":36,"./validation/url":39}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidUrl = isValidUrl;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isValidUrl(val) {
  if (!val) return false; // easy: not valid if not present

  try {
    var parsed = new URL(val);

    if (parsed.protocol !== "http" && parsed.protocol !== "https") {
      return false;
    }

    return true;
  } catch (e) {
    if (e instanceof TypeError) {
      return false;
    }

    throw e;
  }
}
},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertPresent = assertPresent;

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function assertPresent(obj, key) {
  if (!obj[key]) {
    throw new Error("".concat(key, " is required"));
  }
}
},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTemplate = runTemplate;
exports.toString = toString;

/*
 * Copyright 2020, 2021 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function runTemplate(url, widget, params) {
  // Always apply the supplied params over top of data to ensure the data can't lie about them.
  var variables = Object.assign({}, widget.data, {
    'matrix_room_id': params.widgetRoomId || "",
    'matrix_user_id': params.currentUserId,
    'matrix_display_name': params.userDisplayName || params.currentUserId,
    'matrix_avatar_url': params.userHttpAvatarUrl || "",
    'matrix_widget_id': widget.id,
    // TODO: Convert to stable (https://github.com/matrix-org/matrix-doc/pull/2873)
    'org.matrix.msc2873.client_id': params.clientId || "",
    'org.matrix.msc2873.client_theme': params.clientTheme || "",
    'org.matrix.msc2873.client_language': params.clientLanguage || ""
  });
  var result = url;

  for (var _i = 0, _Object$keys = Object.keys(variables); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    // Regex escape from https://stackoverflow.com/a/6969486/7037379
    var pattern = "$".concat(key).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

    var rexp = new RegExp(pattern, 'g'); // This is technically not what we're supposed to do for a couple reasons:
    // 1. We are assuming that there won't later be a $key match after we replace a variable.
    // 2. We are assuming that the variable is in a place where it can be escaped (eg: path or query string).

    result = result.replace(rexp, encodeURIComponent(toString(variables[key])));
  }

  return result;
}

function toString(a) {
  if (a === null || a === undefined) {
    return "".concat(a);
  }

  return a.toString();
}
},{}],42:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostmessageTransport = void 0;

var _events = require("events");

var _ = require("..");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Transport for the Widget API over postMessage.
 */
var PostmessageTransport = /*#__PURE__*/function (_EventEmitter) {
  _inherits(PostmessageTransport, _EventEmitter);

  var _super = _createSuper(PostmessageTransport);

  _createClass(PostmessageTransport, [{
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }, {
    key: "widgetId",
    get: function get() {
      return this._widgetId || null;
    }
  }]);

  function PostmessageTransport(sendDirection, initialWidgetId, transportWindow, inboundWindow) {
    var _this;

    _classCallCheck(this, PostmessageTransport);

    _this = _super.call(this);
    _this.sendDirection = sendDirection;
    _this.initialWidgetId = initialWidgetId;
    _this.transportWindow = transportWindow;
    _this.inboundWindow = inboundWindow;

    _defineProperty(_assertThisInitialized(_this), "strictOriginCheck", void 0);

    _defineProperty(_assertThisInitialized(_this), "targetOrigin", void 0);

    _defineProperty(_assertThisInitialized(_this), "timeoutSeconds", 10);

    _defineProperty(_assertThisInitialized(_this), "_ready", false);

    _defineProperty(_assertThisInitialized(_this), "_widgetId", null);

    _defineProperty(_assertThisInitialized(_this), "outboundRequests", new Map());

    _defineProperty(_assertThisInitialized(_this), "isStopped", false);

    _this._widgetId = initialWidgetId;
    return _this;
  }

  _createClass(PostmessageTransport, [{
    key: "sendInternal",
    value: function sendInternal(message) {
      var targetOrigin = this.targetOrigin || '*';
      console.log("[PostmessageTransport] Sending object to ".concat(targetOrigin, ": "), message);
      this.transportWindow.postMessage(message, targetOrigin);
    }
  }, {
    key: "reply",
    value: function reply(request, responseData) {
      return this.sendInternal(_objectSpread(_objectSpread({}, request), {}, {
        response: responseData
      }));
    }
  }, {
    key: "send",
    value: function send(action, data) {
      return this.sendComplete(action, data).then(function (r) {
        return r.response;
      });
    }
  }, {
    key: "sendComplete",
    value: function sendComplete(action, data) {
      var _this2 = this;

      if (!this.ready || !this.widgetId) {
        return Promise.reject(new Error("Not ready or unknown widget ID"));
      }

      var request = {
        api: this.sendDirection,
        widgetId: this.widgetId,
        requestId: this.nextRequestId,
        action: action,
        data: data
      };

      if (action === _.WidgetApiToWidgetAction.UpdateVisibility) {
        // XXX: This is for Scalar support
        // TODO: Fix scalar
        request['visible'] = data['visible'];
      }

      return new Promise(function (prResolve, reject) {
        var timerId = setTimeout(function () {
          var req = _this2.outboundRequests.get(request.requestId);

          if (!req) return; // it finished!

          _this2.outboundRequests["delete"](request.requestId);

          req.reject(new Error("Request timed out"));
        }, (_this2.timeoutSeconds || 1) * 1000);

        var resolve = function resolve(r) {
          return prResolve(r);
        };

        _this2.outboundRequests.set(request.requestId, {
          request: request,
          resolve: resolve,
          reject: reject,
          timerId: timerId
        });

        _this2.sendInternal(request);
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      this.inboundWindow.addEventListener("message", function (ev) {
        _this3.handleMessage(ev);
      });
      this._ready = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      this._ready = false;
      this.isStopped = true;
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(ev) {
      if (this.isStopped) return;
      if (!ev.data) return; // invalid event

      if (this.strictOriginCheck && ev.origin !== window.origin) return; // bad origin
      // treat the message as a response first, then downgrade to a request

      var response = ev.data;
      if (!response.action || !response.requestId || !response.widgetId) return; // invalid request/response

      if (!response.response) {
        // it's a request
        var request = response;
        if (request.api !== (0, _.invertedDirection)(this.sendDirection)) return; // wrong direction

        this.handleRequest(request);
      } else {
        // it's a response
        if (response.api !== this.sendDirection) return; // wrong direction

        this.handleResponse(response);
      }
    }
  }, {
    key: "handleRequest",
    value: function handleRequest(request) {
      if (this.widgetId) {
        if (this.widgetId !== request.widgetId) return; // wrong widget
      } else {
        this._widgetId = request.widgetId;
      }

      this.emit("message", new CustomEvent("message", {
        detail: request
      }));
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(response) {
      if (response.widgetId !== this.widgetId) return; // wrong widget

      var req = this.outboundRequests.get(response.requestId);
      if (!req) return; // response to an unknown request

      this.outboundRequests["delete"](response.requestId);
      clearTimeout(req.timerId);

      if ((0, _.isErrorResponse)(response.response)) {
        var _err = response.response;
        req.reject(new Error(_err.error.message));
      } else {
        req.resolve(response);
      }
    }
  }, {
    key: "nextRequestId",
    get: function get() {
      var idBase = "widgetapi-".concat(Date.now());
      var index = 0;
      var id = idBase;

      while (this.outboundRequests.has(id)) {
        id = "".concat(idBase, "-").concat(index++);
      } // reserve the ID


      this.outboundRequests.set(id, null);
      return id;
    }
  }]);

  return PostmessageTransport;
}(_events.EventEmitter);

exports.PostmessageTransport = PostmessageTransport;
},{"..":5,"events":45}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleObservable = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2020 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SimpleObservable = /*#__PURE__*/function () {
  function SimpleObservable(initialFn) {
    _classCallCheck(this, SimpleObservable);

    _defineProperty(this, "listeners", []);

    if (initialFn) this.listeners.push(initialFn);
  }

  _createClass(SimpleObservable, [{
    key: "onUpdate",
    value: function onUpdate(fn) {
      this.listeners.push(fn);
    }
  }, {
    key: "update",
    value: function update(val) {
      var _iterator = _createForOfIteratorHelper(this.listeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener(val);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.listeners = []; // reset
    }
  }]);

  return SimpleObservable;
}();

exports.SimpleObservable = SimpleObservable;
},{}],45:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}

},{}]},{},[5])(5)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQ2xpZW50V2lkZ2V0QXBpLmpzIiwibGliL1N5bWJvbHMuanMiLCJsaWIvV2lkZ2V0QXBpLmpzIiwibGliL2RyaXZlci9XaWRnZXREcml2ZXIuanMiLCJsaWIvaW5kZXguanMiLCJsaWIvaW50ZXJmYWNlcy9BcGlWZXJzaW9uLmpzIiwibGliL2ludGVyZmFjZXMvQ2FwYWJpbGl0aWVzLmpzIiwibGliL2ludGVyZmFjZXMvQ2FwYWJpbGl0aWVzQWN0aW9uLmpzIiwibGliL2ludGVyZmFjZXMvR2V0T3BlbklEQWN0aW9uLmpzIiwibGliL2ludGVyZmFjZXMvSVdpZGdldEFwaUVycm9yUmVzcG9uc2UuanMiLCJsaWIvaW50ZXJmYWNlcy9Nb2RhbEJ1dHRvbktpbmQuanMiLCJsaWIvaW50ZXJmYWNlcy9Nb2RhbFdpZGdldEFjdGlvbnMuanMiLCJsaWIvaW50ZXJmYWNlcy9XaWRnZXRBcGlBY3Rpb24uanMiLCJsaWIvaW50ZXJmYWNlcy9XaWRnZXRBcGlEaXJlY3Rpb24uanMiLCJsaWIvaW50ZXJmYWNlcy9XaWRnZXRLaW5kLmpzIiwibGliL2ludGVyZmFjZXMvV2lkZ2V0VHlwZS5qcyIsImxpYi9tb2RlbHMvV2lkZ2V0LmpzIiwibGliL21vZGVscy9XaWRnZXRFdmVudENhcGFiaWxpdHkuanMiLCJsaWIvbW9kZWxzL1dpZGdldFBhcnNlci5qcyIsImxpYi9tb2RlbHMvdmFsaWRhdGlvbi91cmwuanMiLCJsaWIvbW9kZWxzL3ZhbGlkYXRpb24vdXRpbHMuanMiLCJsaWIvdGVtcGxhdGluZy91cmwtdGVtcGxhdGUuanMiLCJsaWIvdHJhbnNwb3J0L1Bvc3RtZXNzYWdlVHJhbnNwb3J0LmpzIiwibGliL3V0aWwvU2ltcGxlT2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMXBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ2xpZW50V2lkZ2V0QXBpID0gdm9pZCAwO1xuXG52YXIgX2V2ZW50cyA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5cbnZhciBfUG9zdG1lc3NhZ2VUcmFuc3BvcnQgPSByZXF1aXJlKFwiLi90cmFuc3BvcnQvUG9zdG1lc3NhZ2VUcmFuc3BvcnRcIik7XG5cbnZhciBfV2lkZ2V0QXBpRGlyZWN0aW9uID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9XaWRnZXRBcGlEaXJlY3Rpb25cIik7XG5cbnZhciBfV2lkZ2V0QXBpQWN0aW9uID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9XaWRnZXRBcGlBY3Rpb25cIik7XG5cbnZhciBfQ2FwYWJpbGl0aWVzID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9DYXBhYmlsaXRpZXNcIik7XG5cbnZhciBfQXBpVmVyc2lvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvQXBpVmVyc2lvblwiKTtcblxudmFyIF9XaWRnZXRFdmVudENhcGFiaWxpdHkgPSByZXF1aXJlKFwiLi9tb2RlbHMvV2lkZ2V0RXZlbnRDYXBhYmlsaXR5XCIpO1xuXG52YXIgX0dldE9wZW5JREFjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvR2V0T3BlbklEQWN0aW9uXCIpO1xuXG52YXIgX1NpbXBsZU9ic2VydmFibGUgPSByZXF1aXJlKFwiLi91dGlsL1NpbXBsZU9ic2VydmFibGVcIik7XG5cbnZhciBfU3ltYm9scyA9IHJlcXVpcmUoXCIuL1N5bWJvbHNcIik7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFtcInJldHVyblwiXSAhPSBudWxsKSBpdFtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbi8qKlxuICogQVBJIGhhbmRsZXIgZm9yIHRoZSBjbGllbnQgc2lkZSBvZiB3aWRnZXRzLiBUaGlzIHJhaXNlcyBldmVudHNcbiAqIGZvciBlYWNoIGFjdGlvbiByZWNlaXZlZCBhcyBgYWN0aW9uOiR7YWN0aW9ufWAgKGVnOiBcImFjdGlvbjpzY3JlZW5zaG90XCIpLlxuICogRGVmYXVsdCBoYW5kbGluZyBjYW4gYmUgcHJldmVudGVkIGJ5IHVzaW5nIHByZXZlbnREZWZhdWx0KCkgb24gdGhlXG4gKiByYWlzZWQgZXZlbnQuIFRoZSBkZWZhdWx0IGhhbmRsaW5nIHZhcmllcyBmb3IgZWFjaCBhY3Rpb246IG9uZXNcbiAqIHdoaWNoIHRoZSBTREsgY2FuIGhhbmRsZSBzYWZlbHkgYXJlIGFja25vd2xlZGdlZCBhcHByb3ByaWF0ZWx5IGFuZFxuICogb25lcyB3aGljaCBhcmUgdW5oYW5kbGVkIChjdXN0b20gb3IgcmVxdWlyZSB0aGUgY2xpZW50IHRvIGRvIHNvbWV0aGluZylcbiAqIGFyZSByZWplY3RlZCB3aXRoIGFuIGVycm9yLlxuICpcbiAqIEV2ZW50cyB3aGljaCBhcmUgcHJldmVudERlZmF1bHQoKWVkIG11c3QgcmVwbHkgdXNpbmcgdGhlIHRyYW5zcG9ydC5cbiAqIFRoZSBldmVudHMgcmFpc2VkIHdpbGwgaGF2ZSBhIGRlZmF1bHQgb2YgYW4gSVdpZGdldEFwaVJlcXVlc3RcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBXaGVuIHRoZSBDbGllbnRXaWRnZXRBcGkgaXMgcmVhZHkgdG8gc3RhcnQgc2VuZGluZyByZXF1ZXN0cywgaXQgd2lsbFxuICogcmFpc2UgYSBcInJlYWR5XCIgQ3VzdG9tRXZlbnQuIEFmdGVyIHRoZSByZWFkeSBldmVudCBmaXJlcywgYWN0aW9ucyBjYW5cbiAqIGJlIHNlbnQgYW5kIHRoZSB0cmFuc3BvcnQgd2lsbCBiZSByZWFkeS5cbiAqXG4gKiBXaGVuIHRoZSB3aWRnZXQgaGFzIGluZGljYXRlZCBpdCBoYXMgbG9hZGVkLCB0aGlzIGNsYXNzIHJhaXNlcyBhXG4gKiBcInByZXBhcmluZ1wiIEN1c3RvbUV2ZW50LiBUaGUgcHJlcGFyaW5nIGV2ZW50IGRvZXMgbm90IGluZGljYXRlIHRoYXRcbiAqIHRoZSB3aWRnZXQgaXMgcmVhZHkgdG8gcmVjZWl2ZSBjb21tdW5pY2F0aW9ucyAtIHRoYXQgaXMgc2lnbmlmaWVkIGJ5XG4gKiB0aGUgcmVhZHkgZXZlbnQgZXhjbHVzaXZlbHkuXG4gKlxuICogVGhpcyBjbGFzcyBvbmx5IGhhbmRsZXMgb25lIHdpZGdldCBhdCBhIHRpbWUuXG4gKi9cbnZhciBDbGllbnRXaWRnZXRBcGkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKENsaWVudFdpZGdldEFwaSwgX0V2ZW50RW1pdHRlcik7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihDbGllbnRXaWRnZXRBcGkpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNsaWVudCB3aWRnZXQgQVBJLiBUaGlzIHdpbGwgaW5zdGFudGlhdGUgdGhlIHRyYW5zcG9ydFxuICAgKiBhbmQgc3RhcnQgZXZlcnl0aGluZy4gV2hlbiB0aGUgaWZyYW1lIGlzIGxvYWRlZCB1bmRlciB0aGUgd2lkZ2V0J3NcbiAgICogY29uZGl0aW9ucywgYSBcInJlYWR5XCIgZXZlbnQgd2lsbCBiZSByYWlzZWQuXG4gICAqIEBwYXJhbSB7V2lkZ2V0fSB3aWRnZXQgVGhlIHdpZGdldCB0byBjb21tdW5pY2F0ZSB3aXRoLlxuICAgKiBAcGFyYW0ge0hUTUxJRnJhbWVFbGVtZW50fSBpZnJhbWUgVGhlIGlmcmFtZSB0aGUgd2lkZ2V0IGlzIGluLlxuICAgKiBAcGFyYW0ge1dpZGdldERyaXZlcn0gZHJpdmVyIFRoZSBkcml2ZXIgZm9yIHRoaXMgd2lkZ2V0L2NsaWVudC5cbiAgICovXG4gIGZ1bmN0aW9uIENsaWVudFdpZGdldEFwaSh3aWRnZXQsIGlmcmFtZSwgZHJpdmVyKSB7XG4gICAgdmFyIF9pZnJhbWU7XG5cbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2xpZW50V2lkZ2V0QXBpKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgX3RoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuICAgIF90aGlzLmlmcmFtZSA9IGlmcmFtZTtcbiAgICBfdGhpcy5kcml2ZXIgPSBkcml2ZXI7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwidHJhbnNwb3J0XCIsIHZvaWQgMCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiY2FwYWJpbGl0aWVzRmluaXNoZWRcIiwgZmFsc2UpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImFsbG93ZWRDYXBhYmlsaXRpZXNcIiwgbmV3IFNldCgpKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJhbGxvd2VkRXZlbnRzXCIsIFtdKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJpc1N0b3BwZWRcIiwgZmFsc2UpO1xuXG4gICAgaWYgKCEoKF9pZnJhbWUgPSBpZnJhbWUpID09PSBudWxsIHx8IF9pZnJhbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9pZnJhbWUuY29udGVudFdpbmRvdykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGlmcmFtZSBzdXBwbGllZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpZGdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB3aWRnZXRcIik7XG4gICAgfVxuXG4gICAgaWYgKCFkcml2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZHJpdmVyXCIpO1xuICAgIH1cblxuICAgIF90aGlzLnRyYW5zcG9ydCA9IG5ldyBfUG9zdG1lc3NhZ2VUcmFuc3BvcnQuUG9zdG1lc3NhZ2VUcmFuc3BvcnQoX1dpZGdldEFwaURpcmVjdGlvbi5XaWRnZXRBcGlEaXJlY3Rpb24uVG9XaWRnZXQsIHdpZGdldC5pZCwgaWZyYW1lLmNvbnRlbnRXaW5kb3csIHdpbmRvdyk7XG4gICAgX3RoaXMudHJhbnNwb3J0LnRhcmdldE9yaWdpbiA9IHdpZGdldC5vcmlnaW47XG5cbiAgICBfdGhpcy50cmFuc3BvcnQub24oXCJtZXNzYWdlXCIsIF90aGlzLmhhbmRsZU1lc3NhZ2UuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSkpO1xuXG4gICAgaWYgKHdpZGdldC53YWl0Rm9ySWZyYW1lTG9hZCkge1xuICAgICAgaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIF90aGlzLm9uSWZyYW1lTG9hZC5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG4gICAgfVxuXG4gICAgX3RoaXMudHJhbnNwb3J0LnN0YXJ0KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ2xpZW50V2lkZ2V0QXBpLCBbe1xuICAgIGtleTogXCJoYXNDYXBhYmlsaXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0NhcGFiaWxpdHkoY2FwYWJpbGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWxsb3dlZENhcGFiaWxpdGllcy5oYXMoY2FwYWJpbGl0eSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNhblVzZVJvb21UaW1lbGluZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5Vc2VSb29tVGltZWxpbmUocm9vbUlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNDYXBhYmlsaXR5KFwib3JnLm1hdHJpeC5tc2MyNzYyLnRpbWVsaW5lOlwiLmNvbmNhdChfU3ltYm9scy5TeW1ib2xzLkFueVJvb20pKSB8fCB0aGlzLmhhc0NhcGFiaWxpdHkoXCJvcmcubWF0cml4Lm1zYzI3NjIudGltZWxpbmU6XCIuY29uY2F0KHJvb21JZCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjYW5TZW5kUm9vbUV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhblNlbmRSb29tRXZlbnQoZXZlbnRUeXBlKSB7XG4gICAgICB2YXIgbXNndHlwZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIHJldHVybiB0aGlzLmFsbG93ZWRFdmVudHMuc29tZShmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZS5tYXRjaGVzQXNSb29tRXZlbnQoZXZlbnRUeXBlLCBtc2d0eXBlKSAmJiBlLmRpcmVjdGlvbiA9PT0gX1dpZGdldEV2ZW50Q2FwYWJpbGl0eS5FdmVudERpcmVjdGlvbi5TZW5kO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNhblNlbmRTdGF0ZUV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhblNlbmRTdGF0ZUV2ZW50KGV2ZW50VHlwZSwgc3RhdGVLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmFsbG93ZWRFdmVudHMuc29tZShmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZS5tYXRjaGVzQXNTdGF0ZUV2ZW50KGV2ZW50VHlwZSwgc3RhdGVLZXkpICYmIGUuZGlyZWN0aW9uID09PSBfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LkV2ZW50RGlyZWN0aW9uLlNlbmQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2FuUmVjZWl2ZVJvb21FdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5SZWNlaXZlUm9vbUV2ZW50KGV2ZW50VHlwZSkge1xuICAgICAgdmFyIG1zZ3R5cGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gICAgICByZXR1cm4gdGhpcy5hbGxvd2VkRXZlbnRzLnNvbWUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGUubWF0Y2hlc0FzUm9vbUV2ZW50KGV2ZW50VHlwZSwgbXNndHlwZSkgJiYgZS5kaXJlY3Rpb24gPT09IF9XaWRnZXRFdmVudENhcGFiaWxpdHkuRXZlbnREaXJlY3Rpb24uUmVjZWl2ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjYW5SZWNlaXZlU3RhdGVFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5SZWNlaXZlU3RhdGVFdmVudChldmVudFR5cGUsIHN0YXRlS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5hbGxvd2VkRXZlbnRzLnNvbWUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGUubWF0Y2hlc0FzU3RhdGVFdmVudChldmVudFR5cGUsIHN0YXRlS2V5KSAmJiBlLmRpcmVjdGlvbiA9PT0gX1dpZGdldEV2ZW50Q2FwYWJpbGl0eS5FdmVudERpcmVjdGlvbi5SZWNlaXZlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0b3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnNwb3J0LnN0b3AoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25JZnJhbWVMb2FkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uSWZyYW1lTG9hZChldikge1xuICAgICAgdGhpcy5iZWdpbkNhcGFiaWxpdGllcygpOyAvLyBXZSBkb24ndCBuZWVkIHRoZSBsaXN0ZW5lciBhbnltb3JlXG5cbiAgICAgIHRoaXMuaWZyYW1lLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvbmxvYWRcIiwgdGhpcy5vbklmcmFtZUxvYWQuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJlZ2luQ2FwYWJpbGl0aWVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJlZ2luQ2FwYWJpbGl0aWVzKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLmNhcGFiaWxpdGllc0ZpbmlzaGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhcGFiaWxpdGllcyBleGNoYW5nZSBhbHJlYWR5IGNvbXBsZXRlZFwiKTtcbiAgICAgIH0gLy8gd2lkZ2V0IGhhcyBsb2FkZWQgLSB0ZWxsIGFsbCB0aGUgbGlzdGVuZXJzIHRoYXRcblxuXG4gICAgICB0aGlzLmVtaXQoXCJwcmVwYXJpbmdcIik7XG4gICAgICB2YXIgcmVxdWVzdGVkQ2FwcztcbiAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5DYXBhYmlsaXRpZXMsIHt9KS50aGVuKGZ1bmN0aW9uIChjYXBzKSB7XG4gICAgICAgIHJlcXVlc3RlZENhcHMgPSBjYXBzLmNhcGFiaWxpdGllcztcbiAgICAgICAgcmV0dXJuIF90aGlzMi5kcml2ZXIudmFsaWRhdGVDYXBhYmlsaXRpZXMobmV3IFNldChjYXBzLmNhcGFiaWxpdGllcykpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoYWxsb3dlZENhcHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXaWRnZXQgXCIuY29uY2F0KF90aGlzMi53aWRnZXQuaWQsIFwiIGlzIGFsbG93ZWQgY2FwYWJpbGl0aWVzOlwiKSwgQXJyYXkuZnJvbShhbGxvd2VkQ2FwcykpO1xuICAgICAgICBfdGhpczIuYWxsb3dlZENhcGFiaWxpdGllcyA9IGFsbG93ZWRDYXBzO1xuICAgICAgICBfdGhpczIuYWxsb3dlZEV2ZW50cyA9IF9XaWRnZXRFdmVudENhcGFiaWxpdHkuV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LmZpbmRFdmVudENhcGFiaWxpdGllcyhhbGxvd2VkQ2Fwcyk7XG4gICAgICAgIF90aGlzMi5jYXBhYmlsaXRpZXNGaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgICAgX3RoaXMyLm5vdGlmeUNhcGFiaWxpdGllcyhyZXF1ZXN0ZWRDYXBzKTtcblxuICAgICAgICBfdGhpczIuZW1pdChcInJlYWR5XCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5vdGlmeUNhcGFiaWxpdGllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBub3RpZnlDYXBhYmlsaXRpZXMocmVxdWVzdGVkKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLk5vdGlmeUNhcGFiaWxpdGllcywge1xuICAgICAgICByZXF1ZXN0ZWQ6IHJlcXVlc3RlZCxcbiAgICAgICAgYXBwcm92ZWQ6IEFycmF5LmZyb20odGhpcy5hbGxvd2VkQ2FwYWJpbGl0aWVzKVxuICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJub24tZmF0YWwgZXJyb3Igbm90aWZ5aW5nIHdpZGdldCBvZiBhcHByb3ZlZCBjYXBhYmlsaXRpZXM6XCIsIGUpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMy5lbWl0KFwiY2FwYWJpbGl0aWVzTm90aWZpZWRcIik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlQ29udGVudExvYWRlZEFjdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDb250ZW50TG9hZGVkQWN0aW9uKGFjdGlvbikge1xuICAgICAgaWYgKHRoaXMud2lkZ2V0LndhaXRGb3JJZnJhbWVMb2FkKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnJlcGx5KGFjdGlvbiwge1xuICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIkltcHJvcGVyIHNlcXVlbmNlOiBub3QgZXhwZWN0aW5nIGxvYWQgZXZlbnRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZXBseShhY3Rpb24sIHt9KTtcbiAgICAgICAgdGhpcy5iZWdpbkNhcGFiaWxpdGllcygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXBseVZlcnNpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcGx5VmVyc2lvbnMocmVxdWVzdCkge1xuICAgICAgdGhpcy50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwge1xuICAgICAgICBzdXBwb3J0ZWRfdmVyc2lvbnM6IF9BcGlWZXJzaW9uLkN1cnJlbnRBcGlWZXJzaW9uc1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhbmRsZUNhcGFiaWxpdGllc1JlbmVnb3RpYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNhcGFiaWxpdGllc1JlbmVnb3RpYXRlKHJlcXVlc3QpIHtcbiAgICAgIHZhciBfcmVxdWVzdCRkYXRhLFxuICAgICAgICAgIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIC8vIGFja25vd2xlZGdlIGZpcnN0XG4gICAgICB0aGlzLnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7fSk7XG4gICAgICB2YXIgcmVxdWVzdGVkID0gKChfcmVxdWVzdCRkYXRhID0gcmVxdWVzdC5kYXRhKSA9PT0gbnVsbCB8fCBfcmVxdWVzdCRkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcmVxdWVzdCRkYXRhLmNhcGFiaWxpdGllcykgfHwgW107XG4gICAgICB2YXIgbmV3bHlSZXF1ZXN0ZWQgPSBuZXcgU2V0KHJlcXVlc3RlZC5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgcmV0dXJuICFfdGhpczQuaGFzQ2FwYWJpbGl0eShyKTtcbiAgICAgIH0pKTtcblxuICAgICAgaWYgKG5ld2x5UmVxdWVzdGVkLnNpemUgPT09IDApIHtcbiAgICAgICAgLy8gTm90aGluZyB0byBkbyAtIG5vdGlmeSBjYXBhYmlsaXRpZXNcbiAgICAgICAgcmV0dXJuIHRoaXMubm90aWZ5Q2FwYWJpbGl0aWVzKFtdKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcml2ZXIudmFsaWRhdGVDYXBhYmlsaXRpZXMobmV3bHlSZXF1ZXN0ZWQpLnRoZW4oZnVuY3Rpb24gKGFsbG93ZWQpIHtcbiAgICAgICAgYWxsb3dlZC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNC5hbGxvd2VkQ2FwYWJpbGl0aWVzLmFkZChjKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGFsbG93ZWRFdmVudHMgPSBfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LldpZGdldEV2ZW50Q2FwYWJpbGl0eS5maW5kRXZlbnRDYXBhYmlsaXRpZXMoYWxsb3dlZCk7XG5cbiAgICAgICAgYWxsb3dlZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNC5hbGxvd2VkRXZlbnRzLnB1c2goYyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX3RoaXM0Lm5vdGlmeUNhcGFiaWxpdGllcyhBcnJheS5mcm9tKG5ld2x5UmVxdWVzdGVkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlTmF2aWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTmF2aWdhdGUocmVxdWVzdCkge1xuICAgICAgdmFyIF9yZXF1ZXN0JGRhdGEyLFxuICAgICAgICAgIF9yZXF1ZXN0JGRhdGEzLFxuICAgICAgICAgIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGlmICghdGhpcy5oYXNDYXBhYmlsaXR5KF9DYXBhYmlsaXRpZXMuTWF0cml4Q2FwYWJpbGl0aWVzLk1TQzI5MzFOYXZpZ2F0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJNaXNzaW5nIGNhcGFiaWxpdHlcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghKChfcmVxdWVzdCRkYXRhMiA9IHJlcXVlc3QuZGF0YSkgPT09IG51bGwgfHwgX3JlcXVlc3QkZGF0YTIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9yZXF1ZXN0JGRhdGEyLnVyaSkgfHwgISgoX3JlcXVlc3QkZGF0YTMgPSByZXF1ZXN0LmRhdGEpID09PSBudWxsIHx8IF9yZXF1ZXN0JGRhdGEzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcmVxdWVzdCRkYXRhMy51cmkudG9TdHJpbmcoKS5zdGFydHNXaXRoKFwiaHR0cHM6Ly9tYXRyaXgudG8vI1wiKSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJJbnZhbGlkIG1hdHJpeC50byBVUklcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBvbkVyciA9IGZ1bmN0aW9uIG9uRXJyKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltDbGllbnRXaWRnZXRBcGldIEZhaWxlZCB0byBoYW5kbGUgbmF2aWdhdGlvbjogXCIsIGUpO1xuICAgICAgICByZXR1cm4gX3RoaXM1LnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRXJyb3IgaGFuZGxpbmcgbmF2aWdhdGlvblwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZHJpdmVyLm5hdmlnYXRlKHJlcXVlc3QuZGF0YS51cmkudG9TdHJpbmcoKSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiBvbkVycihlKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNS50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwge30pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIG9uRXJyKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVPSURDXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU9JREMocmVxdWVzdCkge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIHZhciBwaGFzZSA9IDE7IC8vIDEgPSBpbml0aWFsIHJlcXVlc3QsIDIgPSBhZnRlciB1c2VyIG1hbnVhbCBjb25maXJtYXRpb25cblxuICAgICAgdmFyIHJlcGx5U3RhdGUgPSBmdW5jdGlvbiByZXBseVN0YXRlKHN0YXRlLCBjcmVkZW50aWFsKSB7XG4gICAgICAgIGNyZWRlbnRpYWwgPSBjcmVkZW50aWFsIHx8IHt9O1xuXG4gICAgICAgIGlmIChwaGFzZSA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM2LnRyYW5zcG9ydC5zZW5kKF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpVG9XaWRnZXRBY3Rpb24uT3BlbklEQ3JlZGVudGlhbHMsIF9vYmplY3RTcHJlYWQoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgb3JpZ2luYWxfcmVxdWVzdF9pZDogcmVxdWVzdC5yZXF1ZXN0SWRcbiAgICAgICAgICB9LCBjcmVkZW50aWFsKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNi50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwgX29iamVjdFNwcmVhZCh7XG4gICAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgICB9LCBjcmVkZW50aWFsKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciByZXBseUVycm9yID0gZnVuY3Rpb24gcmVwbHlFcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltDbGllbnRXaWRnZXRBcGldIEZhaWxlZCB0byBoYW5kbGUgT0lEQzogXCIsIG1zZyk7XG5cbiAgICAgICAgaWYgKHBoYXNlID4gMSkge1xuICAgICAgICAgIC8vIFdlIGRvbid0IGhhdmUgYSB3YXkgdG8gaW5kaWNhdGUgdGhhdCBhIHJhbmRvbSBlcnJvciBoYXBwZW5lZCBpbiB0aGlzIGZsb3csIHNvXG4gICAgICAgICAgLy8ganVzdCBibG9jayB0aGUgYXR0ZW1wdC5cbiAgICAgICAgICByZXR1cm4gcmVwbHlTdGF0ZShfR2V0T3BlbklEQWN0aW9uLk9wZW5JRFJlcXVlc3RTdGF0ZS5CbG9ja2VkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM2LnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIG9ic2VydmVyID0gbmV3IF9TaW1wbGVPYnNlcnZhYmxlLlNpbXBsZU9ic2VydmFibGUoZnVuY3Rpb24gKHVwZGF0ZSkge1xuICAgICAgICBpZiAodXBkYXRlLnN0YXRlID09PSBfR2V0T3BlbklEQWN0aW9uLk9wZW5JRFJlcXVlc3RTdGF0ZS5QZW5kaW5nVXNlckNvbmZpcm1hdGlvbiAmJiBwaGFzZSA+IDEpIHtcbiAgICAgICAgICBvYnNlcnZlci5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybiByZXBseUVycm9yKFwiY2xpZW50IHByb3ZpZGVkIG91dC1vZi1waGFzZSByZXNwb25zZSB0byBPSURDIGZsb3dcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXBkYXRlLnN0YXRlID09PSBfR2V0T3BlbklEQWN0aW9uLk9wZW5JRFJlcXVlc3RTdGF0ZS5QZW5kaW5nVXNlckNvbmZpcm1hdGlvbikge1xuICAgICAgICAgIHJlcGx5U3RhdGUodXBkYXRlLnN0YXRlKTtcbiAgICAgICAgICBwaGFzZSsrO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cGRhdGUuc3RhdGUgPT09IF9HZXRPcGVuSURBY3Rpb24uT3BlbklEUmVxdWVzdFN0YXRlLkFsbG93ZWQgJiYgIXVwZGF0ZS50b2tlbikge1xuICAgICAgICAgIHJldHVybiByZXBseUVycm9yKFwiY2xpZW50IHByb3ZpZGVkIGludmFsaWQgT0lEQyB0b2tlbiBmb3IgYW4gYWxsb3dlZCByZXF1ZXN0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVwZGF0ZS5zdGF0ZSA9PT0gX0dldE9wZW5JREFjdGlvbi5PcGVuSURSZXF1ZXN0U3RhdGUuQmxvY2tlZCkge1xuICAgICAgICAgIHVwZGF0ZS50b2tlbiA9IG51bGw7IC8vIGp1c3QgaW4gY2FzZSB0aGUgY2xpZW50IGRpZCBzb21ldGhpbmcgd2VpcmRcbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVyLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiByZXBseVN0YXRlKHVwZGF0ZS5zdGF0ZSwgdXBkYXRlLnRva2VuKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcml2ZXIuYXNrT3BlbklEKG9ic2VydmVyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlUmVhZEV2ZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVSZWFkRXZlbnRzKHJlcXVlc3QpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICBpZiAoIXJlcXVlc3QuZGF0YS50eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCByZXF1ZXN0IC0gbWlzc2luZyBldmVudCB0eXBlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVxdWVzdC5kYXRhLmxpbWl0ICE9PSB1bmRlZmluZWQgJiYgKCFyZXF1ZXN0LmRhdGEubGltaXQgfHwgcmVxdWVzdC5kYXRhLmxpbWl0IDwgMCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJJbnZhbGlkIHJlcXVlc3QgLSBsaW1pdCBvdXQgb2YgcmFuZ2VcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhc2tSb29tSWRzID0gbnVsbDsgLy8gbnVsbCBkZW5vdGVzIGN1cnJlbnQgcm9vbSBvbmx5XG5cbiAgICAgIGlmIChyZXF1ZXN0LmRhdGEucm9vbV9pZHMpIHtcbiAgICAgICAgYXNrUm9vbUlkcyA9IHJlcXVlc3QuZGF0YS5yb29tX2lkcztcblxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXNrUm9vbUlkcykpIHtcbiAgICAgICAgICBhc2tSb29tSWRzID0gW2Fza1Jvb21JZHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFza1Jvb21JZHMpLFxuICAgICAgICAgICAgX3N0ZXA7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvci5zKCk7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIHJvb21JZCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuVXNlUm9vbVRpbWVsaW5lKHJvb21JZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJVbmFibGUgdG8gYWNjZXNzIHJvb20gdGltZWxpbmU6IFwiLmNvbmNhdChyb29tSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvci5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbGltaXQgPSByZXF1ZXN0LmRhdGEubGltaXQgfHwgMDtcbiAgICAgIHZhciBldmVudHMgPSBQcm9taXNlLnJlc29sdmUoW10pO1xuXG4gICAgICBpZiAocmVxdWVzdC5kYXRhLnN0YXRlX2tleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBzdGF0ZUtleSA9IHJlcXVlc3QuZGF0YS5zdGF0ZV9rZXkgPT09IHRydWUgPyB1bmRlZmluZWQgOiByZXF1ZXN0LmRhdGEuc3RhdGVfa2V5LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNhblJlY2VpdmVTdGF0ZUV2ZW50KHJlcXVlc3QuZGF0YS50eXBlLCBzdGF0ZUtleSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwge1xuICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJDYW5ub3QgcmVhZCBzdGF0ZSBldmVudHMgb2YgdGhpcyB0eXBlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50cyA9IHRoaXMuZHJpdmVyLnJlYWRTdGF0ZUV2ZW50cyhyZXF1ZXN0LmRhdGEudHlwZSwgc3RhdGVLZXksIGxpbWl0LCBhc2tSb29tSWRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5jYW5SZWNlaXZlUm9vbUV2ZW50KHJlcXVlc3QuZGF0YS50eXBlLCByZXF1ZXN0LmRhdGEubXNndHlwZSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwge1xuICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJDYW5ub3QgcmVhZCByb29tIGV2ZW50cyBvZiB0aGlzIHR5cGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzID0gdGhpcy5kcml2ZXIucmVhZFJvb21FdmVudHMocmVxdWVzdC5kYXRhLnR5cGUsIHJlcXVlc3QuZGF0YS5tc2d0eXBlLCBsaW1pdCwgYXNrUm9vbUlkcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudHMudGhlbihmdW5jdGlvbiAoZXZzKSB7XG4gICAgICAgIHJldHVybiBfdGhpczcudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICBldmVudHM6IGV2c1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVTZW5kRXZlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlU2VuZEV2ZW50KHJlcXVlc3QpIHtcbiAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICBpZiAoIXJlcXVlc3QuZGF0YS50eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCByZXF1ZXN0IC0gbWlzc2luZyBldmVudCB0eXBlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoISFyZXF1ZXN0LmRhdGEucm9vbV9pZCAmJiAhdGhpcy5jYW5Vc2VSb29tVGltZWxpbmUocmVxdWVzdC5kYXRhLnJvb21faWQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVW5hYmxlIHRvIGFjY2VzcyByb29tIHRpbWVsaW5lOiBcIi5jb25jYXQocmVxdWVzdC5kYXRhLnJvb21faWQpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGlzU3RhdGUgPSByZXF1ZXN0LmRhdGEuc3RhdGVfa2V5ICE9PSBudWxsICYmIHJlcXVlc3QuZGF0YS5zdGF0ZV9rZXkgIT09IHVuZGVmaW5lZDtcbiAgICAgIHZhciBzZW5kRXZlbnRQcm9taXNlO1xuXG4gICAgICBpZiAoaXNTdGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMuY2FuU2VuZFN0YXRlRXZlbnQocmVxdWVzdC5kYXRhLnR5cGUsIHJlcXVlc3QuZGF0YS5zdGF0ZV9rZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2Fubm90IHNlbmQgc3RhdGUgZXZlbnRzIG9mIHRoaXMgdHlwZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kRXZlbnRQcm9taXNlID0gdGhpcy5kcml2ZXIuc2VuZEV2ZW50KHJlcXVlc3QuZGF0YS50eXBlLCByZXF1ZXN0LmRhdGEuY29udGVudCB8fCB7fSwgcmVxdWVzdC5kYXRhLnN0YXRlX2tleSwgcmVxdWVzdC5kYXRhLnJvb21faWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1ZXN0LmRhdGEuY29udGVudCB8fCB7fTtcbiAgICAgICAgdmFyIG1zZ3R5cGUgPSBjb250ZW50Wydtc2d0eXBlJ107XG5cbiAgICAgICAgaWYgKCF0aGlzLmNhblNlbmRSb29tRXZlbnQocmVxdWVzdC5kYXRhLnR5cGUsIG1zZ3R5cGUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2Fubm90IHNlbmQgcm9vbSBldmVudHMgb2YgdGhpcyB0eXBlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmRFdmVudFByb21pc2UgPSB0aGlzLmRyaXZlci5zZW5kRXZlbnQocmVxdWVzdC5kYXRhLnR5cGUsIGNvbnRlbnQsIG51bGwsIC8vIG5vdCBzZW5kaW5nIGEgc3RhdGUgZXZlbnRcbiAgICAgICAgcmVxdWVzdC5kYXRhLnJvb21faWQpO1xuICAgICAgfVxuXG4gICAgICBzZW5kRXZlbnRQcm9taXNlLnRoZW4oZnVuY3Rpb24gKHNlbnRFdmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXM4LnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgcm9vbV9pZDogc2VudEV2ZW50LnJvb21JZCxcbiAgICAgICAgICBldmVudF9pZDogc2VudEV2ZW50LmV2ZW50SWRcbiAgICAgICAgfSk7XG4gICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBzZW5kaW5nIGV2ZW50OiBcIiwgZSk7XG4gICAgICAgIHJldHVybiBfdGhpczgudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciBzZW5kaW5nIGV2ZW50XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhbmRsZU1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShldikge1xuICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSByZXR1cm47XG4gICAgICB2YXIgYWN0aW9uRXYgPSBuZXcgQ3VzdG9tRXZlbnQoXCJhY3Rpb246XCIuY29uY2F0KGV2LmRldGFpbC5hY3Rpb24pLCB7XG4gICAgICAgIGRldGFpbDogZXYuZGV0YWlsLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZW1pdChcImFjdGlvbjpcIi5jb25jYXQoZXYuZGV0YWlsLmFjdGlvbiksIGFjdGlvbkV2KTtcblxuICAgICAgaWYgKCFhY3Rpb25Fdi5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHN3aXRjaCAoZXYuZGV0YWlsLmFjdGlvbikge1xuICAgICAgICAgIGNhc2UgX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLkNvbnRlbnRMb2FkZWQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVDb250ZW50TG9hZGVkQWN0aW9uKGV2LmRldGFpbCk7XG5cbiAgICAgICAgICBjYXNlIF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbi5TdXBwb3J0ZWRBcGlWZXJzaW9uczpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcGx5VmVyc2lvbnMoZXYuZGV0YWlsKTtcblxuICAgICAgICAgIGNhc2UgX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLlNlbmRFdmVudDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVNlbmRFdmVudChldi5kZXRhaWwpO1xuXG4gICAgICAgICAgY2FzZSBfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uR2V0T3BlbklEQ3JlZGVudGlhbHM6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVPSURDKGV2LmRldGFpbCk7XG5cbiAgICAgICAgICBjYXNlIF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbi5NU0MyOTMxTmF2aWdhdGU6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVOYXZpZ2F0ZShldi5kZXRhaWwpO1xuXG4gICAgICAgICAgY2FzZSBfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uTVNDMjk3NFJlbmVnb3RpYXRlQ2FwYWJpbGl0aWVzOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlQ2FwYWJpbGl0aWVzUmVuZWdvdGlhdGUoZXYuZGV0YWlsKTtcblxuICAgICAgICAgIGNhc2UgX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLk1TQzI4NzZSZWFkRXZlbnRzOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVhZEV2ZW50cyhldi5kZXRhaWwpO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5yZXBseShldi5kZXRhaWwsIHtcbiAgICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVua25vd24gb3IgdW5zdXBwb3J0ZWQgYWN0aW9uOiBcIiArIGV2LmRldGFpbC5hY3Rpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBzY3JlZW5zaG90IG9mIHRoZSB3aWRnZXQuXG4gICAgICogQHJldHVybnMgUmVzb2x2ZXMgdG8gdGhlIHdpZGdldCdzIHNjcmVlbnNob3QuXG4gICAgICogQHRocm93cyBUaHJvd3MgaWYgdGhlcmUgaXMgYSBwcm9ibGVtLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwidGFrZVNjcmVlbnNob3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGFrZVNjcmVlbnNob3QoKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLlRha2VTY3JlZW5zaG90LCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsZXJ0cyB0aGUgd2lkZ2V0IHRvIHdoZXRoZXIgb3Igbm90IGl0IGlzIGN1cnJlbnRseSB2aXNpYmxlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWaXNpYmxlIFdoZXRoZXIgdGhlIHdpZGdldCBpcyB2aXNpYmxlIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJV2lkZ2V0QXBpUmVzcG9uc2VEYXRhPn0gUmVzb2x2ZXMgd2hlbiB0aGUgd2lkZ2V0IGFja25vd2xlZGdlcyB0aGUgdXBkYXRlLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlVmlzaWJpbGl0eVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaXNpYmlsaXR5KGlzVmlzaWJsZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5VcGRhdGVWaXNpYmlsaXR5LCB7XG4gICAgICAgIHZpc2libGU6IGlzVmlzaWJsZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNlbmRXaWRnZXRDb25maWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZFdpZGdldENvbmZpZyhkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLldpZGdldENvbmZpZywgZGF0YSkudGhlbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJub3RpZnlNb2RhbFdpZGdldEJ1dHRvbkNsaWNrZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbm90aWZ5TW9kYWxXaWRnZXRCdXR0b25DbGlja2VkKGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLkJ1dHRvbkNsaWNrZWQsIHtcbiAgICAgICAgaWQ6IGlkXG4gICAgICB9KS50aGVuKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5vdGlmeU1vZGFsV2lkZ2V0Q2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbm90aWZ5TW9kYWxXaWRnZXRDbG9zZShkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLkNsb3NlTW9kYWxXaWRnZXQsIGRhdGEpLnRoZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmVlZHMgYW4gZXZlbnQgdG8gdGhlIHdpZGdldC4gSWYgdGhlIHdpZGdldCBpcyBub3QgYWJsZSB0byBhY2NlcHQgdGhlIGV2ZW50IGR1ZSB0b1xuICAgICAqIHBlcm1pc3Npb25zLCB0aGlzIHdpbGwgbm8tb3AgYW5kIHJldHVybiBjYWxtbHkuIElmIHRoZSB3aWRnZXQgZmFpbGVkIHRvIGhhbmRsZSB0aGVcbiAgICAgKiBldmVudCwgdGhpcyB3aWxsIHJhaXNlIGFuIGVycm9yLlxuICAgICAqIEBwYXJhbSB7SVJvb21FdmVudH0gcmF3RXZlbnQgVGhlIGV2ZW50IHRvICh0cnkgdG8pIHNlbmQgdG8gdGhlIHdpZGdldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFZpZXdlZFJvb21JZCBUaGUgcm9vbSBJRCB0aGUgdXNlciBpcyBjdXJyZW50bHkgaW50ZXJhY3Rpbmcgd2l0aC5cbiAgICAgKiBOb3QgdGhlIHJvb20gSUQgb2YgdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXNvbHZlcyB3aGVuIGNvbXBsZXRlLCByZWplY3RzIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBzZW5kaW5nLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZmVlZEV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZlZWRFdmVudChyYXdFdmVudCwgY3VycmVudFZpZXdlZFJvb21JZCkge1xuICAgICAgaWYgKHJhd0V2ZW50LnJvb21faWQgIT09IGN1cnJlbnRWaWV3ZWRSb29tSWQgJiYgIXRoaXMuY2FuVXNlUm9vbVRpbWVsaW5lKHJhd0V2ZW50LnJvb21faWQpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgLy8gbm8tb3BcbiAgICAgIH1cblxuICAgICAgaWYgKHJhd0V2ZW50LnN0YXRlX2tleSAhPT0gdW5kZWZpbmVkICYmIHJhd0V2ZW50LnN0YXRlX2tleSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBzdGF0ZSBldmVudFxuICAgICAgICBpZiAoIXRoaXMuY2FuUmVjZWl2ZVN0YXRlRXZlbnQocmF3RXZlbnQudHlwZSwgcmF3RXZlbnQuc3RhdGVfa2V5KSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgLy8gbm8tb3BcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbWVzc2FnZSBldmVudFxuICAgICAgICBpZiAoIXRoaXMuY2FuUmVjZWl2ZVJvb21FdmVudChyYXdFdmVudC50eXBlLCAocmF3RXZlbnQuY29udGVudCB8fCB7fSlbJ21zZ3R5cGUnXSkpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIG5vLW9wXG4gICAgICAgIH1cbiAgICAgIH0gLy8gRmVlZCB0aGUgZXZlbnQgaW50byB0aGUgd2lkZ2V0XG5cblxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5TZW5kRXZlbnQsIHJhd0V2ZW50IC8vIGl0J3MgY29tcGF0aWJsZSwgYnV0IG1pc3NpbmcgdGhlIGluZGV4IHNpZ25hdHVyZVxuICAgICAgKS50aGVuKCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENsaWVudFdpZGdldEFwaTtcbn0oX2V2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG5leHBvcnRzLkNsaWVudFdpZGdldEFwaSA9IENsaWVudFdpZGdldEFwaTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU3ltYm9scyA9IHZvaWQgMDtcblxuLypcbiAqIENvcHlyaWdodCAyMDIxIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIFN5bWJvbHM7XG5leHBvcnRzLlN5bWJvbHMgPSBTeW1ib2xzO1xuXG4oZnVuY3Rpb24gKFN5bWJvbHMpIHtcbiAgU3ltYm9sc1tcIkFueVJvb21cIl0gPSBcIipcIjtcbn0pKFN5bWJvbHMgfHwgKGV4cG9ydHMuU3ltYm9scyA9IFN5bWJvbHMgPSB7fSkpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5XaWRnZXRBcGkgPSB2b2lkIDA7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTtcblxudmFyIF9XaWRnZXRBcGlEaXJlY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1dpZGdldEFwaURpcmVjdGlvblwiKTtcblxudmFyIF9BcGlWZXJzaW9uID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9BcGlWZXJzaW9uXCIpO1xuXG52YXIgX1Bvc3RtZXNzYWdlVHJhbnNwb3J0ID0gcmVxdWlyZShcIi4vdHJhbnNwb3J0L1Bvc3RtZXNzYWdlVHJhbnNwb3J0XCIpO1xuXG52YXIgX1dpZGdldEFwaUFjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvV2lkZ2V0QXBpQWN0aW9uXCIpO1xuXG52YXIgX0dldE9wZW5JREFjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvR2V0T3BlbklEQWN0aW9uXCIpO1xuXG52YXIgX1dpZGdldFR5cGUgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1dpZGdldFR5cGVcIik7XG5cbnZhciBfTW9kYWxXaWRnZXRBY3Rpb25zID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9Nb2RhbFdpZGdldEFjdGlvbnNcIik7XG5cbnZhciBfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5ID0gcmVxdWlyZShcIi4vbW9kZWxzL1dpZGdldEV2ZW50Q2FwYWJpbGl0eVwiKTtcblxudmFyIF9TeW1ib2xzID0gcmVxdWlyZShcIi4vU3ltYm9sc1wiKTtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG4vKipcbiAqIEFQSSBoYW5kbGVyIGZvciB3aWRnZXRzLiBUaGlzIHJhaXNlcyBldmVudHMgZm9yIGVhY2ggYWN0aW9uXG4gKiByZWNlaXZlZCBhcyBgYWN0aW9uOiR7YWN0aW9ufWAgKGVnOiBcImFjdGlvbjpzY3JlZW5zaG90XCIpLlxuICogRGVmYXVsdCBoYW5kbGluZyBjYW4gYmUgcHJldmVudGVkIGJ5IHVzaW5nIHByZXZlbnREZWZhdWx0KClcbiAqIG9uIHRoZSByYWlzZWQgZXZlbnQuIFRoZSBkZWZhdWx0IGhhbmRsaW5nIHZhcmllcyBmb3IgZWFjaFxuICogYWN0aW9uOiBvbmVzIHdoaWNoIHRoZSBTREsgY2FuIGhhbmRsZSBzYWZlbHkgYXJlIGFja25vd2xlZGdlZFxuICogYXBwcm9wcmlhdGVseSBhbmQgb25lcyB3aGljaCBhcmUgdW5oYW5kbGVkIChjdXN0b20gb3IgcmVxdWlyZVxuICogdGhlIHdpZGdldCB0byBkbyBzb21ldGhpbmcpIGFyZSByZWplY3RlZCB3aXRoIGFuIGVycm9yLlxuICpcbiAqIEV2ZW50cyB3aGljaCBhcmUgcHJldmVudERlZmF1bHQoKWVkIG11c3QgcmVwbHkgdXNpbmcgdGhlXG4gKiB0cmFuc3BvcnQuIFRoZSBldmVudHMgcmFpc2VkIHdpbGwgaGF2ZSBhIGRldGFpbCBvZiBhblxuICogSVdpZGdldEFwaVJlcXVlc3QgaW50ZXJmYWNlLlxuICpcbiAqIFdoZW4gdGhlIFdpZGdldEFwaSBpcyByZWFkeSB0byBzdGFydCBzZW5kaW5nIHJlcXVlc3RzLCBpdCB3aWxsXG4gKiByYWlzZSBhIFwicmVhZHlcIiBDdXN0b21FdmVudC4gQWZ0ZXIgdGhlIHJlYWR5IGV2ZW50IGZpcmVzLCBhY3Rpb25zXG4gKiBjYW4gYmUgc2VudCBhbmQgdGhlIHRyYW5zcG9ydCB3aWxsIGJlIHJlYWR5LlxuICovXG52YXIgV2lkZ2V0QXBpID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhXaWRnZXRBcGksIF9FdmVudEVtaXR0ZXIpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoV2lkZ2V0QXBpKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBBUEkgaGFuZGxlciBmb3IgdGhlIGdpdmVuIHdpZGdldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHdpZGdldElkIFRoZSB3aWRnZXQgSUQgdG8gbGlzdGVuIGZvci4gSWYgbm90IHN1cHBsaWVkIHRoZW5cbiAgICogdGhlIEFQSSB3aWxsIHVzZSB0aGUgd2lkZ2V0IElEIGZyb20gdGhlIGZpcnN0IHZhbGlkIHJlcXVlc3QgaXQgcmVjZWl2ZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGllbnRPcmlnaW4gVGhlIG9yaWdpbiBvZiB0aGUgY2xpZW50LCBvciBudWxsIGlmIG5vdCBrbm93bi5cbiAgICovXG4gIGZ1bmN0aW9uIFdpZGdldEFwaSgpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgd2lkZ2V0SWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG4gICAgdmFyIGNsaWVudE9yaWdpbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaWRnZXRBcGkpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5jbGllbnRPcmlnaW4gPSBjbGllbnRPcmlnaW47XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwidHJhbnNwb3J0XCIsIHZvaWQgMCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiY2FwYWJpbGl0aWVzRmluaXNoZWRcIiwgZmFsc2UpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInN1cHBvcnRzTVNDMjk3NFJlbmVnb3RpYXRlXCIsIGZhbHNlKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJyZXF1ZXN0ZWRDYXBhYmlsaXRpZXNcIiwgW10pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImFwcHJvdmVkQ2FwYWJpbGl0aWVzXCIsIHZvaWQgMCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiY2FjaGVkQ2xpZW50VmVyc2lvbnNcIiwgdm9pZCAwKTtcblxuICAgIGlmICghd2luZG93LnBhcmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gcGFyZW50IHdpbmRvdy4gVGhpcyB3aWRnZXQgZG9lc24ndCBhcHBlYXIgdG8gYmUgZW1iZWRkZWQgcHJvcGVybHkuXCIpO1xuICAgIH1cblxuICAgIF90aGlzLnRyYW5zcG9ydCA9IG5ldyBfUG9zdG1lc3NhZ2VUcmFuc3BvcnQuUG9zdG1lc3NhZ2VUcmFuc3BvcnQoX1dpZGdldEFwaURpcmVjdGlvbi5XaWRnZXRBcGlEaXJlY3Rpb24uRnJvbVdpZGdldCwgd2lkZ2V0SWQsIHdpbmRvdy5wYXJlbnQsIHdpbmRvdyk7XG4gICAgX3RoaXMudHJhbnNwb3J0LnRhcmdldE9yaWdpbiA9IGNsaWVudE9yaWdpbjtcblxuICAgIF90aGlzLnRyYW5zcG9ydC5vbihcIm1lc3NhZ2VcIiwgX3RoaXMuaGFuZGxlTWVzc2FnZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIHdpZGdldCB3YXMgZ3JhbnRlZCBhIHBhcnRpY3VsYXIgY2FwYWJpbGl0eS4gTm90ZSB0aGF0IG9uXG4gICAqIGNsaWVudHMgd2hlcmUgdGhlIGNhcGFiaWxpdGllcyBhcmUgbm90IGZlZCBiYWNrIHRvIHRoZSB3aWRnZXQgdGhpcyBmdW5jdGlvblxuICAgKiB3aWxsIHJlbHkgb24gcmVxdWVzdGVkIGNhcGFiaWxpdGllcyBpbnN0ZWFkLlxuICAgKiBAcGFyYW0ge0NhcGFiaWxpdHl9IGNhcGFiaWxpdHkgVGhlIGNhcGFiaWxpdHkgdG8gY2hlY2sgZm9yIGFwcHJvdmFsIG9mLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgd2lkZ2V0IGhhcyBhcHByb3ZhbCBmb3IgdGhlIGdpdmVuIGNhcGFiaWxpdHkuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFdpZGdldEFwaSwgW3tcbiAgICBrZXk6IFwiaGFzQ2FwYWJpbGl0eVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNDYXBhYmlsaXR5KGNhcGFiaWxpdHkpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuYXBwcm92ZWRDYXBhYmlsaXRpZXMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcHJvdmVkQ2FwYWJpbGl0aWVzLmluY2x1ZGVzKGNhcGFiaWxpdHkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0ZWRDYXBhYmlsaXRpZXMuaW5jbHVkZXMoY2FwYWJpbGl0eSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgYSBjYXBhYmlsaXR5IGZyb20gdGhlIGNsaWVudC4gSXQgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgYWxsb3dlZCxcbiAgICAgKiBidXQgd2lsbCBiZSBhc2tlZCBmb3IuXG4gICAgICogQHBhcmFtIHtDYXBhYmlsaXR5fSBjYXBhYmlsaXR5IFRoZSBjYXBhYmlsaXR5IHRvIHJlcXVlc3QuXG4gICAgICogQHRocm93cyBUaHJvd3MgaWYgdGhlIGNhcGFiaWxpdGllcyBuZWdvdGlhdGlvbiBoYXMgYWxyZWFkeSBzdGFydGVkIGFuZCB0aGVcbiAgICAgKiB3aWRnZXQgaXMgdW5hYmxlIHRvIHJlcXVlc3QgYWRkaXRpb25hbCBjYXBhYmlsaXRpZXMuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0Q2FwYWJpbGl0eVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXF1ZXN0Q2FwYWJpbGl0eShjYXBhYmlsaXR5KSB7XG4gICAgICBpZiAodGhpcy5jYXBhYmlsaXRpZXNGaW5pc2hlZCAmJiAhdGhpcy5zdXBwb3J0c01TQzI5NzRSZW5lZ290aWF0ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYXBhYmlsaXRpZXMgaGF2ZSBhbHJlYWR5IGJlZW4gbmVnb3RpYXRlZFwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZXF1ZXN0ZWRDYXBhYmlsaXRpZXMucHVzaChjYXBhYmlsaXR5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBjYXBhYmlsaXRpZXMgZnJvbSB0aGUgY2xpZW50LiBUaGV5IGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSBhbGxvd2VkLFxuICAgICAqIGJ1dCB3aWxsIGJlIGFza2VkIGZvciBpZiB0aGUgbmVnb3RpYXRpb24gaGFzIG5vdCBhbHJlYWR5IGhhcHBlbmVkLlxuICAgICAqIEBwYXJhbSB7Q2FwYWJpbGl0eVtdfSBjYXBhYmlsaXRpZXMgVGhlIGNhcGFiaWxpdGllcyB0byByZXF1ZXN0LlxuICAgICAqIEB0aHJvd3MgVGhyb3dzIGlmIHRoZSBjYXBhYmlsaXRpZXMgbmVnb3RpYXRpb24gaGFzIGFscmVhZHkgc3RhcnRlZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlcXVlc3RDYXBhYmlsaXRpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVxdWVzdENhcGFiaWxpdGllcyhjYXBhYmlsaXRpZXMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBjYXBhYmlsaXRpZXMuZm9yRWFjaChmdW5jdGlvbiAoY2FwKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIucmVxdWVzdENhcGFiaWxpdHkoY2FwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgY2FwYWJpbGl0eSB0byBpbnRlcmFjdCB3aXRoIHJvb21zIG90aGVyIHRoYW4gdGhlIHVzZXIncyBjdXJyZW50bHlcbiAgICAgKiB2aWV3ZWQgcm9vbS4gQXBwbGllcyB0byBldmVudCByZWNlaXZpbmcgYW5kIHNlbmRpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBTeW1ib2xzLkFueVJvb219IHJvb21JZCBUaGUgcm9vbSBJRCwgb3IgYFN5bWJvbHMuQW55Um9vbWAgdG9cbiAgICAgKiBkZW5vdGUgYWxsIGtub3duIHJvb21zLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVxdWVzdENhcGFiaWxpdHlGb3JSb29tVGltZWxpbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVxdWVzdENhcGFiaWxpdHlGb3JSb29tVGltZWxpbmUocm9vbUlkKSB7XG4gICAgICB0aGlzLnJlcXVlc3RDYXBhYmlsaXR5KFwib3JnLm1hdHJpeC5tc2MyNzYyLnRpbWVsaW5lOlwiLmNvbmNhdChyb29tSWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIGNhcGFiaWxpdHkgdG8gc2VuZCBhIGdpdmVuIHN0YXRlIGV2ZW50IHdpdGggb3B0aW9uYWwgZXhwbGljaXRcbiAgICAgKiBzdGF0ZSBrZXkuIEl0IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGFsbG93ZWQsIGJ1dCB3aWxsIGJlIGFza2VkIGZvciBpZiB0aGVcbiAgICAgKiBuZWdvdGlhdGlvbiBoYXMgbm90IGFscmVhZHkgaGFwcGVuZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBUaGUgc3RhdGUgZXZlbnQgdHlwZSB0byBhc2sgZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZUtleSBJZiBzcGVjaWZpZWQsIHRoZSBzcGVjaWZpYyBzdGF0ZSBrZXkgdG8gcmVxdWVzdC5cbiAgICAgKiBPdGhlcndpc2UgYWxsIHN0YXRlIGtleXMgd2lsbCBiZSByZXF1ZXN0ZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0Q2FwYWJpbGl0eVRvU2VuZFN0YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RDYXBhYmlsaXR5VG9TZW5kU3RhdGUoZXZlbnRUeXBlLCBzdGF0ZUtleSkge1xuICAgICAgdGhpcy5yZXF1ZXN0Q2FwYWJpbGl0eShfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LldpZGdldEV2ZW50Q2FwYWJpbGl0eS5mb3JTdGF0ZUV2ZW50KF9XaWRnZXRFdmVudENhcGFiaWxpdHkuRXZlbnREaXJlY3Rpb24uU2VuZCwgZXZlbnRUeXBlLCBzdGF0ZUtleSkucmF3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIGNhcGFiaWxpdHkgdG8gcmVjZWl2ZSBhIGdpdmVuIHN0YXRlIGV2ZW50IHdpdGggb3B0aW9uYWwgZXhwbGljaXRcbiAgICAgKiBzdGF0ZSBrZXkuIEl0IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGFsbG93ZWQsIGJ1dCB3aWxsIGJlIGFza2VkIGZvciBpZiB0aGVcbiAgICAgKiBuZWdvdGlhdGlvbiBoYXMgbm90IGFscmVhZHkgaGFwcGVuZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBUaGUgc3RhdGUgZXZlbnQgdHlwZSB0byBhc2sgZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZUtleSBJZiBzcGVjaWZpZWQsIHRoZSBzcGVjaWZpYyBzdGF0ZSBrZXkgdG8gcmVxdWVzdC5cbiAgICAgKiBPdGhlcndpc2UgYWxsIHN0YXRlIGtleXMgd2lsbCBiZSByZXF1ZXN0ZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0Q2FwYWJpbGl0eVRvUmVjZWl2ZVN0YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RDYXBhYmlsaXR5VG9SZWNlaXZlU3RhdGUoZXZlbnRUeXBlLCBzdGF0ZUtleSkge1xuICAgICAgdGhpcy5yZXF1ZXN0Q2FwYWJpbGl0eShfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LldpZGdldEV2ZW50Q2FwYWJpbGl0eS5mb3JTdGF0ZUV2ZW50KF9XaWRnZXRFdmVudENhcGFiaWxpdHkuRXZlbnREaXJlY3Rpb24uUmVjZWl2ZSwgZXZlbnRUeXBlLCBzdGF0ZUtleSkucmF3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIGNhcGFiaWxpdHkgdG8gc2VuZCBhIGdpdmVuIHJvb20gZXZlbnQuIEl0IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlXG4gICAgICogYWxsb3dlZCwgYnV0IHdpbGwgYmUgYXNrZWQgZm9yIGlmIHRoZSBuZWdvdGlhdGlvbiBoYXMgbm90IGFscmVhZHkgaGFwcGVuZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBUaGUgcm9vbSBldmVudCB0eXBlIHRvIGFzayBmb3IuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0Q2FwYWJpbGl0eVRvU2VuZEV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RDYXBhYmlsaXR5VG9TZW5kRXZlbnQoZXZlbnRUeXBlKSB7XG4gICAgICB0aGlzLnJlcXVlc3RDYXBhYmlsaXR5KF9XaWRnZXRFdmVudENhcGFiaWxpdHkuV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LmZvclJvb21FdmVudChfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LkV2ZW50RGlyZWN0aW9uLlNlbmQsIGV2ZW50VHlwZSkucmF3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIGNhcGFiaWxpdHkgdG8gcmVjZWl2ZSBhIGdpdmVuIHJvb20gZXZlbnQuIEl0IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlXG4gICAgICogYWxsb3dlZCwgYnV0IHdpbGwgYmUgYXNrZWQgZm9yIGlmIHRoZSBuZWdvdGlhdGlvbiBoYXMgbm90IGFscmVhZHkgaGFwcGVuZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBUaGUgcm9vbSBldmVudCB0eXBlIHRvIGFzayBmb3IuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0Q2FwYWJpbGl0eVRvUmVjZWl2ZUV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RDYXBhYmlsaXR5VG9SZWNlaXZlRXZlbnQoZXZlbnRUeXBlKSB7XG4gICAgICB0aGlzLnJlcXVlc3RDYXBhYmlsaXR5KF9XaWRnZXRFdmVudENhcGFiaWxpdHkuV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LmZvclJvb21FdmVudChfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LkV2ZW50RGlyZWN0aW9uLlJlY2VpdmUsIGV2ZW50VHlwZSkucmF3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIGNhcGFiaWxpdHkgdG8gc2VuZCBhIGdpdmVuIG1lc3NhZ2UgZXZlbnQgd2l0aCBvcHRpb25hbCBleHBsaWNpdFxuICAgICAqIGBtc2d0eXBlYC4gSXQgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgYWxsb3dlZCwgYnV0IHdpbGwgYmUgYXNrZWQgZm9yIGlmIHRoZVxuICAgICAqIG5lZ290aWF0aW9uIGhhcyBub3QgYWxyZWFkeSBoYXBwZW5lZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbXNndHlwZSBJZiBzcGVjaWZpZWQsIHRoZSBzcGVjaWZpYyBtc2d0eXBlIHRvIHJlcXVlc3QuXG4gICAgICogT3RoZXJ3aXNlIGFsbCBtZXNzYWdlIHR5cGVzIHdpbGwgYmUgcmVxdWVzdGVkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVxdWVzdENhcGFiaWxpdHlUb1NlbmRNZXNzYWdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RDYXBhYmlsaXR5VG9TZW5kTWVzc2FnZShtc2d0eXBlKSB7XG4gICAgICB0aGlzLnJlcXVlc3RDYXBhYmlsaXR5KF9XaWRnZXRFdmVudENhcGFiaWxpdHkuV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LmZvclJvb21NZXNzYWdlRXZlbnQoX1dpZGdldEV2ZW50Q2FwYWJpbGl0eS5FdmVudERpcmVjdGlvbi5TZW5kLCBtc2d0eXBlKS5yYXcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgY2FwYWJpbGl0eSB0byByZWNlaXZlIGEgZ2l2ZW4gbWVzc2FnZSBldmVudCB3aXRoIG9wdGlvbmFsIGV4cGxpY2l0XG4gICAgICogYG1zZ3R5cGVgLiBJdCBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBhbGxvd2VkLCBidXQgd2lsbCBiZSBhc2tlZCBmb3IgaWYgdGhlXG4gICAgICogbmVnb3RpYXRpb24gaGFzIG5vdCBhbHJlYWR5IGhhcHBlbmVkLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtc2d0eXBlIElmIHNwZWNpZmllZCwgdGhlIHNwZWNpZmljIG1zZ3R5cGUgdG8gcmVxdWVzdC5cbiAgICAgKiBPdGhlcndpc2UgYWxsIG1lc3NhZ2UgdHlwZXMgd2lsbCBiZSByZXF1ZXN0ZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0Q2FwYWJpbGl0eVRvUmVjZWl2ZU1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVxdWVzdENhcGFiaWxpdHlUb1JlY2VpdmVNZXNzYWdlKG1zZ3R5cGUpIHtcbiAgICAgIHRoaXMucmVxdWVzdENhcGFiaWxpdHkoX1dpZGdldEV2ZW50Q2FwYWJpbGl0eS5XaWRnZXRFdmVudENhcGFiaWxpdHkuZm9yUm9vbU1lc3NhZ2VFdmVudChfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LkV2ZW50RGlyZWN0aW9uLlJlY2VpdmUsIG1zZ3R5cGUpLnJhdyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFuIE9wZW5JRCBDb25uZWN0IHRva2VuIGZyb20gdGhlIGNsaWVudCBmb3IgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW5cbiAgICAgKiB1c2VyLiBUaGlzIHRva2VuIGNhbiBiZSB2YWxpZGF0ZWQgc2VydmVyLXNpZGUgd2l0aCB0aGUgZmVkZXJhdGlvbiBBUEkuIE5vdGVcbiAgICAgKiB0aGF0IHRoZSB3aWRnZXQgaXMgcmVzcG9uc2libGUgZm9yIHZhbGlkYXRpbmcgdGhlIHRva2VuIGFuZCBjYWNoaW5nIGFueSByZXN1bHRzXG4gICAgICogaXQgbmVlZHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SU9wZW5JRENyZWRlbnRpYWxzPn0gUmVzb2x2ZXMgdG8gYSB0b2tlbiBmb3IgdmVyaWZpY2F0aW9uLlxuICAgICAqIEB0aHJvd3MgVGhyb3dzIGlmIHRoZSB1c2VyIHJlamVjdGVkIHRoZSByZXF1ZXN0IG9yIHRoZSByZXF1ZXN0IGZhaWxlZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlcXVlc3RPcGVuSURDb25uZWN0VG9rZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVxdWVzdE9wZW5JRENvbm5lY3RUb2tlbigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBfdGhpczMudHJhbnNwb3J0LnNlbmRDb21wbGV0ZShfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uR2V0T3BlbklEQ3JlZGVudGlhbHMsIHt9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciByZGF0YSA9IHJlc3BvbnNlLnJlc3BvbnNlO1xuXG4gICAgICAgICAgaWYgKHJkYXRhLnN0YXRlID09PSBfR2V0T3BlbklEQWN0aW9uLk9wZW5JRFJlcXVlc3RTdGF0ZS5BbGxvd2VkKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJkYXRhKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJkYXRhLnN0YXRlID09PSBfR2V0T3BlbklEQWN0aW9uLk9wZW5JRFJlcXVlc3RTdGF0ZS5CbG9ja2VkKSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVXNlciBkZWNsaW5lZCB0byB2ZXJpZnkgdGhlaXIgaWRlbnRpdHlcIikpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmRhdGEuc3RhdGUgPT09IF9HZXRPcGVuSURBY3Rpb24uT3BlbklEUmVxdWVzdFN0YXRlLlBlbmRpbmdVc2VyQ29uZmlybWF0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlckZuID0gZnVuY3Rpb24gaGFuZGxlckZuKGV2KSB7XG4gICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gZXYuZGV0YWlsO1xuICAgICAgICAgICAgICBpZiAocmVxdWVzdC5kYXRhLm9yaWdpbmFsX3JlcXVlc3RfaWQgIT09IHJlc3BvbnNlLnJlcXVlc3RJZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmRhdGEuc3RhdGUgPT09IF9HZXRPcGVuSURBY3Rpb24uT3BlbklEUmVxdWVzdFN0YXRlLkFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHt9KTsgLy8gYWNrXG5cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LmRhdGEuc3RhdGUgPT09IF9HZXRPcGVuSURBY3Rpb24uT3BlbklEUmVxdWVzdFN0YXRlLkJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVXNlciBkZWNsaW5lZCB0byB2ZXJpZnkgdGhlaXIgaWRlbnRpdHlcIikpO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMzLnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7fSk7IC8vIGFja1xuXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgc3RhdGUgb24gcmVwbHk6IFwiICsgcmRhdGEuc3RhdGUpKTtcblxuICAgICAgICAgICAgICAgIF90aGlzMy50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJJbnZhbGlkIHN0YXRlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF90aGlzMy5vZmYoXCJhY3Rpb246XCIuY29uY2F0KF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpVG9XaWRnZXRBY3Rpb24uT3BlbklEQ3JlZGVudGlhbHMpLCBoYW5kbGVyRm4pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgX3RoaXMzLm9uKFwiYWN0aW9uOlwiLmNvbmNhdChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLk9wZW5JRENyZWRlbnRpYWxzKSwgaGFuZGxlckZuKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgc3RhdGU6IFwiICsgcmRhdGEuc3RhdGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBc2tzIHRoZSBjbGllbnQgZm9yIGFkZGl0aW9uYWwgY2FwYWJpbGl0aWVzLiBDYXBhYmlsaXRpZXMgY2FuIGJlIHF1ZXVlZCBmb3IgdGhpc1xuICAgICAqIHJlcXVlc3Qgd2l0aCB0aGUgcmVxdWVzdENhcGFiaWxpdHkoKSBmdW5jdGlvbnMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIHdoZW4gY29tcGxldGUuIE5vdGUgdGhhdCB0aGUgcHJvbWlzZSByZXNvbHZlcyB3aGVuXG4gICAgICogdGhlIGNhcGFiaWxpdGllcyByZXF1ZXN0IGhhcyBnb25lIHRocm91Z2gsIG5vdCB3aGVuIHRoZSBjYXBhYmlsaXRpZXMgYXJlIGFwcHJvdmVkL2RlbmllZC5cbiAgICAgKiBVc2UgdGhlIFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLk5vdGlmeUNhcGFiaWxpdGllcyBhY3Rpb24gdG8gZGV0ZWN0IGNoYW5nZXMuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVSZXF1ZXN0ZWRDYXBhYmlsaXRpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlUmVxdWVzdGVkQ2FwYWJpbGl0aWVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLk1TQzI5NzRSZW5lZ290aWF0ZUNhcGFiaWxpdGllcywge1xuICAgICAgICBjYXBhYmlsaXRpZXM6IHRoaXMucmVxdWVzdGVkQ2FwYWJpbGl0aWVzXG4gICAgICB9KS50aGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlbGwgdGhlIGNsaWVudCB0aGF0IHRoZSBjb250ZW50IGhhcyBiZWVuIGxvYWRlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gUmVzb2x2ZXMgd2hlbiB0aGUgY2xpZW50IGFja25vd2xlZGdlcyB0aGUgcmVxdWVzdC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNlbmRDb250ZW50TG9hZGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbmRDb250ZW50TG9hZGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLkNvbnRlbnRMb2FkZWQsIHt9KS50aGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgc3RpY2tlciB0byB0aGUgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7SVN0aWNrZXJBY3Rpb25SZXF1ZXN0RGF0YX0gc3RpY2tlciBUaGUgc3RpY2tlciB0byBzZW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBSZXNvbHZlcyB3aGVuIHRoZSBjbGllbnQgYWNrbm93bGVkZ2VzIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic2VuZFN0aWNrZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZFN0aWNrZXIoc3RpY2tlcikge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLlNlbmRTdGlja2VyLCBzdGlja2VyKS50aGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFza3MgdGhlIGNsaWVudCB0byBzZXQgdGhlIGFsd2F5cy1vbi1zY3JlZW4gc3RhdHVzIGZvciB0aGlzIHdpZGdldC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIFRoZSBuZXcgc3RhdGUgdG8gcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gUmVzb2x2ZSB3aXRoIHRydWUgaWYgdGhlIGNsaWVudCB3YXMgYWJsZSB0byBmdWxmaWxsXG4gICAgICogdGhlIHJlcXVlc3QsIHJlc29sdmVzIHRvIGZhbHNlIG90aGVyd2lzZS4gUmVqZWN0cyBpZiBhbiBlcnJvciBvY2N1cnJlZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldEFsd2F5c09uU2NyZWVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEFsd2F5c09uU2NyZWVuKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uVXBkYXRlQWx3YXlzT25TY3JlZW4sIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdWNjZXNzO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgbW9kYWwgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0aGUgbW9kYWwgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIHtJTW9kYWxXaWRnZXRPcGVuUmVxdWVzdERhdGFCdXR0b25bXX0gYnV0dG9ucyBUaGUgYnV0dG9ucyB0byBoYXZlIG9uIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIHtJTW9kYWxXaWRnZXRDcmVhdGVEYXRhfSBkYXRhIERhdGEgdG8gc3VwcGx5IHRvIHRoZSBtb2RhbCB3aWRnZXQuXG4gICAgICogQHBhcmFtIHtXaWRnZXRUeXBlfSB0eXBlIFRoZSB0eXBlIG9mIG1vZGFsIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiB0aGUgbW9kYWwgd2lkZ2V0IGhhcyBiZWVuIG9wZW5lZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9wZW5Nb2RhbFdpZGdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTW9kYWxXaWRnZXQodXJsLCBuYW1lKSB7XG4gICAgICB2YXIgYnV0dG9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge307XG4gICAgICB2YXIgdHlwZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogX1dpZGdldFR5cGUuTWF0cml4V2lkZ2V0VHlwZS5DdXN0b207XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uT3Blbk1vZGFsV2lkZ2V0LCB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBidXR0b25zOiBidXR0b25zLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS50aGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgbW9kYWwgd2lkZ2V0LiBUaGUgd2lkZ2V0J3Mgc2Vzc2lvbiB3aWxsIGJlIHRlcm1pbmF0ZWQgc2hvcnRseSBhZnRlci5cbiAgICAgKiBAcGFyYW0ge0lNb2RhbFdpZGdldFJldHVybkRhdGF9IGRhdGEgT3B0aW9uYWwgZGF0YSB0byBjbG9zZSB0aGUgbW9kYWwgd2lkZ2V0IHdpdGguXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIHdoZW4gY29tcGxldGUuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJjbG9zZU1vZGFsV2lkZ2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlTW9kYWxXaWRnZXQoKSB7XG4gICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uQ2xvc2VNb2RhbFdpZGdldCwgZGF0YSkudGhlbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZW5kUm9vbUV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbmRSb29tRXZlbnQoZXZlbnRUeXBlLCBjb250ZW50LCByb29tSWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5zZW5kKF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbi5TZW5kRXZlbnQsIHtcbiAgICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICByb29tX2lkOiByb29tSWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZW5kU3RhdGVFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZW5kU3RhdGVFdmVudChldmVudFR5cGUsIHN0YXRlS2V5LCBjb250ZW50LCByb29tSWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5zZW5kKF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbi5TZW5kRXZlbnQsIHtcbiAgICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICBzdGF0ZV9rZXk6IHN0YXRlS2V5LFxuICAgICAgICByb29tX2lkOiByb29tSWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWFkUm9vbUV2ZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWFkUm9vbUV2ZW50cyhldmVudFR5cGUpIHtcbiAgICAgIHZhciBsaW1pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMjU7XG4gICAgICB2YXIgbXNndHlwZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkO1xuICAgICAgdmFyIHJvb21JZHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyA/IGFyZ3VtZW50c1szXSA6IHVuZGVmaW5lZDtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0eXBlOiBldmVudFR5cGUsXG4gICAgICAgIG1zZ3R5cGU6IG1zZ3R5cGUsXG4gICAgICAgIGxpbWl0OiBsaW1pdFxuICAgICAgfTtcblxuICAgICAgaWYgKHJvb21JZHMpIHtcbiAgICAgICAgaWYgKHJvb21JZHMuaW5jbHVkZXMoX1N5bWJvbHMuU3ltYm9scy5BbnlSb29tKSkge1xuICAgICAgICAgIGRhdGEucm9vbV9pZHMgPSBfU3ltYm9scy5TeW1ib2xzLkFueVJvb207XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YS5yb29tX2lkcyA9IHJvb21JZHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLk1TQzI4NzZSZWFkRXZlbnRzLCBkYXRhKS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHJldHVybiByLmV2ZW50cztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWFkU3RhdGVFdmVudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZFN0YXRlRXZlbnRzKGV2ZW50VHlwZSkge1xuICAgICAgdmFyIGxpbWl0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAyNTtcbiAgICAgIHZhciBzdGF0ZUtleSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkO1xuICAgICAgdmFyIHJvb21JZHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyA/IGFyZ3VtZW50c1szXSA6IHVuZGVmaW5lZDtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0eXBlOiBldmVudFR5cGUsXG4gICAgICAgIHN0YXRlX2tleTogc3RhdGVLZXkgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzdGF0ZUtleSxcbiAgICAgICAgbGltaXQ6IGxpbWl0XG4gICAgICB9O1xuXG4gICAgICBpZiAocm9vbUlkcykge1xuICAgICAgICBpZiAocm9vbUlkcy5pbmNsdWRlcyhfU3ltYm9scy5TeW1ib2xzLkFueVJvb20pKSB7XG4gICAgICAgICAgZGF0YS5yb29tX2lkcyA9IF9TeW1ib2xzLlN5bWJvbHMuQW55Um9vbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhLnJvb21faWRzID0gcm9vbUlkcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uTVNDMjg3NlJlYWRFdmVudHMsIGRhdGEpLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgcmV0dXJuIHIuZXZlbnRzO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBidXR0b24gYXMgZGlzYWJsZWQgb3IgZW5hYmxlZCBvbiB0aGUgbW9kYWwgd2lkZ2V0LiBCdXR0b25zIGFyZSBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQHBhcmFtIHtNb2RhbEJ1dHRvbklEfSBidXR0b25JZCBUaGUgYnV0dG9uIElEIHRvIGVuYWJsZS9kaXNhYmxlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFbmFibGVkIFdoZXRoZXIgb3Igbm90IHRoZSBidXR0b24gaXMgZW5hYmxlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiBjb21wbGV0ZS5cbiAgICAgKiBAdGhyb3dzIFRocm93cyBpZiB0aGUgYnV0dG9uIGNhbm5vdCBiZSBkaXNhYmxlZCwgb3IgdGhlIGNsaWVudCByZWZ1c2VzIHRvIGRpc2FibGUgdGhlIGJ1dHRvbi5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldE1vZGFsQnV0dG9uRW5hYmxlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNb2RhbEJ1dHRvbkVuYWJsZWQoYnV0dG9uSWQsIGlzRW5hYmxlZCkge1xuICAgICAgaWYgKGJ1dHRvbklkID09PSBfTW9kYWxXaWRnZXRBY3Rpb25zLkJ1aWx0SW5Nb2RhbEJ1dHRvbklELkNsb3NlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjbG9zZSBidXR0b24gY2Fubm90IGJlIGRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24uU2V0TW9kYWxCdXR0b25FbmFibGVkLCB7XG4gICAgICAgIGJ1dHRvbjogYnV0dG9uSWQsXG4gICAgICAgIGVuYWJsZWQ6IGlzRW5hYmxlZFxuICAgICAgfSkudGhlbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBuYXZpZ2F0ZSB0aGUgY2xpZW50IHRvIHRoZSBnaXZlbiBVUkkuIFRoaXMgY2FuIG9ubHkgYmUgY2FsbGVkIHdpdGggTWF0cml4IFVSSXNcbiAgICAgKiAoY3VycmVudGx5IG9ubHkgbWF0cml4LnRvLCBidXQgaW4gZnV0dXJlIGEgTWF0cml4IFVSSSBzY2hlbWUgd2lsbCBiZSBkZWZpbmVkKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJpIFRoZSBVUkkgdG8gbmF2aWdhdGUgdG8uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIHdoZW4gY29tcGxldGUuXG4gICAgICogQHRocm93cyBUaHJvd3MgaWYgdGhlIFVSSSBpcyBpbnZhbGlkIG9yIGNhbm5vdCBiZSBwcm9jZXNzZWQuXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBjdXJyZW50bHkgcmVsaWVzIG9uIGFuIHVuc3RhYmxlIE1TQyAoTVNDMjkzMSkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJuYXZpZ2F0ZVRvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5hdmlnYXRlVG8odXJpKSB7XG4gICAgICBpZiAoIXVyaSB8fCAhdXJpLnN0YXJ0c1dpdGgoXCJodHRwczovL21hdHJpeC50by8jXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbWF0cml4LnRvIFVSSVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnNlbmQoX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uLk1TQzI5MzFOYXZpZ2F0ZSwge1xuICAgICAgICB1cmk6IHVyaVxuICAgICAgfSkudGhlbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIGNvbW11bmljYXRpb24gY2hhbm5lbC4gVGhpcyBzaG91bGQgYmUgZG9uZSBlYXJseSB0byBlbnN1cmVcbiAgICAgKiB0aGF0IG1lc3NhZ2VzIGFyZSBub3QgbWlzc2VkLiBDb21tdW5pY2F0aW9uIGNhbiBvbmx5IGJlIHN0b3BwZWQgYnkgdGhlIGNsaWVudC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInN0YXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHRoaXMudHJhbnNwb3J0LnN0YXJ0KCk7XG4gICAgICB0aGlzLmdldENsaWVudFZlcnNpb25zKCkudGhlbihmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAodi5pbmNsdWRlcyhfQXBpVmVyc2lvbi5VbnN0YWJsZUFwaVZlcnNpb24uTVNDMjk3NCkpIHtcbiAgICAgICAgICBfdGhpczQuc3VwcG9ydHNNU0MyOTc0UmVuZWdvdGlhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2KSB7XG4gICAgICB2YXIgYWN0aW9uRXYgPSBuZXcgQ3VzdG9tRXZlbnQoXCJhY3Rpb246XCIuY29uY2F0KGV2LmRldGFpbC5hY3Rpb24pLCB7XG4gICAgICAgIGRldGFpbDogZXYuZGV0YWlsLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZW1pdChcImFjdGlvbjpcIi5jb25jYXQoZXYuZGV0YWlsLmFjdGlvbiksIGFjdGlvbkV2KTtcblxuICAgICAgaWYgKCFhY3Rpb25Fdi5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHN3aXRjaCAoZXYuZGV0YWlsLmFjdGlvbikge1xuICAgICAgICAgIGNhc2UgX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5TdXBwb3J0ZWRBcGlWZXJzaW9uczpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcGx5VmVyc2lvbnMoZXYuZGV0YWlsKTtcblxuICAgICAgICAgIGNhc2UgX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5DYXBhYmlsaXRpZXM6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVDYXBhYmlsaXRpZXMoZXYuZGV0YWlsKTtcblxuICAgICAgICAgIGNhc2UgX1dpZGdldEFwaUFjdGlvbi5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5VcGRhdGVWaXNpYmlsaXR5OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KGV2LmRldGFpbCwge30pO1xuICAgICAgICAgIC8vIGFjayB0byBhdm9pZCBlcnJvciBzcGFtXG5cbiAgICAgICAgICBjYXNlIF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpVG9XaWRnZXRBY3Rpb24uTm90aWZ5Q2FwYWJpbGl0aWVzOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KGV2LmRldGFpbCwge30pO1xuICAgICAgICAgIC8vIGFjayB0byBhdm9pZCBlcnJvciBzcGFtXG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KGV2LmRldGFpbCwge1xuICAgICAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVW5rbm93biBvciB1bnN1cHBvcnRlZCBhY3Rpb246IFwiICsgZXYuZGV0YWlsLmFjdGlvblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXBseVZlcnNpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcGx5VmVyc2lvbnMocmVxdWVzdCkge1xuICAgICAgdGhpcy50cmFuc3BvcnQucmVwbHkocmVxdWVzdCwge1xuICAgICAgICBzdXBwb3J0ZWRfdmVyc2lvbnM6IF9BcGlWZXJzaW9uLkN1cnJlbnRBcGlWZXJzaW9uc1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENsaWVudFZlcnNpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsaWVudFZlcnNpb25zKCkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY2FjaGVkQ2xpZW50VmVyc2lvbnMpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jYWNoZWRDbGllbnRWZXJzaW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5zZW5kKF9XaWRnZXRBcGlBY3Rpb24uV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbi5TdXBwb3J0ZWRBcGlWZXJzaW9ucywge30pLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgX3RoaXM1LmNhY2hlZENsaWVudFZlcnNpb25zID0gci5zdXBwb3J0ZWRfdmVyc2lvbnM7XG4gICAgICAgIHJldHVybiByLnN1cHBvcnRlZF92ZXJzaW9ucztcbiAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwibm9uLWZhdGFsIGVycm9yIGdldHRpbmcgc3VwcG9ydGVkIGNsaWVudCB2ZXJzaW9uczogXCIsIGUpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlQ2FwYWJpbGl0aWVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNhcGFiaWxpdGllcyhyZXF1ZXN0KSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuY2FwYWJpbGl0aWVzRmluaXNoZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LnJlcGx5KHJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJDYXBhYmlsaXR5IG5lZ290aWF0aW9uIGFscmVhZHkgY29tcGxldGVkXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSAvLyBTZWUgaWYgd2UgY2FuIGV4cGVjdCBhIGNhcGFiaWxpdGllcyBub3RpZmljYXRpb24gb3Igbm90XG5cblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2xpZW50VmVyc2lvbnMoKS50aGVuKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LmluY2x1ZGVzKF9BcGlWZXJzaW9uLlVuc3RhYmxlQXBpVmVyc2lvbi5NU0MyODcxKSkge1xuICAgICAgICAgIF90aGlzNi5vbmNlKFwiYWN0aW9uOlwiLmNvbmNhdChfV2lkZ2V0QXBpQWN0aW9uLldpZGdldEFwaVRvV2lkZ2V0QWN0aW9uLk5vdGlmeUNhcGFiaWxpdGllcyksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXM2LmFwcHJvdmVkQ2FwYWJpbGl0aWVzID0gZXYuZGV0YWlsLmRhdGEuYXBwcm92ZWQ7XG5cbiAgICAgICAgICAgIF90aGlzNi5lbWl0KFwicmVhZHlcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgd2UgY2FuJ3QgZXhwZWN0IG5vdGlmaWNhdGlvbiwgd2UncmUgYXMgZG9uZSBhcyB3ZSBjYW4gYmVcbiAgICAgICAgICBfdGhpczYuZW1pdChcInJlYWR5XCIpO1xuICAgICAgICB9IC8vIGluIGVpdGhlciBjYXNlLCByZXBseSB0byB0aGF0IGNhcGFiaWxpdGllcyByZXF1ZXN0XG5cblxuICAgICAgICBfdGhpczYuY2FwYWJpbGl0aWVzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gX3RoaXM2LnRyYW5zcG9ydC5yZXBseShyZXF1ZXN0LCB7XG4gICAgICAgICAgY2FwYWJpbGl0aWVzOiBfdGhpczYucmVxdWVzdGVkQ2FwYWJpbGl0aWVzXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFdpZGdldEFwaTtcbn0oX2V2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG5leHBvcnRzLldpZGdldEFwaSA9IFdpZGdldEFwaTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuV2lkZ2V0RHJpdmVyID0gdm9pZCAwO1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuLlwiKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGZ1bmN0aW9ucyBhbmQgYmVoYXZpb3VyIHRoZSB3aWRnZXQtYXBpIGlzIHVuYWJsZSB0b1xuICogZG8sIHN1Y2ggYXMgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBpbmZvcm1hdGlvbiBvciBpbnRlcmFjdGluZyB3aXRoXG4gKiB0aGUgVUkuIENsaWVudHMgYXJlIGV4cGVjdGVkIHRvIGltcGxlbWVudCB0aGlzIGNsYXNzIGFuZCBvdmVycmlkZVxuICogYW55IGZ1bmN0aW9ucyB0aGV5IG5lZWQvd2FudCB0byBzdXBwb3J0LlxuICpcbiAqIFRoaXMgY2xhc3MgYXNzdW1lcyB0aGUgY2xpZW50IHdpbGwgaGF2ZSBhIGNvbnRleHQgb2YgYSBXaWRnZXRcbiAqIGluc3RhbmNlIGFscmVhZHkuXG4gKi9cbnZhciBXaWRnZXREcml2ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBXaWRnZXREcml2ZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpZGdldERyaXZlcik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2lkZ2V0RHJpdmVyLCBbe1xuICAgIGtleTogXCJ2YWxpZGF0ZUNhcGFiaWxpdGllc1wiLFxuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgdGhlIHdpZGdldCdzIHJlcXVlc3RlZCBjYXBhYmlsaXRpZXMsIHJldHVybmluZyB0aGUgb25lc1xuICAgICAqIGl0IGlzIGFwcHJvdmVkIHRvIHVzZS4gTXV0YXRpbmcgdGhlIHJlcXVlc3RlZCBjYXBhYmlsaXRpZXMgd2lsbFxuICAgICAqIGhhdmUgbm8gZWZmZWN0LlxuICAgICAqXG4gICAgICogVGhpcyBTSE9VTEQgcmVzdWx0IGluIHRoZSB1c2VyIGJlaW5nIHByb21wdGVkIHRvIGFwcHJvdmUvZGVueVxuICAgICAqIGNhcGFiaWxpdGllcy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQgdGhpcyByZWplY3RzIGFsbCBjYXBhYmlsaXRpZXMgKHJldHVybnMgYW4gZW1wdHkgc2V0KS5cbiAgICAgKiBAcGFyYW0ge1NldDxDYXBhYmlsaXR5Pn0gcmVxdWVzdGVkIFRoZSBzZXQgb2YgcmVxdWVzdGVkIGNhcGFiaWxpdGllcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZXQ8Q2FwYWJpbGl0eT4+fSBSZXNvbHZlcyB0byB0aGUgYWxsb3dlZCBjYXBhYmlsaXRpZXMuXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbGlkYXRlQ2FwYWJpbGl0aWVzKHJlcXVlc3RlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgU2V0KCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhbiBldmVudCBpbnRvIGEgcm9vbS4gSWYgYHJvb21JZGAgaXMgZmFsc3ksIHRoZSBjbGllbnQgc2hvdWxkIHNlbmQgdGhlIGV2ZW50XG4gICAgICogaW50byB0aGUgcm9vbSB0aGUgdXNlciBpcyBjdXJyZW50bHkgbG9va2luZyBhdC4gVGhlIHdpZGdldCBBUEkgd2lsbCBoYXZlIGFscmVhZHlcbiAgICAgKiB2ZXJpZmllZCB0aGF0IHRoZSB3aWRnZXQgaXMgY2FwYWJsZSBvZiBzZW5kaW5nIHRoZSBldmVudCB0byB0aGF0IHJvb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBUaGUgZXZlbnQgdHlwZSB0byBiZSBzZW50LlxuICAgICAqIEBwYXJhbSB7Kn0gY29udGVudCBUaGUgY29udGVudCBmb3IgdGhlIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHN0YXRlS2V5IFRoZSBzdGF0ZSBrZXkgaWYgdGhpcyBpcyBhIHN0YXRlIGV2ZW50LCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKiBNYXkgYmUgYW4gZW1wdHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHJvb21JZCBUaGUgcm9vbSBJRCB0byBzZW5kIHRoZSBldmVudCB0by4gSWYgZmFsc3ksIHRoZSByb29tIHRoZVxuICAgICAqIHVzZXIgaXMgY3VycmVudGx5IGxvb2tpbmcgYXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SVNlbmRFdmVudERldGFpbHM+fSBSZXNvbHZlcyB3aGVuIHRoZSBldmVudCBoYXMgYmVlbiBzZW50IHdpdGhcbiAgICAgKiBkZXRhaWxzIG9mIHRoYXQgZXZlbnQuXG4gICAgICogQHRocm93cyBSZWplY3RlZCB3aGVuIHRoZSBldmVudCBjb3VsZCBub3QgYmUgc2VudC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNlbmRFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZW5kRXZlbnQoZXZlbnRUeXBlLCBjb250ZW50KSB7XG4gICAgICB2YXIgc3RhdGVLZXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IG51bGw7XG4gICAgICB2YXIgcm9vbUlkID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBvdmVycmlkZSBmdW5jdGlvblwiKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWRzIGFsbCBldmVudHMgb2YgdGhlIGdpdmVuIHR5cGUsIGFuZCBvcHRpb25hbGx5IGBtc2d0eXBlYCAoaWYgYXBwbGljYWJsZS9kZWZpbmVkKSxcbiAgICAgKiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvLiBUaGUgd2lkZ2V0IEFQSSB3aWxsIGhhdmUgYWxyZWFkeSB2ZXJpZmllZCB0aGF0IHRoZSB3aWRnZXQgaXNcbiAgICAgKiBjYXBhYmxlIG9mIHJlY2VpdmluZyB0aGUgZXZlbnRzLiBMZXNzIGV2ZW50cyB0aGFuIHRoZSBsaW1pdCBhcmUgYWxsb3dlZCB0byBiZSByZXR1cm5lZCxcbiAgICAgKiBidXQgbm90IG1vcmUuIElmIGByb29tSWRzYCBpcyBzdXBwbGllZCwgaXQgbWF5IGNvbnRhaW4gYFN5bWJvbHMuQW55Um9vbWAgdG8gZGVub3RlIHRoYXRcbiAgICAgKiBgbGltaXRgIGluIGVhY2ggb2YgdGhlIGNsaWVudCdzIGtub3duIHJvb21zIHNob3VsZCBiZSByZXR1cm5lZC4gV2hlbiBgbnVsbGAsIG9ubHkgdGhlXG4gICAgICogcm9vbSB0aGUgdXNlciBpcyBjdXJyZW50bHkgbG9va2luZyBhdCBzaG91bGQgYmUgY29uc2lkZXJlZC5cbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIFRoZSBldmVudCB0eXBlIHRvIGJlIHJlYWQuXG4gICAgICogQHBhcmFtIG1zZ3R5cGUgVGhlIG1zZ3R5cGUgb2YgdGhlIGV2ZW50cyB0byBiZSByZWFkLCBpZiBhcHBsaWNhYmxlL2RlZmluZWQuXG4gICAgICogQHBhcmFtIGxpbWl0IFRoZSBtYXhpbXVtIG51bWJlciBvZiBldmVudHMgdG8gcmV0cmlldmUgcGVyIHJvb20uIFdpbGwgYmUgemVybyB0byBkZW5vdGUgXCJhcyBtYW55XG4gICAgICogYXMgcG9zc2libGVcIi5cbiAgICAgKiBAcGFyYW0gcm9vbUlkcyBXaGVuIG51bGwsIHRoZSB1c2VyJ3MgY3VycmVudGx5IHZpZXdlZCByb29tLiBPdGhlcndpc2UsIHRoZSBsaXN0IG9mIHJvb20gSURzXG4gICAgICogdG8gbG9vayB3aXRoaW4sIHBvc3NpYmx5IGNvbnRhaW5pbmcgU3ltYm9scy5BbnlSb29tIHRvIGRlbm90ZSBhbGwga25vd24gcm9vbXMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8KltdPn0gUmVzb2x2ZXMgdG8gdGhlIHJvb20gZXZlbnRzLCBvciBhbiBlbXB0eSBhcnJheS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlYWRSb29tRXZlbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlYWRSb29tRXZlbnRzKGV2ZW50VHlwZSwgbXNndHlwZSwgbGltaXQpIHtcbiAgICAgIHZhciByb29tSWRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWRzIGFsbCBldmVudHMgb2YgdGhlIGdpdmVuIHR5cGUsIGFuZCBvcHRpb25hbGx5IHN0YXRlIGtleSAoaWYgYXBwbGljYWJsZS9kZWZpbmVkKSxcbiAgICAgKiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvLiBUaGUgd2lkZ2V0IEFQSSB3aWxsIGhhdmUgYWxyZWFkeSB2ZXJpZmllZCB0aGF0IHRoZSB3aWRnZXQgaXNcbiAgICAgKiBjYXBhYmxlIG9mIHJlY2VpdmluZyB0aGUgZXZlbnRzLiBMZXNzIGV2ZW50cyB0aGFuIHRoZSBsaW1pdCBhcmUgYWxsb3dlZCB0byBiZSByZXR1cm5lZCxcbiAgICAgKiBidXQgbm90IG1vcmUuIElmIGByb29tSWRzYCBpcyBzdXBwbGllZCwgaXQgbWF5IGNvbnRhaW4gYFN5bWJvbHMuQW55Um9vbWAgdG8gZGVub3RlIHRoYXRcbiAgICAgKiBgbGltaXRgIGluIGVhY2ggb2YgdGhlIGNsaWVudCdzIGtub3duIHJvb21zIHNob3VsZCBiZSByZXR1cm5lZC4gV2hlbiBgbnVsbGAsIG9ubHkgdGhlXG4gICAgICogcm9vbSB0aGUgdXNlciBpcyBjdXJyZW50bHkgbG9va2luZyBhdCBzaG91bGQgYmUgY29uc2lkZXJlZC5cbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIFRoZSBldmVudCB0eXBlIHRvIGJlIHJlYWQuXG4gICAgICogQHBhcmFtIHN0YXRlS2V5IFRoZSBzdGF0ZSBrZXkgb2YgdGhlIGV2ZW50cyB0byBiZSByZWFkLCBpZiBhcHBsaWNhYmxlL2RlZmluZWQuXG4gICAgICogQHBhcmFtIGxpbWl0IFRoZSBtYXhpbXVtIG51bWJlciBvZiBldmVudHMgdG8gcmV0cmlldmUuIFdpbGwgYmUgemVybyB0byBkZW5vdGUgXCJhcyBtYW55XG4gICAgICogYXMgcG9zc2libGVcIi5cbiAgICAgKiBAcGFyYW0gcm9vbUlkcyBXaGVuIG51bGwsIHRoZSB1c2VyJ3MgY3VycmVudGx5IHZpZXdlZCByb29tLiBPdGhlcndpc2UsIHRoZSBsaXN0IG9mIHJvb20gSURzXG4gICAgICogdG8gbG9vayB3aXRoaW4sIHBvc3NpYmx5IGNvbnRhaW5pbmcgU3ltYm9scy5BbnlSb29tIHRvIGRlbm90ZSBhbGwga25vd24gcm9vbXMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8KltdPn0gUmVzb2x2ZXMgdG8gdGhlIHN0YXRlIGV2ZW50cywgb3IgYW4gZW1wdHkgYXJyYXkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZWFkU3RhdGVFdmVudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZFN0YXRlRXZlbnRzKGV2ZW50VHlwZSwgc3RhdGVLZXksIGxpbWl0KSB7XG4gICAgICB2YXIgcm9vbUlkcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogbnVsbDtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBc2tzIHRoZSB1c2VyIGZvciBwZXJtaXNzaW9uIHRvIHZhbGlkYXRlIHRoZWlyIGlkZW50aXR5IHRocm91Z2ggT3BlbklEIENvbm5lY3QuIFRoZVxuICAgICAqIGludGVyZmFjZSBmb3IgdGhpcyBmdW5jdGlvbiBpcyBhbiBvYnNlcnZhYmxlIHdoaWNoIGFjY2VwdHMgdGhlIHN0YXRlIG1hY2hpbmUgb2YgdGhlXG4gICAgICogT0lEQyBleGNoYW5nZSBmbG93LiBGb3IgZXhhbXBsZSwgaWYgdGhlIGNsaWVudC91c2VyIGJsb2NrcyB0aGUgcmVxdWVzdCB0aGVuIGl0IHdvdWxkXG4gICAgICogZmVlZCBiYWNrIGEgYHtzdGF0ZTogQmxvY2tlZH1gIGludG8gdGhlIG9ic2VydmFibGUuIFNpbWlsYXJseSwgaWYgdGhlIHVzZXIgYWxyZWFkeVxuICAgICAqIGFwcHJvdmVkIHRoZSB3aWRnZXQgdGhlbiBhIGB7c3RhdGU6IEFsbG93ZWR9YCB3b3VsZCBiZSBmZWQgaW50byB0aGUgb2JzZXJ2YWJsZSBhbG9uZ3NpZGVcbiAgICAgKiB0aGUgdG9rZW4gaXRzZWxmLiBJZiB0aGUgY2xpZW50IGlzIGFza2luZyBmb3IgcGVybWlzc2lvbiwgaXQgc2hvdWxkIGZlZWQgaW4gYVxuICAgICAqIGB7c3RhdGU6IFBlbmRpbmdVc2VyQ29uZmlybWF0aW9ufWAgZm9sbG93ZWQgYnkgdGhlIHJlbGV2YW50IEFsbG93ZWQgb3IgQmxvY2tlZCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIFRoZSB3aWRnZXQgQVBJIHdpbGwgcmVqZWN0IHRoZSB3aWRnZXQncyByZXF1ZXN0IHdpdGggYW4gZXJyb3IgaWYgdGhpcyBjb250cmFjdCBpcyBub3RcbiAgICAgKiBtZXQgcHJvcGVybHkuIEJ5IGRlZmF1bHQsIHRoZSB3aWRnZXQgZHJpdmVyIHdpbGwgYmxvY2sgYWxsIE9JREMgcmVxdWVzdHMuXG4gICAgICogQHBhcmFtIHtTaW1wbGVPYnNlcnZhYmxlPElPcGVuSURVcGRhdGU+fSBvYnNlcnZlciBUaGUgb2JzZXJ2YWJsZSB0byBmZWVkIHVwZGF0ZXMgaW50by5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImFza09wZW5JRFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc2tPcGVuSUQob2JzZXJ2ZXIpIHtcbiAgICAgIG9ic2VydmVyLnVwZGF0ZSh7XG4gICAgICAgIHN0YXRlOiBfLk9wZW5JRFJlcXVlc3RTdGF0ZS5CbG9ja2VkXG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTmF2aWdhdGVzIHRoZSBjbGllbnQgd2l0aCBhIG1hdHJpeC50byBVUkkuIEluIGZ1dHVyZSB0aGlzIGZ1bmN0aW9uIHdpbGwgYWxzbyBiZSBwcm92aWRlZFxuICAgICAqIHdpdGggdGhlIE1hdHJpeCBVUklzIG9uY2UgbWF0cml4LnRvIGlzIHJlcGxhY2VkLiBUaGUgZ2l2ZW4gVVJJIHdpbGwgaGF2ZSBhbHJlYWR5IGJlZW5cbiAgICAgKiBsaWdodGx5IGNoZWNrZWQgdG8gZW5zdXJlIGl0IGxvb2tzIGxpa2UgYSB2YWxpZCBVUkksIHRob3VnaCB0aGUgaW1wbGVtZW50YXRpb24gaXMgcmVjb21tZW5kZWRcbiAgICAgKiB0byBkbyBmdXJ0aGVyIGNoZWNrcyBvbiB0aGUgVVJJLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgVGhlIFVSSSB0byBuYXZpZ2F0ZSB0by5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiBjb21wbGV0ZS5cbiAgICAgKiBAdGhyb3dzIFRocm93cyBpZiB0aGVyZSdzIGEgcHJvYmxlbSB3aXRoIHRoZSBuYXZpZ2F0aW9uLCBzdWNoIGFzIGludmFsaWQgZm9ybWF0LlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibmF2aWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmF2aWdhdGUodXJpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOYXZpZ2F0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2lkZ2V0RHJpdmVyO1xufSgpO1xuXG5leHBvcnRzLldpZGdldERyaXZlciA9IFdpZGdldERyaXZlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9XaWRnZXRBcGkgPSByZXF1aXJlKFwiLi9XaWRnZXRBcGlcIik7XG5cbk9iamVjdC5rZXlzKF9XaWRnZXRBcGkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9XaWRnZXRBcGlba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfQ2xpZW50V2lkZ2V0QXBpID0gcmVxdWlyZShcIi4vQ2xpZW50V2lkZ2V0QXBpXCIpO1xuXG5PYmplY3Qua2V5cyhfQ2xpZW50V2lkZ2V0QXBpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfQ2xpZW50V2lkZ2V0QXBpW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1N5bWJvbHMgPSByZXF1aXJlKFwiLi9TeW1ib2xzXCIpO1xuXG5PYmplY3Qua2V5cyhfU3ltYm9scykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1N5bWJvbHNba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfSVRyYW5zcG9ydCA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydC9JVHJhbnNwb3J0XCIpO1xuXG5PYmplY3Qua2V5cyhfSVRyYW5zcG9ydCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0lUcmFuc3BvcnRba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfUG9zdG1lc3NhZ2VUcmFuc3BvcnQgPSByZXF1aXJlKFwiLi90cmFuc3BvcnQvUG9zdG1lc3NhZ2VUcmFuc3BvcnRcIik7XG5cbk9iamVjdC5rZXlzKF9Qb3N0bWVzc2FnZVRyYW5zcG9ydCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1Bvc3RtZXNzYWdlVHJhbnNwb3J0W2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX0lDdXN0b21XaWRnZXREYXRhID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9JQ3VzdG9tV2lkZ2V0RGF0YVwiKTtcblxuT2JqZWN0LmtleXMoX0lDdXN0b21XaWRnZXREYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfSUN1c3RvbVdpZGdldERhdGFba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfSUppdHNpV2lkZ2V0RGF0YSA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvSUppdHNpV2lkZ2V0RGF0YVwiKTtcblxuT2JqZWN0LmtleXMoX0lKaXRzaVdpZGdldERhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9JSml0c2lXaWRnZXREYXRhW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX0lTdGlja2VycGlja2VyV2lkZ2V0RGF0YSA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvSVN0aWNrZXJwaWNrZXJXaWRnZXREYXRhXCIpO1xuXG5PYmplY3Qua2V5cyhfSVN0aWNrZXJwaWNrZXJXaWRnZXREYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfSVN0aWNrZXJwaWNrZXJXaWRnZXREYXRhW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX0lXaWRnZXQgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0lXaWRnZXRcIik7XG5cbk9iamVjdC5rZXlzKF9JV2lkZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfSVdpZGdldFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9XaWRnZXRUeXBlID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9XaWRnZXRUeXBlXCIpO1xuXG5PYmplY3Qua2V5cyhfV2lkZ2V0VHlwZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1dpZGdldFR5cGVba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfSVdpZGdldEFwaUVycm9yUmVzcG9uc2UgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0lXaWRnZXRBcGlFcnJvclJlc3BvbnNlXCIpO1xuXG5PYmplY3Qua2V5cyhfSVdpZGdldEFwaUVycm9yUmVzcG9uc2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9JV2lkZ2V0QXBpRXJyb3JSZXNwb25zZVtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9JV2lkZ2V0QXBpUmVxdWVzdCA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvSVdpZGdldEFwaVJlcXVlc3RcIik7XG5cbk9iamVjdC5rZXlzKF9JV2lkZ2V0QXBpUmVxdWVzdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0lXaWRnZXRBcGlSZXF1ZXN0W2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX0lXaWRnZXRBcGlSZXNwb25zZSA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvSVdpZGdldEFwaVJlc3BvbnNlXCIpO1xuXG5PYmplY3Qua2V5cyhfSVdpZGdldEFwaVJlc3BvbnNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfSVdpZGdldEFwaVJlc3BvbnNlW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1dpZGdldEFwaUFjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvV2lkZ2V0QXBpQWN0aW9uXCIpO1xuXG5PYmplY3Qua2V5cyhfV2lkZ2V0QXBpQWN0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfV2lkZ2V0QXBpQWN0aW9uW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1dpZGdldEFwaURpcmVjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvV2lkZ2V0QXBpRGlyZWN0aW9uXCIpO1xuXG5PYmplY3Qua2V5cyhfV2lkZ2V0QXBpRGlyZWN0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfV2lkZ2V0QXBpRGlyZWN0aW9uW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX0FwaVZlcnNpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0FwaVZlcnNpb25cIik7XG5cbk9iamVjdC5rZXlzKF9BcGlWZXJzaW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfQXBpVmVyc2lvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9DYXBhYmlsaXRpZXMgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0NhcGFiaWxpdGllc1wiKTtcblxuT2JqZWN0LmtleXMoX0NhcGFiaWxpdGllcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0NhcGFiaWxpdGllc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9DYXBhYmlsaXRpZXNBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0NhcGFiaWxpdGllc0FjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX0NhcGFiaWxpdGllc0FjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0NhcGFiaWxpdGllc0FjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9Db250ZW50TG9hZGVkQWN0aW9uID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9Db250ZW50TG9hZGVkQWN0aW9uXCIpO1xuXG5PYmplY3Qua2V5cyhfQ29udGVudExvYWRlZEFjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0NvbnRlbnRMb2FkZWRBY3Rpb25ba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfU2NyZWVuc2hvdEFjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvU2NyZWVuc2hvdEFjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX1NjcmVlbnNob3RBY3Rpb24pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9TY3JlZW5zaG90QWN0aW9uW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1N0aWNrZXJBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1N0aWNrZXJBY3Rpb25cIik7XG5cbk9iamVjdC5rZXlzKF9TdGlja2VyQWN0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfU3RpY2tlckFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9TdGlja3lBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1N0aWNreUFjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX1N0aWNreUFjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1N0aWNreUFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9TdXBwb3J0ZWRWZXJzaW9uc0FjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvU3VwcG9ydGVkVmVyc2lvbnNBY3Rpb25cIik7XG5cbk9iamVjdC5rZXlzKF9TdXBwb3J0ZWRWZXJzaW9uc0FjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1N1cHBvcnRlZFZlcnNpb25zQWN0aW9uW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1Zpc2liaWxpdHlBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1Zpc2liaWxpdHlBY3Rpb25cIik7XG5cbk9iamVjdC5rZXlzKF9WaXNpYmlsaXR5QWN0aW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfVmlzaWJpbGl0eUFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9HZXRPcGVuSURBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0dldE9wZW5JREFjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX0dldE9wZW5JREFjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0dldE9wZW5JREFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9PcGVuSURDcmVkZW50aWFsc0FjdGlvbiA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvT3BlbklEQ3JlZGVudGlhbHNBY3Rpb25cIik7XG5cbk9iamVjdC5rZXlzKF9PcGVuSURDcmVkZW50aWFsc0FjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX09wZW5JRENyZWRlbnRpYWxzQWN0aW9uW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1dpZGdldEtpbmQgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1dpZGdldEtpbmRcIik7XG5cbk9iamVjdC5rZXlzKF9XaWRnZXRLaW5kKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfV2lkZ2V0S2luZFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9Nb2RhbEJ1dHRvbktpbmQgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL01vZGFsQnV0dG9uS2luZFwiKTtcblxuT2JqZWN0LmtleXMoX01vZGFsQnV0dG9uS2luZCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX01vZGFsQnV0dG9uS2luZFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9Nb2RhbFdpZGdldEFjdGlvbnMgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL01vZGFsV2lkZ2V0QWN0aW9uc1wiKTtcblxuT2JqZWN0LmtleXMoX01vZGFsV2lkZ2V0QWN0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX01vZGFsV2lkZ2V0QWN0aW9uc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9TZXRNb2RhbEJ1dHRvbkVuYWJsZWRBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1NldE1vZGFsQnV0dG9uRW5hYmxlZEFjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX1NldE1vZGFsQnV0dG9uRW5hYmxlZEFjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1NldE1vZGFsQnV0dG9uRW5hYmxlZEFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9XaWRnZXRDb25maWdBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1dpZGdldENvbmZpZ0FjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX1dpZGdldENvbmZpZ0FjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1dpZGdldENvbmZpZ0FjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9TZW5kRXZlbnRBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1NlbmRFdmVudEFjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX1NlbmRFdmVudEFjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1NlbmRFdmVudEFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9SZWFkRXZlbnRBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL1JlYWRFdmVudEFjdGlvblwiKTtcblxuT2JqZWN0LmtleXMoX1JlYWRFdmVudEFjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1JlYWRFdmVudEFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9JUm9vbUV2ZW50ID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy9JUm9vbUV2ZW50XCIpO1xuXG5PYmplY3Qua2V5cyhfSVJvb21FdmVudCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0lSb29tRXZlbnRba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfTmF2aWdhdGVBY3Rpb24gPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzL05hdmlnYXRlQWN0aW9uXCIpO1xuXG5PYmplY3Qua2V5cyhfTmF2aWdhdGVBY3Rpb24pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9OYXZpZ2F0ZUFjdGlvbltrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9XaWRnZXRFdmVudENhcGFiaWxpdHkgPSByZXF1aXJlKFwiLi9tb2RlbHMvV2lkZ2V0RXZlbnRDYXBhYmlsaXR5XCIpO1xuXG5PYmplY3Qua2V5cyhfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfV2lkZ2V0RXZlbnRDYXBhYmlsaXR5W2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX3VybCA9IHJlcXVpcmUoXCIuL21vZGVscy92YWxpZGF0aW9uL3VybFwiKTtcblxuT2JqZWN0LmtleXMoX3VybCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX3VybFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuL21vZGVscy92YWxpZGF0aW9uL3V0aWxzXCIpO1xuXG5PYmplY3Qua2V5cyhfdXRpbHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF91dGlsc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9XaWRnZXQgPSByZXF1aXJlKFwiLi9tb2RlbHMvV2lkZ2V0XCIpO1xuXG5PYmplY3Qua2V5cyhfV2lkZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfV2lkZ2V0W2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1dpZGdldFBhcnNlciA9IHJlcXVpcmUoXCIuL21vZGVscy9XaWRnZXRQYXJzZXJcIik7XG5cbk9iamVjdC5rZXlzKF9XaWRnZXRQYXJzZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9XaWRnZXRQYXJzZXJba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfdXJsVGVtcGxhdGUgPSByZXF1aXJlKFwiLi90ZW1wbGF0aW5nL3VybC10ZW1wbGF0ZVwiKTtcblxuT2JqZWN0LmtleXMoX3VybFRlbXBsYXRlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfdXJsVGVtcGxhdGVba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfU2ltcGxlT2JzZXJ2YWJsZSA9IHJlcXVpcmUoXCIuL3V0aWwvU2ltcGxlT2JzZXJ2YWJsZVwiKTtcblxuT2JqZWN0LmtleXMoX1NpbXBsZU9ic2VydmFibGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9TaW1wbGVPYnNlcnZhYmxlW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgX1dpZGdldERyaXZlciA9IHJlcXVpcmUoXCIuL2RyaXZlci9XaWRnZXREcml2ZXJcIik7XG5cbk9iamVjdC5rZXlzKF9XaWRnZXREcml2ZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9XaWRnZXREcml2ZXJba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkN1cnJlbnRBcGlWZXJzaW9ucyA9IGV4cG9ydHMuVW5zdGFibGVBcGlWZXJzaW9uID0gZXhwb3J0cy5NYXRyaXhBcGlWZXJzaW9uID0gdm9pZCAwO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgTWF0cml4QXBpVmVyc2lvbjtcbmV4cG9ydHMuTWF0cml4QXBpVmVyc2lvbiA9IE1hdHJpeEFwaVZlcnNpb247XG5cbihmdW5jdGlvbiAoTWF0cml4QXBpVmVyc2lvbikge1xuICBNYXRyaXhBcGlWZXJzaW9uW1wiUHJlcmVsZWFzZTFcIl0gPSBcIjAuMC4xXCI7XG4gIE1hdHJpeEFwaVZlcnNpb25bXCJQcmVyZWxlYXNlMlwiXSA9IFwiMC4wLjJcIjtcbn0pKE1hdHJpeEFwaVZlcnNpb24gfHwgKGV4cG9ydHMuTWF0cml4QXBpVmVyc2lvbiA9IE1hdHJpeEFwaVZlcnNpb24gPSB7fSkpO1xuXG52YXIgVW5zdGFibGVBcGlWZXJzaW9uO1xuZXhwb3J0cy5VbnN0YWJsZUFwaVZlcnNpb24gPSBVbnN0YWJsZUFwaVZlcnNpb247XG5cbihmdW5jdGlvbiAoVW5zdGFibGVBcGlWZXJzaW9uKSB7XG4gIFVuc3RhYmxlQXBpVmVyc2lvbltcIk1TQzI3NjJcIl0gPSBcIm9yZy5tYXRyaXgubXNjMjc2MlwiO1xuICBVbnN0YWJsZUFwaVZlcnNpb25bXCJNU0MyODcxXCJdID0gXCJvcmcubWF0cml4Lm1zYzI4NzFcIjtcbiAgVW5zdGFibGVBcGlWZXJzaW9uW1wiTVNDMjkzMVwiXSA9IFwib3JnLm1hdHJpeC5tc2MyOTMxXCI7XG4gIFVuc3RhYmxlQXBpVmVyc2lvbltcIk1TQzI5NzRcIl0gPSBcIm9yZy5tYXRyaXgubXNjMjk3NFwiO1xuICBVbnN0YWJsZUFwaVZlcnNpb25bXCJNU0MyODc2XCJdID0gXCJvcmcubWF0cml4Lm1zYzI4NzZcIjtcbn0pKFVuc3RhYmxlQXBpVmVyc2lvbiB8fCAoZXhwb3J0cy5VbnN0YWJsZUFwaVZlcnNpb24gPSBVbnN0YWJsZUFwaVZlcnNpb24gPSB7fSkpO1xuXG52YXIgQ3VycmVudEFwaVZlcnNpb25zID0gW01hdHJpeEFwaVZlcnNpb24uUHJlcmVsZWFzZTEsIE1hdHJpeEFwaVZlcnNpb24uUHJlcmVsZWFzZTIsIC8vTWF0cml4QXBpVmVyc2lvbi5WMDEwLFxuVW5zdGFibGVBcGlWZXJzaW9uLk1TQzI3NjIsIFVuc3RhYmxlQXBpVmVyc2lvbi5NU0MyODcxLCBVbnN0YWJsZUFwaVZlcnNpb24uTVNDMjkzMSwgVW5zdGFibGVBcGlWZXJzaW9uLk1TQzI5NzQsIFVuc3RhYmxlQXBpVmVyc2lvbi5NU0MyODc2XTtcbmV4cG9ydHMuQ3VycmVudEFwaVZlcnNpb25zID0gQ3VycmVudEFwaVZlcnNpb25zOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5pc1RpbWVsaW5lQ2FwYWJpbGl0eSA9IGlzVGltZWxpbmVDYXBhYmlsaXR5O1xuZXhwb3J0cy5pc1RpbWVsaW5lQ2FwYWJpbGl0eUZvciA9IGlzVGltZWxpbmVDYXBhYmlsaXR5Rm9yO1xuZXhwb3J0cy5nZXRUaW1lbGluZVJvb21JREZyb21DYXBhYmlsaXR5ID0gZ2V0VGltZWxpbmVSb29tSURGcm9tQ2FwYWJpbGl0eTtcbmV4cG9ydHMuVmlkZW9Db25mZXJlbmNlQ2FwYWJpbGl0aWVzID0gZXhwb3J0cy5TdGlja2VycGlja2VyQ2FwYWJpbGl0aWVzID0gZXhwb3J0cy5NYXRyaXhDYXBhYmlsaXRpZXMgPSB2b2lkIDA7XG5cbi8qXG4gKiBDb3B5cmlnaHQgMjAyMCAtIDIwMjEgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgTWF0cml4Q2FwYWJpbGl0aWVzO1xuZXhwb3J0cy5NYXRyaXhDYXBhYmlsaXRpZXMgPSBNYXRyaXhDYXBhYmlsaXRpZXM7XG5cbihmdW5jdGlvbiAoTWF0cml4Q2FwYWJpbGl0aWVzKSB7XG4gIE1hdHJpeENhcGFiaWxpdGllc1tcIlNjcmVlbnNob3RzXCJdID0gXCJtLmNhcGFiaWxpdHkuc2NyZWVuc2hvdFwiO1xuICBNYXRyaXhDYXBhYmlsaXRpZXNbXCJTdGlja2VyU2VuZGluZ1wiXSA9IFwibS5zdGlja2VyXCI7XG4gIE1hdHJpeENhcGFiaWxpdGllc1tcIkFsd2F5c09uU2NyZWVuXCJdID0gXCJtLmFsd2F5c19vbl9zY3JlZW5cIjtcbiAgTWF0cml4Q2FwYWJpbGl0aWVzW1wiUmVxdWlyZXNDbGllbnRcIl0gPSBcImlvLmVsZW1lbnQucmVxdWlyZXNfY2xpZW50XCI7XG4gIE1hdHJpeENhcGFiaWxpdGllc1tcIk1TQzI5MzFOYXZpZ2F0ZVwiXSA9IFwib3JnLm1hdHJpeC5tc2MyOTMxLm5hdmlnYXRlXCI7XG59KShNYXRyaXhDYXBhYmlsaXRpZXMgfHwgKGV4cG9ydHMuTWF0cml4Q2FwYWJpbGl0aWVzID0gTWF0cml4Q2FwYWJpbGl0aWVzID0ge30pKTtcblxudmFyIFN0aWNrZXJwaWNrZXJDYXBhYmlsaXRpZXMgPSBbTWF0cml4Q2FwYWJpbGl0aWVzLlN0aWNrZXJTZW5kaW5nXTtcbmV4cG9ydHMuU3RpY2tlcnBpY2tlckNhcGFiaWxpdGllcyA9IFN0aWNrZXJwaWNrZXJDYXBhYmlsaXRpZXM7XG52YXIgVmlkZW9Db25mZXJlbmNlQ2FwYWJpbGl0aWVzID0gW01hdHJpeENhcGFiaWxpdGllcy5BbHdheXNPblNjcmVlbl07XG4vKipcbiAqIERldGVybWluZXMgaWYgYSBjYXBhYmlsaXR5IGlzIGEgY2FwYWJpbGl0eSBmb3IgYSB0aW1lbGluZS5cbiAqIEBwYXJhbSB7Q2FwYWJpbGl0eX0gY2FwYWJpbGl0eSBUaGUgY2FwYWJpbGl0eSB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgYSB0aW1lbGluZSBjYXBhYmlsaXR5LCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0cy5WaWRlb0NvbmZlcmVuY2VDYXBhYmlsaXRpZXMgPSBWaWRlb0NvbmZlcmVuY2VDYXBhYmlsaXRpZXM7XG5cbmZ1bmN0aW9uIGlzVGltZWxpbmVDYXBhYmlsaXR5KGNhcGFiaWxpdHkpIHtcbiAgLy8gVE9ETzogQ2hhbmdlIHdoZW4gTVNDMjc2MiBiZWNvbWVzIHN0YWJsZS5cbiAgcmV0dXJuIGNhcGFiaWxpdHkgPT09IG51bGwgfHwgY2FwYWJpbGl0eSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FwYWJpbGl0eS5zdGFydHNXaXRoKFwib3JnLm1hdHJpeC5tc2MyNzYyLnRpbWVsaW5lOlwiKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIGNhcGFiaWxpdHkgaXMgYSB0aW1lbGluZSBjYXBhYmlsaXR5IGZvciB0aGUgZ2l2ZW4gcm9vbS5cbiAqIEBwYXJhbSB7Q2FwYWJpbGl0eX0gY2FwYWJpbGl0eSBUaGUgY2FwYWJpbGl0eSB0byB0ZXN0LlxuICogQHBhcmFtIHtzdHJpbmcgfCBTeW1ib2xzLkFueVJvb219IHJvb21JZCBUaGUgcm9vbSBJRCwgb3IgYFN5bWJvbHMuQW55Um9vbWAgZm9yIHRoYXQgZGVzaWduYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBhIG1hdGNoaW5nIGNhcGFiaWxpdHksIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVGltZWxpbmVDYXBhYmlsaXR5Rm9yKGNhcGFiaWxpdHksIHJvb21JZCkge1xuICByZXR1cm4gY2FwYWJpbGl0eSA9PT0gXCJvcmcubWF0cml4Lm1zYzI3NjIudGltZWxpbmU6XCIuY29uY2F0KHJvb21JZCk7XG59XG4vKipcbiAqIEdldHMgdGhlIHJvb20gSUQgZGVzY3JpYmVkIGJ5IGEgdGltZWxpbmUgY2FwYWJpbGl0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXBhYmlsaXR5IFRoZSBjYXBhYmlsaXR5IHRvIHBhcnNlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJvb20gSUQuXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRUaW1lbGluZVJvb21JREZyb21DYXBhYmlsaXR5KGNhcGFiaWxpdHkpIHtcbiAgcmV0dXJuIGNhcGFiaWxpdHkuc3Vic3RyaW5nKGNhcGFiaWxpdHkuaW5kZXhPZihcIjpcIikgKyAxKTtcbn0iLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuT3BlbklEUmVxdWVzdFN0YXRlID0gdm9pZCAwO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgT3BlbklEUmVxdWVzdFN0YXRlO1xuZXhwb3J0cy5PcGVuSURSZXF1ZXN0U3RhdGUgPSBPcGVuSURSZXF1ZXN0U3RhdGU7XG5cbihmdW5jdGlvbiAoT3BlbklEUmVxdWVzdFN0YXRlKSB7XG4gIE9wZW5JRFJlcXVlc3RTdGF0ZVtcIkFsbG93ZWRcIl0gPSBcImFsbG93ZWRcIjtcbiAgT3BlbklEUmVxdWVzdFN0YXRlW1wiQmxvY2tlZFwiXSA9IFwiYmxvY2tlZFwiO1xuICBPcGVuSURSZXF1ZXN0U3RhdGVbXCJQZW5kaW5nVXNlckNvbmZpcm1hdGlvblwiXSA9IFwicmVxdWVzdFwiO1xufSkoT3BlbklEUmVxdWVzdFN0YXRlIHx8IChleHBvcnRzLk9wZW5JRFJlcXVlc3RTdGF0ZSA9IE9wZW5JRFJlcXVlc3RTdGF0ZSA9IHt9KSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzRXJyb3JSZXNwb25zZSA9IGlzRXJyb3JSZXNwb25zZTtcblxuLypcbiAqIENvcHlyaWdodCAyMDIwIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuZnVuY3Rpb24gaXNFcnJvclJlc3BvbnNlKHJlc3BvbnNlRGF0YSkge1xuICBpZiAoXCJlcnJvclwiIGluIHJlc3BvbnNlRGF0YSkge1xuICAgIHZhciBlcnIgPSByZXNwb25zZURhdGE7XG4gICAgcmV0dXJuICEhZXJyLmVycm9yLm1lc3NhZ2U7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk1vZGFsQnV0dG9uS2luZCA9IHZvaWQgMDtcblxuLypcbiAqIENvcHlyaWdodCAyMDIwIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIE1vZGFsQnV0dG9uS2luZDtcbmV4cG9ydHMuTW9kYWxCdXR0b25LaW5kID0gTW9kYWxCdXR0b25LaW5kO1xuXG4oZnVuY3Rpb24gKE1vZGFsQnV0dG9uS2luZCkge1xuICBNb2RhbEJ1dHRvbktpbmRbXCJQcmltYXJ5XCJdID0gXCJtLnByaW1hcnlcIjtcbiAgTW9kYWxCdXR0b25LaW5kW1wiU2Vjb25kYXJ5XCJdID0gXCJtLnNlY29uZGFyeVwiO1xuICBNb2RhbEJ1dHRvbktpbmRbXCJXYXJuaW5nXCJdID0gXCJtLndhcm5pbmdcIjtcbiAgTW9kYWxCdXR0b25LaW5kW1wiRGFuZ2VyXCJdID0gXCJtLmRhbmdlclwiO1xuICBNb2RhbEJ1dHRvbktpbmRbXCJMaW5rXCJdID0gXCJtLmxpbmtcIjtcbn0pKE1vZGFsQnV0dG9uS2luZCB8fCAoZXhwb3J0cy5Nb2RhbEJ1dHRvbktpbmQgPSBNb2RhbEJ1dHRvbktpbmQgPSB7fSkpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5CdWlsdEluTW9kYWxCdXR0b25JRCA9IHZvaWQgMDtcblxuLypcbiAqIENvcHlyaWdodCAyMDIwIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIEJ1aWx0SW5Nb2RhbEJ1dHRvbklEO1xuZXhwb3J0cy5CdWlsdEluTW9kYWxCdXR0b25JRCA9IEJ1aWx0SW5Nb2RhbEJ1dHRvbklEO1xuXG4oZnVuY3Rpb24gKEJ1aWx0SW5Nb2RhbEJ1dHRvbklEKSB7XG4gIEJ1aWx0SW5Nb2RhbEJ1dHRvbklEW1wiQ2xvc2VcIl0gPSBcIm0uY2xvc2VcIjtcbn0pKEJ1aWx0SW5Nb2RhbEJ1dHRvbklEIHx8IChleHBvcnRzLkJ1aWx0SW5Nb2RhbEJ1dHRvbklEID0gQnVpbHRJbk1vZGFsQnV0dG9uSUQgPSB7fSkpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5XaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uID0gZXhwb3J0cy5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbiA9IHZvaWQgMDtcblxuLypcbiAqIENvcHlyaWdodCAyMDIwIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uO1xuZXhwb3J0cy5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbiA9IFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uO1xuXG4oZnVuY3Rpb24gKFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uKSB7XG4gIFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uW1wiU3VwcG9ydGVkQXBpVmVyc2lvbnNcIl0gPSBcInN1cHBvcnRlZF9hcGlfdmVyc2lvbnNcIjtcbiAgV2lkZ2V0QXBpVG9XaWRnZXRBY3Rpb25bXCJDYXBhYmlsaXRpZXNcIl0gPSBcImNhcGFiaWxpdGllc1wiO1xuICBXaWRnZXRBcGlUb1dpZGdldEFjdGlvbltcIk5vdGlmeUNhcGFiaWxpdGllc1wiXSA9IFwibm90aWZ5X2NhcGFiaWxpdGllc1wiO1xuICBXaWRnZXRBcGlUb1dpZGdldEFjdGlvbltcIlRha2VTY3JlZW5zaG90XCJdID0gXCJzY3JlZW5zaG90XCI7XG4gIFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uW1wiVXBkYXRlVmlzaWJpbGl0eVwiXSA9IFwidmlzaWJpbGl0eVwiO1xuICBXaWRnZXRBcGlUb1dpZGdldEFjdGlvbltcIk9wZW5JRENyZWRlbnRpYWxzXCJdID0gXCJvcGVuaWRfY3JlZGVudGlhbHNcIjtcbiAgV2lkZ2V0QXBpVG9XaWRnZXRBY3Rpb25bXCJXaWRnZXRDb25maWdcIl0gPSBcIndpZGdldF9jb25maWdcIjtcbiAgV2lkZ2V0QXBpVG9XaWRnZXRBY3Rpb25bXCJDbG9zZU1vZGFsV2lkZ2V0XCJdID0gXCJjbG9zZV9tb2RhbFwiO1xuICBXaWRnZXRBcGlUb1dpZGdldEFjdGlvbltcIkJ1dHRvbkNsaWNrZWRcIl0gPSBcImJ1dHRvbl9jbGlja2VkXCI7XG4gIFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uW1wiU2VuZEV2ZW50XCJdID0gXCJzZW5kX2V2ZW50XCI7XG59KShXaWRnZXRBcGlUb1dpZGdldEFjdGlvbiB8fCAoZXhwb3J0cy5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbiA9IFdpZGdldEFwaVRvV2lkZ2V0QWN0aW9uID0ge30pKTtcblxudmFyIFdpZGdldEFwaUZyb21XaWRnZXRBY3Rpb247XG5leHBvcnRzLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24gPSBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uO1xuXG4oZnVuY3Rpb24gKFdpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24pIHtcbiAgV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbltcIlN1cHBvcnRlZEFwaVZlcnNpb25zXCJdID0gXCJzdXBwb3J0ZWRfYXBpX3ZlcnNpb25zXCI7XG4gIFdpZGdldEFwaUZyb21XaWRnZXRBY3Rpb25bXCJDb250ZW50TG9hZGVkXCJdID0gXCJjb250ZW50X2xvYWRlZFwiO1xuICBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uW1wiU2VuZFN0aWNrZXJcIl0gPSBcIm0uc3RpY2tlclwiO1xuICBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uW1wiVXBkYXRlQWx3YXlzT25TY3JlZW5cIl0gPSBcInNldF9hbHdheXNfb25fc2NyZWVuXCI7XG4gIFdpZGdldEFwaUZyb21XaWRnZXRBY3Rpb25bXCJHZXRPcGVuSURDcmVkZW50aWFsc1wiXSA9IFwiZ2V0X29wZW5pZFwiO1xuICBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uW1wiQ2xvc2VNb2RhbFdpZGdldFwiXSA9IFwiY2xvc2VfbW9kYWxcIjtcbiAgV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbltcIk9wZW5Nb2RhbFdpZGdldFwiXSA9IFwib3Blbl9tb2RhbFwiO1xuICBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uW1wiU2V0TW9kYWxCdXR0b25FbmFibGVkXCJdID0gXCJzZXRfYnV0dG9uX2VuYWJsZWRcIjtcbiAgV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbltcIlNlbmRFdmVudFwiXSA9IFwic2VuZF9ldmVudFwiO1xuICBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uW1wiTVNDMjg3NlJlYWRFdmVudHNcIl0gPSBcIm9yZy5tYXRyaXgubXNjMjg3Ni5yZWFkX2V2ZW50c1wiO1xuICBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uW1wiTVNDMjkzMU5hdmlnYXRlXCJdID0gXCJvcmcubWF0cml4Lm1zYzI5MzEubmF2aWdhdGVcIjtcbiAgV2lkZ2V0QXBpRnJvbVdpZGdldEFjdGlvbltcIk1TQzI5NzRSZW5lZ290aWF0ZUNhcGFiaWxpdGllc1wiXSA9IFwib3JnLm1hdHJpeC5tc2MyOTc0LnJlcXVlc3RfY2FwYWJpbGl0aWVzXCI7XG59KShXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uIHx8IChleHBvcnRzLldpZGdldEFwaUZyb21XaWRnZXRBY3Rpb24gPSBXaWRnZXRBcGlGcm9tV2lkZ2V0QWN0aW9uID0ge30pKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaW52ZXJ0ZWREaXJlY3Rpb24gPSBpbnZlcnRlZERpcmVjdGlvbjtcbmV4cG9ydHMuV2lkZ2V0QXBpRGlyZWN0aW9uID0gdm9pZCAwO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgV2lkZ2V0QXBpRGlyZWN0aW9uO1xuZXhwb3J0cy5XaWRnZXRBcGlEaXJlY3Rpb24gPSBXaWRnZXRBcGlEaXJlY3Rpb247XG5cbihmdW5jdGlvbiAoV2lkZ2V0QXBpRGlyZWN0aW9uKSB7XG4gIFdpZGdldEFwaURpcmVjdGlvbltcIlRvV2lkZ2V0XCJdID0gXCJ0b1dpZGdldFwiO1xuICBXaWRnZXRBcGlEaXJlY3Rpb25bXCJGcm9tV2lkZ2V0XCJdID0gXCJmcm9tV2lkZ2V0XCI7XG59KShXaWRnZXRBcGlEaXJlY3Rpb24gfHwgKGV4cG9ydHMuV2lkZ2V0QXBpRGlyZWN0aW9uID0gV2lkZ2V0QXBpRGlyZWN0aW9uID0ge30pKTtcblxuZnVuY3Rpb24gaW52ZXJ0ZWREaXJlY3Rpb24oZGlyKSB7XG4gIGlmIChkaXIgPT09IFdpZGdldEFwaURpcmVjdGlvbi5Ub1dpZGdldCkge1xuICAgIHJldHVybiBXaWRnZXRBcGlEaXJlY3Rpb24uRnJvbVdpZGdldDtcbiAgfSBlbHNlIGlmIChkaXIgPT09IFdpZGdldEFwaURpcmVjdGlvbi5Gcm9tV2lkZ2V0KSB7XG4gICAgcmV0dXJuIFdpZGdldEFwaURpcmVjdGlvbi5Ub1dpZGdldDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRpcmVjdGlvblwiKTtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5XaWRnZXRLaW5kID0gdm9pZCAwO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgV2lkZ2V0S2luZDtcbmV4cG9ydHMuV2lkZ2V0S2luZCA9IFdpZGdldEtpbmQ7XG5cbihmdW5jdGlvbiAoV2lkZ2V0S2luZCkge1xuICBXaWRnZXRLaW5kW1wiUm9vbVwiXSA9IFwicm9vbVwiO1xuICBXaWRnZXRLaW5kW1wiQWNjb3VudFwiXSA9IFwiYWNjb3VudFwiO1xuICBXaWRnZXRLaW5kW1wiTW9kYWxcIl0gPSBcIm1vZGFsXCI7XG59KShXaWRnZXRLaW5kIHx8IChleHBvcnRzLldpZGdldEtpbmQgPSBXaWRnZXRLaW5kID0ge30pKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuTWF0cml4V2lkZ2V0VHlwZSA9IHZvaWQgMDtcblxuLypcbiAqIENvcHlyaWdodCAyMDIwIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIE1hdHJpeFdpZGdldFR5cGU7XG5leHBvcnRzLk1hdHJpeFdpZGdldFR5cGUgPSBNYXRyaXhXaWRnZXRUeXBlO1xuXG4oZnVuY3Rpb24gKE1hdHJpeFdpZGdldFR5cGUpIHtcbiAgTWF0cml4V2lkZ2V0VHlwZVtcIkN1c3RvbVwiXSA9IFwibS5jdXN0b21cIjtcbiAgTWF0cml4V2lkZ2V0VHlwZVtcIkppdHNpTWVldFwiXSA9IFwibS5qaXRzaVwiO1xuICBNYXRyaXhXaWRnZXRUeXBlW1wiU3RpY2tlcnBpY2tlclwiXSA9IFwibS5zdGlja2VycGlja2VyXCI7XG59KShNYXRyaXhXaWRnZXRUeXBlIHx8IChleHBvcnRzLk1hdHJpeFdpZGdldFR5cGUgPSBNYXRyaXhXaWRnZXRUeXBlID0ge30pKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuV2lkZ2V0ID0gdm9pZCAwO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvbi91dGlsc1wiKTtcblxudmFyIF8gPSByZXF1aXJlKFwiLi5cIik7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBiYXJlc3QgZm9ybSBvZiB3aWRnZXQuXG4gKi9cbnZhciBXaWRnZXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBXaWRnZXQoZGVmaW5pdGlvbikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaWRnZXQpO1xuXG4gICAgdGhpcy5kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcbiAgICBpZiAoIXRoaXMuZGVmaW5pdGlvbikgdGhyb3cgbmV3IEVycm9yKFwiRGVmaW5pdGlvbiBpcyByZXF1aXJlZFwiKTtcbiAgICAoMCwgX3V0aWxzLmFzc2VydFByZXNlbnQpKGRlZmluaXRpb24sIFwiaWRcIik7XG4gICAgKDAsIF91dGlscy5hc3NlcnRQcmVzZW50KShkZWZpbml0aW9uLCBcImNyZWF0b3JVc2VySWRcIik7XG4gICAgKDAsIF91dGlscy5hc3NlcnRQcmVzZW50KShkZWZpbml0aW9uLCBcInR5cGVcIik7XG4gICAgKDAsIF91dGlscy5hc3NlcnRQcmVzZW50KShkZWZpbml0aW9uLCBcInVybFwiKTtcbiAgfVxuICAvKipcbiAgICogVGhlIHVzZXIgSUQgd2hvIGNyZWF0ZWQgdGhlIHdpZGdldC5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoV2lkZ2V0LCBbe1xuICAgIGtleTogXCJnZXRDb21wbGV0ZVVybFwiLFxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNvbXBsZXRlIHdpZGdldCBVUkwgZm9yIHRoZSBjbGllbnQgdG8gcmVuZGVyLlxuICAgICAqIEBwYXJhbSB7SVRlbXBsYXRlUGFyYW1zfSBwYXJhbXMgVGhlIHRlbXBsYXRlIHBhcmFtZXRlcnMuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSB0ZW1wbGF0ZWQgVVJMLlxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb21wbGV0ZVVybChwYXJhbXMpIHtcbiAgICAgIHJldHVybiAoMCwgXy5ydW5UZW1wbGF0ZSkodGhpcy50ZW1wbGF0ZVVybCwgdGhpcy5kZWZpbml0aW9uLCBwYXJhbXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdG9yVXNlcklkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZpbml0aW9uLmNyZWF0b3JVc2VySWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHdpZGdldC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInR5cGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmluaXRpb24udHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIElEIG9mIHRoZSB3aWRnZXQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJpZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbi5pZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHdpZGdldCwgb3IgbnVsbCBpZiBub3Qgc2V0LlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibmFtZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbi5uYW1lIHx8IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBmb3IgdGhlIHdpZGdldCwgb3IgbnVsbCBpZiBub3Qgc2V0LlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwidGl0bGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJhd0RhdGEudGl0bGUgfHwgbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHRlbXBsYXRlZCBVUkwgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ0ZW1wbGF0ZVVybFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbi51cmw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBvcmlnaW4gZm9yIHRoaXMgd2lkZ2V0LlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib3JpZ2luXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gbmV3IFVSTCh0aGlzLnRlbXBsYXRlVXJsKS5vcmlnaW47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBjbGllbnQgc2hvdWxkIHdhaXQgZm9yIHRoZSBpZnJhbWUgdG8gbG9hZC4gRGVmYXVsdHNcbiAgICAgKiB0byB0cnVlLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwid2FpdEZvcklmcmFtZUxvYWRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLmRlZmluaXRpb24ud2FpdEZvcklmcmFtZUxvYWQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodGhpcy5kZWZpbml0aW9uLndhaXRGb3JJZnJhbWVMb2FkID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBkZWZhdWx0IHRydWVcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJhdyBkYXRhIGZvciB0aGUgd2lkZ2V0LiBUaGlzIHdpbGwgYWx3YXlzIGJlIGRlZmluZWQsIHRob3VnaFxuICAgICAqIG1heSBiZSBlbXB0eS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJhd0RhdGFcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmluaXRpb24uZGF0YSB8fCB7fTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2lkZ2V0O1xufSgpO1xuXG5leHBvcnRzLldpZGdldCA9IFdpZGdldDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuV2lkZ2V0RXZlbnRDYXBhYmlsaXR5ID0gZXhwb3J0cy5FdmVudERpcmVjdGlvbiA9IHZvaWQgMDtcblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFtcInJldHVyblwiXSAhPSBudWxsKSBpdFtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgRXZlbnREaXJlY3Rpb247XG5leHBvcnRzLkV2ZW50RGlyZWN0aW9uID0gRXZlbnREaXJlY3Rpb247XG5cbihmdW5jdGlvbiAoRXZlbnREaXJlY3Rpb24pIHtcbiAgRXZlbnREaXJlY3Rpb25bXCJTZW5kXCJdID0gXCJzZW5kXCI7XG4gIEV2ZW50RGlyZWN0aW9uW1wiUmVjZWl2ZVwiXSA9IFwicmVjZWl2ZVwiO1xufSkoRXZlbnREaXJlY3Rpb24gfHwgKGV4cG9ydHMuRXZlbnREaXJlY3Rpb24gPSBFdmVudERpcmVjdGlvbiA9IHt9KSk7XG5cbnZhciBXaWRnZXRFdmVudENhcGFiaWxpdHkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBXaWRnZXRFdmVudENhcGFiaWxpdHkoZGlyZWN0aW9uLCBldmVudFR5cGUsIGlzU3RhdGUsIGtleVN0ciwgcmF3KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpZGdldEV2ZW50Q2FwYWJpbGl0eSk7XG5cbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcbiAgICB0aGlzLmlzU3RhdGUgPSBpc1N0YXRlO1xuICAgIHRoaXMua2V5U3RyID0ga2V5U3RyO1xuICAgIHRoaXMucmF3ID0gcmF3O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdpZGdldEV2ZW50Q2FwYWJpbGl0eSwgW3tcbiAgICBrZXk6IFwibWF0Y2hlc0FzU3RhdGVFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRjaGVzQXNTdGF0ZUV2ZW50KGV2ZW50VHlwZSwgc3RhdGVLZXkpIHtcbiAgICAgIGlmICghdGhpcy5pc1N0YXRlKSByZXR1cm4gZmFsc2U7IC8vIGxvb2tpbmcgZm9yIHN0YXRlLCBub3Qgc3RhdGVcblxuICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlICE9PSBldmVudFR5cGUpIHJldHVybiBmYWxzZTsgLy8gZXZlbnQgdHlwZSBtaXNtYXRjaFxuXG4gICAgICBpZiAodGhpcy5rZXlTdHIgPT09IG51bGwpIHJldHVybiB0cnVlOyAvLyBhbGwgc3RhdGUga2V5cyBhcmUgYWxsb3dlZFxuXG4gICAgICBpZiAodGhpcy5rZXlTdHIgPT09IHN0YXRlS2V5KSByZXR1cm4gdHJ1ZTsgLy8gdGhpcyBzdGF0ZSBrZXkgaXMgYWxsb3dlZFxuICAgICAgLy8gRGVmYXVsdCBub3QgYWxsb3dlZFxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm1hdGNoZXNBc1Jvb21FdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXRjaGVzQXNSb29tRXZlbnQoZXZlbnRUeXBlKSB7XG4gICAgICB2YXIgbXNndHlwZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIGlmICh0aGlzLmlzU3RhdGUpIHJldHVybiBmYWxzZTsgLy8gbG9va2luZyBmb3Igbm90LXN0YXRlLCBpcyBzdGF0ZVxuXG4gICAgICBpZiAodGhpcy5ldmVudFR5cGUgIT09IGV2ZW50VHlwZSkgcmV0dXJuIGZhbHNlOyAvLyBldmVudCB0eXBlIG1pc21hdGNoXG5cbiAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gXCJtLnJvb20ubWVzc2FnZVwiKSB7XG4gICAgICAgIGlmICh0aGlzLmtleVN0ciA9PT0gbnVsbCkgcmV0dXJuIHRydWU7IC8vIGFsbCBtZXNzYWdlIHR5cGVzIGFyZSBhbGxvd2VkXG5cbiAgICAgICAgaWYgKHRoaXMua2V5U3RyID09PSBtc2d0eXBlKSByZXR1cm4gdHJ1ZTsgLy8gdGhpcyBtZXNzYWdlIHR5cGUgaXMgYWxsb3dlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIGFscmVhZHkgcGFzc2VkIHRoZSBjaGVjayBmb3IgaWYgdGhlIGV2ZW50IGlzIGFsbG93ZWRcbiAgICAgIH0gLy8gRGVmYXVsdCBub3QgYWxsb3dlZFxuXG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJmb3JTdGF0ZUV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvclN0YXRlRXZlbnQoZGlyZWN0aW9uLCBldmVudFR5cGUsIHN0YXRlS2V5KSB7XG4gICAgICAvLyBUT0RPOiBFbmFibGUgc3VwcG9ydCBmb3IgbS4qIG5hbWVzcGFjZSBvbmNlIHRoZSBNU0MgbGFuZHMuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0cml4LW9yZy9tYXRyaXgtd2lkZ2V0LWFwaS9pc3N1ZXMvMjJcbiAgICAgIGV2ZW50VHlwZSA9IGV2ZW50VHlwZS5yZXBsYWNlKC8jL2csICdcXFxcIycpO1xuICAgICAgc3RhdGVLZXkgPSBzdGF0ZUtleSAhPT0gbnVsbCAmJiBzdGF0ZUtleSAhPT0gdW5kZWZpbmVkID8gXCIjXCIuY29uY2F0KHN0YXRlS2V5KSA6ICcnO1xuICAgICAgdmFyIHN0ciA9IFwib3JnLm1hdHJpeC5tc2MyNzYyLlwiLmNvbmNhdChkaXJlY3Rpb24sIFwiLnN0YXRlX2V2ZW50OlwiKS5jb25jYXQoZXZlbnRUeXBlKS5jb25jYXQoc3RhdGVLZXkpOyAvLyBjaGVhdCBieSBzZW5kaW5nIGl0IHRocm91Z2ggdGhlIHByb2Nlc3NvclxuXG4gICAgICByZXR1cm4gV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LmZpbmRFdmVudENhcGFiaWxpdGllcyhbc3RyXSlbMF07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZvclJvb21FdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JSb29tRXZlbnQoZGlyZWN0aW9uLCBldmVudFR5cGUpIHtcbiAgICAgIC8vIFRPRE86IEVuYWJsZSBzdXBwb3J0IGZvciBtLiogbmFtZXNwYWNlIG9uY2UgdGhlIE1TQyBsYW5kcy5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyaXgtb3JnL21hdHJpeC13aWRnZXQtYXBpL2lzc3Vlcy8yMlxuICAgICAgdmFyIHN0ciA9IFwib3JnLm1hdHJpeC5tc2MyNzYyLlwiLmNvbmNhdChkaXJlY3Rpb24sIFwiLmV2ZW50OlwiKS5jb25jYXQoZXZlbnRUeXBlKTsgLy8gY2hlYXQgYnkgc2VuZGluZyBpdCB0aHJvdWdoIHRoZSBwcm9jZXNzb3JcblxuICAgICAgcmV0dXJuIFdpZGdldEV2ZW50Q2FwYWJpbGl0eS5maW5kRXZlbnRDYXBhYmlsaXRpZXMoW3N0cl0pWzBdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmb3JSb29tTWVzc2FnZUV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvclJvb21NZXNzYWdlRXZlbnQoZGlyZWN0aW9uLCBtc2d0eXBlKSB7XG4gICAgICAvLyBUT0RPOiBFbmFibGUgc3VwcG9ydCBmb3IgbS4qIG5hbWVzcGFjZSBvbmNlIHRoZSBNU0MgbGFuZHMuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0cml4LW9yZy9tYXRyaXgtd2lkZ2V0LWFwaS9pc3N1ZXMvMjJcbiAgICAgIG1zZ3R5cGUgPSBtc2d0eXBlID09PSBudWxsIHx8IG1zZ3R5cGUgPT09IHVuZGVmaW5lZCA/ICcnIDogbXNndHlwZTtcbiAgICAgIHZhciBzdHIgPSBcIm9yZy5tYXRyaXgubXNjMjc2Mi5cIi5jb25jYXQoZGlyZWN0aW9uLCBcIi5ldmVudDptLnJvb20ubWVzc2FnZSNcIikuY29uY2F0KG1zZ3R5cGUpOyAvLyBjaGVhdCBieSBzZW5kaW5nIGl0IHRocm91Z2ggdGhlIHByb2Nlc3NvclxuXG4gICAgICByZXR1cm4gV2lkZ2V0RXZlbnRDYXBhYmlsaXR5LmZpbmRFdmVudENhcGFiaWxpdGllcyhbc3RyXSlbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGNhcGFiaWxpdGllcyByZXF1ZXN0IHRvIGZpbmQgYWxsIHRoZSBldmVudCBjYXBhYmlsaXR5IHJlcXVlc3RzLlxuICAgICAqIEBwYXJhbSB7SXRlcmFibGU8Q2FwYWJpbGl0eT59IGNhcGFiaWxpdGllcyBUaGUgY2FwYWJpbGl0aWVzIHJlcXVlc3RlZC90byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7V2lkZ2V0RXZlbnRDYXBhYmlsaXR5W119IEFuIGFycmF5IG9mIGV2ZW50IGNhcGFiaWxpdHkgcmVxdWVzdHMuIE1heSBiZSBlbXB0eSwgYnV0IG5ldmVyIG51bGwuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJmaW5kRXZlbnRDYXBhYmlsaXRpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmluZEV2ZW50Q2FwYWJpbGl0aWVzKGNhcGFiaWxpdGllcykge1xuICAgICAgdmFyIHBhcnNlZCA9IFtdO1xuXG4gICAgICB2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoY2FwYWJpbGl0aWVzKSxcbiAgICAgICAgICBfc3RlcDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICB2YXIgY2FwID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgdmFyIF9kaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICAgIHZhciBldmVudFNlZ21lbnQgPSB2b2lkIDA7XG4gICAgICAgICAgdmFyIF9pc1N0YXRlID0gZmFsc2U7IC8vIFRPRE86IEVuYWJsZSBzdXBwb3J0IGZvciBtLiogbmFtZXNwYWNlIG9uY2UgdGhlIE1TQyBsYW5kcy5cbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0cml4LW9yZy9tYXRyaXgtd2lkZ2V0LWFwaS9pc3N1ZXMvMjJcblxuICAgICAgICAgIGlmIChjYXAuc3RhcnRzV2l0aChcIm9yZy5tYXRyaXgubXNjMjc2Mi5zZW5kLlwiKSkge1xuICAgICAgICAgICAgaWYgKGNhcC5zdGFydHNXaXRoKFwib3JnLm1hdHJpeC5tc2MyNzYyLnNlbmQuZXZlbnQ6XCIpKSB7XG4gICAgICAgICAgICAgIF9kaXJlY3Rpb24gPSBFdmVudERpcmVjdGlvbi5TZW5kO1xuICAgICAgICAgICAgICBldmVudFNlZ21lbnQgPSBjYXAuc3Vic3RyaW5nKFwib3JnLm1hdHJpeC5tc2MyNzYyLnNlbmQuZXZlbnQ6XCIubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FwLnN0YXJ0c1dpdGgoXCJvcmcubWF0cml4Lm1zYzI3NjIuc2VuZC5zdGF0ZV9ldmVudDpcIikpIHtcbiAgICAgICAgICAgICAgX2RpcmVjdGlvbiA9IEV2ZW50RGlyZWN0aW9uLlNlbmQ7XG4gICAgICAgICAgICAgIF9pc1N0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZXZlbnRTZWdtZW50ID0gY2FwLnN1YnN0cmluZyhcIm9yZy5tYXRyaXgubXNjMjc2Mi5zZW5kLnN0YXRlX2V2ZW50OlwiLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjYXAuc3RhcnRzV2l0aChcIm9yZy5tYXRyaXgubXNjMjc2Mi5yZWNlaXZlLlwiKSkge1xuICAgICAgICAgICAgaWYgKGNhcC5zdGFydHNXaXRoKFwib3JnLm1hdHJpeC5tc2MyNzYyLnJlY2VpdmUuZXZlbnQ6XCIpKSB7XG4gICAgICAgICAgICAgIF9kaXJlY3Rpb24gPSBFdmVudERpcmVjdGlvbi5SZWNlaXZlO1xuICAgICAgICAgICAgICBldmVudFNlZ21lbnQgPSBjYXAuc3Vic3RyaW5nKFwib3JnLm1hdHJpeC5tc2MyNzYyLnJlY2VpdmUuZXZlbnQ6XCIubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FwLnN0YXJ0c1dpdGgoXCJvcmcubWF0cml4Lm1zYzI3NjIucmVjZWl2ZS5zdGF0ZV9ldmVudDpcIikpIHtcbiAgICAgICAgICAgICAgX2RpcmVjdGlvbiA9IEV2ZW50RGlyZWN0aW9uLlJlY2VpdmU7XG4gICAgICAgICAgICAgIF9pc1N0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZXZlbnRTZWdtZW50ID0gY2FwLnN1YnN0cmluZyhcIm9yZy5tYXRyaXgubXNjMjc2Mi5yZWNlaXZlLnN0YXRlX2V2ZW50OlwiLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9kaXJlY3Rpb24gPT09IG51bGwpIGNvbnRpbnVlOyAvLyBUaGUgY2FwYWJpbGl0eSB1c2VzIGAjYCBhcyBhIHNlcGFyYXRvciBiZXR3ZWVuIGV2ZW50IHR5cGUgYW5kIHN0YXRlIGtleS9tc2d0eXBlLFxuICAgICAgICAgIC8vIHNvIHdlIHNwbGl0IG9uIHRoYXQuIEhvd2V2ZXIsIGEgIyBpcyBhbHNvIHZhbGlkIGluIGVpdGhlciBvbmUgb2YgdGhvc2Ugc28gd2VcbiAgICAgICAgICAvLyBqb2luIGFjY29yZGluZ2x5LlxuICAgICAgICAgIC8vIEVnOiBgbS5yb29tLm1lc3NhZ2UjI20udGV4dGAgaXMgXCJtLnJvb20ubWVzc2FnZVwiIGV2ZW50IHdpdGggbXNndHlwZSBcIiNtLnRleHRcIi5cblxuICAgICAgICAgIHZhciBleHBlY3RpbmdLZXlTdHIgPSBldmVudFNlZ21lbnQuc3RhcnRzV2l0aChcIm0ucm9vbS5tZXNzYWdlI1wiKSB8fCBfaXNTdGF0ZTtcblxuICAgICAgICAgIHZhciBfa2V5U3RyID0gbnVsbDtcblxuICAgICAgICAgIGlmIChldmVudFNlZ21lbnQuaW5jbHVkZXMoJyMnKSAmJiBleHBlY3RpbmdLZXlTdHIpIHtcbiAgICAgICAgICAgIC8vIERldiBub3RlOiByZWdleCBpcyBkaWZmaWN1bHQgdG8gd3JpdGUsIHNvIGluc3RlYWQgdGhlIHJ1bGVzIGFyZSBtYW51YWxseSB3cml0dGVuXG4gICAgICAgICAgICAvLyBvdXQuIFRoaXMgaXMgcHJvYmFibHkganVzdCBhcyB1bmRlcnN0YW5kYWJsZSBhcyBhIGJvcmluZyByZWdleCB0aG91Z2gsIHNvIHdpbi13aW4/XG4gICAgICAgICAgICAvLyBUZXN0IGNhc2VzOlxuICAgICAgICAgICAgLy8gc3RyICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U2VnbWVudCAgICAgICAga2V5U3RyXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyBtLnJvb20ubWVzc2FnZSMgICAgICAgICAgbS5yb29tLm1lc3NhZ2UgICAgICA8ZW1wdHkgc3RyaW5nPlxuICAgICAgICAgICAgLy8gbS5yb29tLm1lc3NhZ2UjdGVzdCAgICAgIG0ucm9vbS5tZXNzYWdlICAgICAgdGVzdFxuICAgICAgICAgICAgLy8gbS5yb29tLm1lc3NhZ2VcXCMgICAgICAgICBtLnJvb20ubWVzc2FnZSMgICAgIHRlc3RcbiAgICAgICAgICAgIC8vIG0ucm9vbS5tZXNzYWdlIyN0ZXN0ICAgICBtLnJvb20ubWVzc2FnZSAgICAgICN0ZXN0XG4gICAgICAgICAgICAvLyBtLnJvb20ubWVzc2FnZVxcIyN0ZXN0ICAgIG0ucm9vbS5tZXNzYWdlIyAgICAgdGVzdFxuICAgICAgICAgICAgLy8gbS5yb29tLm1lc3NhZ2VcXFxcIyN0ZXN0ICAgbS5yb29tLm1lc3NhZ2VcXCMgICAgdGVzdFxuICAgICAgICAgICAgLy8gbS5yb29tLm1lc3NhZ2VcXFxcIyMjdGVzdCAgbS5yb29tLm1lc3NhZ2VcXCMgICAgI3Rlc3RcbiAgICAgICAgICAgIC8vIEZpcnN0IHN0ZXA6IGV4cGxvZGUgdGhlIHN0cmluZ1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gZXZlbnRTZWdtZW50LnNwbGl0KCcjJyk7IC8vIFRvIGZvcm0gdGhlIGV2ZW50U2VnbWVudCwgd2UnbGwga2VlcCBmaW5kaW5nIHBhcnRzIG9mIHRoZSBleHBsb2RlZCBzdHJpbmcgdW50aWxcbiAgICAgICAgICAgIC8vIHRoZXJlJ3Mgb25lIHRoYXQgZG9lc24ndCBlbmQgd2l0aCB0aGUgZXNjYXBlIGNoYXJhY3RlciAoXFwpLiBXZSdsbCB0aGVuIGpvaW4gdGhvc2VcbiAgICAgICAgICAgIC8vIHNlZ21lbnRzIHRvZ2V0aGVyIHdpdGggdGhlIGV4cGxvZGluZyBjaGFyYWN0ZXIuIFdlIGhhdmUgdG8gcmVtZW1iZXIgdG8gY29uc3VtZSB0aGVcbiAgICAgICAgICAgIC8vIGVzY2FwZSBjaGFyYWN0ZXIgYXMgd2VsbC5cblxuICAgICAgICAgICAgdmFyIGlkeCA9IHBhcnRzLmZpbmRJbmRleChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICByZXR1cm4gIXAuZW5kc1dpdGgoXCJcXFxcXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudFNlZ21lbnQgPSBwYXJ0cy5zbGljZSgwLCBpZHggKyAxKS5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHAuZW5kc1dpdGgoJ1xcXFwnKSA/IHAuc3Vic3RyaW5nKDAsIHAubGVuZ3RoIC0gMSkgOiBwO1xuICAgICAgICAgICAgfSkuam9pbignIycpOyAvLyBUaGUga2V5U3RyIGlzIHdoYXRldmVyIGlzIGxlZnQgb3Zlci5cblxuICAgICAgICAgICAgX2tleVN0ciA9IHBhcnRzLnNsaWNlKGlkeCArIDEpLmpvaW4oJyMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJzZWQucHVzaChuZXcgV2lkZ2V0RXZlbnRDYXBhYmlsaXR5KF9kaXJlY3Rpb24sIGV2ZW50U2VnbWVudCwgX2lzU3RhdGUsIF9rZXlTdHIsIGNhcCkpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIF9pdGVyYXRvci5mKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFdpZGdldEV2ZW50Q2FwYWJpbGl0eTtcbn0oKTtcblxuZXhwb3J0cy5XaWRnZXRFdmVudENhcGFiaWxpdHkgPSBXaWRnZXRFdmVudENhcGFiaWxpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLldpZGdldFBhcnNlciA9IHZvaWQgMDtcblxudmFyIF9XaWRnZXQgPSByZXF1aXJlKFwiLi9XaWRnZXRcIik7XG5cbnZhciBfdXJsID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvbi91cmxcIik7XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbXCJyZXR1cm5cIl0gIT0gbnVsbCkgaXRbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKGRpZEVycikgdGhyb3cgZXJyOyB9IH0gfTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIFdpZGdldFBhcnNlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFdpZGdldFBhcnNlcigpIHsvLyBwcml2YXRlIGNvbnN0cnVjdG9yIGJlY2F1c2UgdGhpcyBpcyBhIHV0aWwgY2xhc3NcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaWRnZXRQYXJzZXIpO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZXMgd2lkZ2V0cyBmcm9tIHRoZSBcIm0ud2lkZ2V0c1wiIGFjY291bnQgZGF0YSBldmVudC4gVGhpcyB3aWxsIGFsd2F5c1xuICAgKiByZXR1cm4gYW4gYXJyYXksIHRob3VnaCBtYXkgYmUgZW1wdHkgaWYgbm8gdmFsaWQgd2lkZ2V0cyB3ZXJlIGZvdW5kLlxuICAgKiBAcGFyYW0ge0lBY2NvdW50RGF0YVdpZGdldHN9IGNvbnRlbnQgVGhlIGNvbnRlbnQgb2YgdGhlIFwibS53aWRnZXRzXCIgYWNjb3VudCBkYXRhLlxuICAgKiBAcmV0dXJucyB7V2lkZ2V0W119IFRoZSB3aWRnZXRzIGluIGFjY291bnQgZGF0YSwgb3IgYW4gZW1wdHkgYXJyYXkuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFdpZGdldFBhcnNlciwgbnVsbCwgW3tcbiAgICBrZXk6IFwicGFyc2VBY2NvdW50RGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXJzZUFjY291bnREYXRhKGNvbnRlbnQpIHtcbiAgICAgIGlmICghY29udGVudCkgcmV0dXJuIFtdO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBfaSA9IDAsIF9PYmplY3Qka2V5cyA9IE9iamVjdC5rZXlzKGNvbnRlbnQpOyBfaSA8IF9PYmplY3Qka2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIF93aWRnZXRJZCA9IF9PYmplY3Qka2V5c1tfaV07XG4gICAgICAgIHZhciByb3VnaFdpZGdldCA9IGNvbnRlbnRbX3dpZGdldElkXTtcbiAgICAgICAgaWYgKCFyb3VnaFdpZGdldCkgY29udGludWU7XG4gICAgICAgIGlmIChyb3VnaFdpZGdldC50eXBlICE9PSBcIm0ud2lkZ2V0XCIgJiYgcm91Z2hXaWRnZXQudHlwZSAhPT0gXCJpbS52ZWN0b3IubW9kdWxhci53aWRnZXRzXCIpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIXJvdWdoV2lkZ2V0LnNlbmRlcikgY29udGludWU7XG4gICAgICAgIHZhciBwcm9iYWJsZVdpZGdldElkID0gcm91Z2hXaWRnZXQuc3RhdGVfa2V5IHx8IHJvdWdoV2lkZ2V0LmlkO1xuICAgICAgICBpZiAocHJvYmFibGVXaWRnZXRJZCAhPT0gX3dpZGdldElkKSBjb250aW51ZTtcbiAgICAgICAgdmFyIGFzU3RhdGVFdmVudCA9IHtcbiAgICAgICAgICBjb250ZW50OiByb3VnaFdpZGdldC5jb250ZW50LFxuICAgICAgICAgIHNlbmRlcjogcm91Z2hXaWRnZXQuc2VuZGVyLFxuICAgICAgICAgIHR5cGU6IFwibS53aWRnZXRcIixcbiAgICAgICAgICBzdGF0ZV9rZXk6IF93aWRnZXRJZCxcbiAgICAgICAgICBldmVudF9pZDogXCIkZXhhbXBsZVwiLFxuICAgICAgICAgIHJvb21faWQ6IFwiIWV4YW1wbGVcIixcbiAgICAgICAgICBvcmlnaW5fc2VydmVyX3RzOiAxXG4gICAgICAgIH07XG4gICAgICAgIHZhciB3aWRnZXQgPSBXaWRnZXRQYXJzZXIucGFyc2VSb29tV2lkZ2V0KGFzU3RhdGVFdmVudCk7XG4gICAgICAgIGlmICh3aWRnZXQpIHJlc3VsdC5wdXNoKHdpZGdldCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhbGwgdGhlIHdpZGdldHMgcG9zc2libGUgaW4gdGhlIGdpdmVuIGFycmF5LiBUaGlzIHdpbGwgYWx3YXlzIHJldHVyblxuICAgICAqIGFuIGFycmF5LCB0aG91Z2ggbWF5IGJlIGVtcHR5IGlmIG5vIHdpZGdldHMgY291bGQgYmUgcGFyc2VkLlxuICAgICAqIEBwYXJhbSB7SVN0YXRlRXZlbnRbXX0gY3VycmVudFN0YXRlIFRoZSByb29tIHN0YXRlIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtXaWRnZXRbXX0gVGhlIHdpZGdldHMgaW4gdGhlIHN0YXRlLCBvciBhbiBlbXB0eSBhcnJheS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInBhcnNlV2lkZ2V0c0Zyb21Sb29tU3RhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGFyc2VXaWRnZXRzRnJvbVJvb21TdGF0ZShjdXJyZW50U3RhdGUpIHtcbiAgICAgIGlmICghY3VycmVudFN0YXRlKSByZXR1cm4gW107XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihjdXJyZW50U3RhdGUpLFxuICAgICAgICAgIF9zdGVwO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKF9pdGVyYXRvci5zKCk7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubigpKS5kb25lOykge1xuICAgICAgICAgIHZhciBzdGF0ZSA9IF9zdGVwLnZhbHVlO1xuICAgICAgICAgIHZhciB3aWRnZXQgPSBXaWRnZXRQYXJzZXIucGFyc2VSb29tV2lkZ2V0KHN0YXRlKTtcbiAgICAgICAgICBpZiAod2lkZ2V0KSByZXN1bHQucHVzaCh3aWRnZXQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIF9pdGVyYXRvci5mKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHN0YXRlIGV2ZW50IGludG8gYSB3aWRnZXQuIElmIHRoZSBzdGF0ZSBldmVudCBkb2VzIG5vdCByZXByZXNlbnRcbiAgICAgKiBhIHdpZGdldCAod3JvbmcgZXZlbnQgdHlwZSwgaW52YWxpZCB3aWRnZXQsIGV0YykgdGhlbiBudWxsIGlzIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7SVN0YXRlRXZlbnR9IHN0YXRlRXZlbnQgVGhlIHN0YXRlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIHtXaWRnZXR8bnVsbH0gVGhlIHdpZGdldCwgb3IgbnVsbCBpZiBpbnZhbGlkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJwYXJzZVJvb21XaWRnZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGFyc2VSb29tV2lkZ2V0KHN0YXRlRXZlbnQpIHtcbiAgICAgIGlmICghc3RhdGVFdmVudCkgcmV0dXJuIG51bGw7IC8vIFRPRE86IFtMZWdhY3ldIFJlbW92ZSBsZWdhY3kgc3VwcG9ydFxuXG4gICAgICBpZiAoc3RhdGVFdmVudC50eXBlICE9PSBcIm0ud2lkZ2V0XCIgJiYgc3RhdGVFdmVudC50eXBlICE9PSBcImltLnZlY3Rvci5tb2R1bGFyLndpZGdldHNcIikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gLy8gRGV2IG5vdGU6IFRocm91Z2hvdXQgdGhpcyBmdW5jdGlvbiB3ZSBoYXZlIG51bGwgc2FmZXR5IHRvIGVuc3VyZSB0aGF0XG4gICAgICAvLyBpZiB0aGUgY2FsbGVyIGRpZCBub3Qgc3VwcGx5IHNvbWV0aGluZyB1c2VmdWwgdGhhdCB3ZSBkb24ndCBlcnJvci4gVGhpc1xuICAgICAgLy8gaXMgZG9uZSBhZ2FpbnN0IHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIGludGVyZmFjZSBiZWNhdXNlIG5vdCBldmVyeW9uZVxuICAgICAgLy8gd2lsbCBoYXZlIGFuIGludGVyZmFjZSB0byB2YWxpZGF0ZSBhZ2FpbnN0LlxuXG5cbiAgICAgIHZhciBjb250ZW50ID0gc3RhdGVFdmVudC5jb250ZW50IHx8IHt9OyAvLyBGb3JtIG91ciBiZXN0IGFwcHJveGltYXRpb24gb2YgYSB3aWRnZXQgd2l0aCB0aGUgaW5mb3JtYXRpb24gd2UgaGF2ZVxuXG4gICAgICB2YXIgZXN0aW1hdGVkV2lkZ2V0ID0ge1xuICAgICAgICBpZDogc3RhdGVFdmVudC5zdGF0ZV9rZXksXG4gICAgICAgIGNyZWF0b3JVc2VySWQ6IGNvbnRlbnRbJ2NyZWF0b3JVc2VySWQnXSB8fCBzdGF0ZUV2ZW50LnNlbmRlcixcbiAgICAgICAgbmFtZTogY29udGVudFsnbmFtZSddLFxuICAgICAgICB0eXBlOiBjb250ZW50Wyd0eXBlJ10sXG4gICAgICAgIHVybDogY29udGVudFsndXJsJ10sXG4gICAgICAgIHdhaXRGb3JJZnJhbWVMb2FkOiBjb250ZW50Wyd3YWl0Rm9ySWZyYW1lTG9hZCddLFxuICAgICAgICBkYXRhOiBjb250ZW50WydkYXRhJ11cbiAgICAgIH07IC8vIEZpbmFsbHksIHByb2Nlc3MgdGhhdCB3aWRnZXRcblxuICAgICAgcmV0dXJuIFdpZGdldFBhcnNlci5wcm9jZXNzRXN0aW1hdGVkV2lkZ2V0KGVzdGltYXRlZFdpZGdldCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2Nlc3NFc3RpbWF0ZWRXaWRnZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc0VzdGltYXRlZFdpZGdldCh3aWRnZXQpIHtcbiAgICAgIC8vIFZhbGlkYXRlIHRoYXQgdGhlIHdpZGdldCBoYXMgdGhlIGJlc3QgY2hhbmNlIG9mIHBhc3NpbmcgYXMgYSB3aWRnZXRcbiAgICAgIGlmICghd2lkZ2V0LmlkIHx8ICF3aWRnZXQuY3JlYXRvclVzZXJJZCB8fCAhd2lkZ2V0LnR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghKDAsIF91cmwuaXNWYWxpZFVybCkod2lkZ2V0LnVybCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IC8vIFRPRE86IFZhbGlkYXRlIGRhdGEgZm9yIGtub3duIHdpZGdldCB0eXBlc1xuXG5cbiAgICAgIHJldHVybiBuZXcgX1dpZGdldC5XaWRnZXQod2lkZ2V0KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2lkZ2V0UGFyc2VyO1xufSgpO1xuXG5leHBvcnRzLldpZGdldFBhcnNlciA9IFdpZGdldFBhcnNlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaXNWYWxpZFVybCA9IGlzVmFsaWRVcmw7XG5cbi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBUaGUgTWF0cml4Lm9yZyBGb3VuZGF0aW9uIEMuSS5DLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRVcmwodmFsKSB7XG4gIGlmICghdmFsKSByZXR1cm4gZmFsc2U7IC8vIGVhc3k6IG5vdCB2YWxpZCBpZiBub3QgcHJlc2VudFxuXG4gIHRyeSB7XG4gICAgdmFyIHBhcnNlZCA9IG5ldyBVUkwodmFsKTtcblxuICAgIGlmIChwYXJzZWQucHJvdG9jb2wgIT09IFwiaHR0cFwiICYmIHBhcnNlZC5wcm90b2NvbCAhPT0gXCJodHRwc1wiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRocm93IGU7XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYXNzZXJ0UHJlc2VudCA9IGFzc2VydFByZXNlbnQ7XG5cbi8qXG4gKiBDb3B5cmlnaHQgMjAyMCBUaGUgTWF0cml4Lm9yZyBGb3VuZGF0aW9uIEMuSS5DLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFByZXNlbnQob2JqLCBrZXkpIHtcbiAgaWYgKCFvYmpba2V5XSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlwiLmNvbmNhdChrZXksIFwiIGlzIHJlcXVpcmVkXCIpKTtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5ydW5UZW1wbGF0ZSA9IHJ1blRlbXBsYXRlO1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAsIDIwMjEgVGhlIE1hdHJpeC5vcmcgRm91bmRhdGlvbiBDLkkuQy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5mdW5jdGlvbiBydW5UZW1wbGF0ZSh1cmwsIHdpZGdldCwgcGFyYW1zKSB7XG4gIC8vIEFsd2F5cyBhcHBseSB0aGUgc3VwcGxpZWQgcGFyYW1zIG92ZXIgdG9wIG9mIGRhdGEgdG8gZW5zdXJlIHRoZSBkYXRhIGNhbid0IGxpZSBhYm91dCB0aGVtLlxuICB2YXIgdmFyaWFibGVzID0gT2JqZWN0LmFzc2lnbih7fSwgd2lkZ2V0LmRhdGEsIHtcbiAgICAnbWF0cml4X3Jvb21faWQnOiBwYXJhbXMud2lkZ2V0Um9vbUlkIHx8IFwiXCIsXG4gICAgJ21hdHJpeF91c2VyX2lkJzogcGFyYW1zLmN1cnJlbnRVc2VySWQsXG4gICAgJ21hdHJpeF9kaXNwbGF5X25hbWUnOiBwYXJhbXMudXNlckRpc3BsYXlOYW1lIHx8IHBhcmFtcy5jdXJyZW50VXNlcklkLFxuICAgICdtYXRyaXhfYXZhdGFyX3VybCc6IHBhcmFtcy51c2VySHR0cEF2YXRhclVybCB8fCBcIlwiLFxuICAgICdtYXRyaXhfd2lkZ2V0X2lkJzogd2lkZ2V0LmlkLFxuICAgIC8vIFRPRE86IENvbnZlcnQgdG8gc3RhYmxlIChodHRwczovL2dpdGh1Yi5jb20vbWF0cml4LW9yZy9tYXRyaXgtZG9jL3B1bGwvMjg3MylcbiAgICAnb3JnLm1hdHJpeC5tc2MyODczLmNsaWVudF9pZCc6IHBhcmFtcy5jbGllbnRJZCB8fCBcIlwiLFxuICAgICdvcmcubWF0cml4Lm1zYzI4NzMuY2xpZW50X3RoZW1lJzogcGFyYW1zLmNsaWVudFRoZW1lIHx8IFwiXCIsXG4gICAgJ29yZy5tYXRyaXgubXNjMjg3My5jbGllbnRfbGFuZ3VhZ2UnOiBwYXJhbXMuY2xpZW50TGFuZ3VhZ2UgfHwgXCJcIlxuICB9KTtcbiAgdmFyIHJlc3VsdCA9IHVybDtcblxuICBmb3IgKHZhciBfaSA9IDAsIF9PYmplY3Qka2V5cyA9IE9iamVjdC5rZXlzKHZhcmlhYmxlcyk7IF9pIDwgX09iamVjdCRrZXlzLmxlbmd0aDsgX2krKykge1xuICAgIHZhciBrZXkgPSBfT2JqZWN0JGtleXNbX2ldO1xuICAgIC8vIFJlZ2V4IGVzY2FwZSBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82OTY5NDg2LzcwMzczNzlcbiAgICB2YXIgcGF0dGVybiA9IFwiJFwiLmNvbmNhdChrZXkpLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7IC8vICQmIG1lYW5zIHRoZSB3aG9sZSBtYXRjaGVkIHN0cmluZ1xuXG4gICAgdmFyIHJleHAgPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdnJyk7IC8vIFRoaXMgaXMgdGVjaG5pY2FsbHkgbm90IHdoYXQgd2UncmUgc3VwcG9zZWQgdG8gZG8gZm9yIGEgY291cGxlIHJlYXNvbnM6XG4gICAgLy8gMS4gV2UgYXJlIGFzc3VtaW5nIHRoYXQgdGhlcmUgd29uJ3QgbGF0ZXIgYmUgYSAka2V5IG1hdGNoIGFmdGVyIHdlIHJlcGxhY2UgYSB2YXJpYWJsZS5cbiAgICAvLyAyLiBXZSBhcmUgYXNzdW1pbmcgdGhhdCB0aGUgdmFyaWFibGUgaXMgaW4gYSBwbGFjZSB3aGVyZSBpdCBjYW4gYmUgZXNjYXBlZCAoZWc6IHBhdGggb3IgcXVlcnkgc3RyaW5nKS5cblxuICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHJleHAsIGVuY29kZVVSSUNvbXBvbmVudCh0b1N0cmluZyh2YXJpYWJsZXNba2V5XSkpKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGEpIHtcbiAgaWYgKGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGEpO1xuICB9XG5cbiAgcmV0dXJuIGEudG9TdHJpbmcoKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUG9zdG1lc3NhZ2VUcmFuc3BvcnQgPSB2b2lkIDA7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTtcblxudmFyIF8gPSByZXF1aXJlKFwiLi5cIik7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbi8qKlxuICogVHJhbnNwb3J0IGZvciB0aGUgV2lkZ2V0IEFQSSBvdmVyIHBvc3RNZXNzYWdlLlxuICovXG52YXIgUG9zdG1lc3NhZ2VUcmFuc3BvcnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKFBvc3RtZXNzYWdlVHJhbnNwb3J0LCBfRXZlbnRFbWl0dGVyKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFBvc3RtZXNzYWdlVHJhbnNwb3J0KTtcblxuICBfY3JlYXRlQ2xhc3MoUG9zdG1lc3NhZ2VUcmFuc3BvcnQsIFt7XG4gICAga2V5OiBcInJlYWR5XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVhZHk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIndpZGdldElkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0SWQgfHwgbnVsbDtcbiAgICB9XG4gIH1dKTtcblxuICBmdW5jdGlvbiBQb3N0bWVzc2FnZVRyYW5zcG9ydChzZW5kRGlyZWN0aW9uLCBpbml0aWFsV2lkZ2V0SWQsIHRyYW5zcG9ydFdpbmRvdywgaW5ib3VuZFdpbmRvdykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3N0bWVzc2FnZVRyYW5zcG9ydCk7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIF90aGlzLnNlbmREaXJlY3Rpb24gPSBzZW5kRGlyZWN0aW9uO1xuICAgIF90aGlzLmluaXRpYWxXaWRnZXRJZCA9IGluaXRpYWxXaWRnZXRJZDtcbiAgICBfdGhpcy50cmFuc3BvcnRXaW5kb3cgPSB0cmFuc3BvcnRXaW5kb3c7XG4gICAgX3RoaXMuaW5ib3VuZFdpbmRvdyA9IGluYm91bmRXaW5kb3c7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwic3RyaWN0T3JpZ2luQ2hlY2tcIiwgdm9pZCAwKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJ0YXJnZXRPcmlnaW5cIiwgdm9pZCAwKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJ0aW1lb3V0U2Vjb25kc1wiLCAxMCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiX3JlYWR5XCIsIGZhbHNlKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJfd2lkZ2V0SWRcIiwgbnVsbCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwib3V0Ym91bmRSZXF1ZXN0c1wiLCBuZXcgTWFwKCkpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImlzU3RvcHBlZFwiLCBmYWxzZSk7XG5cbiAgICBfdGhpcy5fd2lkZ2V0SWQgPSBpbml0aWFsV2lkZ2V0SWQ7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvc3RtZXNzYWdlVHJhbnNwb3J0LCBbe1xuICAgIGtleTogXCJzZW5kSW50ZXJuYWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZEludGVybmFsKG1lc3NhZ2UpIHtcbiAgICAgIHZhciB0YXJnZXRPcmlnaW4gPSB0aGlzLnRhcmdldE9yaWdpbiB8fCAnKic7XG4gICAgICBjb25zb2xlLmxvZyhcIltQb3N0bWVzc2FnZVRyYW5zcG9ydF0gU2VuZGluZyBvYmplY3QgdG8gXCIuY29uY2F0KHRhcmdldE9yaWdpbiwgXCI6IFwiKSwgbWVzc2FnZSk7XG4gICAgICB0aGlzLnRyYW5zcG9ydFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCB0YXJnZXRPcmlnaW4pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXBseVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXBseShyZXF1ZXN0LCByZXNwb25zZURhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbmRJbnRlcm5hbChfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIHJlcXVlc3QpLCB7fSwge1xuICAgICAgICByZXNwb25zZTogcmVzcG9uc2VEYXRhXG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNlbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZChhY3Rpb24sIGRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbmRDb21wbGV0ZShhY3Rpb24sIGRhdGEpLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgcmV0dXJuIHIucmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2VuZENvbXBsZXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbmRDb21wbGV0ZShhY3Rpb24sIGRhdGEpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMucmVhZHkgfHwgIXRoaXMud2lkZ2V0SWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vdCByZWFkeSBvciB1bmtub3duIHdpZGdldCBJRFwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICBhcGk6IHRoaXMuc2VuZERpcmVjdGlvbixcbiAgICAgICAgd2lkZ2V0SWQ6IHRoaXMud2lkZ2V0SWQsXG4gICAgICAgIHJlcXVlc3RJZDogdGhpcy5uZXh0UmVxdWVzdElkLFxuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfTtcblxuICAgICAgaWYgKGFjdGlvbiA9PT0gXy5XaWRnZXRBcGlUb1dpZGdldEFjdGlvbi5VcGRhdGVWaXNpYmlsaXR5KSB7XG4gICAgICAgIC8vIFhYWDogVGhpcyBpcyBmb3IgU2NhbGFyIHN1cHBvcnRcbiAgICAgICAgLy8gVE9ETzogRml4IHNjYWxhclxuICAgICAgICByZXF1ZXN0Wyd2aXNpYmxlJ10gPSBkYXRhWyd2aXNpYmxlJ107XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocHJSZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcmVxID0gX3RoaXMyLm91dGJvdW5kUmVxdWVzdHMuZ2V0KHJlcXVlc3QucmVxdWVzdElkKTtcblxuICAgICAgICAgIGlmICghcmVxKSByZXR1cm47IC8vIGl0IGZpbmlzaGVkIVxuXG4gICAgICAgICAgX3RoaXMyLm91dGJvdW5kUmVxdWVzdHNbXCJkZWxldGVcIl0ocmVxdWVzdC5yZXF1ZXN0SWQpO1xuXG4gICAgICAgICAgcmVxLnJlamVjdChuZXcgRXJyb3IoXCJSZXF1ZXN0IHRpbWVkIG91dFwiKSk7XG4gICAgICAgIH0sIChfdGhpczIudGltZW91dFNlY29uZHMgfHwgMSkgKiAxMDAwKTtcblxuICAgICAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUocikge1xuICAgICAgICAgIHJldHVybiBwclJlc29sdmUocik7XG4gICAgICAgIH07XG5cbiAgICAgICAgX3RoaXMyLm91dGJvdW5kUmVxdWVzdHMuc2V0KHJlcXVlc3QucmVxdWVzdElkLCB7XG4gICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgIHJlamVjdDogcmVqZWN0LFxuICAgICAgICAgIHRpbWVySWQ6IHRpbWVySWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMyLnNlbmRJbnRlcm5hbChyZXF1ZXN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdGFydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB0aGlzLmluYm91bmRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIF90aGlzMy5oYW5kbGVNZXNzYWdlKGV2KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fcmVhZHkgPSB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdG9wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLl9yZWFkeSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVNZXNzYWdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZXYpIHtcbiAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkgcmV0dXJuO1xuICAgICAgaWYgKCFldi5kYXRhKSByZXR1cm47IC8vIGludmFsaWQgZXZlbnRcblxuICAgICAgaWYgKHRoaXMuc3RyaWN0T3JpZ2luQ2hlY2sgJiYgZXYub3JpZ2luICE9PSB3aW5kb3cub3JpZ2luKSByZXR1cm47IC8vIGJhZCBvcmlnaW5cbiAgICAgIC8vIHRyZWF0IHRoZSBtZXNzYWdlIGFzIGEgcmVzcG9uc2UgZmlyc3QsIHRoZW4gZG93bmdyYWRlIHRvIGEgcmVxdWVzdFxuXG4gICAgICB2YXIgcmVzcG9uc2UgPSBldi5kYXRhO1xuICAgICAgaWYgKCFyZXNwb25zZS5hY3Rpb24gfHwgIXJlc3BvbnNlLnJlcXVlc3RJZCB8fCAhcmVzcG9uc2Uud2lkZ2V0SWQpIHJldHVybjsgLy8gaW52YWxpZCByZXF1ZXN0L3Jlc3BvbnNlXG5cbiAgICAgIGlmICghcmVzcG9uc2UucmVzcG9uc2UpIHtcbiAgICAgICAgLy8gaXQncyBhIHJlcXVlc3RcbiAgICAgICAgdmFyIHJlcXVlc3QgPSByZXNwb25zZTtcbiAgICAgICAgaWYgKHJlcXVlc3QuYXBpICE9PSAoMCwgXy5pbnZlcnRlZERpcmVjdGlvbikodGhpcy5zZW5kRGlyZWN0aW9uKSkgcmV0dXJuOyAvLyB3cm9uZyBkaXJlY3Rpb25cblxuICAgICAgICB0aGlzLmhhbmRsZVJlcXVlc3QocmVxdWVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpdCdzIGEgcmVzcG9uc2VcbiAgICAgICAgaWYgKHJlc3BvbnNlLmFwaSAhPT0gdGhpcy5zZW5kRGlyZWN0aW9uKSByZXR1cm47IC8vIHdyb25nIGRpcmVjdGlvblxuXG4gICAgICAgIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVSZXF1ZXN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgaWYgKHRoaXMud2lkZ2V0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMud2lkZ2V0SWQgIT09IHJlcXVlc3Qud2lkZ2V0SWQpIHJldHVybjsgLy8gd3Jvbmcgd2lkZ2V0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93aWRnZXRJZCA9IHJlcXVlc3Qud2lkZ2V0SWQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdChcIm1lc3NhZ2VcIiwgbmV3IEN1c3RvbUV2ZW50KFwibWVzc2FnZVwiLCB7XG4gICAgICAgIGRldGFpbDogcmVxdWVzdFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVSZXNwb25zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLndpZGdldElkICE9PSB0aGlzLndpZGdldElkKSByZXR1cm47IC8vIHdyb25nIHdpZGdldFxuXG4gICAgICB2YXIgcmVxID0gdGhpcy5vdXRib3VuZFJlcXVlc3RzLmdldChyZXNwb25zZS5yZXF1ZXN0SWQpO1xuICAgICAgaWYgKCFyZXEpIHJldHVybjsgLy8gcmVzcG9uc2UgdG8gYW4gdW5rbm93biByZXF1ZXN0XG5cbiAgICAgIHRoaXMub3V0Ym91bmRSZXF1ZXN0c1tcImRlbGV0ZVwiXShyZXNwb25zZS5yZXF1ZXN0SWQpO1xuICAgICAgY2xlYXJUaW1lb3V0KHJlcS50aW1lcklkKTtcblxuICAgICAgaWYgKCgwLCBfLmlzRXJyb3JSZXNwb25zZSkocmVzcG9uc2UucmVzcG9uc2UpKSB7XG4gICAgICAgIHZhciBfZXJyID0gcmVzcG9uc2UucmVzcG9uc2U7XG4gICAgICAgIHJlcS5yZWplY3QobmV3IEVycm9yKF9lcnIuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuZXh0UmVxdWVzdElkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgaWRCYXNlID0gXCJ3aWRnZXRhcGktXCIuY29uY2F0KERhdGUubm93KCkpO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciBpZCA9IGlkQmFzZTtcblxuICAgICAgd2hpbGUgKHRoaXMub3V0Ym91bmRSZXF1ZXN0cy5oYXMoaWQpKSB7XG4gICAgICAgIGlkID0gXCJcIi5jb25jYXQoaWRCYXNlLCBcIi1cIikuY29uY2F0KGluZGV4KyspO1xuICAgICAgfSAvLyByZXNlcnZlIHRoZSBJRFxuXG5cbiAgICAgIHRoaXMub3V0Ym91bmRSZXF1ZXN0cy5zZXQoaWQsIG51bGwpO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQb3N0bWVzc2FnZVRyYW5zcG9ydDtcbn0oX2V2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG5leHBvcnRzLlBvc3RtZXNzYWdlVHJhbnNwb3J0ID0gUG9zdG1lc3NhZ2VUcmFuc3BvcnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNpbXBsZU9ic2VydmFibGUgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbXCJyZXR1cm5cIl0gIT0gbnVsbCkgaXRbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKGRpZEVycikgdGhyb3cgZXJyOyB9IH0gfTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLypcbiAqIENvcHlyaWdodCAyMDIwIFRoZSBNYXRyaXgub3JnIEZvdW5kYXRpb24gQy5JLkMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIFNpbXBsZU9ic2VydmFibGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTaW1wbGVPYnNlcnZhYmxlKGluaXRpYWxGbikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTaW1wbGVPYnNlcnZhYmxlKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxpc3RlbmVyc1wiLCBbXSk7XG5cbiAgICBpZiAoaW5pdGlhbEZuKSB0aGlzLmxpc3RlbmVycy5wdXNoKGluaXRpYWxGbik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU2ltcGxlT2JzZXJ2YWJsZSwgW3tcbiAgICBrZXk6IFwib25VcGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25VcGRhdGUoZm4pIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goZm4pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKHZhbCkge1xuICAgICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHRoaXMubGlzdGVuZXJzKSxcbiAgICAgICAgICBfc3RlcDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICBsaXN0ZW5lcih2YWwpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIF9pdGVyYXRvci5mKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTsgLy8gcmVzZXRcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2ltcGxlT2JzZXJ2YWJsZTtcbn0oKTtcblxuZXhwb3J0cy5TaW1wbGVPYnNlcnZhYmxlID0gU2ltcGxlT2JzZXJ2YWJsZTsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBldmVudExpc3RlbmVyKCkge1xuICAgICAgaWYgKGVycm9yTGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG4gICAgdmFyIGVycm9yTGlzdGVuZXI7XG5cbiAgICAvLyBBZGRpbmcgYW4gZXJyb3IgbGlzdGVuZXIgaXMgbm90IG9wdGlvbmFsIGJlY2F1c2VcbiAgICAvLyBpZiBhbiBlcnJvciBpcyB0aHJvd24gb24gYW4gZXZlbnQgZW1pdHRlciB3ZSBjYW5ub3RcbiAgICAvLyBndWFyYW50ZWUgdGhhdCB0aGUgYWN0dWFsIGV2ZW50IHdlIGFyZSB3YWl0aW5nIHdpbGxcbiAgICAvLyBiZSBmaXJlZC4gVGhlIHJlc3VsdCBjb3VsZCBiZSBhIHNpbGVudCB3YXkgdG8gY3JlYXRlXG4gICAgLy8gbWVtb3J5IG9yIGZpbGUgZGVzY3JpcHRvciBsZWFrcywgd2hpY2ggaXMgc29tZXRoaW5nXG4gICAgLy8gd2Ugc2hvdWxkIGF2b2lkLlxuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBlcnJvckxpc3RlbmVyID0gZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBldmVudExpc3RlbmVyKTtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9O1xuXG4gICAgICBlbWl0dGVyLm9uY2UoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgZW1pdHRlci5vbmNlKG5hbWUsIGV2ZW50TGlzdGVuZXIpO1xuICB9KTtcbn1cbiJdfQ==
