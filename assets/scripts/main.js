/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, function (exports, $, Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        } // Disable Popper.js if we have a static display

      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
        this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$6.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          }).on(eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      $(this.element).closest('.modal').on('hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      $(this._element).trigger(Event$a.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      $(this._element).trigger(Event$a.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$a.HIDE);

        $(_this4._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap.js.map

/*
 Highcharts JS v7.2.0 (2019-09-03)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(P,N){"object"===typeof module&&module.exports?(N["default"]=N,module.exports=P.document?N(P):N):"function"===typeof define&&define.amd?define("highcharts/highcharts",function(){return N(P)}):(P.Highcharts&&P.Highcharts.error(16,!0),P.Highcharts=N(P))})("undefined"!==typeof window?window:this,function(P){function N(c,n,A,D){c.hasOwnProperty(n)||(c[n]=D.apply(null,A))}var H={};N(H,"parts/Globals.js",[],function(){var c="undefined"!==typeof P?P:"undefined"!==typeof window?window:{},n=c.document,
A=c.navigator&&c.navigator.userAgent||"",D=n&&n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(A)&&!c.opera,z=-1!==A.indexOf("Firefox"),u=-1!==A.indexOf("Chrome"),L=z&&4>parseInt(A.split("Firefox/")[1],10);return{product:"Highcharts",version:"7.2.0",deg2rad:2*Math.PI/360,doc:n,hasBidiBug:L,hasTouch:!!c.TouchEvent,isMS:F,isWebKit:-1!==A.indexOf("AppleWebKit"),isFirefox:z,isChrome:u,isSafari:!u&&-1!==A.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),
SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:D,win:c,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});N(H,"parts/Utilities.js",[H["parts/Globals.js"]],function(c){function n(b,a){return parseInt(b,a||10)}function A(b){return"string"===typeof b}function D(b){b=Object.prototype.toString.call(b);return"[object Array]"===b||"[object Array Iterator]"===b}function F(b,a){return!!b&&"object"===typeof b&&(!a||
!D(b))}function z(b){return F(b)&&"number"===typeof b.nodeType}function u(b){var a=b&&b.constructor;return!(!F(b,!0)||z(b)||!a||!a.name||"Object"===a.name)}function L(b){return"number"===typeof b&&!isNaN(b)&&Infinity>b&&-Infinity<b}function y(b){return"undefined"!==typeof b&&null!==b}function C(b,a,d){var f;A(a)?y(d)?b.setAttribute(a,d):b&&b.getAttribute&&((f=b.getAttribute(a))||"class"!==a||(f=b.getAttribute(a+"Name"))):x(a,function(a,d){b.setAttribute(d,a)});return f}function x(b,a,d){for(var f in b)Object.hasOwnProperty.call(b,
f)&&a.call(d||b[f],b[f],f,b)}c.timers=[];var m=c.charts,p=c.doc,g=c.win;c.error=function(b,a,d){var f=L(b)?"Highcharts error #"+b+": www.highcharts.com/errors/"+b:b,e=function(){if(a)throw Error(f);g.console&&console.log(f)};d?c.fireEvent(d,"displayError",{code:b,message:f},e):e()};c.Fx=function(b,a,d){this.options=a;this.elem=b;this.prop=d};c.Fx.prototype={dSetter:function(){var b=this.paths[0],a=this.paths[1],d=[],f=this.now,e=b.length;if(1===f)d=this.toD;else if(e===a.length&&1>f)for(;e--;){var c=
parseFloat(b[e]);d[e]=isNaN(c)?a[e]:f*parseFloat(""+(a[e]-c))+c}else d=a;this.elem.attr("d",d,null,!0)},update:function(){var b=this.elem,a=this.prop,d=this.now,f=this.options.step;if(this[a+"Setter"])this[a+"Setter"]();else b.attr?b.element&&b.attr(a,d,null,!0):b.style[a]=d+this.unit;f&&f.call(b,d,this)},run:function(b,a,d){var f=this,e=f.options,h=function(a){return h.stopped?!1:f.step(a)},r=g.requestAnimationFrame||function(a){setTimeout(a,13)},E=function(){for(var a=0;a<c.timers.length;a++)c.timers[a]()||
c.timers.splice(a--,1);c.timers.length&&r(E)};b!==a||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=b,this.end=a,this.unit=d,this.now=this.start,this.pos=0,h.elem=this.elem,h.prop=this.prop,h()&&1===c.timers.push(h)&&r(E)):(delete e.curAnim[this.prop],e.complete&&0===Object.keys(e.curAnim).length&&e.complete.call(this.elem))},step:function(b){var a=+new Date,d=this.options,f=this.elem,e=d.complete,c=d.duration,r=d.curAnim;if(f.attr&&!f.element)b=!1;else if(b||a>=c+this.startTime){this.now=
this.end;this.pos=1;this.update();var E=r[this.prop]=!0;x(r,function(a){!0!==a&&(E=!1)});E&&e&&e.call(f);b=!1}else this.pos=d.easing((a-this.startTime)/c),this.now=this.start+(this.end-this.start)*this.pos,this.update(),b=!0;return b},initPath:function(b,a,d){function f(a){for(t=a.length;t--;){var b="M"===a[t]||"L"===a[t];var d=/[a-zA-Z]/.test(a[t+3]);b&&d&&a.splice(t+1,0,a[t+1],a[t+2],a[t+1],a[t+2])}}function e(a,b){for(;a.length<J;){a[0]=b[J-a.length];var d=a.slice(0,v);[].splice.apply(a,[0,0].concat(d));
B&&(d=a.slice(a.length-v),[].splice.apply(a,[a.length,0].concat(d)),t--)}a[0]="M"}function c(a,b){for(var d=(J-a.length)/v;0<d&&d--;)k=a.slice().splice(a.length/I-v,v*I),k[0]=b[J-v-d*v],q&&(k[v-6]=k[v-2],k[v-5]=k[v-1]),[].splice.apply(a,[a.length/I,0].concat(k)),B&&d--}a=a||"";var r=b.startX,E=b.endX,q=-1<a.indexOf("C"),v=q?7:3,k,t;a=a.split(" ");d=d.slice();var B=b.isArea,I=B?2:1;q&&(f(a),f(d));if(r&&E){for(t=0;t<r.length;t++)if(r[t]===E[0]){var w=t;break}else if(r[0]===E[E.length-r.length+t]){w=
t;var l=!0;break}else if(r[r.length-1]===E[E.length-r.length+t]){w=r.length-t;break}"undefined"===typeof w&&(a=[])}if(a.length&&L(w)){var J=d.length+w*I*v;l?(e(a,d),c(d,a)):(e(d,a),c(a,d))}return[a,d]},fillSetter:function(){c.Fx.prototype.strokeSetter.apply(this,arguments)},strokeSetter:function(){this.elem.attr(this.prop,c.color(this.start).tweenTo(c.color(this.end),this.pos),null,!0)}};c.merge=function(){var b,a=arguments,d={},f=function(a,b){"object"!==typeof a&&(a={});x(b,function(d,e){!F(d,!0)||
u(d)||z(d)?a[e]=b[e]:a[e]=f(a[e]||{},d)});return a};!0===a[0]&&(d=a[1],a=Array.prototype.slice.call(a,2));var e=a.length;for(b=0;b<e;b++)d=f(d,a[b]);return d};c.syncTimeout=function(b,a,d){if(a)return setTimeout(b,a,d);b.call(0,d)};c.clearTimeout=function(b){y(b)&&clearTimeout(b)};c.extend=function(b,a){var d;b||(b={});for(d in a)b[d]=a[d];return b};c.pick=function(){var b=arguments,a,d=b.length;for(a=0;a<d;a++){var f=b[a];if("undefined"!==typeof f&&null!==f)return f}};c.css=function(b,a){c.isMS&&
!c.svg&&a&&"undefined"!==typeof a.opacity&&(a.filter="alpha(opacity="+100*a.opacity+")");c.extend(b.style,a)};c.createElement=function(b,a,d,f,e){b=p.createElement(b);var h=c.css;a&&c.extend(b,a);e&&h(b,{padding:"0",border:"none",margin:"0"});d&&h(b,d);f&&f.appendChild(b);return b};c.extendClass=function(b,a){var d=function(){};d.prototype=new b;c.extend(d.prototype,a);return d};c.pad=function(b,a,d){return Array((a||2)+1-String(b).replace("-","").length).join(d||"0")+b};c.relativeLength=function(b,
a,d){return/%$/.test(b)?a*parseFloat(b)/100+(d||0):parseFloat(b)};c.wrap=function(b,a,d){var f=b[a];b[a]=function(){var a=Array.prototype.slice.call(arguments),b=arguments,c=this;c.proceed=function(){f.apply(c,arguments.length?arguments:b)};a.unshift(f);a=d.apply(this,a);c.proceed=null;return a}};c.datePropsToTimestamps=function(b){x(b,function(a,d){F(a)&&"function"===typeof a.getTime?b[d]=a.getTime():(F(a)||D(a))&&c.datePropsToTimestamps(a)})};c.formatSingle=function(b,a,d){var f=/\.([0-9])/,e=c.defaultOptions.lang;
/f$/.test(b)?(d=(d=b.match(f))?d[1]:-1,null!==a&&(a=c.numberFormat(a,d,e.decimalPoint,-1<b.indexOf(",")?e.thousandsSep:""))):a=(d||c.time).dateFormat(b,a);return a};c.format=function(b,a,d){for(var f="{",e=!1,h,r,E,q,v=[],k;b;){f=b.indexOf(f);if(-1===f)break;h=b.slice(0,f);if(e){h=h.split(":");r=h.shift().split(".");q=r.length;k=a;for(E=0;E<q;E++)k&&(k=k[r[E]]);h.length&&(k=c.formatSingle(h.join(":"),k,d));v.push(k)}else v.push(h);b=b.slice(f+1);f=(e=!e)?"}":"{"}v.push(b);return v.join("")};c.getMagnitude=
function(b){return Math.pow(10,Math.floor(Math.log(b)/Math.LN10))};c.normalizeTickInterval=function(b,a,d,f,e){var h=b;d=c.pick(d,1);var r=b/d;a||(a=e?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===f&&(1===d?a=a.filter(function(a){return 0===a%1}):.1>=d&&(a=[1/d])));for(f=0;f<a.length&&!(h=a[f],e&&h*d>=b||!e&&r<=(a[f]+(a[f+1]||a[f]))/2);f++);return h=c.correctFloat(h*d,-Math.round(Math.log(.001)/Math.LN10))};c.stableSort=function(b,a){var d=b.length,f,e;for(e=0;e<d;e++)b[e].safeI=e;b.sort(function(b,
d){f=a(b,d);return 0===f?b.safeI-d.safeI:f});for(e=0;e<d;e++)delete b[e].safeI};c.arrayMin=function(b){for(var a=b.length,d=b[0];a--;)b[a]<d&&(d=b[a]);return d};c.arrayMax=function(b){for(var a=b.length,d=b[0];a--;)b[a]>d&&(d=b[a]);return d};c.destroyObjectProperties=function(b,a){x(b,function(d,f){d&&d!==a&&d.destroy&&d.destroy();delete b[f]})};c.discardElement=function(b){var a=c.garbageBin;a||(a=c.createElement("div"));b&&a.appendChild(b);a.innerHTML=""};c.correctFloat=function(b,a){return parseFloat(b.toPrecision(a||
14))};c.setAnimation=function(b,a){a.renderer.globalAnimation=c.pick(b,a.options.chart.animation,!0)};c.animObject=function(b){return F(b)?c.merge(b):{duration:b?500:0}};c.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};c.numberFormat=function(b,a,d,f){b=+b||0;a=+a;var e=c.defaultOptions.lang,h=(b.toString().split(".")[1]||"").split("e")[0].length,r=b.toString().split("e");if(-1===a)a=Math.min(h,20);else if(!L(a))a=2;else if(a&&r[1]&&0>r[1]){var m=
a+ +r[1];0<=m?(r[0]=(+r[0]).toExponential(m).split("e")[0],a=m):(r[0]=r[0].split(".")[0]||0,b=20>a?(r[0]*Math.pow(10,r[1])).toFixed(a):0,r[1]=0)}var q=(Math.abs(r[1]?r[0]:b)+Math.pow(10,-Math.max(a,h)-1)).toFixed(a);h=String(n(q));m=3<h.length?h.length%3:0;d=c.pick(d,e.decimalPoint);f=c.pick(f,e.thousandsSep);b=(0>b?"-":"")+(m?h.substr(0,m)+f:"");b+=h.substr(m).replace(/(\d{3})(?=\d)/g,"$1"+f);a&&(b+=d+q.slice(-a));r[1]&&0!==+b&&(b+="e"+r[1]);return b};Math.easeInOutSine=function(b){return-.5*(Math.cos(Math.PI*
b)-1)};c.getStyle=function(b,a,d){if("width"===a)return a=Math.min(b.offsetWidth,b.scrollWidth),d=b.getBoundingClientRect&&b.getBoundingClientRect().width,d<a&&d>=a-1&&(a=Math.floor(d)),Math.max(0,a-c.getStyle(b,"padding-left")-c.getStyle(b,"padding-right"));if("height"===a)return Math.max(0,Math.min(b.offsetHeight,b.scrollHeight)-c.getStyle(b,"padding-top")-c.getStyle(b,"padding-bottom"));g.getComputedStyle||c.error(27,!0);if(b=g.getComputedStyle(b,void 0))b=b.getPropertyValue(a),c.pick(d,"opacity"!==
a)&&(b=n(b));return b};c.inArray=function(b,a,d){return a.indexOf(b,d)};c.find=Array.prototype.find?function(b,a){return b.find(a)}:function(b,a){var d,f=b.length;for(d=0;d<f;d++)if(a(b[d],d))return b[d]};c.keys=Object.keys;c.offset=function(b){var a=p.documentElement;b=b.parentElement||b.parentNode?b.getBoundingClientRect():{top:0,left:0};return{top:b.top+(g.pageYOffset||a.scrollTop)-(a.clientTop||0),left:b.left+(g.pageXOffset||a.scrollLeft)-(a.clientLeft||0)}};c.stop=function(b,a){for(var d=c.timers.length;d--;)c.timers[d].elem!==
b||a&&a!==c.timers[d].prop||(c.timers[d].stopped=!0)};x({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(b,a){c[a]=function(a){return Array.prototype[b].apply(a,[].slice.call(arguments,1))}});c.addEvent=function(b,a,d,f){void 0===f&&(f={});var e=b.addEventListener||c.addEventListenerPolyfill;var h="function"===typeof b&&b.prototype?b.prototype.protoEvents=b.prototype.protoEvents||{}:b.hcEvents=b.hcEvents||{};c.Point&&b instanceof c.Point&&b.series&&b.series.chart&&(b.series.chart.runTrackerClick=
!0);e&&e.call(b,a,d,!1);h[a]||(h[a]=[]);h[a].push({fn:d,order:"number"===typeof f.order?f.order:Infinity});h[a].sort(function(a,b){return a.order-b.order});return function(){c.removeEvent(b,a,d)}};c.removeEvent=function(b,a,d){function f(a,d){var e=b.removeEventListener||c.removeEventListenerPolyfill;e&&e.call(b,a,d,!1)}function e(d){var e;if(b.nodeName){if(a){var c={};c[a]=!0}else c=d;x(c,function(a,b){if(d[b])for(e=d[b].length;e--;)f(b,d[b][e].fn)})}}var h;["protoEvents","hcEvents"].forEach(function(c){var r=
b[c];r&&(a?(h=r[a]||[],d?(r[a]=h.filter(function(a){return d!==a.fn}),f(a,d)):(e(r),r[a]=[])):(e(r),b[c]={}))})};c.fireEvent=function(b,a,d,f){var e;d=d||{};if(p.createEvent&&(b.dispatchEvent||b.fireEvent)){var h=p.createEvent("Events");h.initEvent(a,!0,!0);c.extend(h,d);b.dispatchEvent?b.dispatchEvent(h):b.fireEvent(a,h)}else d.target||c.extend(d,{preventDefault:function(){d.defaultPrevented=!0},target:b,type:a}),function(a,f){void 0===a&&(a=[]);void 0===f&&(f=[]);var c=0,h=0,k=a.length+f.length;
for(e=0;e<k;e++)!1===(a[c]?f[h]?a[c].order<=f[h].order?a[c++]:f[h++]:a[c++]:f[h++]).fn.call(b,d)&&d.preventDefault()}(b.protoEvents&&b.protoEvents[a],b.hcEvents&&b.hcEvents[a]);f&&!d.defaultPrevented&&f.call(b,d)};c.animate=function(b,a,d){var f,e="",h,r;if(!F(d)){var m=arguments;d={duration:m[2],easing:m[3],complete:m[4]}}L(d.duration)||(d.duration=400);d.easing="function"===typeof d.easing?d.easing:Math[d.easing]||Math.easeInOutSine;d.curAnim=c.merge(a);x(a,function(q,v){c.stop(b,v);r=new c.Fx(b,
d,v);h=null;"d"===v?(r.paths=r.initPath(b,b.d,a.d),r.toD=a.d,f=0,h=1):b.attr?f=b.attr(v):(f=parseFloat(c.getStyle(b,v))||0,"opacity"!==v&&(e="px"));h||(h=q);h&&h.match&&h.match("px")&&(h=h.replace(/px/g,""));r.run(f,h,e)})};c.seriesType=function(b,a,d,f,e){var h=c.getOptions(),r=c.seriesTypes;h.plotOptions[b]=c.merge(h.plotOptions[a],d);r[b]=c.extendClass(r[a]||function(){},f);r[b].prototype.type=b;e&&(r[b].prototype.pointClass=c.extendClass(c.Point,e));return r[b]};c.uniqueKey=function(){var b=Math.random().toString(36).substring(2,
9),a=0;return function(){return"highcharts-"+b+"-"+a++}}();c.isFunction=function(b){return"function"===typeof b};g.jQuery&&(g.jQuery.fn.highcharts=function(){var b=[].slice.call(arguments);if(this[0])return b[0]?(new (c[A(b[0])?b.shift():"Chart"])(this[0],b[0],b[1]),this):m[C(this[0],"data-highcharts-chart")]});return{attr:C,defined:y,erase:function(b,a){for(var d=b.length;d--;)if(b[d]===a){b.splice(d,1);break}},isArray:D,isClass:u,isDOMElement:z,isNumber:L,isObject:F,isString:A,objectEach:x,pInt:n,
splat:function(b){return D(b)?b:[b]}}});N(H,"parts/Color.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.isNumber,D=n.pInt,F=c.merge;c.Color=function(z){if(!(this instanceof c.Color))return new c.Color(z);this.init(z)};c.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(c){return[D(c[1]),D(c[2]),D(c[3]),parseFloat(c[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(c){return[D(c[1]),D(c[2]),D(c[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(z){var u,n;if((this.input=z=this.names[z&&z.toLowerCase?z.toLowerCase():""]||z)&&z.stops)this.stops=z.stops.map(function(x){return new c.Color(x[1])});else{if(z&&z.charAt&&"#"===z.charAt()){var y=z.length;z=parseInt(z.substr(1),16);7===y?u=[(z&16711680)>>16,(z&65280)>>8,z&255,1]:4===y&&(u=[(z&3840)>>4|(z&3840)>>8,(z&240)>>4|z&240,(z&15)<<4|z&15,1])}if(!u)for(n=this.parsers.length;n--&&!u;){var C=
this.parsers[n];(y=C.regex.exec(z))&&(u=C.parse(y))}}this.rgba=u||[]},get:function(c){var u=this.input,z=this.rgba;if(this.stops){var y=F(u);y.stops=[].concat(y.stops);this.stops.forEach(function(u,x){y.stops[x]=[y.stops[x][0],u.get(c)]})}else y=z&&A(z[0])?"rgb"===c||!c&&1===z[3]?"rgb("+z[0]+","+z[1]+","+z[2]+")":"a"===c?z[3]:"rgba("+z.join(",")+")":u;return y},brighten:function(c){var u,z=this.rgba;if(this.stops)this.stops.forEach(function(u){u.brighten(c)});else if(A(c)&&0!==c)for(u=0;3>u;u++)z[u]+=
D(255*c),0>z[u]&&(z[u]=0),255<z[u]&&(z[u]=255);return this},setOpacity:function(c){this.rgba[3]=c;return this},tweenTo:function(c,u){var z=this.rgba,y=c.rgba;y.length&&z&&z.length?(c=1!==y[3]||1!==z[3],u=(c?"rgba(":"rgb(")+Math.round(y[0]+(z[0]-y[0])*(1-u))+","+Math.round(y[1]+(z[1]-y[1])*(1-u))+","+Math.round(y[2]+(z[2]-y[2])*(1-u))+(c?","+(y[3]+(z[3]-y[3])*(1-u)):"")+")"):u=c.input||"none";return u}};c.color=function(z){return new c.Color(z)}});N(H,"parts/SvgRenderer.js",[H["parts/Globals.js"],
H["parts/Utilities.js"]],function(c,n){var A=n.attr,D=n.defined,F=n.erase,z=n.isArray,u=n.isNumber,L=n.isObject,y=n.isString,C=n.objectEach,x=n.pInt,m=n.splat,p=c.addEvent,g=c.animate,b=c.charts,a=c.color,d=c.css,f=c.createElement,e=c.deg2rad,h=c.destroyObjectProperties,r=c.doc,E=c.extend,q=c.hasTouch,v=c.isFirefox,k=c.isMS,t=c.isWebKit,B=c.merge,I=c.noop,w=c.pick,l=c.removeEvent,J=c.stop,K=c.svg,T=c.SVG_NS,R=c.symbolSizes,S=c.win;var M=c.SVGElement=function(){return this};E(M.prototype,{opacity:1,
SVG_NS:T,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),init:function(a,b){this.element="span"===b?f(b):r.createElementNS(this.SVG_NS,b);this.renderer=a;c.fireEvent(this,"afterInit")},animate:function(a,b,d){var G=c.animObject(w(b,this.renderer.globalAnimation,!0));w(r.hidden,r.msHidden,r.webkitHidden,!1)&&(G.duration=0);0!==G.duration?(d&&(G.complete=d),g(this,a,G)):(this.attr(a,void 0,d),C(a,
function(a,b){G.step&&G.step.call(this,a,{prop:b,pos:1})},this));return this},complexColor:function(a,b,d){var G=this.renderer,l,w,e,f,k,O,t,h,J,K,r,Q=[],M;c.fireEvent(this.renderer,"complexColor",{args:arguments},function(){a.radialGradient?w="radialGradient":a.linearGradient&&(w="linearGradient");w&&(e=a[w],k=G.gradients,t=a.stops,K=d.radialReference,z(e)&&(a[w]=e={x1:e[0],y1:e[1],x2:e[2],y2:e[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===w&&K&&!D(e.gradientUnits)&&(f=e,e=B(e,G.getRadialAttr(K,
f),{gradientUnits:"userSpaceOnUse"})),C(e,function(a,G){"id"!==G&&Q.push(G,a)}),C(t,function(a){Q.push(a)}),Q=Q.join(","),k[Q]?r=k[Q].attr("id"):(e.id=r=c.uniqueKey(),k[Q]=O=G.createElement(w).attr(e).add(G.defs),O.radAttr=f,O.stops=[],t.forEach(function(a){0===a[1].indexOf("rgba")?(l=c.color(a[1]),h=l.get("rgb"),J=l.get("a")):(h=a[1],J=1);a=G.createElement("stop").attr({offset:a[0],"stop-color":h,"stop-opacity":J}).add(O);O.stops.push(a)})),M="url("+G.url+"#"+r+")",d.setAttribute(b,M),d.gradient=
Q,a.toString=function(){return M})})},applyTextOutline:function(a){var b=this.element,G;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill)));a=a.split(" ");var d=a[a.length-1];if((G=a[0])&&"none"!==G&&c.svg){this.fakeTS=!0;a=[].slice.call(b.getElementsByTagName("tspan"));this.ySetter=this.xSetter;G=G.replace(/(^[\d\.]+)(.*?)$/g,function(a,b,G){return 2*b+G});this.removeTextOutline(a);var w=b.firstChild;a.forEach(function(a,l){0===l&&(a.setAttribute("x",b.getAttribute("x")),
l=b.getAttribute("y"),a.setAttribute("y",l||0),null===l&&b.setAttribute("y",0));a=a.cloneNode(1);A(a,{"class":"highcharts-text-outline",fill:d,stroke:d,"stroke-width":G,"stroke-linejoin":"round"});b.insertBefore(a,w)})}},removeTextOutline:function(a){for(var b=a.length,G;b--;)G=a[b],"highcharts-text-outline"===G.getAttribute("class")&&F(a,this.element.removeChild(G))},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(a,b,d,l){var G=this.element,
w,e=this,f,k,O=this.symbolCustomAttribs;if("string"===typeof a&&void 0!==b){var t=a;a={};a[t]=b}"string"===typeof a?e=(this[a+"Getter"]||this._defaultGetter).call(this,a,G):(C(a,function(b,d){f=!1;l||J(this,d);this.symbolName&&-1!==c.inArray(d,O)&&(w||(this.symbolAttr(a),w=!0),f=!0);!this.rotation||"x"!==d&&"y"!==d||(this.doTransform=!0);f||(k=this[d+"Setter"]||this._defaultSetter,k.call(this,b,d,G),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&this.updateShadows(d,
b,k))},this),this.afterSetters());d&&d.call(this);return e},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,b,d){for(var G=this.shadows,l=G.length;l--;)d.call(G[l],"height"===a?Math.max(b-(G[l].cutHeight||0),0):"d"===a?this.d:b,a,G[l])},addClass:function(a,b){var d=this.attr("class")||"";b||(a=(a||"").split(/ /g).reduce(function(a,b){-1===d.indexOf(b)&&a.push(b);return a},d?[d]:[]).join(" "));a!==d&&this.attr("class",a);return this},
hasClass:function(a){return-1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var b=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(d){b[d]=w(a[d],b[d])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,
b){b=b||a.strokeWidth||0;var d=Math.round(b)%2/2;a.x=Math.floor(a.x||this.x||0)+d;a.y=Math.floor(a.y||this.y||0)+d;a.width=Math.floor((a.width||this.width||0)-2*d);a.height=Math.floor((a.height||this.height||0)-2*d);D(a.strokeWidth)&&(a.strokeWidth=b);return a},css:function(a){var b=this.styles,G={},l=this.element,w="",e=!b,f=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);b&&C(a,function(a,d){a!==b[d]&&(G[d]=a,e=!0)});if(e){b&&(a=E(b,G));if(a)if(null===a.width||"auto"===a.width)delete this.textWidth;
else if("text"===l.nodeName.toLowerCase()&&a.width)var k=this.textWidth=x(a.width);this.styles=a;k&&!K&&this.renderer.forExport&&delete a.width;if(l.namespaceURI===this.SVG_NS){var c=function(a,b){return"-"+b.toLowerCase()};C(a,function(a,b){-1===f.indexOf(b)&&(w+=b.replace(/([A-Z])/g,c)+":"+a+";")});w&&A(l,"style",w)}else d(l,a);this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},getStyle:function(a){return S.getComputedStyle(this.element||
this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var a=this.getStyle("stroke-width");if(a.indexOf("px")===a.length-2)a=x(a);else{var b=r.createElementNS(T,"rect");A(b,{width:a,"stroke-width":0});this.element.parentNode.appendChild(b);a=b.getBBox().width;b.parentNode.removeChild(b)}return a},on:function(a,b){var d=this,l=d.element;q&&"click"===a?(l.ontouchstart=function(a){d.touchEventFired=Date.now();a.preventDefault();b.call(l,a)},l.onclick=
function(a){(-1===S.navigator.userAgent.indexOf("Android")||1100<Date.now()-(d.touchEventFired||0))&&b.call(l,a)}):l["on"+a]=b;return this},setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=
this.translateX||0,b=this.translateY||0,d=this.scaleX,l=this.scaleY,e=this.inverted,f=this.rotation,k=this.matrix,c=this.element;e&&(a+=this.width,b+=this.height);a=["translate("+a+","+b+")"];D(k)&&a.push("matrix("+k.join(",")+")");e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+w(this.rotationOriginX,c.getAttribute("x"),0)+" "+w(this.rotationOriginY,c.getAttribute("y")||0)+")");(D(d)||D(l))&&a.push("scale("+w(d,1)+" "+w(l,1)+")");a.length&&c.setAttribute("transform",a.join(" "))},toFront:function(){var a=
this.element;a.parentNode.appendChild(a);return this},align:function(a,b,d){var l,G={};var e=this.renderer;var f=e.alignedObjects;var k,c;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!d||y(d))this.alignTo=l=d||"renderer",F(f,this),f.push(this),d=null}else a=this.alignOptions,b=this.alignByTranslate,l=this.alignTo;d=w(d,e[l],e);l=a.align;e=a.verticalAlign;f=(d.x||0)+(a.x||0);var t=(d.y||0)+(a.y||0);"right"===l?k=1:"center"===l&&(k=2);k&&(f+=(d.width-(a.width||0))/k);G[b?"translateX":"x"]=Math.round(f);
"bottom"===e?c=1:"middle"===e&&(c=2);c&&(t+=(d.height-(a.height||0))/c);G[b?"translateY":"y"]=Math.round(t);this[this.placed?"animate":"attr"](G);this.placed=!0;this.alignAttr=G;return this},getBBox:function(a,b){var d,l=this.renderer,G=this.element,f=this.styles,k=this.textStr,c,t=l.cache,h=l.cacheKeys,O=G.namespaceURI===this.SVG_NS;b=w(b,this.rotation);var B=b*e;var J=l.styledMode?G&&M.prototype.getStyle.call(G,"font-size"):f&&f.fontSize;if(D(k)){var K=k.toString();-1===K.indexOf("<")&&(K=K.replace(/[0-9]/g,
"0"));K+=["",b||0,J,this.textWidth,f&&f.textOverflow].join()}K&&!a&&(d=t[K]);if(!d){if(O||l.forExport){try{(c=this.fakeTS&&function(a){[].forEach.call(G.querySelectorAll(".highcharts-text-outline"),function(b){b.style.display=a})})&&c("none"),d=G.getBBox?E({},G.getBBox()):{width:G.offsetWidth,height:G.offsetHeight},c&&c("")}catch(Z){""}if(!d||0>d.width)d={width:0,height:0}}else d=this.htmlGetBBox();l.isSVG&&(a=d.width,l=d.height,O&&(d.height=l={"11px,17":14,"13px,20":16}[f&&f.fontSize+","+Math.round(l)]||
l),b&&(d.width=Math.abs(l*Math.sin(B))+Math.abs(a*Math.cos(B)),d.height=Math.abs(l*Math.cos(B))+Math.abs(a*Math.sin(B))));if(K&&0<d.height){for(;250<h.length;)delete t[h.shift()];t[K]||h.push(K);t[K]=d}}return d},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(a){a?this.attr({y:-9999}):this.attr({visibility:"hidden"});return this},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=
this.renderer,d=this.element;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)var l=this.zIndexSetter();l||(a?a.element:b.box).appendChild(d);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},d=a.renderer,l=d.isSVG&&"SPAN"===b.nodeName&&a.parentGroup,w=b.ownerSVGElement,e=a.clipPath;b.onclick=b.onmouseout=
b.onmouseover=b.onmousemove=b.point=null;J(a);e&&w&&([].forEach.call(w.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){-1<a.getAttribute("clip-path").indexOf(e.element.id)&&a.removeAttribute("clip-path")}),a.clipPath=e.destroy());if(a.stops){for(w=0;w<a.stops.length;w++)a.stops[w]=a.stops[w].destroy();a.stops=null}a.safeRemoveChild(b);for(d.styledMode||a.destroyShadows();l&&l.div&&0===l.div.childNodes.length;)b=l.parentGroup,a.safeRemoveChild(l.div),delete l.div,l=b;a.alignTo&&F(d.alignedObjects,
a);C(a,function(b,d){a[d]&&a[d].parentGroup===a&&a[d].destroy&&a[d].destroy();delete a[d]})},shadow:function(a,b,d){var l=[],e,f=this.element;if(!a)this.destroyShadows();else if(!this.shadows){var G=w(a.width,3);var k=(a.opacity||.15)/G;var c=this.parentInverted?"(-1,-1)":"("+w(a.offsetX,1)+", "+w(a.offsetY,1)+")";for(e=1;e<=G;e++){var t=f.cloneNode(0);var h=2*G+1-2*e;A(t,{stroke:a.color||"#000000","stroke-opacity":k*e,"stroke-width":h,transform:"translate"+c,fill:"none"});t.setAttribute("class",
(t.getAttribute("class")||"")+" highcharts-shadow");d&&(A(t,"height",Math.max(A(t,"height")-h,0)),t.cutHeight=h);b?b.element.appendChild(t):f.parentNode&&f.parentNode.insertBefore(t,f);l.push(t)}this.shadows=l}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=w(this[a+"Value"],
this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,b,d){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[b]!==a&&(d.setAttribute(b,a),this[b]=a)},dashstyleSetter:function(a){var b,d=this["stroke-width"];"inherit"===d&&(d=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash",
"8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=x(a[b])*d;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){var b={left:"start",center:"middle",right:"end"};b[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",b[a]))},opacitySetter:function(a,b,d){this[b]=a;d.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=r.createElementNS(this.SVG_NS,
"title"),this.element.appendChild(b));b.firstChild&&b.removeChild(b.firstChild);b.appendChild(r.createTextNode(String(w(a,"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,delete this.textPxLength,this.textStr=a,this.added&&this.renderer.buildText(this))},setTextPath:function(a,b){var d=this.element,l={textAnchor:"text-anchor"},w=!1,e=this.textPathWrapper,f=!e;b=B(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},
b);var k=b.attributes;if(a&&b&&b.enabled){this.options&&this.options.padding&&(k.dx=-this.options.padding);e||(this.textPathWrapper=e=this.renderer.createElement("textPath"),w=!0);var G=e.element;(b=a.element.getAttribute("id"))||a.element.setAttribute("id",b=c.uniqueKey());if(f)for(a=d.getElementsByTagName("tspan");a.length;)a[0].setAttribute("y",0),G.appendChild(a[0]);w&&e.add({element:this.text?this.text.element:d});G.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+b);
D(k.dy)&&(G.parentNode.setAttribute("dy",k.dy),delete k.dy);D(k.dx)&&(G.parentNode.setAttribute("dx",k.dx),delete k.dx);C(k,function(a,b){G.setAttribute(l[b]||b,a)});d.removeAttribute("transform");this.removeTextOutline.call(e,[].slice.call(d.getElementsByTagName("tspan")));this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=this.updateTransform=I}else e&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(d,a));return this},
destroyTextPath:function(a,b){var d;b.element.setAttribute("id","");for(d=this.textPathWrapper.element.childNodes;d.length;)a.firstChild.appendChild(d[0]);a.firstChild.removeChild(this.textPathWrapper.element);delete b.textPathWrapper},fillSetter:function(a,b,d){"string"===typeof a?d.setAttribute(b,a):a&&this.complexColor(a,b,d)},visibilitySetter:function(a,b,d){"inherit"===a?d.removeAttribute(b):this[b]!==a&&d.setAttribute(b,a);this[b]=a},zIndexSetter:function(a,b){var d=this.renderer,l=this.parentGroup,
w=(l||d).element||d.box,e=this.element,f=!1;d=w===d.box;var k=this.added;var c;D(a)?(e.setAttribute("data-z-index",a),a=+a,this[b]===a&&(k=!1)):D(this[b])&&e.removeAttribute("data-z-index");this[b]=a;if(k){(a=this.zIndex)&&l&&(l.handleZ=!0);b=w.childNodes;for(c=b.length-1;0<=c&&!f;c--){l=b[c];k=l.getAttribute("data-z-index");var G=!D(k);if(l!==e)if(0>a&&G&&!d&&!c)w.insertBefore(e,b[c]),f=!0;else if(x(k)<=a||G&&(!D(a)||0<=a))w.insertBefore(e,b[c+1]||null),f=!0}f||(w.insertBefore(e,b[d?3:0]||null),
f=!0)}return f},_defaultSetter:function(a,b,d){d.setAttribute(b,a)}});M.prototype.yGetter=M.prototype.xGetter;M.prototype.translateXSetter=M.prototype.translateYSetter=M.prototype.rotationSetter=M.prototype.verticalAlignSetter=M.prototype.rotationOriginXSetter=M.prototype.rotationOriginYSetter=M.prototype.scaleXSetter=M.prototype.scaleYSetter=M.prototype.matrixSetter=function(a,b){this[b]=a;this.doTransform=!0};M.prototype["stroke-widthSetter"]=M.prototype.strokeSetter=function(a,b,d){this[b]=a;this.stroke&&
this["stroke-width"]?(M.prototype.fillSetter.call(this,this.stroke,"stroke",d),d.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===b&&0===a&&this.hasStroke?(d.removeAttribute("stroke"),this.hasStroke=!1):this.renderer.styledMode&&this["stroke-width"]&&(d.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0)};n=c.SVGRenderer=function(){this.init.apply(this,arguments)};E(n.prototype,{Element:M,SVG_NS:T,init:function(a,b,l,w,e,f,k){var c=this.createElement("svg").attr({version:"1.1",
"class":"highcharts-root"});k||c.css(this.getStyle(w));w=c.element;a.appendChild(w);A(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&A(w,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=w;this.boxWrapper=c;this.alignedObjects=[];this.url=(v||t)&&r.getElementsByTagName("base").length?S.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(r.createTextNode("Created with Highcharts 7.2.0"));this.defs=
this.createElement("defs").add();this.allowHTML=f;this.forExport=e;this.styledMode=k;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,l,!1);var G;v&&a.getBoundingClientRect&&(b=function(){d(a,{left:0,top:0});G=a.getBoundingClientRect();d(a,{left:Math.ceil(G.left)-G.left+"px",top:Math.ceil(G.top)-G.top+"px"})},b(),this.unSubPixelFix=p(S,"resize",b))},definition:function(a){function b(a,l){var w;m(a).forEach(function(a){var e=d.createElement(a.tagName),f={};C(a,function(a,
b){"tagName"!==b&&"children"!==b&&"textContent"!==b&&(f[b]=a)});e.attr(f);e.add(l||d.defs);a.textContent&&e.element.appendChild(r.createTextNode(a.textContent));b(a.children||[],e);w=e});return w}var d=this;return b(a)},getStyle:function(a){return this.style=E({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();h(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:I,getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},truncate:function(a,b,d,l,w,e,f){var k=this,c=a.rotation,t,G=l?1:0,h=(d||l).length,B=h,J=[],K=function(a){b.firstChild&&
b.removeChild(b.firstChild);a&&b.appendChild(r.createTextNode(a))},M=function(e,c){c=c||e;if(void 0===J[c])if(b.getSubStringLength)try{J[c]=w+b.getSubStringLength(0,l?c+1:c)}catch(aa){""}else k.getSpanWidth&&(K(f(d||l,e)),J[c]=w+k.getSpanWidth(a,b));return J[c]},O;a.rotation=0;var q=M(b.textContent.length);if(O=w+q>e){for(;G<=h;)B=Math.ceil((G+h)/2),l&&(t=f(l,B)),q=M(B,t&&t.length-1),G===h?G=h+1:q>e?h=B-1:G=B;0===h?K(""):d&&h===d.length-1||K(t||f(d||l,B))}l&&l.splice(0,B);a.actualWidth=q;a.rotation=
c;return O},escapes:{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},buildText:function(a){var b=a.element,l=this,e=l.forExport,f=w(a.textStr,"").toString(),k=-1!==f.indexOf("<"),c=b.childNodes,t,h=A(b,"x"),G=a.styles,B=a.textWidth,J=G&&G.lineHeight,M=G&&G.textOutline,q=G&&"ellipsis"===G.textOverflow,v=G&&"nowrap"===G.whiteSpace,I=G&&G.fontSize,m,g=c.length;G=B&&!a.added&&this.box;var E=function(a){var d;l.styledMode||(d=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:I||l.style.fontSize||
12);return J?x(J):l.fontMetrics(d,a.getAttribute("style")?a:b).h},p=function(a,b){C(l.escapes,function(d,l){b&&-1!==b.indexOf(d)||(a=a.toString().replace(new RegExp(d,"g"),l))});return a},R=function(a,b){var d=a.indexOf("<");a=a.substring(d,a.indexOf(">")-d);d=a.indexOf(b+"=");if(-1!==d&&(d=d+b.length+1,b=a.charAt(d),'"'===b||"'"===b))return a=a.substring(d+1),a.substring(0,a.indexOf(b))},S=/<br.*?>/g;var u=[f,q,v,J,M,I,B].join();if(u!==a.textCache){for(a.textCache=u;g--;)b.removeChild(c[g]);k||M||
q||B||-1!==f.indexOf(" ")&&(!v||S.test(f))?(G&&G.appendChild(b),k?(f=l.styledMode?f.replace(/<(b|strong)>/g,'<span class="highcharts-strong">').replace(/<(i|em)>/g,'<span class="highcharts-emphasized">'):f.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">'),f=f.replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(S)):f=[f],f=f.filter(function(a){return""!==a}),f.forEach(function(w,f){var k=0,c=0;w=w.replace(/^\s+|\s+$/g,
"").replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");var G=w.split("|||");G.forEach(function(w){if(""!==w||1===G.length){var J={},M=r.createElementNS(l.SVG_NS,"tspan"),O,g;(O=R(w,"class"))&&A(M,"class",O);if(O=R(w,"style"))O=O.replace(/(;| |^)color([ :])/,"$1fill$2"),A(M,"style",O);(g=R(w,"href"))&&!e&&(A(M,"onclick",'location.href="'+g+'"'),A(M,"class","highcharts-anchor"),l.styledMode||d(M,{cursor:"pointer"}));w=p(w.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==w){M.appendChild(r.createTextNode(w));
k?J.dx=0:f&&null!==h&&(J.x=h);A(M,J);b.appendChild(M);!k&&m&&(!K&&e&&d(M,{display:"block"}),A(M,"dy",E(M)));if(B){var Q=w.replace(/([^\^])-/g,"$1- ").split(" ");J=!v&&(1<G.length||f||1<Q.length);g=0;var x=E(M);if(q)t=l.truncate(a,M,w,void 0,0,Math.max(0,B-parseInt(I||12,10)),function(a,b){return a.substring(0,b)+"\u2026"});else if(J)for(;Q.length;)Q.length&&!v&&0<g&&(M=r.createElementNS(T,"tspan"),A(M,{dy:x,x:h}),O&&A(M,"style",O),M.appendChild(r.createTextNode(Q.join(" ").replace(/- /g,"-"))),b.appendChild(M)),
l.truncate(a,M,null,Q,0===g?c:0,B,function(a,b){return Q.slice(0,b).join(" ").replace(/- /g,"-")}),c=a.actualWidth,g++}k++}}});m=m||b.childNodes.length}),q&&t&&a.attr("title",p(a.textStr,["&lt;","&gt;"])),G&&G.removeChild(b),M&&a.applyTextOutline&&a.applyTextOutline(M)):b.appendChild(r.createTextNode(p(f)))}},getContrast:function(b){b=a(b).rgba;b[0]*=1;b[1]*=1.2;b[2]*=.5;return 459<b[0]+b[1]+b[2]?"#000000":"#FFFFFF"},button:function(a,b,d,l,w,e,f,c,t,h){var G=this.label(a,b,d,t,null,null,h,null,"button"),
J=0,K=this.styledMode;G.attr(B({padding:8,r:2},w));if(!K){w=B({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},w);var M=w.style;delete w.style;e=B(w,{fill:"#e6e6e6"},e);var r=e.style;delete e.style;f=B(w,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},f);var q=f.style;delete f.style;c=B(w,{style:{color:"#cccccc"}},c);var O=c.style;delete c.style}p(G.element,k?"mouseover":"mouseenter",function(){3!==J&&G.setState(1)});p(G.element,
k?"mouseout":"mouseleave",function(){3!==J&&G.setState(J)});G.setState=function(a){1!==a&&(G.state=J=a);G.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);K||G.attr([w,e,f,c][a||0]).css([M,r,q,O][a||0])};K||G.attr(w).css(E({cursor:"default"},M));return G.on("click",function(a){3!==J&&l.call(G,a)})},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+
b%2/2);return a},path:function(a){var b=this.styledMode?{}:{fill:"none"};z(a)?b.d=a:L(a)&&E(b,a);return this.createElement("path").attr(b)},circle:function(a,b,d){a=L(a)?a:void 0===a?{}:{x:a,y:b,r:d};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,d){d.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,d,l,w,e){L(a)?(l=a,b=l.y,d=l.r,a=l.x):l={innerR:l,start:w,end:e};a=this.symbol("arc",a,b,d,d,l);a.r=d;return a},rect:function(a,b,d,l,w,e){w=L(a)?a.r:w;var f=this.createElement("rect");
a=L(a)?a:void 0===a?{}:{x:a,y:b,width:Math.max(d,0),height:Math.max(l,0)};this.styledMode||(void 0!==e&&(a.strokeWidth=e,a=f.crisp(a)),a.fill="none");w&&(a.r=w);f.rSetter=function(a,b,d){f.r=a;A(d,{rx:a,ry:a})};f.rGetter=function(){return f.r};return f.attr(a)},setSize:function(a,b,d){var l=this.alignedObjects,e=l.length;this.width=a;this.height=b;for(this.boxWrapper.animate({width:a,height:b},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:w(d,!0)?
void 0:0});e--;)l[e].align()},g:function(a){var b=this.createElement("g");return a?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,d,l,w,e){var f={preserveAspectRatio:"none"},k=function(a,b){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",b):a.setAttribute("hc-svg-href",b)},c=function(b){k(t.element,a);e.call(t,b)};1<arguments.length&&E(f,{x:b,y:d,width:l,height:w});var t=this.createElement("image").attr(f);e?(k(t.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
f=new S.Image,p(f,"load",c),f.src=a,f.complete&&c({})):k(t.element,a);return t},symbol:function(a,l,e,k,c,t){var h=this,B=/^url\((.*?)\)$/,G=B.test(a),J=!G&&(this.symbols[a]?a:"circle"),K=J&&this.symbols[J],M=D(l)&&K&&K.call(this.symbols,Math.round(l),Math.round(e),k,c,t);if(K){var q=this.path(M);h.styledMode||q.attr("fill","none");E(q,{symbolName:J,x:l,y:e,width:k,height:c});t&&E(q,t)}else if(G){var v=a.match(B)[1];q=this.image(v);q.imgwidth=w(R[v]&&R[v].width,t&&t.width);q.imgheight=w(R[v]&&R[v].height,
t&&t.height);var I=function(){q.attr({width:q.width,height:q.height})};["width","height"].forEach(function(a){q[a+"Setter"]=function(a,b){var d={},l=this["img"+b],w="width"===b?"translateX":"translateY";this[b]=a;D(l)&&(t&&"within"===t.backgroundSize&&this.width&&this.height&&(l=Math.round(l*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(b,l),this.alignByTranslate||(d[w]=((this[b]||0)-l)/2,this.attr(d)))}});D(l)&&q.attr({x:l,y:e});q.isImg=!0;
D(q.imgwidth)&&D(q.imgheight)?I():(q.attr({width:0,height:0}),f("img",{onload:function(){var a=b[h.chartIndex];0===this.width&&(d(this,{position:"absolute",top:"-999em"}),r.body.appendChild(this));R[v]={width:this.width,height:this.height};q.imgwidth=this.width;q.imgheight=this.height;q.element&&I();this.parentNode&&this.parentNode.removeChild(this);h.imgCount--;if(!h.imgCount&&a&&a.onload)a.onload()},src:v}),this.imgCount++)}return q},symbols:{circle:function(a,b,d,l){return this.arc(a+d/2,b+l/2,
d/2,l/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,b,d,l){return["M",a,b,"L",a+d,b,a+d,b+l,a,b+l,"Z"]},triangle:function(a,b,d,l){return["M",a+d/2,b,"L",a+d,b+l,a,b+l,"Z"]},"triangle-down":function(a,b,d,l){return["M",a,b,"L",a+d,b,a+d/2,b+l,"Z"]},diamond:function(a,b,d,l){return["M",a+d/2,b,"L",a+d,b+l/2,a+d/2,b+l,a,b+l/2,"Z"]},arc:function(a,b,d,l,e){var f=e.start,k=e.r||d,c=e.r||l||d,t=e.end-.001;d=e.innerR;l=w(e.open,.001>Math.abs(e.end-e.start-2*Math.PI));var h=Math.cos(f),
B=Math.sin(f),J=Math.cos(t);t=Math.sin(t);f=.001>e.end-f-Math.PI?0:1;e=["M",a+k*h,b+c*B,"A",k,c,0,f,w(e.clockwise,1),a+k*J,b+c*t];D(d)&&e.push(l?"M":"L",a+d*J,b+d*t,"A",d,d,0,f,0,a+d*h,b+d*B);e.push(l?"":"Z");return e},callout:function(a,b,d,l,w){var e=Math.min(w&&w.r||0,d,l),f=e+6,k=w&&w.anchorX;w=w&&w.anchorY;var c=["M",a+e,b,"L",a+d-e,b,"C",a+d,b,a+d,b,a+d,b+e,"L",a+d,b+l-e,"C",a+d,b+l,a+d,b+l,a+d-e,b+l,"L",a+e,b+l,"C",a,b+l,a,b+l,a,b+l-e,"L",a,b+e,"C",a,b,a,b,a+e,b];k&&k>d?w>b+f&&w<b+l-f?c.splice(13,
3,"L",a+d,w-6,a+d+6,w,a+d,w+6,a+d,b+l-e):c.splice(13,3,"L",a+d,l/2,k,w,a+d,l/2,a+d,b+l-e):k&&0>k?w>b+f&&w<b+l-f?c.splice(33,3,"L",a,w+6,a-6,w,a,w-6,a,b+e):c.splice(33,3,"L",a,l/2,k,w,a,l/2,a,b+e):w&&w>l&&k>a+f&&k<a+d-f?c.splice(23,3,"L",k+6,b+l,k,b+l+6,k-6,b+l,a+e,b+l):w&&0>w&&k>a+f&&k<a+d-f&&c.splice(3,3,"L",k-6,b,k,b-6,k+6,b,d-e,b);return c}},clipRect:function(a,b,d,l){var w=c.uniqueKey()+"-",e=this.createElement("clipPath").attr({id:w}).add(this.defs);a=this.rect(a,b,d,l,0).add(e);a.id=w;a.clipPath=
e;a.count=0;return a},text:function(a,b,d,l){var w={};if(l&&(this.allowHTML||!this.forExport))return this.html(a,b,d);w.x=Math.round(b||0);d&&(w.y=Math.round(d));D(a)&&(w.text=a);a=this.createElement("text").attr(w);l||(a.xSetter=function(a,b,d){var l=d.getElementsByTagName("tspan"),w=d.getAttribute(b),e;for(e=0;e<l.length;e++){var f=l[e];f.getAttribute(b)===w&&f.setAttribute(b,a)}d.setAttribute(b,a)});return a},fontMetrics:function(a,b){a=!this.styledMode&&/px/.test(a)||!S.getComputedStyle?a||b&&
b.style&&b.style.fontSize||this.style&&this.style.fontSize:b&&M.prototype.getStyle.call(b,"font-size");a=/px/.test(a)?x(a):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,b,d){var l=a;b&&d&&(l=Math.max(l*Math.cos(b*e),4));return{x:-a/3*Math.sin(b*e),y:l}},label:function(a,b,d,w,e,f,k,c,t){var h=this,J=h.styledMode,K=h.g("button"!==t&&"label"),q=K.text=h.text("",0,0,k).attr({zIndex:1}),r,v,G=0,I=3,m=0,g,p,O,T,x,Q={},R,S,z=/^url\((.*?)\)$/.test(w),y=J||z,n=function(){return J?
r.strokeWidth()%2/2:(R?parseInt(R,10):0)%2/2};t&&K.addClass("highcharts-"+t);var L=function(){var a=q.element.style,b={};v=(void 0===g||void 0===p||x)&&D(q.textStr)&&q.getBBox();K.width=(g||v.width||0)+2*I+m;K.height=(p||v.height||0)+2*I;S=I+Math.min(h.fontMetrics(a&&a.fontSize,q).b,v?v.height:Infinity);y&&(r||(K.box=r=h.symbols[w]||z?h.symbol(w):h.rect(),r.addClass(("button"===t?"":"highcharts-label-box")+(t?" highcharts-"+t+"-box":"")),r.add(K),a=n(),b.x=a,b.y=(c?-S:0)+a),b.width=Math.round(K.width),
b.height=Math.round(K.height),r.attr(E(b,Q)),Q={})};var C=function(){var a=m+I;var b=c?0:S;D(g)&&v&&("center"===x||"right"===x)&&(a+={center:.5,right:1}[x]*(g-v.width));if(a!==q.x||b!==q.y)q.attr("x",a),q.hasBoxWidthChanged&&(v=q.getBBox(!0),L()),void 0!==b&&q.attr("y",b);q.x=a;q.y=b};var A=function(a,b){r?r.attr(a,b):Q[a]=b};K.onAdd=function(){q.add(K);K.attr({text:a||0===a?a:"",x:b,y:d});r&&D(e)&&K.attr({anchorX:e,anchorY:f})};K.widthSetter=function(a){g=u(a)?a:null};K.heightSetter=function(a){p=
a};K["text-alignSetter"]=function(a){x=a};K.paddingSetter=function(a){D(a)&&a!==I&&(I=K.padding=a,C())};K.paddingLeftSetter=function(a){D(a)&&a!==m&&(m=a,C())};K.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==G&&(G=a,v&&K.attr({x:O}))};K.textSetter=function(a){void 0!==a&&q.attr({text:a});L();C()};K["stroke-widthSetter"]=function(a,b){a&&(y=!0);R=this["stroke-width"]=a;A(b,a)};J?K.rSetter=function(a,b){A(b,a)}:K.strokeSetter=K.fillSetter=K.rSetter=function(a,b){"r"!==b&&("fill"===b&&
a&&(y=!0),K[b]=a);A(b,a)};K.anchorXSetter=function(a,b){e=K.anchorX=a;A(b,Math.round(a)-n()-O)};K.anchorYSetter=function(a,b){f=K.anchorY=a;A(b,a-T)};K.xSetter=function(a){K.x=a;G&&(a-=G*((g||v.width)+2*I),K["forceAnimate:x"]=!0);O=Math.round(a);K.attr("translateX",O)};K.ySetter=function(a){T=K.y=Math.round(a);K.attr("translateY",T)};var U=K.css;k={css:function(a){if(a){var b={};a=B(a);K.textProps.forEach(function(d){void 0!==a[d]&&(b[d]=a[d],delete a[d])});q.css(b);"width"in b&&L();"fontSize"in b&&
(L(),C())}return U.call(K,a)},getBBox:function(){return{width:v.width+2*I,height:v.height+2*I,x:v.x-I,y:v.y-I}},destroy:function(){l(K.element,"mouseenter");l(K.element,"mouseleave");q&&(q=q.destroy());r&&(r=r.destroy());M.prototype.destroy.call(K);K=h=L=C=A=null}};J||(k.shadow=function(a){a&&(L(),r&&r.shadow(a));return K});return E(K,k)}});c.Renderer=n});N(H,"parts/Html.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.attr,D=n.defined,F=n.pInt,z=c.createElement,u=c.css,L=
c.extend,y=c.isFirefox,C=c.isMS,x=c.isWebKit,m=c.pick,p=c.SVGElement;n=c.SVGRenderer;var g=c.win;L(p.prototype,{htmlCss:function(b){var a="SPAN"===this.element.tagName&&b&&"width"in b,d=m(a&&b.width,void 0);if(a){delete b.width;this.textWidth=d;var f=!0}b&&"ellipsis"===b.textOverflow&&(b.whiteSpace="nowrap",b.overflow="hidden");this.styles=L(this.styles,b);u(this.element,b);f&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var b=this.element;return{x:b.offsetLeft,y:b.offsetTop,width:b.offsetWidth,
height:b.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var b=this.renderer,a=this.element,d=this.translateX||0,f=this.translateY||0,e=this.x||0,c=this.y||0,r=this.textAlign||"left",m={left:0,center:.5,right:1}[r],q=this.styles,v=q&&q.whiteSpace;u(a,{marginLeft:d,marginTop:f});!b.styledMode&&this.shadows&&this.shadows.forEach(function(a){u(a,{marginLeft:d+1,marginTop:f+1})});this.inverted&&[].forEach.call(a.childNodes,function(d){b.invertChild(d,a)});if("SPAN"===a.tagName){q=this.rotation;
var k=this.textWidth&&F(this.textWidth),t=[q,r,a.innerHTML,this.textWidth,this.textAlign].join(),B;(B=k!==this.oldTextWidth)&&!(B=k>this.oldTextWidth)&&((B=this.textPxLength)||(u(a,{width:"",whiteSpace:v||"nowrap"}),B=a.offsetWidth),B=B>k);B&&(/[ \-]/.test(a.textContent||a.innerText)||"ellipsis"===a.style.textOverflow)?(u(a,{width:k+"px",display:"block",whiteSpace:v||"normal"}),this.oldTextWidth=k,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;t!==this.cTT&&(v=b.fontMetrics(a.style.fontSize,
a).b,!D(q)||q===(this.oldRotation||0)&&r===this.oldAlign||this.setSpanRotation(q,m,v),this.getSpanCorrection(!D(q)&&this.textPxLength||a.offsetWidth,v,m,q,r));u(a,{left:e+(this.xCorr||0)+"px",top:c+(this.yCorr||0)+"px"});this.cTT=t;this.oldRotation=q;this.oldAlign=r}}else this.alignOnAdd=!0},setSpanRotation:function(b,a,d){var f={},e=this.renderer.getTransformKey();f[e]=f.transform="rotate("+b+"deg)";f[e+(y?"Origin":"-origin")]=f.transformOrigin=100*a+"% "+d+"px";u(this.element,f)},getSpanCorrection:function(b,
a,d){this.xCorr=-b*d;this.yCorr=-a}});L(n.prototype,{getTransformKey:function(){return C&&!/Edge/.test(g.navigator.userAgent)?"-ms-transform":x?"-webkit-transform":y?"MozTransform":g.opera?"-o-transform":""},html:function(b,a,d){var f=this.createElement("span"),e=f.element,c=f.renderer,r=c.isSVG,g=function(a,b){["opacity","visibility"].forEach(function(d){a[d+"Setter"]=function(e,f,k){var w=a.div?a.div.style:b;p.prototype[d+"Setter"].call(this,e,f,k);w&&(w[f]=e)}});a.addedSetters=!0};f.textSetter=
function(a){a!==e.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=a;e.innerHTML=m(a,"");f.doTransform=!0};r&&g(f,f.element.style);f.xSetter=f.ySetter=f.alignSetter=f.rotationSetter=function(a,b){"align"===b&&(b="textAlign");f[b]=a;f.doTransform=!0};f.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};f.attr({text:b,x:Math.round(a),y:Math.round(d)}).css({position:"absolute"});c.styledMode||f.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});
e.style.whiteSpace="nowrap";f.css=f.htmlCss;r&&(f.add=function(a){var b=c.box.parentNode,d=[];if(this.parentGroup=a){var t=a.div;if(!t){for(;a;)d.push(a),a=a.parentGroup;d.reverse().forEach(function(a){function e(b,d){a[d]=b;"translateX"===d?l.left=b+"px":l.top=b+"px";a.doTransform=!0}var w=A(a.element,"class");t=a.div=a.div||z("div",w?{className:w}:void 0,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},
t||b);var l=t.style;L(a,{classSetter:function(a){return function(b){this.element.setAttribute("class",b);a.className=b}}(t),on:function(){d[0].div&&f.on.apply({element:d[0].div},arguments);return a},translateXSetter:e,translateYSetter:e});a.addedSetters||g(a)})}}else t=b;t.appendChild(e);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f}})});N(H,"parts/Time.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isObject,F=n.objectEach,z=n.splat,u=
c.extend,L=c.merge,y=c.pick,C=c.timeUnits,x=c.win;c.Time=function(c){this.update(c,!1)};c.Time.prototype={defaultOptions:{},update:function(c){var m=y(c&&c.useUTC,!0),g=this;this.options=c=L(!0,this.options||{},c);this.Date=c.Date||x.Date||Date;this.timezoneOffset=(this.useUTC=m)&&c.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(m&&!c.getTimezoneOffset&&!c.timezone))||this.timezoneOffset?(this.get=function(b,a){var d=a.getTime(),f=d-g.getTimezoneOffset(a);
a.setTime(f);b=a["getUTC"+b]();a.setTime(d);return b},this.set=function(b,a,d){if("Milliseconds"===b||"Seconds"===b||"Minutes"===b&&0===a.getTimezoneOffset()%60)a["set"+b](d);else{var f=g.getTimezoneOffset(a);f=a.getTime()-f;a.setTime(f);a["setUTC"+b](d);b=g.getTimezoneOffset(a);f=a.getTime()+b;a.setTime(f)}}):m?(this.get=function(b,a){return a["getUTC"+b]()},this.set=function(b,a,d){return a["setUTC"+b](d)}):(this.get=function(b,a){return a["get"+b]()},this.set=function(b,a,d){return a["set"+b](d)})},
makeTime:function(m,p,g,b,a,d){if(this.useUTC){var f=this.Date.UTC.apply(0,arguments);var e=this.getTimezoneOffset(f);f+=e;var h=this.getTimezoneOffset(f);e!==h?f+=h-e:e-36E5!==this.getTimezoneOffset(f-36E5)||c.isSafari||(f-=36E5)}else f=(new this.Date(m,p,y(g,1),y(b,0),y(a,0),y(d,0))).getTime();return f},timezoneOffsetFunction:function(){var m=this,p=this.options,g=x.moment;if(!this.useUTC)return function(b){return 6E4*(new Date(b)).getTimezoneOffset()};if(p.timezone){if(g)return function(b){return 6E4*
-g.tz(b,p.timezone).utcOffset()};c.error(25)}return this.useUTC&&p.getTimezoneOffset?function(b){return 6E4*p.getTimezoneOffset(b)}:function(){return 6E4*(m.timezoneOffset||0)}},dateFormat:function(m,p,g){if(!A(p)||isNaN(p))return c.defaultOptions.lang.invalidDate||"";m=c.pick(m,"%Y-%m-%d %H:%M:%S");var b=this,a=new this.Date(p),d=this.get("Hours",a),f=this.get("Day",a),e=this.get("Date",a),h=this.get("Month",a),r=this.get("FullYear",a),E=c.defaultOptions.lang,q=E.weekdays,v=E.shortWeekdays,k=c.pad;
a=c.extend({a:v?v[f]:q[f].substr(0,3),A:q[f],d:k(e),e:k(e,2," "),w:f,b:E.shortMonths[h],B:E.months[h],m:k(h+1),o:h+1,y:r.toString().substr(2,2),Y:r,H:k(d),k:d,I:k(d%12||12),l:d%12||12,M:k(b.get("Minutes",a)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:k(a.getSeconds()),L:k(Math.floor(p%1E3),3)},c.dateFormats);F(a,function(a,d){for(;-1!==m.indexOf("%"+d);)m=m.replace("%"+d,"function"===typeof a?a.call(b,p):a)});return g?m.substr(0,1).toUpperCase()+m.substr(1):m},resolveDTLFormat:function(c){return D(c,!0)?
c:(c=z(c),{main:c[0],from:c[1],to:c[2]})},getTimeTicks:function(c,p,g,b){var a=this,d=[],f={};var e=new a.Date(p);var h=c.unitRange,r=c.count||1,m;b=y(b,1);if(A(p)){a.set("Milliseconds",e,h>=C.second?0:r*Math.floor(a.get("Milliseconds",e)/r));h>=C.second&&a.set("Seconds",e,h>=C.minute?0:r*Math.floor(a.get("Seconds",e)/r));h>=C.minute&&a.set("Minutes",e,h>=C.hour?0:r*Math.floor(a.get("Minutes",e)/r));h>=C.hour&&a.set("Hours",e,h>=C.day?0:r*Math.floor(a.get("Hours",e)/r));h>=C.day&&a.set("Date",e,h>=
C.month?1:Math.max(1,r*Math.floor(a.get("Date",e)/r)));if(h>=C.month){a.set("Month",e,h>=C.year?0:r*Math.floor(a.get("Month",e)/r));var q=a.get("FullYear",e)}h>=C.year&&a.set("FullYear",e,q-q%r);h===C.week&&(q=a.get("Day",e),a.set("Date",e,a.get("Date",e)-q+b+(q<b?-7:0)));q=a.get("FullYear",e);b=a.get("Month",e);var v=a.get("Date",e),k=a.get("Hours",e);p=e.getTime();a.variableTimezone&&(m=g-p>4*C.month||a.getTimezoneOffset(p)!==a.getTimezoneOffset(g));p=e.getTime();for(e=1;p<g;)d.push(p),p=h===C.year?
a.makeTime(q+e*r,0):h===C.month?a.makeTime(q,b+e*r):!m||h!==C.day&&h!==C.week?m&&h===C.hour&&1<r?a.makeTime(q,b,v,k+e*r):p+h*r:a.makeTime(q,b,v+e*r*(h===C.day?1:7)),e++;d.push(p);h<=C.hour&&1E4>d.length&&d.forEach(function(b){0===b%18E5&&"000000000"===a.dateFormat("%H%M%S%L",b)&&(f[b]="day")})}d.info=u(c,{higherRanks:f,totalRange:h*r});return d}}});N(H,"parts/Options.js",[H["parts/Globals.js"]],function(c){var n=c.color,A=c.merge;c.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:c.Time.prototype.defaultOptions,
chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},caption:{margin:15,text:"",align:"left",verticalAlign:"bottom"},plotOptions:{},labels:{style:{position:"absolute",
color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,
verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:c.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",
padding:8,snap:c.isTouchDevice?25:10,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',backgroundColor:n("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",
color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};c.setOptions=function(n){c.defaultOptions=A(!0,c.defaultOptions,n);c.time.update(A(c.defaultOptions.global,c.defaultOptions.time),!1);return c.defaultOptions};c.getOptions=function(){return c.defaultOptions};c.defaultPlotOptions=c.defaultOptions.plotOptions;c.time=new c.Time(A(c.defaultOptions.global,c.defaultOptions.time));c.dateFormat=function(n,A,z){return c.time.dateFormat(n,A,z)};""});N(H,"parts/Tick.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],
function(c,n){var A=n.defined,D=n.isNumber,F=c.correctFloat,z=c.destroyObjectProperties,u=c.fireEvent,L=c.merge,y=c.pick,C=c.deg2rad;c.Tick=function(c,m,p,g,b){this.axis=c;this.pos=m;this.type=p||"";this.isNewLabel=this.isNew=!0;this.parameters=b||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;p||g||this.addLabel()};c.Tick.prototype={addLabel:function(){var x=this,m=x.axis,p=m.options,g=m.chart,b=m.categories,a=m.names,d=x.pos,f=y(x.options&&x.options.labels,
p.labels),e=m.tickPositions,h=d===e[0],r=d===e[e.length-1];b=this.parameters.category||(b?y(b[d],a[d],d):d);var E=x.label;e=e.info;var q,v;if(m.isDatetimeAxis&&e){var k=g.time.resolveDTLFormat(p.dateTimeLabelFormats[!p.grid&&e.higherRanks[d]||e.unitName]);var t=k.main}x.isFirst=h;x.isLast=r;x.formatCtx={axis:m,chart:g,isFirst:h,isLast:r,dateTimeLabelFormat:t,tickPositionInfo:e,value:m.isLog?F(m.lin2log(b)):b,pos:d};p=m.labelFormatter.call(x.formatCtx,this.formatCtx);if(v=k&&k.list)x.shortenLabel=
function(){for(q=0;q<v.length;q++)if(E.attr({text:m.labelFormatter.call(c.extend(x.formatCtx,{dateTimeLabelFormat:v[q]}))}),E.getBBox().width<m.getSlotWidth(x)-2*y(f.padding,5))return;E.attr({text:""})};if(A(E))E&&E.textStr!==p&&(!E.textWidth||f.style&&f.style.width||E.styles.width||E.css({width:null}),E.attr({text:p}),E.textPxLength=E.getBBox().width);else{if(x.label=E=A(p)&&f.enabled?g.renderer.text(p,0,0,f.useHTML).add(m.labelGroup):null)g.styledMode||E.css(L(f.style)),E.textPxLength=E.getBBox().width;
x.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(c){var m=this.axis,p=m.options.labels,g=c.x,b=m.chart.chartWidth,a=m.chart.spacing,d=y(m.labelLeft,Math.min(m.pos,a[3]));a=y(m.labelRight,Math.max(m.isRadial?0:m.pos+m.len,b-a[1]));var f=this.label,e=this.rotation,h={left:0,center:.5,right:1}[m.labelAlign||f.attr("align")],r=f.getBBox().width,E=m.getSlotWidth(this),q=E,v=1,k,t={};if(e||"justify"!==y(p.overflow,
"justify"))0>e&&g-h*r<d?k=Math.round(g/Math.cos(e*C)-d):0<e&&g+h*r>a&&(k=Math.round((b-g)/Math.cos(e*C)));else if(b=g+(1-h)*r,g-h*r<d?q=c.x+q*(1-h)-d:b>a&&(q=a-c.x+q*h,v=-1),q=Math.min(E,q),q<E&&"center"===m.labelAlign&&(c.x+=v*(E-q-h*(E-Math.min(r,q)))),r>q||m.autoRotation&&(f.styles||{}).width)k=q;k&&(this.shortenLabel?this.shortenLabel():(t.width=Math.floor(k),(p.style||{}).textOverflow||(t.textOverflow="ellipsis"),f.css(t)))},getPosition:function(x,m,p,g){var b=this.axis,a=b.chart,d=g&&a.oldChartHeight||
a.chartHeight;x={x:x?c.correctFloat(b.translate(m+p,null,null,g)+b.transB):b.left+b.offset+(b.opposite?(g&&a.oldChartWidth||a.chartWidth)-b.right-b.left:0),y:x?d-b.bottom+b.offset-(b.opposite?b.height:0):c.correctFloat(d-b.translate(m+p,null,null,g)-b.transB)};x.y=Math.max(Math.min(x.y,1E5),-1E5);u(this,"afterGetPosition",{pos:x});return x},getLabelPosition:function(c,m,p,g,b,a,d,f){var e=this.axis,h=e.transA,r=e.isLinked&&e.linkedParent?e.linkedParent.reversed:e.reversed,E=e.staggerLines,q=e.tickRotCorr||
{x:0,y:0},v=b.y,k=g||e.reserveSpaceDefault?0:-e.labelOffset*("center"===e.labelAlign?.5:1),t={};A(v)||(v=0===e.side?p.rotation?-8:-p.getBBox().height:2===e.side?q.y+8:Math.cos(p.rotation*C)*(q.y-p.getBBox(!1,0).height/2));c=c+b.x+k+q.x-(a&&g?a*h*(r?-1:1):0);m=m+v-(a&&!g?a*h*(r?1:-1):0);E&&(p=d/(f||1)%E,e.opposite&&(p=E-p-1),m+=e.labelOffset/E*p);t.x=c;t.y=Math.round(m);u(this,"afterGetLabelPosition",{pos:t,tickmarkOffset:a,index:d});return t},getMarkPath:function(c,m,p,g,b,a){return a.crispLine(["M",
c,m,"L",c+(b?0:-p),m+(b?p:0)],g)},renderGridLine:function(c,m,p){var g=this.axis,b=g.options,a=this.gridLine,d={},f=this.pos,e=this.type,h=y(this.tickmarkOffset,g.tickmarkOffset),r=g.chart.renderer,E=e?e+"Grid":"grid",q=b[E+"LineWidth"],v=b[E+"LineColor"];b=b[E+"LineDashStyle"];a||(g.chart.styledMode||(d.stroke=v,d["stroke-width"]=q,b&&(d.dashstyle=b)),e||(d.zIndex=1),c&&(m=0),this.gridLine=a=r.path().attr(d).addClass("highcharts-"+(e?e+"-":"")+"grid-line").add(g.gridGroup));if(a&&(p=g.getPlotLinePath({value:f+
h,lineWidth:a.strokeWidth()*p,force:"pass",old:c})))a[c||this.isNew?"attr":"animate"]({d:p,opacity:m})},renderMark:function(c,m,p){var g=this.axis,b=g.options,a=g.chart.renderer,d=this.type,f=d?d+"Tick":"tick",e=g.tickSize(f),h=this.mark,r=!h,E=c.x;c=c.y;var q=y(b[f+"Width"],!d&&g.isXAxis?1:0);b=b[f+"Color"];e&&(g.opposite&&(e[0]=-e[0]),r&&(this.mark=h=a.path().addClass("highcharts-"+(d?d+"-":"")+"tick").add(g.axisGroup),g.chart.styledMode||h.attr({stroke:b,"stroke-width":q})),h[r?"attr":"animate"]({d:this.getMarkPath(E,
c,e[0],h.strokeWidth()*p,g.horiz,a),opacity:m}))},renderLabel:function(c,m,p,g){var b=this.axis,a=b.horiz,d=b.options,f=this.label,e=d.labels,h=e.step;b=y(this.tickmarkOffset,b.tickmarkOffset);var r=!0,E=c.x;c=c.y;f&&D(E)&&(f.xy=c=this.getLabelPosition(E,c,f,a,e,b,g,h),this.isFirst&&!this.isLast&&!y(d.showFirstLabel,1)||this.isLast&&!this.isFirst&&!y(d.showLastLabel,1)?r=!1:!a||e.step||e.rotation||m||0===p||this.handleOverflow(c),h&&g%h&&(r=!1),r&&D(c.y)?(c.opacity=p,f[this.isNewLabel?"attr":"animate"](c),
this.isNewLabel=!1):(f.attr("y",-9999),this.isNewLabel=!0))},render:function(x,m,p){var g=this.axis,b=g.horiz,a=this.pos,d=y(this.tickmarkOffset,g.tickmarkOffset);a=this.getPosition(b,a,d,m);d=a.x;var f=a.y;g=b&&d===g.pos+g.len||!b&&f===g.pos?-1:1;p=y(p,1);this.isActive=!0;this.renderGridLine(m,p,g);this.renderMark(a,p,g);this.renderLabel(a,m,p,x);this.isNew=!1;c.fireEvent(this,"afterRender")},destroy:function(){z(this,this.axis)}}});N(H,"parts/Axis.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],
function(c,n){var A=n.defined,D=n.isArray,F=n.isNumber,z=n.isString,u=n.objectEach,L=n.splat,y=c.addEvent,C=c.animObject,x=c.arrayMax,m=c.arrayMin,p=c.color,g=c.correctFloat,b=c.defaultOptions,a=c.deg2rad,d=c.destroyObjectProperties,f=c.extend,e=c.fireEvent,h=c.format,r=c.getMagnitude,E=c.merge,q=c.normalizeTickInterval,v=c.pick,k=c.removeEvent,t=c.seriesTypes,B=c.syncTimeout,I=c.Tick;n=function(){this.init.apply(this,arguments)};c.extend(n.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",
range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",
style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,crop:!0,overflow:"justify",formatter:function(){return c.numberFormat(this.total,-1)},style:{color:"#000000",
fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},init:function(a,b){var d=b.isX,l=this;l.chart=a;l.horiz=a.inverted&&!l.isZAxis?!d:d;l.isXAxis=d;l.coll=l.coll||(d?"xAxis":
"yAxis");e(this,"init",{userOptions:b});l.opposite=b.opposite;l.side=b.side||(l.horiz?l.opposite?0:2:l.opposite?1:3);l.setOptions(b);var w=this.options,f=w.type;l.labelFormatter=w.labels.formatter||l.defaultLabelFormatter;l.userOptions=b;l.minPixelPadding=0;l.reversed=w.reversed;l.visible=!1!==w.visible;l.zoomEnabled=!1!==w.zoomEnabled;l.hasNames="category"===f||!0===w.categories;l.categories=w.categories||l.hasNames;l.names||(l.names=[],l.names.keys={});l.plotLinesAndBandsGroups={};l.isLog="logarithmic"===
f;l.isDatetimeAxis="datetime"===f;l.positiveValuesOnly=l.isLog&&!l.allowNegativeLog;l.isLinked=A(w.linkedTo);l.ticks={};l.labelEdge=[];l.minorTicks={};l.plotLinesAndBands=[];l.alternateBands={};l.len=0;l.minRange=l.userMinRange=w.minRange||w.maxZoom;l.range=w.range;l.offset=w.offset||0;l.stacks={};l.oldStacks={};l.stacksTouched=0;l.max=null;l.min=null;l.crosshair=v(w.crosshair,L(a.options.tooltip.crosshairs)[d?0:1],!1);b=l.options.events;-1===a.axes.indexOf(l)&&(d?a.axes.splice(a.xAxis.length,0,l):
a.axes.push(l),a[l.coll].push(l));l.series=l.series||[];a.inverted&&!l.isZAxis&&d&&void 0===l.reversed&&(l.reversed=!0);u(b,function(a,b){c.isFunction(a)&&y(l,b,a)});l.lin2log=w.linearToLogConverter||l.lin2log;l.isLog&&(l.val2lin=l.log2lin,l.lin2val=l.lin2log);e(this,"afterInit")},setOptions:function(a){this.options=E(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],
E(b[this.coll],a));e(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var a=this.axis,d=this.value,e=a.chart.time,f=a.categories,k=this.dateTimeLabelFormat,t=b.lang,B=t.numericSymbols;t=t.numericSymbolMagnitude||1E3;var r=B&&B.length,q=a.options.labels.format;a=a.isLog?Math.abs(d):a.tickInterval;if(q)var v=h(q,this,e);else if(f)v=d;else if(k)v=e.dateFormat(k,d);else if(r&&1E3<=a)for(;r--&&void 0===v;)e=Math.pow(t,r+1),a>=e&&0===10*d%e&&null!==B[r]&&0!==d&&(v=c.numberFormat(d/
e,-1)+B[r]);void 0===v&&(v=1E4<=Math.abs(d)?c.numberFormat(d,-1):c.numberFormat(d,-1,void 0,""));return v},getSeriesExtremes:function(){var a=this,b=a.chart,d;e(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(l){if(l.visible||!b.options.chart.ignoreHiddenSeries){var e=l.options,w=e.threshold;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=w&&(w=null);if(a.isXAxis){if(e=
l.xData,e.length){d=l.getXExtremes(e);var f=d.min;var c=d.max;F(f)||f instanceof Date||(e=e.filter(F),d=l.getXExtremes(e),f=d.min,c=d.max);e.length&&(a.dataMin=Math.min(v(a.dataMin,f),f),a.dataMax=Math.max(v(a.dataMax,c),c))}}else if(l.getExtremes(),c=l.dataMax,f=l.dataMin,A(f)&&A(c)&&(a.dataMin=Math.min(v(a.dataMin,f),f),a.dataMax=Math.max(v(a.dataMax,c),c)),A(w)&&(a.threshold=w),!e.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});e(this,"afterGetSeriesExtremes")},translate:function(a,
b,d,e,f,c){var l=this.linkedParent||this,w=1,k=0,t=e?l.oldTransA:l.transA;e=e?l.oldMin:l.min;var h=l.minPixelPadding;f=(l.isOrdinal||l.isBroken||l.isLog&&f)&&l.lin2val;t||(t=l.transA);d&&(w*=-1,k=l.len);l.reversed&&(w*=-1,k-=w*(l.sector||l.len));b?(a=(a*w+k-h)/t+e,f&&(a=l.lin2val(a))):(f&&(a=l.val2lin(a)),a=F(e)?w*(a-e)*t+k+w*h+(F(c)?t*c:0):void 0);return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),
!0,!this.horiz,null,!0)},getPlotLinePath:function(a){var b=this,d=b.chart,f=b.left,w=b.top,c=a.old,k=a.value,t=a.translatedValue,h=a.lineWidth,B=a.force,r,q,I,m,g=c&&d.oldChartHeight||d.chartHeight,p=c&&d.oldChartWidth||d.chartWidth,E,x=b.transB,u=function(a,b,d){if("pass"!==B&&a<b||a>d)B?a=Math.min(Math.max(b,a),d):E=!0;return a};a={value:k,lineWidth:h,old:c,force:B,acrossPanes:a.acrossPanes,translatedValue:t};e(this,"getPlotLinePath",a,function(a){t=v(t,b.translate(k,null,null,c));t=Math.min(Math.max(-1E5,
t),1E5);r=I=Math.round(t+x);q=m=Math.round(g-t-x);F(t)?b.horiz?(q=w,m=g-b.bottom,r=I=u(r,f,f+b.width)):(r=f,I=p-b.right,q=m=u(q,w,w+b.height)):(E=!0,B=!1);a.path=E&&!B?null:d.renderer.crispLine(["M",r,q,"L",I,m],h||1)});return a.path},getLinearTickPositions:function(a,b,d){var l=g(Math.floor(b/a)*a);d=g(Math.ceil(d/a)*a);var e=[],f;g(l+a)===l&&(f=20);if(this.single)return[b];for(b=l;b<=d;){e.push(b);b=g(b+a,f);if(b===w)break;var w=b}return e},getMinorTickInterval:function(){var a=this.options;return!0===
a.minorTicks?v(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,d=a.tickPositions,e=a.minorTickInterval,f=[],c=a.pointRangePadding||0,k=a.min-c;c=a.max+c;var t=c-k;if(t&&t/e<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(b,d,l){d&&f.push.apply(f,a.getLogTickPositions(e,l[d-1],l[d],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())f=f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e),k,c,b.startOfWeek));
else for(b=k+(d[0]-k)%e;b<=c&&b!==f[0];b+=e)f.push(b);0!==f.length&&a.trimTicks(f);return f},adjustForMinRange:function(){var a=this.options,b=this.min,d=this.max,e,f,c,k,t;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(A(a.min)||A(a.max)?this.minRange=null:(this.series.forEach(function(a){k=a.xData;for(f=t=a.xIncrement?1:k.length-1;0<f;f--)if(c=k[f]-k[f-1],void 0===e||c<e)e=c}),this.minRange=Math.min(5*e,this.dataMax-this.dataMin)));if(d-b<this.minRange){var h=this.dataMax-this.dataMin>=this.minRange;
var B=this.minRange;var r=(B-d+b)/2;r=[b-r,v(a.min,b-r)];h&&(r[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin);b=x(r);d=[b+B,v(a.max,b+B)];h&&(d[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax);d=m(d);d-b<B&&(r[0]=d-B,r[1]=v(a.min,d-B),b=x(r))}this.min=b;this.max=d},getClosest:function(){var a;this.categories?a=1:this.series.forEach(function(b){var d=b.closestPointRange,l=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&A(d)&&l&&(a=A(a)?Math.min(a,d):d)});return a},
nameToX:function(a){var b=D(this.categories),d=b?this.categories:this.names,e=a.options.x;a.series.requireSorting=!1;A(e)||(e=!1===this.options.uniqueNames?a.series.autoIncrement():b?d.indexOf(a.name):v(d.keys[a.name],-1));if(-1===e){if(!b)var f=d.length}else f=e;void 0!==f&&(this.names[f]=a.name,this.names.keys[a.name]=f);return f},updateNames:function(){var a=this,b=this.names;0<b.length&&(Object.keys(b.keys).forEach(function(a){delete b.keys[a]}),b.length=0,this.minRange=this.userMinRange,(this.series||
[]).forEach(function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)a.max=Math.max(a.max,b.xData.length-1),b.processData(),b.generatePoints();b.data.forEach(function(d,l){if(d&&d.options&&void 0!==d.name){var e=a.nameToX(d);void 0!==e&&e!==d.x&&(d.x=e,b.xData[l]=e)}})}))},setAxisTranslation:function(a){var b=this,d=b.max-b.min,f=b.axisPointRange||0,c=0,w=0,k=b.linkedParent,h=!!b.categories,B=b.transA,r=b.isXAxis;if(r||h||f){var q=b.getClosest();k?(c=k.minPointOffset,w=k.pointRangePadding):b.series.forEach(function(a){var d=
h?1:r?v(a.options.pointRange,q,0):b.axisPointRange||0,l=a.options.pointPlacement;f=Math.max(f,d);if(!b.single||h)a=t.xrange&&a instanceof t.xrange?!r:r,c=Math.max(c,a&&z(l)?0:d/2),w=Math.max(w,a&&"on"===l?0:d)});k=b.ordinalSlope&&q?b.ordinalSlope/q:1;b.minPointOffset=c*=k;b.pointRangePadding=w*=k;b.pointRange=Math.min(f,d);r&&(b.closestPointRange=q)}a&&(b.oldTransA=B);b.translationSlope=b.transA=B=b.staticScale||b.len/(d+w||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=B*c;e(this,"afterSetAxisTranslation")},
minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var b=this,d=b.chart,f=b.options,w=b.isLog,k=b.isDatetimeAxis,t=b.isXAxis,h=b.isLinked,B=f.maxPadding,I=f.minPadding,m=f.tickInterval,p=f.tickPixelInterval,E=b.categories,x=F(b.threshold)?b.threshold:null,u=b.softThreshold;k||E||h||this.getTickAmount();var z=v(b.userMin,f.min);var y=v(b.userMax,f.max);if(h){b.linkedParent=d[b.coll][f.linkedTo];var n=b.linkedParent.getExtremes();b.min=v(n.min,n.dataMin);b.max=v(n.max,n.dataMax);
f.type!==b.linkedParent.options.type&&c.error(11,1,d)}else{if(!u&&A(x))if(b.dataMin>=x)n=x,I=0;else if(b.dataMax<=x){var L=x;B=0}b.min=v(z,n,b.dataMin);b.max=v(y,L,b.dataMax)}w&&(b.positiveValuesOnly&&!a&&0>=Math.min(b.min,v(b.dataMin,b.min))&&c.error(10,1,d),b.min=g(b.log2lin(b.min),15),b.max=g(b.log2lin(b.max),15));b.range&&A(b.max)&&(b.userMin=b.min=z=Math.max(b.dataMin,b.minFromRange()),b.userMax=y=b.max,b.range=null);e(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();
!(E||b.axisPointRange||b.usePercentage||h)&&A(b.min)&&A(b.max)&&(d=b.max-b.min)&&(!A(z)&&I&&(b.min-=d*I),!A(y)&&B&&(b.max+=d*B));F(f.softMin)&&!F(b.userMin)&&f.softMin<b.min&&(b.min=z=f.softMin);F(f.softMax)&&!F(b.userMax)&&f.softMax>b.max&&(b.max=y=f.softMax);F(f.floor)&&(b.min=Math.min(Math.max(b.min,f.floor),Number.MAX_VALUE));F(f.ceiling)&&(b.max=Math.max(Math.min(b.max,f.ceiling),v(b.userMax,-Number.MAX_VALUE)));u&&A(b.dataMin)&&(x=x||0,!A(z)&&b.min<x&&b.dataMin>=x?b.min=b.options.minRange?Math.min(x,
b.max-b.minRange):x:!A(y)&&b.max>x&&b.dataMax<=x&&(b.max=b.options.minRange?Math.max(x,b.min+b.minRange):x));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:h&&!m&&p===b.linkedParent.options.tickPixelInterval?m=b.linkedParent.tickInterval:v(m,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,E?1:(b.max-b.min)*p/Math.max(b.len,p));t&&!a&&b.series.forEach(function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&
b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!m&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));a=v(f.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!m&&b.tickInterval<a&&(b.tickInterval=a);k||w||m||(b.tickInterval=q(b.tickInterval,null,r(b.tickInterval),v(f.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());
this.setTickPositions()},setTickPositions:function(){var a=this.options,b=a.tickPositions;var d=this.getMinorTickInterval();var f=a.tickPositioner,k=a.startOnTick,t=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===d&&this.tickInterval?this.tickInterval/5:d;this.single=this.min===this.max&&A(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=d=b&&b.slice();
!d&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(d=[this.min,this.max],c.error(19,!1,this.chart)):d=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),d.length>this.len&&(d=[d[0],d.pop()],d[0]===
d[1]&&(d.length=1)),this.tickPositions=d,f&&(f=f.apply(this,[this.min,this.max])))&&(this.tickPositions=d=f);this.paddedTicks=d.slice(0);this.trimTicks(d,k,t);this.isLinked||(this.single&&2>d.length&&!this.categories&&(this.min-=.5,this.max+=.5),b||f||this.adjustTickAmount());e(this,"afterSetTickPositions")},trimTicks:function(a,b,d){var f=a[0],c=a[a.length-1],l=this.minPointOffset||0;e(this,"trimTicks");if(!this.isLinked){if(b&&-Infinity!==f)this.min=f;else for(;this.min-l>a[0];)a.shift();if(d)this.max=
c;else for(;this.max+l<a[a.length-1];)a.pop();0===a.length&&A(f)&&!this.options.tickPositions&&a.push((c+f)/2)}},alignToOthers:function(){var a={},b,d=this.options;!1===this.chart.options.chart.alignTicks||!1===d.alignTicks||!1===d.startOnTick||!1===d.endOnTick||this.isLog||this.chart[this.coll].forEach(function(d){var f=d.options;f=[d.horiz?f.left:f.top,f.width,f.height,f.pane].join();d.series.length&&(a[f]?b=!0:a[f]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,d=a.tickPixelInterval;
!A(a.tickInterval)&&this.len<d&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/d)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.options,b=this.tickInterval,d=this.tickPositions,f=this.tickAmount,e=this.finalTickAmt,c=d&&d.length,k=v(this.threshold,this.softThreshold?0:null),t;if(this.hasData()){if(c<f){for(t=this.min;d.length<f;)d.length%2||t===k?d.push(g(d[d.length-1]+b)):d.unshift(g(d[0]-
b));this.transA*=(c-1)/(f-1);this.min=a.startOnTick?d[0]:Math.min(this.min,d[0]);this.max=a.endOnTick?d[d.length-1]:Math.max(this.max,d[d.length-1])}else c>f&&(this.tickInterval*=2,this.setTickPositions());if(A(e)){for(b=a=d.length;b--;)(3===e&&1===b%2||2>=e&&0<b&&b<a-1)&&d.splice(b,1);this.finalTickAmt=void 0}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||a.isDirty||a.xAxis&&a.xAxis.isDirty}),b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;
this.setAxisSize();(b=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();e(this,"afterSetScale")},setExtremes:function(a,
b,d,c,k){var l=this,w=l.chart;d=v(d,!0);l.series.forEach(function(a){delete a.kdTree});k=f(k,{min:a,max:b});e(l,"setExtremes",k,function(){l.userMin=a;l.userMax=b;l.eventArgs=k;d&&w.redraw(c)})},zoom:function(a,b){var d=this.dataMin,f=this.dataMax,c=this.options,k=Math.min(d,v(c.min,d)),l=Math.max(f,v(c.max,f));a={newMin:a,newMax:b};e(this,"zoom",a,function(a){var b=a.newMin,e=a.newMax;if(b!==this.min||e!==this.max)this.allowZoomOutside||(A(d)&&(b<k&&(b=k),b>l&&(b=l)),A(f)&&(e<k&&(e=k),e>l&&(e=l))),
this.displayBtn=void 0!==b||void 0!==e,this.setExtremes(b,e,!1,void 0,{trigger:"zoom"});a.zoomed=!0});return a.zoomed},setAxisSize:function(){var a=this.chart,b=this.options,d=b.offsets||[0,0,0,0],f=this.horiz,e=this.width=Math.round(c.relativeLength(v(b.width,a.plotWidth-d[3]+d[1]),a.plotWidth)),k=this.height=Math.round(c.relativeLength(v(b.height,a.plotHeight-d[0]+d[2]),a.plotHeight)),t=this.top=Math.round(c.relativeLength(v(b.top,a.plotTop+d[0]),a.plotHeight,a.plotTop));b=this.left=Math.round(c.relativeLength(v(b.left,
a.plotLeft+d[3]),a.plotWidth,a.plotLeft));this.bottom=a.chartHeight-k-t;this.right=a.chartWidth-e-b;this.len=Math.max(f?e:k,0);this.pos=f?b:t},getExtremes:function(){var a=this.isLog;return{min:a?g(this.lin2log(this.min)):this.min,max:a?g(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,d=b?this.lin2log(this.min):this.min;b=b?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=d:Infinity===
a?a=b:d>a?a=d:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var b=(v(a,0)-90*this.side+720)%360;a={align:"center"};e(this,"autoLabelAlign",a,function(a){15<b&&165>b?a.align="right":195<b&&345>b&&(a.align="left")});return a.align},tickSize:function(a){var b=this.options,d=b[a+"Length"],f=v(b[a+"Width"],"tick"===a&&this.isXAxis&&!this.categories?1:0);if(f&&d){"inside"===b[a+"Position"]&&(d=-d);var c=[d,f]}a={tickSize:c};e(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=
this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var b=this.options.labels,d=this.horiz,f=this.tickInterval,e=f,c=this.len/(((this.categories?1:0)+this.max-this.min)/f),k,t=b.rotation,h=this.labelMetrics(),B,r=Number.MAX_VALUE,q,I=this.max-this.min,m=function(a){var b=a/(c||1);b=1<b?Math.ceil(b):1;b*f>I&&Infinity!==a&&Infinity!==c&&I&&(b=Math.ceil(I/
f));return g(b*f)};d?(q=!b.staggerLines&&!b.step&&(A(t)?[t]:c<v(b.autoRotationLimit,80)&&b.autoRotation))&&q.forEach(function(b){if(b===t||b&&-90<=b&&90>=b){B=m(Math.abs(h.h/Math.sin(a*b)));var d=B+Math.abs(b/360);d<r&&(r=d,k=b,e=B)}}):b.step||(e=m(h.h));this.autoRotation=q;this.labelRotation=v(k,t);return e},getSlotWidth:function(a){var b=this.chart,d=this.horiz,f=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),c=b.margin[3];return a&&a.slotWidth||d&&2>(f.step||
0)&&!f.rotation&&(this.staggerLines||1)*this.len/e||!d&&(f.style&&parseInt(f.style.width,10)||c&&c-b.spacing[3]||.33*b.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,d=this.tickPositions,f=this.ticks,e=this.options.labels,c=e&&e.style||{},k=this.horiz,t=this.getSlotWidth(),h=Math.max(1,Math.round(t-2*(e.padding||5))),B={},r=this.labelMetrics(),q=e.style&&e.style.textOverflow,v=0;z(e.rotation)||(B.rotation=e.rotation||0);d.forEach(function(a){(a=f[a])&&a.label&&a.label.textPxLength>
v&&(v=a.label.textPxLength)});this.maxLabelLength=v;if(this.autoRotation)v>h&&v>r.h?B.rotation=this.labelRotation:this.labelRotation=0;else if(t){var I=h;if(!q){var m="clip";for(h=d.length;!k&&h--;){var g=d[h];if(g=f[g].label)g.styles&&"ellipsis"===g.styles.textOverflow?g.css({textOverflow:"clip"}):g.textPxLength>t&&g.css({width:t+"px"}),g.getBBox().height>this.len/d.length-(r.h-r.f)&&(g.specificTextOverflow="ellipsis")}}}B.rotation&&(I=v>.5*a.chartHeight?.33*a.chartHeight:v,q||(m="ellipsis"));if(this.labelAlign=
e.align||this.autoLabelAlign(this.labelRotation))B.align=this.labelAlign;d.forEach(function(a){var b=(a=f[a])&&a.label,d=c.width,e={};b&&(b.attr(B),a.shortenLabel?a.shortenLabel():I&&!d&&"nowrap"!==c.whiteSpace&&(I<b.textPxLength||"SPAN"===b.element.tagName)?(e.width=I,q||(e.textOverflow=b.specificTextOverflow||m),b.css(e)):b.styles&&b.styles.width&&!e.width&&!d&&b.css({width:null}),delete b.specificTextOverflow,a.rotation=B.rotation)},this);this.tickRotCorr=b.rotCorr(r.b,this.labelRotation||0,0!==
this.side)},hasData:function(){return this.series.some(function(a){return a.hasData()})||this.options.showEmpty&&A(this.min)&&A(this.max)},addTitle:function(a){var b=this.chart.renderer,d=this.horiz,f=this.opposite,e=this.options.title,c,k=this.chart.styledMode;this.axisTitle||((c=e.textAlign)||(c=(d?{low:"left",middle:"center",high:"right"}:{low:f?"right":"left",middle:"center",high:f?"left":"right"})[e.align]),this.axisTitle=b.text(e.text,0,0,e.useHTML).attr({zIndex:7,rotation:e.rotation||0,align:c}).addClass("highcharts-axis-title"),
k||this.axisTitle.css(E(e.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);k||e.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](a)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new I(this,a)},getOffset:function(){var a=this,b=a.chart,d=b.renderer,f=a.options,c=a.tickPositions,k=a.ticks,t=a.horiz,h=a.side,B=b.inverted&&!a.isZAxis?[1,0,3,2][h]:h,r,q=0,I=0,m=f.title,g=f.labels,p=0,E=b.axisOffset;b=b.clipOffset;
var x=[-1,1,1,-1][h],z=f.className,y=a.axisParent;var n=a.hasData();a.showAxis=r=n||v(f.showEmpty,!0);a.staggerLines=a.horiz&&g.staggerLines;a.axisGroup||(a.gridGroup=d.g("grid").attr({zIndex:f.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(z||"")).add(y),a.axisGroup=d.g("axis").attr({zIndex:f.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(z||"")).add(y),a.labelGroup=d.g("axis-labels").attr({zIndex:g.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+
"-labels "+(z||"")).add(y));n||a.isLinked?(c.forEach(function(b,d){a.generateTick(b,d)}),a.renderUnsquish(),a.reserveSpaceDefault=0===h||2===h||{1:"left",3:"right"}[h]===a.labelAlign,v(g.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&c.forEach(function(a){p=Math.max(k[a].getLabelSize(),p)}),a.staggerLines&&(p*=a.staggerLines),a.labelOffset=p*(a.opposite?-1:1)):u(k,function(a,b){a.destroy();delete k[b]});if(m&&m.text&&!1!==m.enabled&&(a.addTitle(r),r&&!1!==m.reserveSpace)){a.titleOffset=
q=a.axisTitle.getBBox()[t?"height":"width"];var L=m.offset;I=A(L)?0:v(m.margin,t?5:10)}a.renderLine();a.offset=x*v(f.offset,E[h]?E[h]+(f.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};d=0===h?-a.labelMetrics().h:2===h?a.tickRotCorr.y:0;I=Math.abs(p)+I;p&&(I=I-d+x*(t?v(g.y,a.tickRotCorr.y+8*x):g.x));a.axisTitleMargin=v(L,I);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(k,c));t=this.tickSize("tick");E[h]=Math.max(E[h],a.axisTitleMargin+q+x*a.offset,I,c&&c.length&&t?t[0]+
x*a.offset:0);f=f.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[B]=Math.max(b[B],f);e(this,"afterGetOffset")},getLinePath:function(a){var b=this.chart,d=this.opposite,f=this.offset,e=this.horiz,c=this.left+(d?this.width:0)+f;f=b.chartHeight-this.bottom-(d?this.height:0)+f;d&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:c,e?f:this.top,"L",e?b.chartWidth-this.right:c,e?f:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,d=this.top,f=this.len,c=this.options.title,k=a?b:d,t=this.opposite,h=this.offset,B=c.x||0,r=c.y||0,q=this.axisTitle,v=this.chart.renderer.fontMetrics(c.style&&c.style.fontSize,q);q=Math.max(q.getBBox(null,0).height-v.h-1,0);f={low:k+(a?0:f),middle:k+f/2,high:k+(a?f:0)}[c.align];b=(a?d+this.height:b)+(a?1:-1)*(t?-1:1)*this.axisTitleMargin+
[-q,q,v.f,-q][this.side];a={x:a?f+B:b+(t?this.width:0)+h+B,y:a?b+r-(t?this.height:0)+h:f+r};e(this,"afterGetTitlePosition",{titlePosition:a});return a},renderMinorTick:function(a){var b=this.chart.hasRendered&&F(this.oldMin),d=this.minorTicks;d[a]||(d[a]=new I(this,a,"minor"));b&&d[a].isNew&&d[a].render(null,!0);d[a].render(null,!1,1)},renderTick:function(a,b){var d=this.isLinked,f=this.ticks,e=this.chart.hasRendered&&F(this.oldMin);if(!d||a>=this.min&&a<=this.max)f[a]||(f[a]=new I(this,a)),e&&f[a].isNew&&
f[a].render(b,!0,-1),f[a].render(b)},render:function(){var a=this,b=a.chart,d=a.options,f=a.isLog,k=a.isLinked,t=a.tickPositions,h=a.axisTitle,r=a.ticks,q=a.minorTicks,v=a.alternateBands,m=d.stackLabels,g=d.alternateGridColor,p=a.tickmarkOffset,E=a.axisLine,x=a.showAxis,z=C(b.renderer.globalAnimation),y,n;a.labelEdge.length=0;a.overlap=!1;[r,q,v].forEach(function(a){u(a,function(a){a.isActive=!1})});if(a.hasData()||k)a.minorTickInterval&&!a.categories&&a.getMinorTickPositions().forEach(function(b){a.renderMinorTick(b)}),
t.length&&(t.forEach(function(b,d){a.renderTick(b,d)}),p&&(0===a.min||a.single)&&(r[-1]||(r[-1]=new I(a,-1,null,!0)),r[-1].render(-1))),g&&t.forEach(function(d,e){n=void 0!==t[e+1]?t[e+1]+p:a.max-p;0===e%2&&d<a.max&&n<=a.max+(b.polar?-p:p)&&(v[d]||(v[d]=new c.PlotLineOrBand(a)),y=d+p,v[d].options={from:f?a.lin2log(y):y,to:f?a.lin2log(n):n,color:g},v[d].render(),v[d].isActive=!0)}),a._addedPlotLB||((d.plotLines||[]).concat(d.plotBands||[]).forEach(function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=
!0);[r,q,v].forEach(function(a){var d,f=[],e=z.duration;u(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,f.push(b))});B(function(){for(d=f.length;d--;)a[f[d]]&&!a[f[d]].isActive&&(a[f[d]].destroy(),delete a[f[d]])},a!==v&&b.hasRendered&&e?e:0)});E&&(E[E.isPlaced?"animate":"attr"]({d:this.getLinePath(E.strokeWidth())}),E.isPlaced=!0,E[x?"show":"hide"](x));h&&x&&(d=a.getTitlePosition(),F(d.y)?(h[h.isNew?"attr":"animate"](d),h.isNew=!1):(h.attr("y",-9999),h.isNew=!0));m&&m.enabled&&a.renderStackTotals();
a.isDirty=!1;e(this,"afterRender")},redraw:function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(a){a.render()}));this.series.forEach(function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,f=b.stacks,c=b.plotLinesAndBands,t;e(this,"destroy",{keepEvents:a});a||k(b);u(f,function(a,b){d(a);f[b]=null});[b.ticks,b.minorTicks,b.alternateBands].forEach(function(a){d(a)});if(c)for(a=c.length;a--;)c[a].destroy();
"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){b[a]&&(b[a]=b[a].destroy())});for(t in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[t]=b.plotLinesAndBandsGroups[t].destroy();u(b,function(a,d){-1===b.keepProps.indexOf(d)&&delete b[d]})},drawCrosshair:function(a,b){var d,f=this.crosshair,c=v(f.snap,!0),k,l=this.cross;e(this,"drawCrosshair",{e:a,point:b});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(A(b)||!c)){c?A(b)&&
(k=v("colorAxis"!==this.coll?b.crosshairPos:null,this.isXAxis?b.plotX:this.len-b.plotY)):k=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);A(k)&&(d=this.getPlotLinePath({value:b&&(this.isXAxis?b.x:v(b.stackY,b.y)),translatedValue:k})||null);if(!A(d)){this.hideCrosshair();return}c=this.categories&&!this.isRadial;l||(this.cross=l=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(c?"category ":"thin ")+f.className).attr({zIndex:v(f.zIndex,2)}).add(),this.chart.styledMode||
(l.attr({stroke:f.color||(c?p("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":v(f.width,1)}).css({"pointer-events":"none"}),f.dashStyle&&l.attr({dashstyle:f.dashStyle})));l.show().attr({d:d});c&&!f.width&&l.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();e(this,"afterDrawCrosshair",{e:a,point:b})},hideCrosshair:function(){this.cross&&this.cross.hide();e(this,"afterHideCrosshair")}});return c.Axis=n});N(H,"parts/DateTimeAxis.js",[H["parts/Globals.js"]],function(c){var n=
c.Axis,A=c.getMagnitude,D=c.normalizeTickInterval,F=c.timeUnits;n.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};n.prototype.normalizeTimeTickInterval=function(c,u){var z=u||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];u=z[z.length-1];var y=F[u[0]],n=u[1],x;for(x=0;x<z.length&&!(u=z[x],y=F[u[0]],
n=u[1],z[x+1]&&c<=(y*n[n.length-1]+F[z[x+1][0]])/2);x++);y===F.year&&c<5*y&&(n=[1,2,5]);c=D(c/y,n,"year"===u[0]?Math.max(A(c/y),1):1);return{unitRange:y,count:c,unitName:u[0]}}});N(H,"parts/LogarithmicAxis.js",[H["parts/Globals.js"]],function(c){var n=c.Axis,A=c.getMagnitude,D=c.normalizeTickInterval,F=c.pick;n.prototype.getLogTickPositions=function(c,u,n,y){var z=this.options,x=this.len,m=[];y||(this._minorAutoInterval=null);if(.5<=c)c=Math.round(c),m=this.getLinearTickPositions(c,u,n);else if(.08<=
c){x=Math.floor(u);var p,g;for(z=.3<c?[1,2,4]:.15<c?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];x<n+1&&!g;x++){var b=z.length;for(p=0;p<b&&!g;p++){var a=this.log2lin(this.lin2log(x)*z[p]);a>u&&(!y||d<=n)&&void 0!==d&&m.push(d);d>n&&(g=!0);var d=a}}}else u=this.lin2log(u),n=this.lin2log(n),c=y?this.getMinorTickInterval():z.tickInterval,c=F("auto"===c?null:c,this._minorAutoInterval,z.tickPixelInterval/(y?5:1)*(n-u)/((y?x/this.tickPositions.length:x)||1)),c=D(c,null,A(c)),m=this.getLinearTickPositions(c,u,n).map(this.log2lin),
y||(this._minorAutoInterval=c/5);y||(this.tickInterval=c);return m};n.prototype.log2lin=function(c){return Math.log(c)/Math.LN10};n.prototype.lin2log=function(c){return Math.pow(10,c)}});N(H,"parts/PlotLineOrBand.js",[H["parts/Globals.js"],H["parts/Axis.js"],H["parts/Utilities.js"]],function(c,n,A){var D=A.defined,F=A.erase,z=A.objectEach,u=c.arrayMax,L=c.arrayMin,y=c.destroyObjectProperties,C=c.merge,x=c.pick;c.PlotLineOrBand=function(c,p){this.axis=c;p&&(this.options=p,this.id=p.id)};c.PlotLineOrBand.prototype=
{render:function(){c.fireEvent(this,"render");var m=this,p=m.axis,g=p.horiz,b=m.options,a=b.label,d=m.label,f=b.to,e=b.from,h=b.value,r=D(e)&&D(f),E=D(h),q=m.svgElem,v=!q,k=[],t=b.color,B=x(b.zIndex,0),I=b.events;k={"class":"highcharts-plot-"+(r?"band ":"line ")+(b.className||"")};var w={},l=p.chart.renderer,J=r?"bands":"lines";p.isLog&&(e=p.log2lin(e),f=p.log2lin(f),h=p.log2lin(h));p.chart.styledMode||(E?(k.stroke=t||"#999999",k["stroke-width"]=x(b.width,1),b.dashStyle&&(k.dashstyle=b.dashStyle)):
r&&(k.fill=t||"#e6ebf5",b.borderWidth&&(k.stroke=b.borderColor,k["stroke-width"]=b.borderWidth)));w.zIndex=B;J+="-"+B;(t=p.plotLinesAndBandsGroups[J])||(p.plotLinesAndBandsGroups[J]=t=l.g("plot-"+J).attr(w).add());v&&(m.svgElem=q=l.path().attr(k).add(t));if(E)k=p.getPlotLinePath({value:h,lineWidth:q.strokeWidth(),acrossPanes:b.acrossPanes});else if(r)k=p.getPlotBandPath(e,f,b);else return;(v||!q.d)&&k&&k.length?(q.attr({d:k}),I&&z(I,function(a,b){q.on(b,function(a){I[b].apply(m,[a])})})):q&&(k?(q.show(!0),
q.animate({d:k})):q.d&&(q.hide(),d&&(m.label=d=d.destroy())));a&&(D(a.text)||D(a.formatter))&&k&&k.length&&0<p.width&&0<p.height&&!k.isFlat?(a=C({align:g&&r&&"center",x:g?!r&&4:10,verticalAlign:!g&&r&&"middle",y:g?r?16:10:r?6:-4,rotation:g&&!r&&90},a),this.renderLabel(a,k,r,B)):d&&d.hide();return m},renderLabel:function(c,p,g,b){var a=this.label,d=this.axis.chart.renderer;a||(a={align:c.textAlign||c.align,rotation:c.rotation,"class":"highcharts-plot-"+(g?"band":"line")+"-label "+(c.className||"")},
a.zIndex=b,b=this.getLabelText(c),this.label=a=d.text(b,0,0,c.useHTML).attr(a).add(),this.axis.chart.styledMode||a.css(c.style));d=p.xBounds||[p[1],p[4],g?p[6]:p[1]];p=p.yBounds||[p[2],p[5],g?p[7]:p[2]];g=L(d);b=L(p);a.align(c,!1,{x:g,y:b,width:u(d)-g,height:u(p)-b});a.show(!0)},getLabelText:function(c){return D(c.formatter)?c.formatter.call(this):c.text},destroy:function(){F(this.axis.plotLinesAndBands,this);delete this.axis;y(this)}};c.extend(n.prototype,{getPlotBandPath:function(c,p){var g=this.getPlotLinePath({value:p,
force:!0,acrossPanes:this.options.acrossPanes}),b=this.getPlotLinePath({value:c,force:!0,acrossPanes:this.options.acrossPanes}),a=[],d=this.horiz,f=1;c=c<this.min&&p<this.min||c>this.max&&p>this.max;if(b&&g){if(c){var e=b.toString()===g.toString();f=0}for(c=0;c<b.length;c+=6)d&&g[c+1]===b[c+1]?(g[c+1]+=f,g[c+4]+=f):d||g[c+2]!==b[c+2]||(g[c+2]+=f,g[c+5]+=f),a.push("M",b[c+1],b[c+2],"L",b[c+4],b[c+5],g[c+4],g[c+5],g[c+1],g[c+2],"z"),a.isFlat=e}return a},addPlotBand:function(c){return this.addPlotBandOrLine(c,
"plotBands")},addPlotLine:function(c){return this.addPlotBandOrLine(c,"plotLines")},addPlotBandOrLine:function(m,p){var g=(new c.PlotLineOrBand(this,m)).render(),b=this.userOptions;if(g){if(p){var a=b[p]||[];a.push(m);b[p]=a}this.plotLinesAndBands.push(g)}return g},removePlotBandOrLine:function(c){for(var m=this.plotLinesAndBands,g=this.options,b=this.userOptions,a=m.length;a--;)m[a].id===c&&m[a].destroy();[g.plotLines||[],b.plotLines||[],g.plotBands||[],b.plotBands||[]].forEach(function(b){for(a=
b.length;a--;)b[a].id===c&&F(b,b[a])})},removePlotBand:function(c){this.removePlotBandOrLine(c)},removePlotLine:function(c){this.removePlotBandOrLine(c)}})});N(H,"parts/Tooltip.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isNumber,F=n.isString,z=n.splat;"";var u=c.doc,L=c.extend,y=c.format,C=c.merge,x=c.pick,m=c.syncTimeout,p=c.timeUnits;c.Tooltip=function(){this.init.apply(this,arguments)};c.Tooltip.prototype={init:function(c,b){this.chart=c;this.options=
b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=b.split&&!c.inverted;this.shared=b.shared||this.split;this.outside=x(b.outside,!(!c.scrollablePixelsX&&!c.scrollablePixelsY))&&!this.split},cleanSplit:function(c){this.chart.series.forEach(function(b){var a=b&&b.tt;a&&(!a.isActive||c?b.tt=a.destroy():a.isActive=!1)})},applyFilter:function(){var c=this.chart;c.renderer.definition({tagName:"filter",id:"drop-shadow-"+c.index,opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",
stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode","in":"SourceGraphic"}]}]});c.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+c.index+"{filter:url(#drop-shadow-"+c.index+")}"})},getLabel:function(){var g=this,b=this.chart.renderer,a=this.chart.styledMode,d=this.options,f="tooltip"+(A(d.className)?" "+d.className:""),
e;if(!this.label){this.outside&&(this.container=e=c.doc.createElement("div"),e.className="highcharts-tooltip-container",c.css(e,{position:"absolute",top:"1px",pointerEvents:d.style&&d.style.pointerEvents,zIndex:3}),c.doc.body.appendChild(e),this.renderer=b=new c.Renderer(e,0,0,{},void 0,void 0,b.styledMode));this.split?this.label=b.g(f):(this.label=b.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,f).attr({padding:d.padding,r:d.borderRadius}),a||this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow));
a&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index));if(this.outside){var h={x:this.label.xSetter,y:this.label.ySetter};this.label.xSetter=function(a,b){h[b].call(this.label,g.distance);e.style.left=a+"px"};this.label.ySetter=function(a,b){h[b].call(this.label,g.distance);e.style.top=a+"px"}}this.label.attr({zIndex:8}).add()}return this.label},update:function(c){this.destroy();C(!0,this.chart.options.tooltip.userOptions,c);this.init(this.chart,C(!0,this.options,c))},
destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),c.discardElement(this.container));c.clearTimeout(this.hideTimer);c.clearTimeout(this.tooltipTimeout)},move:function(g,b,a,d){var f=this,e=f.now,h=!1!==f.options.animation&&!f.isHidden&&(1<Math.abs(g-e.x)||1<Math.abs(b-e.y)),r=f.followPointer||1<f.len;L(e,{x:h?(2*e.x+g)/3:g,y:h?(e.y+b)/2:b,anchorX:r?void 0:
h?(2*e.anchorX+a)/3:a,anchorY:r?void 0:h?(e.anchorY+d)/2:d});f.getLabel().attr(e);h&&(c.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){f&&f.move(g,b,a,d)},32))},hide:function(g){var b=this;c.clearTimeout(this.hideTimer);g=x(g,this.options.hideDelay,500);this.isHidden||(this.hideTimer=m(function(){b.getLabel()[g?"fadeOut":"hide"]();b.isHidden=!0},g))},getAnchor:function(c,b){var a=this.chart,d=a.pointer,f=a.inverted,e=a.plotTop,h=a.plotLeft,r=0,g=0,q,v;c=z(c);this.followPointer&&
b?(void 0===b.chartX&&(b=d.normalize(b)),c=[b.chartX-a.plotLeft,b.chartY-e]):c[0].tooltipPos?c=c[0].tooltipPos:(c.forEach(function(a){q=a.series.yAxis;v=a.series.xAxis;r+=a.plotX+(!f&&v?v.left-h:0);g+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!f&&q?q.top-e:0)}),r/=c.length,g/=c.length,c=[f?a.plotWidth-g:r,this.shared&&!f&&1<c.length&&b?b.chartY-e:f?a.plotHeight-r:g]);return c.map(Math.round)},getPosition:function(c,b,a){var d=this.chart,f=this.distance,e={},h=d.inverted&&a.h||0,r,g=this.outside,
q=g?u.documentElement.clientWidth-2*f:d.chartWidth,v=g?Math.max(u.body.scrollHeight,u.documentElement.scrollHeight,u.body.offsetHeight,u.documentElement.offsetHeight,u.documentElement.clientHeight):d.chartHeight,k=d.pointer.chartPosition,t=d.containerScaling,B=function(a){return t?a*t.scaleX:a},I=function(a){return t?a*t.scaleY:a},w=function(e){var l="x"===e;return[e,l?q:v,l?c:b].concat(g?[l?B(c):I(b),l?k.left-f+B(a.plotX+d.plotLeft):k.top-f+I(a.plotY+d.plotTop),0,l?q:v]:[l?c:b,l?a.plotX+d.plotLeft:
a.plotY+d.plotTop,l?d.plotLeft:d.plotTop,l?d.plotLeft+d.plotWidth:d.plotTop+d.plotHeight])},l=w("y"),m=w("x"),p=!this.followPointer&&x(a.ttBelow,!d.inverted===!!a.negative),n=function(a,b,d,c,k,l,t){var w="y"===a?I(f):B(f),r=(d-c)/2,q=c<k-f,v=k+f+c<b,g=k-w-d+r;k=k+w-r;if(p&&v)e[a]=k;else if(!p&&q)e[a]=g;else if(q)e[a]=Math.min(t-c,0>g-h?g:g-h);else if(v)e[a]=Math.max(l,k+h+d>b?k:k+h);else return!1},y=function(a,b,d,c,k){var l;k<f||k>b-f?l=!1:e[a]=k<d/2?1:k>b-c/2?b-c-2:k-d/2;return l},z=function(a){var b=
l;l=m;m=b;r=a},M=function(){!1!==n.apply(0,l)?!1!==y.apply(0,m)||r||(z(!0),M()):r?e.x=e.y=0:(z(!0),M())};(d.inverted||1<this.len)&&z();M();return e},defaultFormatter:function(c){var b=this.points||z(this);var a=[c.tooltipFooterHeaderFormatter(b[0])];a=a.concat(c.bodyFormatter(b));a.push(c.tooltipFooterHeaderFormatter(b[0],!0));return a},refresh:function(g,b){var a=this.chart,d=this.options,f=g,e={},h=[];var r=d.formatter||this.defaultFormatter;e=this.shared;var m=a.styledMode;if(d.enabled){c.clearTimeout(this.hideTimer);
this.followPointer=z(f)[0].series.tooltipOptions.followPointer;var q=this.getAnchor(f,b);b=q[0];var v=q[1];!e||f.series&&f.series.noSharedTooltip?e=f.getLabelConfig():(a.pointer.applyInactiveState(f),f.forEach(function(a){a.setState("hover");h.push(a.getLabelConfig())}),e={x:f[0].category,y:f[0].y},e.points=h,f=f[0]);this.len=h.length;r=r.call(e,this);e=f.series;this.distance=x(e.tooltipOptions.distance,16);!1===r?this.hide():(a=this.getLabel(),this.isHidden&&a.attr({opacity:1}).show(),this.split?
this.renderSplit(r,z(g)):(d.style.width&&!m||a.css({width:this.chart.spacingBox.width}),a.attr({text:r&&r.join?r.join(""):r}),a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+x(f.colorIndex,e.colorIndex)),m||a.attr({stroke:d.borderColor||f.color||e.color||"#666666"}),this.updatePosition({plotX:b,plotY:v,negative:f.negative,ttBelow:f.ttBelow,h:q[2]||0})),this.isHidden=!1);c.fireEvent(this,"refresh")}},renderSplit:function(g,b){var a=this,d=[],f=this.chart,e=f.renderer,h=!0,r=this.options,
m=0,q,v=this.getLabel(),k=f.plotTop;F(g)&&(g=[!1,g]);g.slice(0,b.length+1).forEach(function(c,B){if(!1!==c&&""!==c){B=b[B-1]||{isHeader:!0,plotX:b[0].plotX,plotY:f.plotHeight};var t=B.series||a,w=t.tt,l=B.series||{},g="highcharts-color-"+x(B.colorIndex,l.colorIndex,"none");w||(w={padding:r.padding,r:r.borderRadius},f.styledMode||(w.fill=r.backgroundColor,w["stroke-width"]=r.borderWidth),t.tt=w=e.label(null,null,null,(B.isHeader?r.headerShape:r.shape)||"callout",null,null,r.useHTML).addClass("highcharts-tooltip-box "+
g).attr(w).add(v));w.isActive=!0;w.attr({text:c});f.styledMode||w.css(r.style).shadow(r.shadow).attr({stroke:r.borderColor||B.color||l.color||"#333333"});c=w.getBBox();g=c.width+w.strokeWidth();B.isHeader?(m=c.height,f.xAxis[0].opposite&&(q=!0,k-=m),c=Math.max(0,Math.min(B.plotX+f.plotLeft-g/2,f.chartWidth+(f.scrollablePixelsX?f.scrollablePixelsX-f.marginRight:0)-g))):c=B.plotX+f.plotLeft-x(r.distance,16)-g;0>c&&(h=!1);B.isHeader?l=q?-m:f.plotHeight+m:(l=l.yAxis,l=l.pos-k+Math.max(0,Math.min(B.plotY||
0,l.len)));d.push({target:l,rank:B.isHeader?1:0,size:t.tt.getBBox().height+1,point:B,x:c,tt:w})}});this.cleanSplit();r.positioner&&d.forEach(function(b){var d=r.positioner.call(a,b.tt.getBBox().width,b.size,b.point);b.x=d.x;b.align=0;b.target=d.y;b.rank=x(d.rank,b.rank)});c.distribute(d,f.plotHeight+m);d.forEach(function(b){var d=b.point,c=d.series,e=c&&c.yAxis;b.tt.attr({visibility:void 0===b.pos?"hidden":"inherit",x:h||d.isHeader||r.positioner?b.x:d.plotX+f.plotLeft+a.distance,y:b.pos+k,anchorX:d.isHeader?
d.plotX+f.plotLeft:d.plotX+c.xAxis.pos,anchorY:d.isHeader?f.plotTop+f.plotHeight/2:e.pos+Math.max(0,Math.min(d.plotY,e.len))})})},updatePosition:function(g){var b=this.chart,a=b.pointer,d=this.getLabel(),f=g.plotX+b.plotLeft,e=g.plotY+b.plotTop;a.chartPosition||(a.chartPosition=c.offset(b.container));g=(this.options.positioner||this.getPosition).call(this,d.width,d.height,g);if(this.outside){var h=(this.options.borderWidth||0)+2*this.distance;this.renderer.setSize(d.width+h,d.height+h,!1);if(b=b.containerScaling)c.css(this.container,
{transform:"scale("+b.scaleX+", "+b.scaleY+")"}),f*=b.scaleX,e*=b.scaleY;f+=a.chartPosition.left-g.x;e+=a.chartPosition.top-g.y}this.move(Math.round(g.x),Math.round(g.y||0),f,e)},getDateFormat:function(c,b,a,d){var f=this.chart.time,e=f.dateFormat("%m-%d %H:%M:%S.%L",b),h={millisecond:15,second:12,minute:9,hour:6,day:3},r="millisecond";for(g in p){if(c===p.week&&+f.dateFormat("%w",b)===a&&"00:00:00.000"===e.substr(6)){var g="week";break}if(p[g]>c){g=r;break}if(h[g]&&e.substr(h[g])!=="01-01 00:00:00.000".substr(h[g]))break;
"week"!==g&&(r=g)}if(g)var q=f.resolveDTLFormat(d[g]).main;return q},getXDateFormat:function(c,b,a){b=b.dateTimeLabelFormats;var d=a&&a.closestPointRange;return(d?this.getDateFormat(d,c.x,a.options.startOfWeek,b):b.day)||b.year},tooltipFooterHeaderFormatter:function(g,b){var a=b?"footer":"header",d=g.series,f=d.tooltipOptions,e=f.xDateFormat,h=d.xAxis,r=h&&"datetime"===h.options.type&&D(g.key),m=f[a+"Format"];b={isFooter:b,labelConfig:g};c.fireEvent(this,"headerFormatter",b,function(a){r&&!e&&(e=
this.getXDateFormat(g,f,h));r&&e&&(g.point&&g.point.tooltipDateKeys||["key"]).forEach(function(a){m=m.replace("{point."+a+"}","{point."+a+":"+e+"}")});d.chart.styledMode&&(m=this.styledModeFormat(m));a.text=y(m,{point:g,series:d},this.chart.time)});return b.text},bodyFormatter:function(c){return c.map(function(b){var a=b.series.tooltipOptions;return(a[(b.point.formatPrefix||"point")+"Formatter"]||b.point.tooltipFormatter).call(b.point,a[(b.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(c){return c.replace('style="font-size: 10px"',
'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class="highcharts-color-{$1.colorIndex}"')}}});N(H,"parts/Pointer.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.attr,D=n.defined,F=n.isNumber,z=n.isObject,u=n.objectEach,L=n.splat,y=c.addEvent,C=c.charts,x=c.color,m=c.css,p=c.extend,g=c.find,b=c.fireEvent,a=c.offset,d=c.pick,f=c.Tooltip;c.Pointer=function(a,b){this.init(a,b)};c.Pointer.prototype={init:function(a,b){this.options=b;this.chart=
a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};f&&(a.tooltip=new f(a,b.tooltip),this.followTouchMove=d(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,f=c.zoomType||"";b=b.inverted;/touch/.test(a.type)&&(f=d(c.pinchType,f));this.zoomX=a=/x/.test(f);this.zoomY=f=/y/.test(f);this.zoomHor=a&&!b||f&&b;this.zoomVert=f&&!b||a&&b;this.hasZoom=a||f},normalize:function(b,d){var c=b.touches?b.touches.length?
b.touches.item(0):b.changedTouches[0]:b;d||(this.chartPosition=d=a(this.chart.container));var f=c.pageX-d.left;d=c.pageY-d.top;if(c=this.chart.containerScaling)f/=c.scaleX,d/=c.scaleY;return p(b,{chartX:Math.round(f),chartY:Math.round(d)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(d){b[d.isXAxis?"xAxis":"yAxis"].push({axis:d,value:d.toValue(a[d.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,d){var c;a.forEach(function(a){var f=
!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(d,f);if((f=z(a,!0))&&!(f=!z(c,!0))){f=c.distX-a.distX;var e=c.dist-a.dist,t=(a.series.group&&a.series.group.zIndex)-(c.series.group&&c.series.group.zIndex);f=0<(0!==f&&b?f:0!==e?e:0!==t?t:c.series.index>a.series.index?-1:1)}f&&(c=a)});return c},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var c=a.series,f=c.xAxis;c=c.yAxis;
var e=d(a.clientX,a.plotX),h=a.shapeArgs;if(f&&c)return b?{chartX:f.len+f.pos-e,chartY:c.len+c.pos-a.plotY}:{chartX:e+f.pos,chartY:a.plotY+c.pos};if(h&&h.x&&h.y)return{chartX:h.x,chartY:h.y}},getHoverData:function(a,b,c,f,q,v){var e,t=[];f=!(!f||!a);var h=b&&!b.stickyTracking?[b]:c.filter(function(a){return a.visible&&!(!q&&a.directTouch)&&d(a.options.enableMouseTracking,!0)&&a.stickyTracking});b=(e=f||!v?a:this.findNearestKDPoint(h,q,v))&&e.series;e&&(q&&!b.noSharedTooltip?(h=c.filter(function(a){return a.visible&&
!(!q&&a.directTouch)&&d(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),h.forEach(function(a){var b=g(a.points,function(a){return a.x===e.x&&!a.isNull});z(b)&&(a.chart.isBoosting&&(b=a.getPoint(b)),t.push(b))})):t.push(e));return{hoverPoint:e,hoverSeries:b,hoverPoints:t}},runPointActions:function(a,b){var f=this.chart,e=f.tooltip&&f.tooltip.options.enabled?f.tooltip:void 0,h=e?e.shared:!1,v=b||f.hoverPoint,k=v&&v.series||f.hoverSeries;k=this.getHoverData(v,k,f.series,(!a||"touchmove"!==a.type)&&
(!!b||k&&k.directTouch&&this.isDirectTouch),h,a);v=k.hoverPoint;var t=k.hoverPoints;b=(k=k.hoverSeries)&&k.tooltipOptions.followPointer;h=h&&k&&!k.noSharedTooltip;if(v&&(v!==f.hoverPoint||e&&e.isHidden)){(f.hoverPoints||[]).forEach(function(a){-1===t.indexOf(a)&&a.setState()});if(f.hoverSeries!==k)k.onMouseOver();this.applyInactiveState(t);(t||[]).forEach(function(a){a.setState("hover")});f.hoverPoint&&f.hoverPoint.firePointEvent("mouseOut");if(!v.series)return;v.firePointEvent("mouseOver");f.hoverPoints=
t;f.hoverPoint=v;e&&e.refresh(h?t:v,a)}else b&&e&&!e.isHidden&&(v=e.getAnchor([{}],a),e.updatePosition({plotX:v[0],plotY:v[1]}));this.unDocMouseMove||(this.unDocMouseMove=y(f.container.ownerDocument,"mousemove",function(a){var b=C[c.hoverChartIndex];if(b)b.pointer.onDocumentMouseMove(a)}));f.axes.forEach(function(b){var f=d(b.crosshair.snap,!0),e=f?c.find(t,function(a){return a.series[b.coll]===b}):void 0;e||!f?b.drawCrosshair(a,e):b.hideCrosshair()})},applyInactiveState:function(a){var b=[],d;(a||
[]).forEach(function(a){d=a.series;b.push(d);d.linkedParent&&b.push(d.linkedParent);d.linkedSeries&&(b=b.concat(d.linkedSeries));d.navigatorSeries&&b.push(d.navigatorSeries)});this.chart.series.forEach(function(a){-1===b.indexOf(a)?a.setState("inactive",!0):a.options.inactiveOtherPoints&&a.setAllPointsToState("inactive")})},reset:function(a,b){var d=this.chart,c=d.hoverSeries,f=d.hoverPoint,e=d.hoverPoints,k=d.tooltip,t=k&&k.shared?e:f;a&&t&&L(t).forEach(function(b){b.series.isCartesian&&void 0===
b.plotX&&(a=!1)});if(a)k&&t&&L(t).length&&(k.refresh(t),k.shared&&e?e.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):f&&(f.setState(f.state,!0),d.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,f)})));else{if(f)f.onMouseOut();e&&e.forEach(function(a){a.setState()});if(c)c.onMouseOut();k&&k.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());
d.axes.forEach(function(a){a.hideCrosshair()});this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,b){var d=this.chart,c;d.series.forEach(function(f){c=a||f.getPlotBox();f.xAxis&&f.xAxis.zoomEnabled&&f.group&&(f.group.attr(c),f.markerGroup&&(f.markerGroup.attr(c),f.markerGroup.clip(b?d.clipRect:null)),f.dataLabelsGroup&&f.dataLabelsGroup.attr(c))});d.clipRect.attr(b||d.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=
a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,d=b.options.chart,c=a.chartX,f=a.chartY,e=this.zoomHor,k=this.zoomVert,t=b.plotLeft,B=b.plotTop,I=b.plotWidth,w=b.plotHeight,l=this.selectionMarker,g=this.mouseDownX,m=this.mouseDownY,p=d.panKey&&a[d.panKey+"Key"];if(!l||!l.touch)if(c<t?c=t:c>t+I&&(c=t+I),f<B?f=B:f>B+w&&(f=B+w),this.hasDragged=Math.sqrt(Math.pow(g-c,2)+Math.pow(m-f,2)),10<this.hasDragged){var u=b.isInsidePlot(g-t,m-B);b.hasCartesianSeries&&(this.zoomX||
this.zoomY)&&u&&!p&&!l&&(this.selectionMarker=l=b.renderer.rect(t,B,e?1:I,k?1:w,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),b.styledMode||l.attr({fill:d.selectionMarkerFill||x("#335cad").setOpacity(.25).get()}));l&&e&&(c-=g,l.attr({width:Math.abs(c),x:(0<c?0:c)+g}));l&&k&&(c=f-m,l.attr({height:Math.abs(c),y:(0<c?0:c)+m}));u&&!l&&d.panning&&b.pan(a,d.panning)}},drop:function(a){var d=this,c=this.chart,f=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},
v=this.selectionMarker,k=v.attr?v.attr("x"):v.x,t=v.attr?v.attr("y"):v.y,B=v.attr?v.attr("width"):v.width,I=v.attr?v.attr("height"):v.height,w;if(this.hasDragged||f)c.axes.forEach(function(b){if(b.zoomEnabled&&D(b.min)&&(f||d[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var c=b.horiz,l="touchend"===a.type?b.minPixelPadding:0,h=b.toValue((c?k:t)+l);c=b.toValue((c?k+B:t+I)-l);e[b.coll].push({axis:b,min:Math.min(h,c),max:Math.max(h,c)});w=!0}}),w&&b(c,"selection",e,function(a){c.zoom(p(a,f?{animation:!1}:
null))});F(c.index)&&(this.selectionMarker=this.selectionMarker.destroy());f&&this.scaleGroups()}c&&F(c.index)&&(m(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(a){C[c.hoverChartIndex]&&C[c.hoverChartIndex].pointer.drop(a)},onDocumentMouseMove:function(a){var b=
this.chart,d=this.chartPosition;a=this.normalize(a,d);!d||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(a){var b=C[c.hoverChartIndex];b&&(a.relatedTarget||a.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=null)},onContainerMouseMove:function(a){var b=this.chart;D(c.hoverChartIndex)&&C[c.hoverChartIndex]&&C[c.hoverChartIndex].mouseIsDown||(c.hoverChartIndex=b.index);a=this.normalize(a);a.preventDefault||
(a.returnValue=!1);"mousedown"===b.mouseIsDown&&this.drag(a);!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||b.openMenu||this.runPointActions(a)},inClass:function(a,b){for(var d;a;){if(d=A(a,"class")){if(-1!==d.indexOf(b))return!0;if(-1!==d.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,
"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var d=this.chart,c=d.hoverPoint,f=d.plotLeft,e=d.plotTop;a=this.normalize(a);d.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(b(c.series,"click",p(a,{point:c})),d.hoverPoint&&c.firePointEvent("click",a)):(p(a,this.getCoordinates(a)),d.isInsidePlot(a.chartX-f,a.chartY-e)&&b(d,"click",a)))},setDOMEvents:function(){var a=this,b=a.chart.container,
d=b.ownerDocument;b.onmousedown=function(b){a.onContainerMouseDown(b)};b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};this.unbindContainerMouseLeave=y(b,"mouseleave",a.onContainerMouseLeave);c.unbindDocumentMouseUp||(c.unbindDocumentMouseUp=y(d,"mouseup",a.onDocumentMouseUp));c.hasTouch&&(y(b,"touchstart",function(b){a.onContainerTouchStart(b)}),y(b,"touchmove",function(b){a.onContainerTouchMove(b)}),c.unbindDocumentTouchEnd||(c.unbindDocumentTouchEnd=
y(d,"touchend",a.onDocumentTouchEnd)))},destroy:function(){var a=this;a.unDocMouseMove&&a.unDocMouseMove();this.unbindContainerMouseLeave();c.chartCount||(c.unbindDocumentMouseUp&&(c.unbindDocumentMouseUp=c.unbindDocumentMouseUp()),c.unbindDocumentTouchEnd&&(c.unbindDocumentTouchEnd=c.unbindDocumentTouchEnd()));clearInterval(a.tooltipTimeout);u(a,function(b,d){a[d]=null})}}});N(H,"parts/TouchPointer.js",[H["parts/Globals.js"]],function(c){var n=c.charts,A=c.extend,D=c.noop,F=c.pick;A(c.Pointer.prototype,
{pinchTranslate:function(c,u,n,y,A,x){this.zoomHor&&this.pinchTranslateDirection(!0,c,u,n,y,A,x);this.zoomVert&&this.pinchTranslateDirection(!1,c,u,n,y,A,x)},pinchTranslateDirection:function(c,u,n,y,A,x,m,p){var g=this.chart,b=c?"x":"y",a=c?"X":"Y",d="chart"+a,f=c?"width":"height",e=g["plot"+(c?"Left":"Top")],h,r,E=p||1,q=g.inverted,v=g.bounds[c?"h":"v"],k=1===u.length,t=u[0][d],B=n[0][d],I=!k&&u[1][d],w=!k&&n[1][d];n=function(){!k&&20<Math.abs(t-I)&&(E=p||Math.abs(B-w)/Math.abs(t-I));r=(e-B)/E+t;
h=g["plot"+(c?"Width":"Height")]/E};n();u=r;if(u<v.min){u=v.min;var l=!0}else u+h>v.max&&(u=v.max-h,l=!0);l?(B-=.8*(B-m[b][0]),k||(w-=.8*(w-m[b][1])),n()):m[b]=[B,w];q||(x[b]=r-e,x[f]=h);x=q?1/E:E;A[f]=h;A[b]=u;y[q?c?"scaleY":"scaleX":"scale"+a]=E;y["translate"+a]=x*e+(B-x*t)},pinch:function(c){var u=this,n=u.chart,y=u.pinchDown,z=c.touches,x=z.length,m=u.lastValidTouch,p=u.hasZoom,g=u.selectionMarker,b={},a=1===x&&(u.inClass(c.target,"highcharts-tracker")&&n.runTrackerClick||u.runChartClick),d={};
1<x&&(u.initiated=!0);p&&u.initiated&&!a&&c.preventDefault();[].map.call(z,function(a){return u.normalize(a)});"touchstart"===c.type?([].forEach.call(z,function(a,b){y[b]={chartX:a.chartX,chartY:a.chartY}}),m.x=[y[0].chartX,y[1]&&y[1].chartX],m.y=[y[0].chartY,y[1]&&y[1].chartY],n.axes.forEach(function(a){if(a.zoomEnabled){var b=n.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,c=a.toPixels(Math.min(F(a.options.min,a.dataMin),a.dataMin)),f=a.toPixels(Math.max(F(a.options.max,a.dataMax),a.dataMax)),q=Math.max(c,
f);b.min=Math.min(a.pos,Math.min(c,f)-d);b.max=Math.max(a.pos+a.len,q+d)}}),u.res=!0):u.followTouchMove&&1===x?this.runPointActions(u.normalize(c)):y.length&&(g||(u.selectionMarker=g=A({destroy:D,touch:!0},n.plotBox)),u.pinchTranslate(y,z,b,g,d,m),u.hasPinched=p,u.scaleGroups(b,d),u.res&&(u.res=!1,this.reset(!1,0)))},touch:function(n,u){var z=this.chart,y;if(z.index!==c.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});c.hoverChartIndex=z.index;if(1===n.touches.length)if(n=this.normalize(n),
(y=z.isInsidePlot(n.chartX-z.plotLeft,n.chartY-z.plotTop))&&!z.openMenu){u&&this.runPointActions(n);if("touchmove"===n.type){u=this.pinchDown;var A=u[0]?4<=Math.sqrt(Math.pow(u[0].chartX-n.chartX,2)+Math.pow(u[0].chartY-n.chartY,2)):!1}F(A,!0)&&this.pinch(n)}else u&&this.reset();else 2===n.touches.length&&this.pinch(n)},onContainerTouchStart:function(c){this.zoomOption(c);this.touch(c,!0)},onContainerTouchMove:function(c){this.touch(c)},onDocumentTouchEnd:function(z){n[c.hoverChartIndex]&&n[c.hoverChartIndex].pointer.drop(z)}})});
N(H,"parts/MSPointer.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.objectEach,D=c.addEvent,F=c.charts,z=c.css,u=c.doc;n=c.extend;var L=c.noop,y=c.Pointer,C=c.removeEvent,x=c.win,m=c.wrap;if(!c.hasTouch&&(x.PointerEvent||x.MSPointerEvent)){var p={},g=!!x.PointerEvent,b=function(){var a=[];a.item=function(a){return this[a]};A(p,function(b){a.push({pageX:b.pageX,pageY:b.pageY,target:b.target})});return a},a=function(a,f,e,h){"touch"!==a.pointerType&&a.pointerType!==a.MSPOINTER_TYPE_TOUCH||
!F[c.hoverChartIndex]||(h(a),h=F[c.hoverChartIndex].pointer,h[f]({type:e,target:a.currentTarget,preventDefault:L,touches:b()}))};n(y.prototype,{onContainerPointerDown:function(b){a(b,"onContainerTouchStart","touchstart",function(a){p[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(b){a(b,"onContainerTouchMove","touchmove",function(a){p[a.pointerId]={pageX:a.pageX,pageY:a.pageY};p[a.pointerId].target||(p[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(b){a(b,
"onDocumentTouchEnd","touchend",function(a){delete p[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,g?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,g?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(u,g?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});m(y.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&z(b.container,{"-ms-touch-action":"none","touch-action":"none"})});m(y.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});m(y.prototype,"destroy",function(a){this.batchMSEvents(C);a.call(this)})}});N(H,"parts/Legend.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isNumber,F=c.addEvent,z=c.css,u=c.discardElement,L=c.fireEvent;n=c.isFirefox;var y=c.marginNames,C=c.merge,x=c.pick,m=c.setAnimation,p=c.stableSort,g=c.win,b=c.wrap;c.Legend=function(a,b){this.init(a,b)};c.Legend.prototype={init:function(a,b){this.chart=a;this.setOptions(b);
b.enabled&&(this.render(),F(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=F(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())},setOptions:function(a){var b=x(a.padding,8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=C(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=
b-5;this.symbolWidth=x(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted},update:function(a,b){var d=this.chart;this.setOptions(C(!0,this.options,a));this.destroy();d.isDirtyLegend=d.isDirtyBox=!0;x(b,!0)&&d.redraw();L(this,"afterUpdate")},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var d=this.options,c=a.legendItem,h=a.legendLine,r=a.legendSymbol,g=this.itemHiddenStyle.color;
d=b?d.itemStyle.color:g;var q=b?a.color||g:g,v=a.options&&a.options.marker,k={fill:q};c&&c.css({fill:d,color:d});h&&h.attr({stroke:q});r&&(v&&r.isMarker&&(k=a.pointAttribs(),b||(k.stroke=k.fill=g)),r.attr(k))}L(this,"afterColorizeItem",{item:a,visible:b})},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(a){var b=this.options,c=b.symbolPadding;b=!b.rtl;var e=a._legendItemPos,h=e[0];e=e[1];var r=a.checkbox;
if((a=a.legendGroup)&&a.element)a[A(a.translateY)?"animate":"attr"]({translateX:b?h:this.legendWidth-h-2*c-4,translateY:e});r&&(r.x=h,r.y=e)},destroyItem:function(a){var b=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(b){a[b]&&(a[b]=a[b].destroy())});b&&u(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}this.getAllItems().forEach(function(b){["legendItem","legendGroup"].forEach(a,b)});"clipRect up down pager nav box title group".split(" ").forEach(a,
this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,b=this.clipHeight||this.legendHeight,c=this.titleHeight;if(a){var e=a.translateY;this.allItems.forEach(function(d){var f=d.checkbox;if(f){var h=e+c+f.y+(this.scrollOffset||0)+3;z(f,{left:a.translateX+d.checkboxOffset+f.x-20+"px",top:h+"px",display:this.proximate||h>e-6&&h<e+b-6?"":"none"})}},this)}},renderTitle:function(){var a=this.options,b=this.padding,c=a.title,e=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,
b-3,b-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(c.style),this.title.add(this.group)),c.width||this.title.css({width:this.maxLegendWidth+"px"}),a=this.title.getBBox(),e=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(a){var b=this.options;a.legendItem.attr({text:b.labelFormat?c.format(b.labelFormat,a,this.chart.time):b.labelFormatter.call(a)})},renderItem:function(a){var b=this.chart,
c=b.renderer,e=this.options,h=this.symbolWidth,r=e.symbolPadding,g=this.itemStyle,q=this.itemHiddenStyle,v="horizontal"===e.layout?x(e.itemDistance,20):0,k=!e.rtl,t=a.legendItem,B=!a.series,I=!B&&a.series.drawLegendSymbol?a.series:a,w=I.options;w=this.createCheckboxForItem&&w&&w.showCheckbox;v=h+r+v+(w?20:0);var l=e.useHTML,m=a.options.className;t||(a.legendGroup=c.g("legend-item").addClass("highcharts-"+I.type+"-series highcharts-color-"+a.colorIndex+(m?" "+m:"")+(B?" highcharts-series-"+a.index:
"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=t=c.text("",k?h+r:-r,this.baseline||0,l),b.styledMode||t.css(C(a.visible?g:q)),t.attr({align:k?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=c.fontMetrics(b.styledMode?12:g.fontSize,t),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,t.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,I.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,t,l));w&&!a.checkbox&&this.createCheckboxForItem(a);
this.colorizeItem(a,a.visible);!b.styledMode&&g.width||t.css({width:(e.itemWidth||this.widthOption||b.spacingBox.width)-v});this.setText(a);b=t.getBBox();a.itemWidth=a.checkboxOffset=e.itemWidth||a.legendItemWidth||b.width+v;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||b.height||this.symbolHeight)},layoutItem:function(a){var b=this.options,c=this.padding,e="horizontal"===b.layout,h=a.itemHeight,
g=b.itemMarginBottom||0,m=this.itemMarginTop,q=e?x(b.itemDistance,20):0,v=this.maxLegendWidth;b=b.alignColumns&&this.totalItemWidth>v?this.maxItemWidth:a.itemWidth;e&&this.itemX-c+b>v&&(this.itemX=c,this.lastLineHeight&&(this.itemY+=m+this.lastLineHeight+g),this.lastLineHeight=0);this.lastItemY=m+this.itemY+g;this.lastLineHeight=Math.max(h,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=b:(this.itemY+=m+h+g,this.lastLineHeight=h);this.offsetWidth=this.widthOption||Math.max((e?
this.itemX-c-(a.checkbox?0:q):b)+c,this.offsetWidth)},getAllItems:function(){var a=[];this.chart.series.forEach(function(b){var d=b&&b.options;b&&x(d.showInLegend,A(d.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===d.legendType?b.data:b)))});L(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,b){var d=
this.chart,c=this.options,h=this.getAlignment();h&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(f,e){f.test(h)&&!A(a[e])&&(d[y[e]]=Math.max(d[y[e]],d.legend[(e+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][e]*c[e%2?"x":"y"]+x(c.margin,12)+b[e]+(d.titleOffset[e]||0)))})},proximatePositions:function(){var a=this.chart,b=[],f="left"===this.options.align;this.allItems.forEach(function(d){var e=f;if(d.yAxis&&d.points){d.xAxis.options.reversed&&(e=!e);var g=c.find(e?d.points:
d.points.slice(0).reverse(),function(a){return D(a.plotY)});e=d.legendGroup.getBBox().height;var m=d.yAxis.top-a.plotTop;d.visible?(g=g?g.plotY:d.yAxis.height,g+=m-.3*e):g=m+d.yAxis.height;b.push({target:g,size:e,item:d})}},this);c.distribute(b,a.plotHeight);b.forEach(function(b){b.item._legendItemPos[1]=a.plotTop-a.spacing[0]+b.pos})},render:function(){var a=this.chart,b=a.renderer,f=this.group,e,h=this.box,g=this.options,m=this.padding;this.itemX=m;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=
0;this.widthOption=c.relativeLength(g.width,a.spacingBox.width-m);var q=a.spacingBox.width-2*m-g.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(q/=2);this.maxLegendWidth=this.widthOption||q;f||(this.group=f=b.g("legend").attr({zIndex:7}).add(),this.contentGroup=b.g().attr({zIndex:1}).add(f),this.scrollGroup=b.g().add(this.contentGroup));this.renderTitle();q=this.getAllItems();p(q,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});g.reversed&&
q.reverse();this.allItems=q;this.display=e=!!q.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;q.forEach(this.renderItem,this);q.forEach(this.layoutItem,this);q=(this.widthOption||this.offsetWidth)+m;var v=this.lastItemY+this.lastLineHeight+this.titleHeight;v=this.handleOverflow(v);v+=m;h||(this.box=h=b.rect().addClass("highcharts-legend-box").attr({r:g.borderRadius}).add(f),h.isNew=!0);a.styledMode||h.attr({stroke:g.borderColor,"stroke-width":g.borderWidth||0,fill:g.backgroundColor||
"none"}).shadow(g.shadow);0<q&&0<v&&(h[h.isNew?"attr":"animate"](h.crisp.call({},{x:0,y:0,width:q,height:v},h.strokeWidth())),h.isNew=!1);h[e?"show":"hide"]();a.styledMode&&"none"===f.getStyle("display")&&(q=v=0);this.legendWidth=q;this.legendHeight=v;e&&(b=a.spacingBox,h=b.y,/(lth|ct|rth)/.test(this.getAlignment())&&0<a.titleOffset[0]?h+=a.titleOffset[0]:/(lbh|cb|rbh)/.test(this.getAlignment())&&0<a.titleOffset[2]&&(h-=a.titleOffset[2]),h!==b.y&&(b=C(b,{y:h})),f.align(C(g,{width:q,height:v,verticalAlign:this.proximate?
"top":g.verticalAlign}),!0,b));this.proximate||this.positionItems();L(this,"afterRender")},handleOverflow:function(a){var b=this,c=this.chart,e=c.renderer,h=this.options,g=h.y,m=this.padding;g=c.spacingBox.height+("top"===h.verticalAlign?-g:g)-m;var q=h.maxHeight,v,k=this.clipRect,t=h.navigation,B=x(t.animation,!0),I=t.arrowSize||12,w=this.nav,l=this.pages,p,K=this.allItems,n=function(a){"number"===typeof a?k.attr({height:a}):k&&(b.clipRect=k.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=
a?"rect("+m+"px,9999px,"+(m+a)+"px,0)":"auto")},u=function(a){b[a]=e.circle(0,0,1.3*I).translate(I/2,I/2).add(w);c.styledMode||b[a].attr("fill","rgba(0,0,0,0.0001)");return b[a]};"horizontal"!==h.layout||"middle"===h.verticalAlign||h.floating||(g/=2);q&&(g=Math.min(g,q));l.length=0;a>g&&!1!==t.enabled?(this.clipHeight=v=Math.max(g-20-this.titleHeight-m,0),this.currentPage=x(this.currentPage,1),this.fullHeight=a,K.forEach(function(a,b){var d=a._legendItemPos[1],c=Math.round(a.legendItem.getBBox().height),
f=l.length;if(!f||d-l[f-1]>v&&(p||d)!==l[f-1])l.push(p||d),f++;a.pageIx=f-1;p&&(K[b-1].pageIx=f-1);b===K.length-1&&d+c-l[f-1]>v&&d!==p&&(l.push(d),a.pageIx=f);d!==p&&(p=d)}),k||(k=b.clipRect=e.clipRect(0,m,9999,0),b.contentGroup.clip(k)),n(v),w||(this.nav=w=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,I,I).add(w),u("upTracker").on("click",function(){b.scroll(-1,B)}),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation"),c.styledMode||this.pager.css(t.style),
this.pager.add(w),this.down=e.symbol("triangle-down",0,0,I,I).add(w),u("downTracker").on("click",function(){b.scroll(1,B)})),b.scroll(0),a=g):w&&(n(),this.nav=w.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,b){var d=this.pages,c=d.length,h=this.currentPage+a;a=this.clipHeight;var g=this.options.navigation,p=this.pager,q=this.padding;h>c&&(h=c);0<h&&(void 0!==b&&m(b,this.chart),this.nav.attr({translateX:q,translateY:a+this.padding+7+this.titleHeight,
visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===h?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),p.attr({text:h+"/"+c}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":h===c?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),this.chart.styledMode||(this.up.attr({fill:1===h?g.inactiveColor:g.activeColor}),this.upTracker.css({cursor:1===h?"default":"pointer"}),this.down.attr({fill:h===
c?g.inactiveColor:g.activeColor}),this.downTracker.css({cursor:h===c?"default":"pointer"})),this.scrollOffset=-d[h-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=h,this.positionCheckboxes())}};c.LegendSymbolMixin={drawRectangle:function(a,b){var d=a.symbolHeight,c=a.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-d)/2:0,a.baseline-d+1,c?d:a.symbolWidth,d,x(a.options.symbolRadius,d/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},
drawLineMarker:function(a){var b=this.options,c=b.marker,e=a.symbolWidth,h=a.symbolHeight,g=h/2,m=this.chart.renderer,q=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var v={};this.chart.styledMode||(v={"stroke-width":b.lineWidth||0},b.dashStyle&&(v.dashstyle=b.dashStyle));this.legendLine=m.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(v).add(q);c&&!1!==c.enabled&&e&&(b=Math.min(x(c.radius,g),g),0===this.symbol.indexOf("url")&&(c=C(c,{width:h,height:h}),b=0),this.legendSymbol=
c=m.symbol(this.symbol,e/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(q),c.isMarker=!0)}};(/Trident\/7\.0/.test(g.navigator&&g.navigator.userAgent)||n)&&b(c.Legend.prototype,"positionItem",function(a,b){var d=this,c=function(){b._legendItemPos&&a.call(d,b)};c();d.bubbleLegend||setTimeout(c)})});N(H,"parts/Chart.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.attr,D=n.defined,F=n.erase,z=n.isArray,u=n.isNumber,L=n.isObject,y=n.isString,C=n.objectEach,x=n.pInt,m=n.splat,
p=c.addEvent,g=c.animate,b=c.animObject,a=c.doc,d=c.Axis,f=c.createElement,e=c.defaultOptions,h=c.discardElement,r=c.charts,E=c.css,q=c.extend,v=c.find,k=c.fireEvent,t=c.Legend,B=c.marginNames,I=c.merge,w=c.Pointer,l=c.pick,J=c.removeEvent,K=c.seriesTypes,T=c.syncTimeout,R=c.win,S=c.Chart=function(){this.getArgs.apply(this,arguments)};c.chart=function(a,b,d){return new S(a,b,d)};q(S.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(y(a[0])||a[0].nodeName)this.renderTo=a.shift();
this.init(a[0],a[1])},init:function(a,b){var d,f=a.series,l=a.plotOptions||{};k(this,"init",{args:arguments},function(){a.series=null;d=I(e,a);C(d.plotOptions,function(a,b){L(a)&&(a.tooltip=l[b]&&I(l[b].tooltip)||void 0)});d.tooltip.userOptions=a.chart&&a.chart.forExport&&a.tooltip.userOptions||a.tooltip;d.series=a.series=f;this.userOptions=a;var t=d.chart,B=t.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=b;this.isResizing=0;this.options=d;this.axes=
[];this.series=[];this.time=a.time&&Object.keys(a.time).length?new c.Time(a.time):c.time;this.styledMode=t.styledMode;this.hasCartesianSeries=t.showAxes;var h=this;h.index=r.length;r.push(h);c.chartCount++;B&&C(B,function(a,b){c.isFunction(a)&&p(h,b,a)});h.xAxis=[];h.yAxis=[];h.pointCount=h.colorCounter=h.symbolCounter=0;k(h,"afterInit");h.firstRender()})},initSeries:function(a){var b=this.options.chart;(b=K[a.type||b.type||b.defaultSeriesType])||c.error(17,!0,this);b=new b;b.init(this,a);return b},
orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},isInsidePlot:function(a,b,d){var c=d?b:a;a=d?a:b;return 0<=c&&c<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(a){k(this,"beforeRedraw");var b=this.axes,d=this.series,f=this.pointer,e=this.legend,l=this.userOptions.legend,t=this.isDirtyLegend,h=this.hasCartesianSeries,B=this.isDirtyBox,w=this.renderer,g=w.isHidden(),v=[];this.setResponsive&&this.setResponsive(!1);c.setAnimation(a,
this);g&&this.temporaryDisplay();this.layOutTitles();for(a=d.length;a--;){var m=d[a];if(m.options.stacking){var I=!0;if(m.isDirty){var p=!0;break}}}if(p)for(a=d.length;a--;)m=d[a],m.options.stacking&&(m.isDirty=!0);d.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),t=!0):l&&(l.labelFormatter||l.labelFormat)&&(t=!0));a.isDirtyData&&k(a,"updatedData")});t&&e&&e.options.enabled&&(e.render(),this.isDirtyLegend=!1);I&&this.getStacks();h&&b.forEach(function(a){a.updateNames();
a.setScale()});this.getMargins();h&&(b.forEach(function(a){a.isDirty&&(B=!0)}),b.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,v.push(function(){k(a,"afterSetExtremes",q(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(B||I)&&a.redraw()}));B&&this.drawChartBox();k(this,"predraw");d.forEach(function(a){(B||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});f&&f.reset(!0);w.draw();k(this,"redraw");k(this,"render");g&&this.temporaryDisplay(!0);v.forEach(function(a){a.call()})},
get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var d=this.series,c;var f=v(this.axes,b)||v(this.series,b);for(c=0;!f&&c<d.length;c++)f=v(d[c].points||[],b);return f},getAxes:function(){var a=this,b=this.options,c=b.xAxis=m(b.xAxis||{});b=b.yAxis=m(b.yAxis||{});k(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0});b.forEach(function(a,b){a.index=b});c.concat(b).forEach(function(b){new d(a,b)});k(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];this.series.forEach(function(b){a=
a.concat((b[b.hasGroupedData?"points":"data"]||[]).filter(function(a){return l(a.selectedStaging,a.selected)}))});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},setTitle:function(a,b,d){this.applyDescription("title",a);this.applyDescription("subtitle",b);this.applyDescription("caption",void 0);this.layOutTitles(d)},applyDescription:function(a,b){var d=this,c="title"===a?{color:"#333333",fontSize:this.options.isStock?"16px":"18px"}:{color:"#666666"};
c=this.options[a]=I(!this.styledMode&&{style:c},this.options[a],b);var f=this[a];f&&b&&(this[a]=f=f.destroy());c&&!f&&(f=this.renderer.text(c.text,0,0,c.useHTML).attr({align:c.align,"class":"highcharts-"+a,zIndex:c.zIndex||4}).add(),f.update=function(b){d[{title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"}[a]](b)},this.styledMode||f.css(c.style),this[a]=f)},layOutTitles:function(a){var b=[0,0,0],d=this.renderer,c=this.spacingBox;["title","subtitle","caption"].forEach(function(a){var f=
this[a],e=this.options[a],k=e.verticalAlign||"top";a="title"===a?-3:"top"===k?b[0]+2:0;if(f){if(!this.styledMode)var l=e.style.fontSize;l=d.fontMetrics(l,f).b;f.css({width:(e.width||c.width+(e.widthAdjust||0))+"px"});var t=f.getBBox(e.useHTML).height;f.align(q({y:"bottom"===k?l:a+l,height:t},e),!1,"spacingBox");e.floating||("top"===k?b[0]=Math.ceil(b[0]+t):"bottom"===k&&(b[2]=Math.ceil(b[2]+t)))}},this);b[0]&&"top"===(this.options.title.verticalAlign||"top")&&(b[0]+=this.options.title.margin);b[2]&&
"bottom"===this.options.caption.verticalAlign&&(b[2]+=this.options.caption.margin);var f=!this.titleOffset||this.titleOffset.join(",")!==b.join(",");this.titleOffset=b;!this.isDirtyBox&&f&&(this.isDirtyBox=this.isDirtyLegend=f,this.hasRendered&&l(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,b=a.width;a=a.height;var d=this.renderTo;D(b)||(this.containerWidth=c.getStyle(d,"width"));D(a)||(this.containerHeight=c.getStyle(d,"height"));this.chartWidth=Math.max(0,
b||this.containerWidth||600);this.chartHeight=Math.max(0,c.relativeLength(a,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var d=this.renderTo;if(b)for(;d&&d.style;)d.hcOrigStyle&&(c.css(d,d.hcOrigStyle),delete d.hcOrigStyle),d.hcOrigDetached&&(a.body.removeChild(d),d.hcOrigDetached=!1),d=d.parentNode;else for(;d&&d.style;){a.body.contains(d)||d.parentNode||(d.hcOrigDetached=!0,a.body.appendChild(d));if("none"===c.getStyle(d,"display",!1)||d.hcOricDetached)d.hcOrigStyle=
{display:d.style.display,height:d.style.height,overflow:d.style.overflow},b={display:"block",overflow:"hidden"},d!==this.renderTo&&(b.height=0),c.css(d,b),d.offsetWidth||d.style.setProperty("display","block","important");d=d.parentNode;if(d===a.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b=this.options,d=b.chart;var e=this.renderTo;var l=c.uniqueKey(),t,h;e||(this.renderTo=e=d.renderTo);y(e)&&(this.renderTo=e=a.getElementById(e));
e||c.error(13,!0,this);var B=x(A(e,"data-highcharts-chart"));u(B)&&r[B]&&r[B].hasRendered&&r[B].destroy();A(e,"data-highcharts-chart",this.index);e.innerHTML="";d.skipClone||e.offsetWidth||this.temporaryDisplay();this.getChartSize();B=this.chartWidth;var w=this.chartHeight;E(e,{overflow:"hidden"});this.styledMode||(t=q({position:"relative",overflow:"hidden",width:B+"px",height:w+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style));this.container=
e=f("div",{id:l},t,e);this._cursor=e.style.cursor;this.renderer=new (c[d.renderer]||c.Renderer)(e,B,w,null,d.forExport,b.exporting&&b.exporting.allowHTML,this.styledMode);this.setClassName(d.className);if(this.styledMode)for(h in b.defs)this.renderer.definition(b.defs[h]);else this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index;k(this,"afterGetContainer")},getMargins:function(a){var b=this.spacing,d=this.margin,c=this.titleOffset;this.resetMargins();c[0]&&!D(d[0])&&(this.plotTop=Math.max(this.plotTop,
c[0]+b[0]));c[2]&&!D(d[2])&&(this.marginBottom=Math.max(this.marginBottom,c[2]+b[2]));this.legend&&this.legend.display&&this.legend.adjustMargins(d,b);k(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],d=a.colorAxis,c=a.margin,f=function(a){a.forEach(function(a){a.visible&&a.getOffset()})};a.hasCartesianSeries?f(a.axes):d&&d.length&&f(d);B.forEach(function(d,f){D(c[f])||(a[d]+=b[f])});a.setChartSize()},reflow:function(b){var d=this,f=d.options.chart,
e=d.renderTo,k=D(f.width)&&D(f.height),l=f.width||c.getStyle(e,"width");f=f.height||c.getStyle(e,"height");e=b?b.target:R;if(!k&&!d.isPrinting&&l&&f&&(e===R||e===a)){if(l!==d.containerWidth||f!==d.containerHeight)c.clearTimeout(d.reflowTimeout),d.reflowTimeout=T(function(){d.container&&d.setSize(void 0,void 0,!1)},b?100:0);d.containerWidth=l;d.containerHeight=f}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=
p(R,"resize",function(a){b.options&&b.reflow(a)}),p(this,"destroy",this.unbindReflow))},setSize:function(a,d,f){var e=this,l=e.renderer;e.isResizing+=1;c.setAnimation(f,e);e.oldChartHeight=e.chartHeight;e.oldChartWidth=e.chartWidth;void 0!==a&&(e.options.chart.width=a);void 0!==d&&(e.options.chart.height=d);e.getChartSize();if(!e.styledMode){var t=l.globalAnimation;(t?g:E)(e.container,{width:e.chartWidth+"px",height:e.chartHeight+"px"},t)}e.setChartSize(!0);l.setSize(e.chartWidth,e.chartHeight,f);
e.axes.forEach(function(a){a.isDirty=!0;a.setScale()});e.isDirtyLegend=!0;e.isDirtyBox=!0;e.layOutTitles();e.getMargins();e.redraw(f);e.oldChartHeight=null;k(e,"resize");T(function(){e&&k(e,"endResize",null,function(){--e.isResizing})},b(t).duration)},setChartSize:function(a){var b=this.inverted,d=this.renderer,c=this.chartWidth,f=this.chartHeight,e=this.options.chart,l=this.spacing,t=this.clipOffset,B,h,w,g;this.plotLeft=B=Math.round(this.plotLeft);this.plotTop=h=Math.round(this.plotTop);this.plotWidth=
w=Math.max(0,Math.round(c-B-this.marginRight));this.plotHeight=g=Math.max(0,Math.round(f-h-this.marginBottom));this.plotSizeX=b?g:w;this.plotSizeY=b?w:g;this.plotBorderWidth=e.plotBorderWidth||0;this.spacingBox=d.spacingBox={x:l[3],y:l[0],width:c-l[3]-l[1],height:f-l[0]-l[2]};this.plotBox=d.plotBox={x:B,y:h,width:w,height:g};c=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(c,t[3])/2);d=Math.ceil(Math.max(c,t[0])/2);this.clipBox={x:b,y:d,width:Math.floor(this.plotSizeX-Math.max(c,t[1])/
2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(c,t[2])/2-d))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});k(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){k(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(d){var c=b[d],f=L(c)?c:[c,c,c,c];["Top","Right","Bottom","Left"].forEach(function(c,e){a[d][e]=l(b[d+c],f[e])})});B.forEach(function(b,d){a[b]=l(a.margin[d],a.spacing[d])});a.axisOffset=[0,0,0,0];a.clipOffset=
[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,d=this.chartWidth,c=this.chartHeight,f=this.chartBackground,e=this.plotBackground,l=this.plotBorder,t=this.styledMode,B=this.plotBGImage,h=a.backgroundColor,w=a.plotBackgroundColor,g=a.plotBackgroundImage,q,v=this.plotLeft,m=this.plotTop,I=this.plotWidth,p=this.plotHeight,r=this.plotBox,K=this.clipRect,x=this.clipBox,J="animate";f||(this.chartBackground=f=b.rect().addClass("highcharts-background").add(),J="attr");if(t)var n=
q=f.strokeWidth();else{n=a.borderWidth||0;q=n+(a.shadow?8:0);h={fill:h||"none"};if(n||f["stroke-width"])h.stroke=a.borderColor,h["stroke-width"]=n;f.attr(h).shadow(a.shadow)}f[J]({x:q/2,y:q/2,width:d-q-n%2,height:c-q-n%2,r:a.borderRadius});J="animate";e||(J="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[J](r);t||(e.attr({fill:w||"none"}).shadow(a.plotShadow),g&&(B?B.animate(r):this.plotBGImage=b.image(g,v,m,I,p).add()));K?K.animate({width:x.width,height:x.height}):
this.clipRect=b.clipRect(x);J="animate";l||(J="attr",this.plotBorder=l=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());t||l.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});l[J](l.crisp({x:v,y:m,width:I,height:p},-l.strokeWidth()));this.isDirtyBox=!1;k(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,b=a.options.chart,d,c=a.options.series,f,e;["inverted","angular","polar"].forEach(function(k){d=K[b.type||b.defaultSeriesType];e=b[k]||
d&&d.prototype[k];for(f=c&&c.length;!e&&f--;)(d=K[c[f].type])&&d.prototype[k]&&(e=!0);a[k]=e})},linkSeries:function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0});b.forEach(function(b){var d=b.options.linkedTo;y(d)&&(d=":previous"===d?a.series[b.index-1]:a.get(d))&&d.linkedParent!==b&&(d.linkedSeries.push(b),b.linkedParent=d,b.visible=l(b.options.visible,d.options.visible,b.visible))});k(this,"afterLinkSeries")},renderSeries:function(){this.series.forEach(function(a){a.translate();
a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(d){var c=q(b.style,d.style),f=x(c.left)+a.plotLeft,e=x(c.top)+a.plotTop+12;delete c.left;delete c.top;a.renderer.text(d.html,f,e).attr({zIndex:2}).css(c).add()})},render:function(){var a=this.axes,b=this.colorAxis,d=this.renderer,c=this.options,f=0,e=function(a){a.forEach(function(a){a.visible&&a.render()})};this.setTitle();this.legend=new t(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);
this.setChartSize();c=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return f=21,!0});var k=this.plotHeight=Math.max(this.plotHeight-f,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();var l=1.1<c/this.plotWidth;var h=1.05<k/this.plotHeight;if(l||h)a.forEach(function(a){(a.horiz&&l||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries?e(a):b&&b.length&&e(b);this.seriesGroup||(this.seriesGroup=
d.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.updateContainerScaling();this.hasRendered=!0},addCredits:function(a){var b=this;a=I(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(R.location.href=a.href)}).attr({align:a.position.align,zIndex:8}),b.styledMode||this.credits.css(a.style),
this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},updateContainerScaling:function(){var a=this.container;if(a.offsetWidth&&a.offsetHeight&&a.getBoundingClientRect){var b=a.getBoundingClientRect(),d=b.width/a.offsetWidth;a=b.height/a.offsetHeight;1!==d||1!==a?this.containerScaling={scaleX:d,scaleY:a}:delete this.containerScaling}},destroy:function(){var a=this,b=a.axes,d=a.series,f=a.container,e,l=f&&f.parentNode;k(a,"destroy");a.renderer.forExport?
F(r,a):r[a.index]=void 0;c.chartCount--;a.renderTo.removeAttribute("data-highcharts-chart");J(a);for(e=b.length;e--;)b[e]=b[e].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(e=d.length;e--;)d[e]=d[e].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(b){var d=a[b];d&&d.destroy&&(a[b]=d.destroy())});f&&(f.innerHTML="",J(f),
l&&h(f));C(a,function(b,d){delete a[d]})},firstRender:function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();(z(b.series)?b.series:[]).forEach(function(b){a.initSeries(b)});a.linkSeries();k(a,"beforeRender");w&&(a.pointer=new w(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&void 0!==
this.index&&a.apply(this,[this])},this);k(this,"load");k(this,"render");D(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})});N(H,"parts/ScrollablePlotArea.js",[H["parts/Globals.js"]],function(c){var n=c.addEvent,A=c.Chart;"";n(A,"afterSetChartSize",function(n){var A=this.options.chart.scrollablePlotArea,z=A&&A.minWidth;A=A&&A.minHeight;if(!this.renderer.forExport){if(z){if(this.scrollablePixelsX=z=Math.max(0,z-this.chartWidth)){this.plotWidth+=z;this.inverted?(this.clipBox.height+=
z,this.plotBox.height+=z):(this.clipBox.width+=z,this.plotBox.width+=z);var u={1:{name:"right",value:z}}}}else A&&(this.scrollablePixelsY=z=Math.max(0,A-this.chartHeight))&&(this.plotHeight+=z,this.inverted?(this.clipBox.width+=z,this.plotBox.width+=z):(this.clipBox.height+=z,this.plotBox.height+=z),u={2:{name:"bottom",value:z}});u&&!n.skipAxes&&this.axes.forEach(function(n){u[n.side]?n.getPlotLinePath=function(){var y=u[n.side].name,z=this[y];this[y]=z-u[n.side].value;var x=c.Axis.prototype.getPlotLinePath.apply(this,
arguments);this[y]=z;return x}:(n.setAxisSize(),n.setAxisTranslation())})}});n(A,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});A.prototype.setUpScrolling=function(){var n={WebkitOverflowScrolling:"touch",overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(n.overflowX="auto");this.scrollablePixelsY&&(n.overflowY="auto");this.scrollingContainer=c.createElement("div",{className:"highcharts-scrolling"},
n,this.renderTo);this.innerContainer=c.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};A.prototype.moveFixedElements=function(){var c=this.container,n=this.fixedRenderer,z=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-reset-zoom .highcharts-subtitle .highcharts-title .highcharts-legend-checkbox".split(" "),u;this.scrollablePixelsX&&!this.inverted?u=".highcharts-yaxis":
this.scrollablePixelsX&&this.inverted?u=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?u=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(u=".highcharts-yaxis");z.push(u,u+"-labels");z.forEach(function(u){[].forEach.call(c.querySelectorAll(u),function(c){(c.namespaceURI===n.SVG_NS?n.box:n.box.parentNode).appendChild(c);c.style.pointerEvents="auto"})})};A.prototype.applyFixed=function(){var A,F=!this.fixedDiv,z=this.options.chart.scrollablePlotArea;F?(this.fixedDiv=c.createElement("div",
{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.renderTo.style.overflow="visible",this.fixedRenderer=A=new c.Renderer(this.fixedDiv,this.chartWidth,this.chartHeight),this.scrollableMask=A.path().attr({fill:c.color(this.options.chart.backgroundColor||"#fff").setOpacity(c.pick(z.opacity,.85)).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),this.moveFixedElements(),
n(this,"afterShowResetZoom",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);A=this.chartWidth+(this.scrollablePixelsX||0);var u=this.chartHeight+(this.scrollablePixelsY||0);c.stop(this.container);this.container.style.width=A+"px";this.container.style.height=u+"px";this.renderer.boxWrapper.attr({width:A,height:u,viewBox:[0,0,A,u].join(" ")});this.chartBackground.attr({width:A,height:u});this.scrollablePixelsY&&(this.scrollingContainer.style.height=this.chartHeight+
"px");F&&(z.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*z.scrollPositionX),z.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*z.scrollPositionY));u=this.axisOffset;F=this.plotTop-u[0]-1;z=this.plotLeft-u[3]-1;A=this.plotTop+this.plotHeight+u[2]+1;u=this.plotLeft+this.plotWidth+u[1]+1;var L=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),y=this.plotTop+this.plotHeight-(this.scrollablePixelsY||0);F=this.scrollablePixelsX?["M",0,F,"L",
this.plotLeft-1,F,"L",this.plotLeft-1,A,"L",0,A,"Z","M",L,F,"L",this.chartWidth,F,"L",this.chartWidth,A,"L",L,A,"Z"]:this.scrollablePixelsY?["M",z,0,"L",z,this.plotTop-1,"L",u,this.plotTop-1,"L",u,0,"Z","M",z,y,"L",z,this.chartHeight,"L",u,this.chartHeight,"L",u,y,"Z"]:["M",0,0];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:F})}});N(H,"parts/Point.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.erase,F=n.isArray,z=n.isNumber,u=n.isObject,L,
y=c.extend,C=c.fireEvent,x=c.format,m=c.pick,p=c.uniqueKey,g=c.removeEvent;c.Point=L=function(){};c.Point.prototype={init:function(b,a,d){this.series=b;this.applyOptions(a,d);this.id=A(this.id)?this.id:p();this.resolveColor();b.chart.pointCount++;C(this,"afterInit");return this},resolveColor:function(){var b=this.series;var a=b.chart.options.chart.colorCount;var d=b.chart.styledMode;d||this.options.color||(this.color=b.color);b.options.colorByPoint?(d||(a=b.options.colors||b.chart.options.colors,
this.color=this.color||a[b.colorCounter],a=a.length),d=b.colorCounter,b.colorCounter++,b.colorCounter===a&&(b.colorCounter=0)):d=b.colorIndex;this.colorIndex=m(this.colorIndex,d)},applyOptions:function(b,a){var d=this.series,c=d.options.pointValKey||d.pointValKey;b=L.prototype.optionsToObject.call(this,b);y(this,b);this.options=this.options?y(this.options,b):b;b.group&&delete this.group;b.dataLabels&&delete this.dataLabels;c&&(this.y=this[c]);this.formatPrefix=(this.isNull=m(this.isValid&&!this.isValid(),
null===this.x||!z(this.y)))?"null":"point";this.selected&&(this.state="select");"name"in this&&void 0===a&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===a?d.autoIncrement(this):a);return this},setNestedProperty:function(b,a,d){d.split(".").reduce(function(b,d,c,g){b[d]=g.length-1===c?a:u(b[d],!0)?b[d]:{};return b[d]},b);return b},optionsToObject:function(b){var a={},d=this.series,f=d.options.keys,e=f||d.pointArrayMap||["y"],h=e.length,g=0,m=0;if(z(b)||
null===b)a[e[0]]=b;else if(F(b))for(!f&&b.length>h&&(d=typeof b[0],"string"===d?a.name=b[0]:"number"===d&&(a.x=b[0]),g++);m<h;)f&&void 0===b[g]||(0<e[m].indexOf(".")?c.Point.prototype.setNestedProperty(a,b[g],e[m]):a[e[m]]=b[g]),g++,m++;else"object"===typeof b&&(a=b,b.dataLabels&&(d._hasPointLabels=!0),b.marker&&(d._hasPointMarkers=!0));return a},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":
"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var b=this.series,a=b.zones;b=b.zoneAxis||"y";var d=0,c;for(c=a[d];this[b]>=c.value;)c=a[++d];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=c&&c.color&&!this.options.color?c.color:this.nonZonedColor;return c},destroy:function(){var b=this.series.chart,
a=b.hoverPoints,d;b.pointCount--;a&&(this.setState(),D(a,this),a.length||(b.hoverPoints=null));if(this===b.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)g(this),this.destroyElements();this.legendItem&&b.legend.destroyItem(this);for(d in this)this[d]=null},destroyElements:function(b){var a=this,d=[],c;b=b||{graphic:1,dataLabel:1};b.graphic&&d.push("graphic","shadowGroup");b.dataLabel&&d.push("dataLabel","dataLabelUpper","connector");for(c=d.length;c--;){var e=d[c];a[e]&&
(a[e]=a[e].destroy())}["dataLabel","connector"].forEach(function(d){var c=d+"s";b[d]&&a[c]&&(a[c].forEach(function(a){a.element&&a.destroy()}),delete a[c])})},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(b){var a=this.series,d=a.tooltipOptions,c=m(d.valueDecimals,""),e=d.valuePrefix||"",h=d.valueSuffix||
"";a.chart.styledMode&&(b=a.chart.tooltip.styledModeFormat(b));(a.pointArrayMap||["y"]).forEach(function(a){a="{point."+a;if(e||h)b=b.replace(RegExp(a+"}","g"),e+a+"}"+h);b=b.replace(RegExp(a+"}","g"),a+":,."+c+"f}")});return x(b,{point:this,series:this.series},a.chart.time)},firePointEvent:function(b,a,d){var c=this,e=this.series.options;(e.point.events[b]||c.options&&c.options.events&&c.options.events[b])&&this.importEvents();"click"===b&&e.allowPointSelect&&(d=function(a){c.select&&c.select(null,
a.ctrlKey||a.metaKey||a.shiftKey)});C(this,b,a,d)},visible:!0}});N(H,"parts/Series.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.erase,F=n.isArray,z=n.isNumber,u=n.isString,L=n.objectEach,y=n.splat,C=c.addEvent,x=c.animObject,m=c.arrayMax,p=c.arrayMin,g=c.correctFloat,b=c.defaultOptions,a=c.defaultPlotOptions,d=c.extend,f=c.fireEvent,e=c.merge,h=c.pick,r=c.removeEvent,E=c.SVGElement,q=c.syncTimeout,v=c.win;c.Series=c.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,
showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":c.numberFormat(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",
x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{axisTypes:["xAxis","yAxis"],coll:"series",colorCounter:0,cropShoulder:1,directTouch:!1,isCartesian:!0,parallelArrays:["x","y"],pointClass:c.Point,requireSorting:!0,sorted:!0,init:function(a,
b){f(this,"init",{options:b});var e=this,k=a.series,t;this.eventOptions=this.eventOptions||{};e.chart=a;e.options=b=e.setOptions(b);e.linkedSeries=[];e.bindAxes();d(e,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});var l=b.events;L(l,function(a,b){c.isFunction(a)&&e.eventOptions[b]!==a&&(c.isFunction(e.eventOptions[b])&&r(e,b,e.eventOptions[b]),e.eventOptions[b]=a,C(e,b,a))});if(l&&l.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=
!0;e.getColor();e.getSymbol();e.parallelArrays.forEach(function(a){e[a+"Data"]||(e[a+"Data"]=[])});e.points||e.data||e.setData(b.data,!1);e.isCartesian&&(a.hasCartesianSeries=!0);k.length&&(t=k[k.length-1]);e._i=h(t&&t._i,-1)+1;a.orderSeries(this.insert(k));f(this,"afterInit")},insert:function(a){var b=this.options.index,d;if(z(b)){for(d=a.length;d--;)if(b>=h(a[d].options.index,a[d]._i)){a.splice(d+1,0,this);break}-1===d&&a.unshift(this);d+=1}else a.push(this);return h(d,a.length-1)},bindAxes:function(){var a=
this,b=a.options,d=a.chart,e;f(this,"bindAxes",null,function(){(a.axisTypes||[]).forEach(function(f){d[f].forEach(function(d){e=d.options;if(b[f]===e.index||void 0!==b[f]&&b[f]===e.id||void 0===b[f]&&0===e.index)a.insert(d.series),a[f]=d,d.isDirty=!0});a[f]||a.optionalAxis===f||c.error(18,!0,d)})})},updateParallelArrays:function(a,b){var d=a.series,c=arguments,f=z(b)?function(c){var f="y"===c&&d.toYData?d.toYData(a):a[c];d[c+"Data"][b]=f}:function(a){Array.prototype[b].apply(d[a+"Data"],Array.prototype.slice.call(c,
2))};d.parallelArrays.forEach(f)},hasData:function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,c=a.pointIntervalUnit,f=this.chart.time;b=h(b,a.pointStart,0);this.pointInterval=d=h(this.pointInterval,a.pointInterval,1);c&&(a=new f.Date(b),"day"===c?f.set("Date",a,f.get("Date",a)+d):"month"===c?f.set("Month",a,f.get("Month",a)+d):"year"===c&&f.set("FullYear",a,f.get("FullYear",
a)+d),d=a.getTime()-b);this.xIncrement=b+d;return b},setOptions:function(a){var d=this.chart,c=d.options,k=c.plotOptions,w=d.userOptions||{};a=e(a);d=d.styledMode;var l={plotOptions:k,userOptions:a};f(this,"setOptions",l);var g=l.plotOptions[this.type],q=w.plotOptions||{};this.userOptions=l.userOptions;w=e(g,k.series,w.plotOptions&&w.plotOptions[this.type],a);this.tooltipOptions=e(b.tooltip,b.plotOptions.series&&b.plotOptions.series.tooltip,b.plotOptions[this.type].tooltip,c.tooltip.userOptions,k.series&&
k.series.tooltip,k[this.type].tooltip,a.tooltip);this.stickyTracking=h(a.stickyTracking,q[this.type]&&q[this.type].stickyTracking,q.series&&q.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:w.stickyTracking);null===g.marker&&delete w.marker;this.zoneAxis=w.zoneAxis;c=this.zones=(w.zones||[]).slice();!w.negativeColor&&!w.negativeFillColor||w.zones||(k={value:w[this.zoneAxis+"Threshold"]||w.threshold||0,className:"highcharts-negative"},d||(k.color=w.negativeColor,k.fillColor=
w.negativeFillColor),c.push(k));c.length&&A(c[c.length-1].value)&&c.push(d?{}:{color:this.color,fillColor:this.fillColor});f(this,"afterSetOptions",{options:w});return w},getName:function(){return h(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,b,d){var c=this.chart,f=this.userOptions,e=a+"Index",k=a+"Counter",t=d?d.length:h(c.options.chart[a+"Count"],c[a+"Count"]);if(!b){var B=h(f[e],f["_"+e]);A(B)||(c.series.length||(c[k]=0),f["_"+e]=B=c[k]%t,c[k]+=1);d&&(b=d[B])}void 0!==B&&
(this[e]=B);this[a]=b},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||a[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},findPointIndex:function(a,b){var d=a.id;a=a.x;var c=this.points,f;if(d){var e=(d=this.chart.get(d))&&d.index;void 0!==e&&(f=!0)}void 0===e&&z(a)&&(e=this.xData.indexOf(a,b));
-1!==e&&void 0!==e&&this.cropped&&(e=e>=this.cropStart?e-this.cropStart:e);!f&&c[e]&&c[e].touched&&(e=void 0);return e},drawLegendSymbol:c.LegendSymbolMixin.drawLineMarker,updateData:function(a){var b=this.options,d=this.points,c=[],f,e,k,h=this.requireSorting,g=a.length===d.length,q=!0;this.xIncrement=null;a.forEach(function(a,e){var l=A(a)&&this.pointClass.prototype.optionsToObject.call({series:this},a)||{};var t=l.x;if(l.id||z(t))if(t=this.findPointIndex(l,k),-1===t||void 0===t?c.push(a):d[t]&&
a!==b.data[t]?(d[t].update(a,!1,null,!1),d[t].touched=!0,h&&(k=t+1)):d[t]&&(d[t].touched=!0),!g||e!==t||this.hasDerivedData)f=!0},this);if(f)for(a=d.length;a--;)(e=d[a])&&!e.touched&&e.remove(!1);else g?a.forEach(function(a,b){d[b].update&&a!==d[b].y&&d[b].update(a,!1,null,!1)}):q=!1;d.forEach(function(a){a&&(a.touched=!1)});if(!q)return!1;c.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);return!0},setData:function(a,b,d,f){var e=this,k=e.points,t=k&&k.length||0,g,q=e.options,v=e.chart,
m=null,B=e.xAxis,p=q.turboThreshold,I=this.xData,r=this.yData,x=(g=e.pointArrayMap)&&g.length,n=q.keys,y=0,E=1,A;a=a||[];g=a.length;b=h(b,!0);!1!==f&&g&&t&&!e.cropped&&!e.hasGroupedData&&e.visible&&!e.isSeriesBoosting&&(A=this.updateData(a));if(!A){e.xIncrement=null;e.colorCounter=0;this.parallelArrays.forEach(function(a){e[a+"Data"].length=0});if(p&&g>p){for(d=0;null===m&&d<g;)m=a[d],d++;if(z(m))for(d=0;d<g;d++)I[d]=this.autoIncrement(),r[d]=a[d];else if(F(m))if(x)for(d=0;d<g;d++)m=a[d],I[d]=m[0],
r[d]=m.slice(1,x+1);else for(n&&(y=n.indexOf("x"),E=n.indexOf("y"),y=0<=y?y:0,E=0<=E?E:1),d=0;d<g;d++)m=a[d],I[d]=m[y],r[d]=m[E];else c.error(12,!1,v)}else for(d=0;d<g;d++)void 0!==a[d]&&(m={series:e},e.pointClass.prototype.applyOptions.apply(m,[a[d]]),e.updateParallelArrays(m,d));r&&u(r[0])&&c.error(14,!0,v);e.data=[];e.options.data=e.userOptions.data=a;for(d=t;d--;)k[d]&&k[d].destroy&&k[d].destroy();B&&(B.minRange=B.userMinRange);e.isDirty=v.isDirtyBox=!0;e.isDirtyData=!!k;d=!1}"point"===q.legendType&&
(this.processData(),this.generatePoints());b&&v.redraw(d)},processData:function(a){var b=this.xData,d=this.yData,f=b.length;var e=0;var k=this.xAxis,h=this.options;var g=h.cropThreshold;var q=this.getExtremesFromAll||h.getExtremesFromAll,m=this.isCartesian;h=k&&k.val2lin;var v=k&&k.isLog,p=this.requireSorting;if(m&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(k){a=k.getExtremes();var r=a.min;var x=a.max}if(m&&this.sorted&&!q&&(!g||f>g||this.forceCrop))if(b[f-1]<r||b[0]>x)b=[],d=
[];else if(this.yData&&(b[0]<r||b[f-1]>x)){e=this.cropData(this.xData,this.yData,r,x);b=e.xData;d=e.yData;e=e.start;var n=!0}for(g=b.length||1;--g;)if(f=v?h(b[g])-h(b[g-1]):b[g]-b[g-1],0<f&&(void 0===u||f<u))var u=f;else 0>f&&p&&(c.error(15,!1,this.chart),p=!1);this.cropped=n;this.cropStart=e;this.processedXData=b;this.processedYData=d;this.closestPointRange=this.basePointRange=u},cropData:function(a,b,d,c,f){var e=a.length,k=0,t=e,g;f=h(f,this.cropShoulder);for(g=0;g<e;g++)if(a[g]>=d){k=Math.max(0,
g-f);break}for(d=g;d<e;d++)if(a[d]>c){t=d+f;break}return{xData:a.slice(k,t),yData:b.slice(k,t),start:k,end:t}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,e,h=this.processedXData,l=this.processedYData,g=this.pointClass,q=h.length,m=this.cropStart||0,v=this.hasGroupedData;a=a.keys;var p=[],r;c||v||(c=[],c.length=b.length,c=this.data=c);a&&v&&(this.options.keys=!1);for(r=0;r<q;r++){var x=m+r;if(v){var n=(new g).init(this,[h[r]].concat(y(l[r])));n.dataGroup=this.groupMap[r];n.dataGroup.options&&
(n.options=n.dataGroup.options,d(n,n.dataGroup.options),delete n.dataLabels)}else(n=c[x])||void 0===b[x]||(c[x]=n=(new g).init(this,b[x],h[r]));n&&(n.index=x,p[r]=n)}this.options.keys=a;if(c&&(q!==(e=c.length)||v))for(r=0;r<e;r++)r!==m||v||(r+=q),c[r]&&(c[r].destroyElements(),c[r].plotX=void 0);this.data=c;this.points=p;f(this,"afterGeneratePoints")},getXExtremes:function(a){return{min:p(a),max:m(a)}},getExtremes:function(a){var b=this.xAxis,d=this.yAxis,c=this.processedXData||this.xData,e=[],k=0,
h=0;var g=0;var q=this.requireSorting?this.cropShoulder:0,v=d?d.positiveValuesOnly:!1,r;a=a||this.stackedYData||this.processedYData||[];d=a.length;b&&(g=b.getExtremes(),h=g.min,g=g.max);for(r=0;r<d;r++){var x=c[r];var n=a[r];var u=(z(n)||F(n))&&(n.length||0<n||!v);x=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||!b||(c[r+q]||x)>=h&&(c[r-q]||x)<=g;if(u&&x)if(u=n.length)for(;u--;)z(n[u])&&(e[k++]=n[u]);else e[k++]=n}this.dataMin=p(e);this.dataMax=m(e);f(this,"afterGetExtremes")},
translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,d=this.xAxis,c=d.categories,e=this.yAxis,l=this.points,q=l.length,m=!!this.modifyValue,v,p=this.pointPlacementToXValue(),r=z(p),n=a.threshold,x=a.startFromThreshold?n:0,u,y=this.zoneAxis||"y",E=Number.MAX_VALUE;for(v=0;v<q;v++){var C=l[v],L=C.x;var D=C.y;var H=C.low,N=b&&e.stacks[(this.negStacks&&D<(x?0:n)?"-":"")+this.stackKey];e.positiveValuesOnly&&null!==D&&0>=D&&(C.isNull=!0);C.plotX=
u=g(Math.min(Math.max(-1E5,d.translate(L,0,0,0,1,p,"flags"===this.type)),1E5));if(b&&this.visible&&N&&N[L]){var W=this.getStackIndicator(W,L,this.index);if(!C.isNull){var P=N[L];var X=P.points[W.key]}}F(X)&&(H=X[0],D=X[1],H===x&&W.key===N[L].base&&(H=h(z(n)&&n,e.min)),e.positiveValuesOnly&&0>=H&&(H=null),C.total=C.stackTotal=P.total,C.percentage=P.total&&C.y/P.total*100,C.stackY=D,this.irregularWidths||P.setOffset(this.pointXOffset||0,this.barW||0));C.yBottom=A(H)?Math.min(Math.max(-1E5,e.translate(H,
0,1,0,1)),1E5):null;m&&(D=this.modifyValue(D,C));C.plotY=D="number"===typeof D&&Infinity!==D?Math.min(Math.max(-1E5,e.translate(D,0,1,0,1)),1E5):void 0;C.isInside=void 0!==D&&0<=D&&D<=e.len&&0<=u&&u<=d.len;C.clientX=r?g(d.translate(L,0,0,0,1,p)):u;C.negative=C[y]<(a[y+"Threshold"]||n||0);C.category=c&&void 0!==c[C.x]?c[C.x]:C.x;if(!C.isNull){void 0!==Y&&(E=Math.min(E,Math.abs(u-Y)));var Y=u}C.zone=this.zones.length&&C.getZone()}this.closestPointRangePx=E;f(this,"afterTranslate")},getValidPoints:function(a,
b,d){var c=this.chart;return(a||this.points||[]).filter(function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:d||!a.isNull})},getClipBox:function(a,b){var d=this.options,c=this.chart,f=c.inverted,e=this.xAxis,k=e&&this.yAxis;a&&!1===d.clip&&k?a=f?{y:-c.chartWidth+k.len+k.pos,height:c.chartWidth,width:c.chartHeight,x:-c.chartHeight+e.len+e.pos}:{y:-k.pos,height:c.chartHeight,width:c.chartWidth,x:-e.pos}:(a=this.clipBox||c.clipBox,b&&(a.width=c.plotSizeX,a.x=0));return b?{width:a.width,
x:a.x}:a},setClip:function(a){var b=this.chart,d=this.options,c=b.renderer,f=b.inverted,e=this.clipBox,k=this.getClipBox(a),h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,k.height,d.xAxis,d.yAxis].join(),g=b[h],q=b[h+"m"];g||(a&&(k.width=0,f&&(k.x=b.plotSizeX+(!1!==d.clip?0:b.plotTop)),b[h+"m"]=q=c.clipRect(f?b.plotSizeX+99:-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[h]=g=c.clipRect(k),g.count={length:0});a&&!g.count[this.index]&&(g.count[this.index]=!0,g.count.length+=
1);if(!1!==d.clip||a)this.group.clip(a||e?g:b.clipRect),this.markerGroup.clip(q),this.sharedClipKey=h;a||(g.count[this.index]&&(delete g.count[this.index],--g.count.length),0===g.count.length&&h&&b[h]&&(e||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,d=x(this.options.animation);if(a)this.setClip(d);else{var c=this.sharedClipKey;a=b[c];var f=this.getClipBox(d,!0);a&&a.animate(f,d);b[c+"m"]&&b[c+"m"].animate({width:f.width+99,x:f.x-(b.inverted?
0:99)},d);this.animate=null}},afterAnimate:function(){this.setClip();f(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,d,c=this.options.marker,f=this[this.specialGroup]||this.markerGroup;var e=this.xAxis;var g=h(c.enabled,!e||e.isRadial?!0:null,this.closestPointRangePx>=c.enabledThreshold*c.radius);if(!1!==c.enabled||this._hasPointMarkers)for(e=0;e<a.length;e++){var q=a[e];var m=(d=q.graphic)?"animate":"attr";var v=q.marker||{};var p=!!q.marker;
var r=g&&void 0===v.enabled||v.enabled;var n=!1!==q.isInside;if(r&&!q.isNull){r=h(v.symbol,this.symbol);var x=this.markerAttribs(q,q.selected&&"select");d?d[n?"show":"hide"](n).animate(x):n&&(0<x.width||q.hasImage)&&(q.graphic=d=b.renderer.symbol(r,x.x,x.y,x.width,x.height,p?v:c).add(f));if(d&&!b.styledMode)d[m](this.pointAttribs(q,q.selected&&"select"));d&&d.addClass(q.getClassName(),!0)}else d&&(q.graphic=d.destroy())}},markerAttribs:function(a,b){var d=this.options.marker,c=a.marker||{},f=c.symbol||
d.symbol,e=h(c.radius,d.radius);b&&(d=d.states[b],b=c.states&&c.states[b],e=h(b&&b.radius,d&&d.radius,e+(d&&d.radiusPlus||0)));a.hasImage=f&&0===f.indexOf("url");a.hasImage&&(e=0);a={x:Math.floor(a.plotX)-e,y:a.plotY-e};e&&(a.width=a.height=2*e);return a},pointAttribs:function(a,b){var d=this.options.marker,c=a&&a.options,f=c&&c.marker||{},e=this.color,k=c&&c.color,t=a&&a.color;c=h(f.lineWidth,d.lineWidth);var g=a&&a.zone&&a.zone.color;a=1;e=k||g||t||e;k=f.fillColor||d.fillColor||e;e=f.lineColor||
d.lineColor||e;b=b||"normal";d=d.states[b];b=f.states&&f.states[b]||{};c=h(b.lineWidth,d.lineWidth,c+h(b.lineWidthPlus,d.lineWidthPlus,0));k=b.fillColor||d.fillColor||k;e=b.lineColor||d.lineColor||e;a=h(b.opacity,d.opacity,a);return{stroke:e,"stroke-width":c,fill:k,opacity:a}},destroy:function(a){var b=this,d=b.chart,e=/AppleWebKit\/533/.test(v.navigator.userAgent),k,l,h=b.data||[],g,q;f(b,"destroy");a||r(b);(b.axisTypes||[]).forEach(function(a){(q=b[a])&&q.series&&(D(q.series,b),q.isDirty=q.forceRedraw=
!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(l=h.length;l--;)(g=h[l])&&g.destroy&&g.destroy();b.points=null;c.clearTimeout(b.animationTimeout);L(b,function(a,b){a instanceof E&&!a.survive&&(k=e&&"group"===b?"hide":"destroy",a[k]())});d.hoverSeries===b&&(d.hoverSeries=null);D(d.series,b);d.orderSeries();L(b,function(d,c){a&&"hcEvents"===c||delete b[c]})},getGraphPath:function(a,b,d){var c=this,f=c.options,e=f.step,k,h=[],t=[],g;a=a||c.points;(k=a.reversed)&&a.reverse();(e={right:1,center:2}[e]||
e&&3)&&k&&(e=4-e);!f.connectNulls||b||d||(a=this.getValidPoints(a));a.forEach(function(k,l){var q=k.plotX,v=k.plotY,m=a[l-1];(k.leftCliff||m&&m.rightCliff)&&!d&&(g=!0);k.isNull&&!A(b)&&0<l?g=!f.connectNulls:k.isNull&&!b?g=!0:(0===l||g?l=["M",k.plotX,k.plotY]:c.getPointSpline?l=c.getPointSpline(a,k,l):e?(l=1===e?["L",m.plotX,v]:2===e?["L",(m.plotX+q)/2,m.plotY,"L",(m.plotX+q)/2,v]:["L",q,m.plotY],l.push("L",q,v)):l=["L",q,v],t.push(k.x),e&&(t.push(k.x),2===e&&t.push(k.x)),h.push.apply(h,l),g=!1)});
h.xMap=t;return c.graphPath=h},drawGraph:function(){var a=this,b=this.options,d=(this.gappedPath||this.getGraphPath).call(this),c=this.chart.styledMode,f=[["graph","highcharts-graph"]];c||f[0].push(b.lineColor||this.color||"#cccccc",b.dashStyle);f=a.getZonesGraphs(f);f.forEach(function(f,e){var k=f[0],l=a[k],h=l?"animate":"attr";l?(l.endX=a.preventGraphAnimation?null:d.xMap,l.animate({d:d})):d.length&&(a[k]=l=a.chart.renderer.path(d).addClass(f[1]).attr({zIndex:1}).add(a.group));l&&!c&&(k={stroke:f[2],
"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?k.dashstyle=f[3]:"square"!==b.linecap&&(k["stroke-linecap"]=k["stroke-linejoin"]="round"),l[h](k).shadow(2>e&&b.shadow));l&&(l.startX=d.xMap,l.isArea=d.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(b,d){d=["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+(b.className||"")];this.chart.styledMode||d.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(d)},this);return a},applyZones:function(){var a=
this,b=this.chart,d=b.renderer,c=this.zones,f,e,g=this.clips||[],q,m=this.graph,v=this.area,p=Math.max(b.chartWidth,b.chartHeight),r=this[(this.zoneAxis||"y")+"Axis"],n=b.inverted,x,u,y,E=!1;if(c.length&&(m||v)&&r&&void 0!==r.min){var z=r.reversed;var A=r.horiz;m&&!this.showLine&&m.hide();v&&v.hide();var C=r.getExtremes();c.forEach(function(c,k){f=z?A?b.plotWidth:0:A?0:r.toPixels(C.min)||0;f=Math.min(Math.max(h(e,f),0),p);e=Math.min(Math.max(Math.round(r.toPixels(h(c.value,C.max),!0)||0),0),p);E&&
(f=e=r.toPixels(C.max));x=Math.abs(f-e);u=Math.min(f,e);y=Math.max(f,e);r.isXAxis?(q={x:n?y:u,y:0,width:x,height:p},A||(q.x=b.plotHeight-q.x)):(q={x:0,y:n?y:u,width:p,height:x},A&&(q.y=b.plotWidth-q.y));n&&d.isVML&&(q=r.isXAxis?{x:0,y:z?u:y,height:q.width,width:b.chartWidth}:{x:q.y-b.plotLeft-b.spacingBox.x,y:0,width:q.height,height:b.chartHeight});g[k]?g[k].animate(q):g[k]=d.clipRect(q);m&&a["zone-graph-"+k].clip(g[k]);v&&a["zone-area-"+k].clip(g[k]);E=c.value>C.max;a.resetZones&&0===e&&(e=void 0)});
this.clips=g}else a.visible&&(m&&m.show(!0),v&&v.show(!0))},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){d[b]&&(c.renderer.isVML&&d[b].attr({width:d.yAxis.len,height:d.xAxis.len}),d[b].width=d.yAxis.len,d[b].height=d.xAxis.len,d[b].invert(a))})}var d=this,c=d.chart;if(d.xAxis){var f=C(c,"resize",b);C(d,"destroy",f);b(a);d.invertGroups=b}},plotGroup:function(a,b,d,c,f){var e=this[a],k=!e;k&&(this[a]=e=this.chart.renderer.g().attr({zIndex:c||.1}).add(f));e.addClass("highcharts-"+
b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(A(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(e.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);e.attr({visibility:d})[k?"attr":"animate"](this.getPlotBox());return e},getPlotBox:function(){var a=this.chart,b=this.xAxis,d=this.yAxis;a.inverted&&(b=d,d=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:d?d.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=
this,b=a.chart,d=a.options,c=!!a.animate&&b.renderer.isSVG&&x(d.animation).duration,e=a.visible?"inherit":"hidden",l=d.zIndex,h=a.hasRendered,g=b.seriesGroup,m=b.inverted;f(this,"render");var v=a.plotGroup("group","series",e,l,g);a.markerGroup=a.plotGroup("markerGroup","markers",e,l,g);c&&a.animate(!0);v.inverted=a.isCartesian||a.invertable?m:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&
!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(m);!1===d.clip||a.sharedClipKey||h||v.clip(b.clipRect);c&&a.animate();h||(a.animationTimeout=q(function(){a.afterAnimate()},c));a.isDirty=!1;a.hasRendered=!0;f(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,c=this.xAxis,f=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:h(c&&c.left,a.plotLeft),translateY:h(f&&f.top,a.plotTop)}));this.translate();
this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var d=this.xAxis,c=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?d.len-a.chartY+d.pos:a.chartX-d.pos,plotY:f?c.len-a.chartX+c.pos:a.chartY-c.pos},b,a)},buildKDTree:function(a){function b(a,c,f){var e;if(e=a&&a.length){var k=d.kdAxisArray[c%f];a.sort(function(a,b){return a[k]-b[k]});e=Math.floor(e/2);return{point:a[e],left:b(a.slice(0,e),c+1,f),right:b(a.slice(e+1),c+1,f)}}}this.buildingKdTree=
!0;var d=this,c=-1<d.options.findNearestPointBy.indexOf("y")?2:1;delete d.kdTree;q(function(){d.kdTree=b(d.getValidPoints(null,!d.directTouch),c,c);d.buildingKdTree=!1},d.options.kdNow||a&&"touchstart"===a.type?0:1)},searchKDTree:function(a,b,d){function c(a,b,d,l){var g=b.point,q=f.kdAxisArray[d%l],t=g;var m=A(a[e])&&A(g[e])?Math.pow(a[e]-g[e],2):null;var v=A(a[k])&&A(g[k])?Math.pow(a[k]-g[k],2):null;v=(m||0)+(v||0);g.dist=A(v)?Math.sqrt(v):Number.MAX_VALUE;g.distX=A(m)?Math.sqrt(m):Number.MAX_VALUE;
q=a[q]-g[q];v=0>q?"left":"right";m=0>q?"right":"left";b[v]&&(v=c(a,b[v],d+1,l),t=v[h]<t[h]?v:g);b[m]&&Math.sqrt(q*q)<t[h]&&(a=c(a,b[m],d+1,l),t=a[h]<t[h]?a:t);return t}var f=this,e=this.kdAxisArray[0],k=this.kdAxisArray[1],h=b?"distX":"dist";b=-1<f.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(d);if(this.kdTree)return c(a,this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.options.pointPlacement;"between"===a&&(a=.5);z(a)&&(a*=h(this.options.pointRange||
this.xAxis.pointRange));return a}});""});N(H,"parts/Stacking.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.objectEach;n=c.Axis;var F=c.Chart,z=c.correctFloat,u=c.destroyObjectProperties,L=c.format,y=c.pick,C=c.Series;c.StackItem=function(c,m,p,g,b){var a=c.chart.inverted;this.axis=c;this.isNegative=p;this.options=m=m||{};this.x=g;this.total=null;this.points={};this.stack=b;this.rightCliff=this.leftCliff=0;this.alignOptions={align:m.align||(a?p?"left":"right":
"center"),verticalAlign:m.verticalAlign||(a?"middle":p?"bottom":"top"),y:m.y,x:m.x};this.textAlign=m.textAlign||(a?p?"right":"left":"center")};c.StackItem.prototype={destroy:function(){u(this,this.axis)},render:function(c){var m=this.axis.chart,p=this.options,g=p.format;g=g?L(g,this,m.time):p.formatter.call(this);this.label?this.label.attr({text:g,visibility:"hidden"}):(this.label=m.renderer.label(g,null,null,p.shape,null,null,p.useHTML,!1,"stack-labels"),g={text:g,align:this.textAlign,rotation:p.rotation,
padding:y(p.padding,0),visibility:"hidden"},this.label.attr(g),m.styledMode||this.label.css(p.style),this.label.added||this.label.add(c));this.label.labelrank=m.plotHeight},setOffset:function(c,m,p,g,b){var a=this.axis,d=a.chart;g=a.translate(a.usePercentage?100:g?g:this.total,0,0,0,1);p=a.translate(p?p:0);p=A(g)&&Math.abs(g-p);c=y(b,d.xAxis[0].translate(this.x))+c;a=A(g)&&this.getStackBox(d,this,c,g,m,p,a);m=this.label;c=this.isNegative;b="justify"===y(this.options.overflow,"justify");if(m&&a){p=
m.getBBox();var f=d.inverted?c?p.width:0:p.width/2,e=d.inverted?p.height/2:c?-4:p.height+4;this.alignOptions.x=y(this.options.x,0);m.align(this.alignOptions,null,a);g=m.alignAttr;m.show();g.y-=e;b&&(g.x-=f,C.prototype.justifyDataLabel.call(this.axis,m,this.alignOptions,g,p,a),g.x+=f);g.x=m.alignAttr.x;m.attr({x:g.x,y:g.y});y(!b&&this.options.crop,!0)&&((d=d.isInsidePlot(m.x+(d.inverted?0:-p.width/2),m.y)&&d.isInsidePlot(m.x+(d.inverted?c?-p.width:p.width:p.width/2),m.y+p.height))||m.hide())}},getStackBox:function(c,
m,p,g,b,a,d){var f=m.axis.reversed,e=c.inverted;c=d.height+d.pos-(e?c.plotLeft:c.plotTop);m=m.isNegative&&!f||!m.isNegative&&f;return{x:e?m?g:g-a:p,y:e?c-p-b:m?c-g-a:c-g,width:e?a:b,height:e?b:a}}};F.prototype.getStacks=function(){var c=this,m=c.inverted;c.yAxis.forEach(function(c){c.stacks&&c.hasVisibleSeries&&(c.oldStacks=c.stacks)});c.series.forEach(function(p){var g=p.xAxis&&p.xAxis.options||{};!p.options.stacking||!0!==p.visible&&!1!==c.options.chart.ignoreHiddenSeries||(p.stackKey=[p.type,y(p.options.stack,
""),m?g.top:g.left,m?g.height:g.width].join())})};n.prototype.buildStacks=function(){var c=this.series,m=y(this.options.reversedStacks,!0),p=c.length,g;if(!this.isXAxis){this.usePercentage=!1;for(g=p;g--;)c[m?g:p-g-1].setStackedPoints();for(g=0;g<p;g++)c[g].modifyStacks()}};n.prototype.renderStackTotals=function(){var c=this.chart,m=c.renderer,p=this.stacks,g=this.stackTotalGroup;g||(this.stackTotalGroup=g=m.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());g.translate(c.plotLeft,c.plotTop);
D(p,function(b){D(b,function(a){a.render(g)})})};n.prototype.resetStacks=function(){var c=this,m=c.stacks;c.isXAxis||D(m,function(m){D(m,function(g,b){g.touched<c.stacksTouched?(g.destroy(),delete m[b]):(g.total=null,g.cumulative=null)})})};n.prototype.cleanStacks=function(){if(!this.isXAxis){if(this.oldStacks)var c=this.stacks=this.oldStacks;D(c,function(c){D(c,function(c){c.cumulative=c.total})})}};C.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var n=
this.processedXData,m=this.processedYData,p=[],g=m.length,b=this.options,a=b.threshold,d=y(b.startFromThreshold&&a,0),f=b.stack;b=b.stacking;var e=this.stackKey,h="-"+e,r=this.negStacks,u=this.yAxis,q=u.stacks,v=u.oldStacks,k,t;u.stacksTouched+=1;for(t=0;t<g;t++){var B=n[t];var I=m[t];var w=this.getStackIndicator(w,B,this.index);var l=w.key;var J=(k=r&&I<(d?0:a))?h:e;q[J]||(q[J]={});q[J][B]||(v[J]&&v[J][B]?(q[J][B]=v[J][B],q[J][B].total=null):q[J][B]=new c.StackItem(u,u.options.stackLabels,k,B,f));
J=q[J][B];null!==I?(J.points[l]=J.points[this.index]=[y(J.cumulative,d)],A(J.cumulative)||(J.base=l),J.touched=u.stacksTouched,0<w.index&&!1===this.singleStacks&&(J.points[l][0]=J.points[this.index+","+B+",0"][0])):J.points[l]=J.points[this.index]=null;"percent"===b?(k=k?e:h,r&&q[k]&&q[k][B]?(k=q[k][B],J.total=k.total=Math.max(k.total,J.total)+Math.abs(I)||0):J.total=z(J.total+(Math.abs(I)||0))):J.total=z(J.total+(I||0));J.cumulative=y(J.cumulative,d)+(I||0);null!==I&&(J.points[l].push(J.cumulative),
p[t]=J.cumulative)}"percent"===b&&(u.usePercentage=!0);this.stackedYData=p;u.oldStacks={}}};C.prototype.modifyStacks=function(){var c=this,m=c.stackKey,p=c.yAxis.stacks,g=c.processedXData,b,a=c.options.stacking;c[a+"Stacker"]&&[m,"-"+m].forEach(function(d){for(var f=g.length,e,h;f--;)if(e=g[f],b=c.getStackIndicator(b,e,c.index,d),h=(e=p[d]&&p[d][e])&&e.points[b.key])c[a+"Stacker"](h,e,f)})};C.prototype.percentStacker=function(c,m,p){m=m.total?100/m.total:0;c[0]=z(c[0]*m);c[1]=z(c[1]*m);this.stackedYData[p]=
c[1]};C.prototype.getStackIndicator=function(c,m,p,g){!A(c)||c.x!==m||g&&c.key!==g?c={x:m,index:0,key:g}:c.index++;c.key=[p,m,c.index].join();return c}});N(H,"parts/Dynamics.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.erase,F=n.isArray,z=n.isNumber,u=n.isObject,L=n.isString,y=n.objectEach,C=n.splat,x=c.addEvent,m=c.animate,p=c.Axis;n=c.Chart;var g=c.createElement,b=c.css,a=c.extend,d=c.fireEvent,f=c.merge,e=c.pick,h=c.Point,r=c.Series,E=c.seriesTypes,q=c.setAnimation;
c.cleanRecursively=function(a,b){var d={};y(a,function(f,e){if(u(a[e],!0)&&!a.nodeType&&b[e])f=c.cleanRecursively(a[e],b[e]),Object.keys(f).length&&(d[e]=f);else if(u(a[e])||a[e]!==b[e])d[e]=a[e]});return d};a(n.prototype,{addSeries:function(a,b,c){var f,k=this;a&&(b=e(b,!0),d(k,"addSeries",{options:a},function(){f=k.initSeries(a);k.isDirtyLegend=!0;k.linkSeries();d(k,"afterAddSeries",{series:f});b&&k.redraw(c)}));return f},addAxis:function(a,b,d,c){return this.createAxis(b?"xAxis":"yAxis",{axis:a,
redraw:d,animation:c})},addColorAxis:function(a,b,d){return this.createAxis("colorAxis",{axis:a,redraw:b,animation:d})},createAxis:function(a,b){var d=this.options,k="colorAxis"===a,h=b.redraw,g=b.animation;b=f(b.axis,{index:this[a].length,isX:"xAxis"===a});var l=k?new c.ColorAxis(this,b):new p(this,b);d[a]=C(d[a]||{});d[a].push(b);k&&(this.isDirtyLegend=!0);e(h,!0)&&this.redraw(g);return l},showLoading:function(d){var c=this,f=c.options,h=c.loadingDiv,q=f.loading,v=function(){h&&b(h,{left:c.plotLeft+
"px",top:c.plotTop+"px",width:c.plotWidth+"px",height:c.plotHeight+"px"})};h||(c.loadingDiv=h=g("div",{className:"highcharts-loading highcharts-loading-hidden"},null,c.container),c.loadingSpan=g("span",{className:"highcharts-loading-inner"},null,h),x(c,"redraw",v));h.className="highcharts-loading";c.loadingSpan.innerHTML=e(d,f.lang.loading,"");c.styledMode||(b(h,a(q.style,{zIndex:10})),b(c.loadingSpan,q.labelStyle),c.loadingShown||(b(h,{opacity:0,display:""}),m(h,{opacity:q.style.opacity||.5},{duration:q.showDuration||
0})));c.loadingShown=!0;v()},hideLoading:function(){var a=this.options,d=this.loadingDiv;d&&(d.className="highcharts-loading highcharts-loading-hidden",this.styledMode||m(d,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){b(d,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),collectionsWithUpdate:"xAxis yAxis zAxis series colorAxis pane".split(" "),update:function(a,b,h,g){var k=this,q={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"},l,m,t,v=a.isResponsiveOptions,r=[];d(k,"update",{options:a});v||k.setResponsive(!1,!0);a=c.cleanRecursively(a,k.options);f(!0,k.userOptions,a);if(l=a.chart){f(!0,k.options.chart,
l);"className"in l&&k.setClassName(l.className);"reflow"in l&&k.setReflow(l.reflow);if("inverted"in l||"polar"in l||"type"in l){k.propFromSeries();var p=!0}"alignTicks"in l&&(p=!0);y(l,function(a,b){-1!==k.propsRequireUpdateSeries.indexOf("chart."+b)&&(m=!0);-1!==k.propsRequireDirtyBox.indexOf(b)&&(k.isDirtyBox=!0);v||-1===k.propsRequireReflow.indexOf(b)||(t=!0)});!k.styledMode&&"style"in l&&k.renderer.setStyle(l.style)}!k.styledMode&&a.colors&&(this.options.colors=a.colors);a.plotOptions&&f(!0,this.options.plotOptions,
a.plotOptions);a.time&&this.time===c.time&&(this.time=new c.Time(a.time));y(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[q[b]])k[q[b]](a);"chart"!==b&&-1!==k.propsRequireUpdateSeries.indexOf(b)&&(m=!0)});this.collectionsWithUpdate.forEach(function(b){if(a[b]){if("series"===b){var d=[];k[b].forEach(function(a,b){a.options.isInternal||d.push(e(a.options.index,b))})}C(a[b]).forEach(function(a,c){(c=A(a.id)&&k.get(a.id)||k[b][d?d[c]:c])&&c.coll===
b&&(c.update(a,!1),h&&(c.touched=!0));!c&&h&&k.collectionsWithInit[b]&&(k.collectionsWithInit[b][0].apply(k,[a].concat(k.collectionsWithInit[b][1]||[]).concat([!1])).touched=!0)});h&&k[b].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:r.push(a)})}});r.forEach(function(a){a.remove&&a.remove(!1)});p&&k.axes.forEach(function(a){a.update({},!1)});m&&k.series.forEach(function(a){a.update({},!1)});a.loading&&f(!0,k.options.loading,a.loading);p=l&&l.width;l=l&&l.height;L(l)&&(l=c.relativeLength(l,
p||k.chartWidth));t||z(p)&&p!==k.chartWidth||z(l)&&l!==k.chartHeight?k.setSize(p,l,g):e(b,!0)&&k.redraw(g);d(k,"afterUpdate",{options:a,redraw:b,animation:g})},setSubtitle:function(a,b){this.applyDescription("subtitle",a);this.layOutTitles(b)},setCaption:function(a,b){this.applyDescription("caption",a);this.layOutTitles(b)}});n.prototype.collectionsWithInit={xAxis:[n.prototype.addAxis,[!0]],yAxis:[n.prototype.addAxis,[!1]],colorAxis:[n.prototype.addColorAxis,[!1]],series:[n.prototype.addSeries]};
a(h.prototype,{update:function(a,b,d,c){function f(){k.applyOptions(a);null===k.y&&h&&(k.graphic=h.destroy());u(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(k.graphic=h.destroy()),a&&a.dataLabels&&k.dataLabel&&(k.dataLabel=k.dataLabel.destroy()),k.connector&&(k.connector=k.connector.destroy()));g=k.index;l.updateParallelArrays(k,g);m.data[g]=u(m.data[g],!0)||u(a,!0)?k.options:e(a,m.data[g]);l.isDirty=l.isDirtyData=!0;!l.fixedBox&&l.hasCartesianSeries&&(q.isDirtyBox=!0);"point"===
m.legendType&&(q.isDirtyLegend=!0);b&&q.redraw(d)}var k=this,l=k.series,h=k.graphic,g,q=l.chart,m=l.options;b=e(b,!0);!1===c?f():k.firePointEvent("update",{options:a},f)},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),a,b)}});a(r.prototype,{addPoint:function(a,b,c,f,h){var k=this.options,l=this.data,g=this.chart,q=this.xAxis;q=q&&q.hasNames&&q.names;var m=k.data,t=this.xData,v;b=e(b,!0);var r={series:this};this.pointClass.prototype.applyOptions.apply(r,[a]);var p=r.x;
var n=t.length;if(this.requireSorting&&p<t[n-1])for(v=!0;n&&t[n-1]>p;)n--;this.updateParallelArrays(r,"splice",n,0,0);this.updateParallelArrays(r,n);q&&r.name&&(q[p]=r.name);m.splice(n,0,a);v&&(this.data.splice(n,0,null),this.processData());"point"===k.legendType&&this.generatePoints();c&&(l[0]&&l[0].remove?l[0].remove(!1):(l.shift(),this.updateParallelArrays(r,"shift"),m.shift()));!1!==h&&d(this,"addPoint",{point:r});this.isDirtyData=this.isDirty=!0;b&&g.redraw(f)},removePoint:function(a,b,d){var c=
this,f=c.data,k=f[a],l=c.points,h=c.chart,g=function(){l&&l.length===f.length&&l.splice(a,1);f.splice(a,1);c.options.data.splice(a,1);c.updateParallelArrays(k||{series:c},"splice",a,1);k&&k.destroy();c.isDirty=!0;c.isDirtyData=!0;b&&h.redraw()};q(d,h);b=e(b,!0);k?k.firePointEvent("remove",null,g):g()},remove:function(a,b,c,f){function k(){h.destroy(f);h.remove=null;l.isDirtyLegend=l.isDirtyBox=!0;l.linkSeries();e(a,!0)&&l.redraw(b)}var h=this,l=h.chart;!1!==c?d(h,"remove",null,k):k()},update:function(b,
k){b=c.cleanRecursively(b,this.userOptions);d(this,"update",{options:b});var h=this,g=h.chart,q=h.userOptions,m=h.initialType||h.type,l=b.type||q.type||g.options.chart.type,r=!(this.hasDerivedData||b.dataGrouping||l&&l!==this.type||void 0!==b.pointStart||b.pointInterval||b.pointIntervalUnit||b.keys),p=E[m].prototype,v,n=["group","markerGroup","dataLabelsGroup","transformGroup"],u=["eventOptions","navigatorSeries","baseSeries"],x=h.finishedAnimating&&{animation:!1},y={};r&&(u.push("data","isDirtyData",
"points","processedXData","processedYData","xIncrement","_hasPointMarkers","_hasPointLabels","mapMap","mapData","minY","maxY","minX","maxX"),!1!==b.visible&&u.push("area","graph"),h.parallelArrays.forEach(function(a){u.push(a+"Data")}),b.data&&this.setData(b.data,!1));b=f(q,x,{index:void 0===q.index?h.index:q.index,pointStart:e(q.pointStart,h.xData[0])},!r&&{data:h.options.data},b);r&&b.data&&(b.data=h.options.data);u=n.concat(u);u.forEach(function(a){u[a]=h[a];delete h[a]});h.remove(!1,null,!1,!0);
for(v in p)h[v]=void 0;E[l||m]?a(h,E[l||m].prototype):c.error(17,!0,g);u.forEach(function(a){h[a]=u[a]});h.init(g,b);if(r&&this.points){var z=h.options;!1===z.visible?(y.graphic=1,y.dataLabel=1):h._hasPointLabels||(l=z.marker,p=z.dataLabels,l&&(!1===l.enabled||"symbol"in l)&&(y.graphic=1),p&&!1===p.enabled&&(y.dataLabel=1));this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(y).length&&a.destroyElements(y),!1===z.showInLegend&&a.legendItem&&g.legend.destroyItem(a))},this)}b.zIndex!==
q.zIndex&&n.forEach(function(a){h[a]&&h[a].attr({zIndex:b.zIndex})});h.initialType=m;g.linkSeries();d(this,"afterUpdate");e(k,!0)&&g.redraw(r?void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});a(p.prototype,{update:function(b,d){var c=this.chart,k=b&&b.events||{};b=f(this.userOptions,b);c.options[this.coll].indexOf&&(c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)]=b);y(c.options[this.coll].events,function(a,b){"undefined"===
typeof k[b]&&(k[b]=void 0)});this.destroy(!0);this.init(c,a(b,{events:k}));c.isDirtyBox=!0;e(d,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,d=this.coll,c=this.series,f=c.length;f--;)c[f]&&c[f].remove(!1);D(b.axes,this);D(b[d],this);F(b.options[d])?b.options[d].splice(this.options.index,1):delete b.options[d];b[d].forEach(function(a,b){a.options.index=a.userOptions.index=b});this.destroy();b.isDirtyBox=!0;e(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,
b){this.update({categories:a},b)}})});N(H,"parts/AreaSeries.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.objectEach,D=c.color,F=c.pick,z=c.Series;n=c.seriesType;n("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(c){var n=[],u=[],z=this.xAxis,x=this.yAxis,m=x.stacks[this.stackKey],p={},g=this.index,b=x.series,a=b.length,d=F(x.options.reversedStacks,!0)?1:-1,f;c=c||this.points;if(this.options.stacking){for(f=0;f<c.length;f++)c[f].leftNull=
c[f].rightNull=null,p[c[f].x]=c[f];A(m,function(a,b){null!==a.total&&u.push(b)});u.sort(function(a,b){return a-b});var e=b.map(function(a){return a.visible});u.forEach(function(b,c){var h=0,q,r;if(p[b]&&!p[b].isNull)n.push(p[b]),[-1,1].forEach(function(k){var h=1===k?"rightNull":"leftNull",v=0,n=m[u[c+k]];if(n)for(f=g;0<=f&&f<a;)q=n.points[f],q||(f===g?p[b][h]=!0:e[f]&&(r=m[b].points[f])&&(v-=r[1]-r[0])),f+=d;p[b][1===k?"rightCliff":"leftCliff"]=v});else{for(f=g;0<=f&&f<a;){if(q=m[b].points[f]){h=
q[1];break}f+=d}h=x.translate(h,0,1,0,1);n.push({isNull:!0,plotX:z.translate(b,0,0,0,1),x:b,plotY:h,yBottom:h})}})}return n},getGraphPath:function(n){var u=z.prototype.getGraphPath,y=this.options,A=y.stacking,x=this.yAxis,m,p=[],g=[],b=this.index,a=x.stacks[this.stackKey],d=y.threshold,f=Math.round(x.getThreshold(y.threshold));y=c.pick(y.connectNulls,"percent"===A);var e=function(c,e,k){var h=n[c];c=A&&a[h.x].points[b];var q=h[k+"Null"]||0;k=h[k+"Cliff"]||0;h=!0;if(k||q){var m=(q?c[0]:c[1])+k;var v=
c[0]+k;h=!!q}else!A&&n[e]&&n[e].isNull&&(m=v=d);void 0!==m&&(g.push({plotX:r,plotY:null===m?f:x.getThreshold(m),isNull:h,isCliff:!0}),p.push({plotX:r,plotY:null===v?f:x.getThreshold(v),doCurve:!1}))};n=n||this.points;A&&(n=this.getStackPoints(n));for(m=0;m<n.length;m++){var h=n[m].isNull;var r=F(n[m].rectPlotX,n[m].plotX);var E=F(n[m].yBottom,f);if(!h||y)y||e(m,m-1,"left"),h&&!A&&y||(g.push(n[m]),p.push({x:m,plotX:r,plotY:E})),y||e(m,m+1,"right")}m=u.call(this,g,!0,!0);p.reversed=!0;h=u.call(this,
p,!0,!0);h.length&&(h[0]="L");h=m.concat(h);u=u.call(this,g,!1,y);h.xMap=m.xMap;this.areaPath=h;return u},drawGraph:function(){this.areaPath=[];z.prototype.drawGraph.apply(this);var c=this,n=this.areaPath,y=this.options,A=[["area","highcharts-area",this.color,y.fillColor]];this.zones.forEach(function(n,m){A.push(["zone-area-"+m,"highcharts-area highcharts-zone-area-"+m+" "+n.className,n.color||c.color,n.fillColor||y.fillColor])});A.forEach(function(u){var m=u[0],p=c[m],g=p?"animate":"attr",b={};p?
(p.endX=c.preventGraphAnimation?null:n.xMap,p.animate({d:n})):(b.zIndex=0,p=c[m]=c.chart.renderer.path(n).addClass(u[1]).add(c.group),p.isArea=!0);c.chart.styledMode||(b.fill=F(u[3],D(u[2]).setOpacity(F(y.fillOpacity,.75)).get()));p[g](b);p.startX=n.xMap;p.shiftUnit=y.step?2:1})},drawLegendSymbol:c.LegendSymbolMixin.drawRectangle});""});N(H,"parts/SplineSeries.js",[H["parts/Globals.js"]],function(c){var n=c.pick;c=c.seriesType;c("spline","line",{},{getPointSpline:function(c,D,F){var z=D.plotX,u=D.plotY,
A=c[F-1];F=c[F+1];if(A&&!A.isNull&&!1!==A.doCurve&&!D.isCliff&&F&&!F.isNull&&!1!==F.doCurve&&!D.isCliff){c=A.plotY;var y=F.plotX;F=F.plotY;var C=0;var x=(1.5*z+A.plotX)/2.5;var m=(1.5*u+c)/2.5;y=(1.5*z+y)/2.5;var p=(1.5*u+F)/2.5;y!==x&&(C=(p-m)*(y-z)/(y-x)+u-p);m+=C;p+=C;m>c&&m>u?(m=Math.max(c,u),p=2*u-m):m<c&&m<u&&(m=Math.min(c,u),p=2*u-m);p>F&&p>u?(p=Math.max(F,u),m=2*u-p):p<F&&p<u&&(p=Math.min(F,u),m=2*u-p);D.rightContX=y;D.rightContY=p}D=["C",n(A.rightContX,A.plotX),n(A.rightContY,A.plotY),n(x,
z),n(m,u),z,u];A.rightContX=A.rightContY=null;return D}});""});N(H,"parts/AreaSplineSeries.js",[H["parts/Globals.js"]],function(c){var n=c.seriesTypes.area.prototype,A=c.seriesType;A("areaspline","spline",c.defaultPlotOptions.area,{getStackPoints:n.getStackPoints,getGraphPath:n.getGraphPath,drawGraph:n.drawGraph,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle});""});N(H,"parts/ColumnSeries.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isNumber,F=c.animObject,
z=c.color,u=c.extend,L=c.merge,y=c.pick,C=c.Series;n=c.seriesType;var x=c.svg;n("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group",
"dataLabelsGroup"],negStacks:!0,init:function(){C.prototype.init.apply(this,arguments);var c=this,p=c.chart;p.hasRendered&&p.series.forEach(function(g){g.type===c.type&&(g.isDirty=!0)})},getColumnMetrics:function(){var c=this,p=c.options,g=c.xAxis,b=c.yAxis,a=g.options.reversedStacks;a=g.reversed&&!a||!g.reversed&&a;var d,f={},e=0;!1===p.grouping?e=1:c.chart.series.forEach(function(a){var h=a.yAxis,k=a.options;if(a.type===c.type&&(a.visible||!c.chart.options.chart.ignoreHiddenSeries)&&b.len===h.len&&
b.pos===h.pos){if(k.stacking){d=a.stackKey;void 0===f[d]&&(f[d]=e++);var g=f[d]}else!1!==k.grouping&&(g=e++);a.columnIndex=g}});var h=Math.min(Math.abs(g.transA)*(g.ordinalSlope||p.pointRange||g.closestPointRange||g.tickInterval||1),g.len),r=h*p.groupPadding,n=(h-2*r)/(e||1);p=Math.min(p.maxPointWidth||g.len,y(p.pointWidth,n*(1-2*p.pointPadding)));c.columnMetrics={width:p,offset:(n-p)/2+(r+((c.columnIndex||0)+(a?1:0))*n-h/2)*(a?-1:1)};return c.columnMetrics},crispCol:function(c,p,g,b){var a=this.chart,
d=this.borderWidth,f=-(d%2?.5:0);d=d%2?.5:1;a.inverted&&a.renderer.isVML&&(d+=1);this.options.crisp&&(g=Math.round(c+g)+f,c=Math.round(c)+f,g-=c);b=Math.round(p+b)+d;f=.5>=Math.abs(p)&&.5<b;p=Math.round(p)+d;b-=p;f&&b&&(--p,b+=1);return{x:c,y:p,width:g,height:b}},translate:function(){var c=this,p=c.chart,g=c.options,b=c.dense=2>c.closestPointRange*c.xAxis.transA;b=c.borderWidth=y(g.borderWidth,b?0:1);var a=c.yAxis,d=g.threshold,f=c.translatedThreshold=a.getThreshold(d),e=y(g.minPointLength,5),h=c.getColumnMetrics(),
r=h.width,n=c.barW=Math.max(r,1+2*b),q=c.pointXOffset=h.offset,v=c.dataMin,k=c.dataMax;p.inverted&&(f-=.5);g.pointPadding&&(n=Math.ceil(n));C.prototype.translate.apply(c);c.points.forEach(function(b){var h=y(b.yBottom,f),g=999+Math.abs(h),m=r;g=Math.min(Math.max(-g,b.plotY),a.len+g);var l=b.plotX+q,t=n,u=Math.min(g,h),x=Math.max(g,h)-u;if(e&&Math.abs(x)<e){x=e;var z=!a.reversed&&!b.negative||a.reversed&&b.negative;b.y===d&&c.dataMax<=d&&a.min<d&&v!==k&&(z=!z);u=Math.abs(u-f)>e?h-e:f-(z?e:0)}A(b.options.pointWidth)&&
(m=t=Math.ceil(b.options.pointWidth),l-=Math.round((m-r)/2));b.barX=l;b.pointWidth=m;b.tooltipPos=p.inverted?[a.len+a.pos-p.plotLeft-g,c.xAxis.len-l-t/2,x]:[l+t/2,g+a.pos-p.plotTop,x];b.shapeType=c.pointClass.prototype.shapeType||"rect";b.shapeArgs=c.crispCol.apply(c,b.isNull?[l,f,t,0]:[l,u,t,x])})},getSymbol:c.noop,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(c,p){var g=this.options,
b=this.pointAttrToOptions||{};var a=b.stroke||"borderColor";var d=b["stroke-width"]||"borderWidth",f=c&&c.color||this.color,e=c&&c[a]||g[a]||this.color||f,h=c&&c[d]||g[d]||this[d]||0;b=c&&c.options.dashStyle||g.dashStyle;var m=y(g.opacity,1);if(c&&this.zones.length){var n=c.getZone();f=c.options.color||n&&(n.color||c.nonZonedColor)||this.color;n&&(e=n.borderColor||e,b=n.dashStyle||b,h=n.borderWidth||h)}p&&(c=L(g.states[p],c.options.states&&c.options.states[p]||{}),p=c.brightness,f=c.color||void 0!==
p&&z(f).brighten(c.brightness).get()||f,e=c[a]||e,h=c[d]||h,b=c.dashStyle||b,m=y(c.opacity,m));a={fill:f,stroke:e,"stroke-width":h,opacity:m};b&&(a.dashstyle=b);return a},drawPoints:function(){var c=this,p=this.chart,g=c.options,b=p.renderer,a=g.animationLimit||250,d;c.points.forEach(function(f){var e=f.graphic,h=e&&p.pointCount<a?"animate":"attr";if(D(f.plotY)&&null!==f.y){d=f.shapeArgs;e&&e.element.nodeName!==f.shapeType&&(e=e.destroy());if(e)e[h](L(d));else f.graphic=e=b[f.shapeType](d).add(f.group||
c.group);if(g.borderRadius)e[h]({r:g.borderRadius});p.styledMode||e[h](c.pointAttribs(f,f.selected&&"select")).shadow(!1!==f.allowShadow&&g.shadow,null,g.stacking&&!g.borderRadius);e.addClass(f.getClassName(),!0)}else e&&(f.graphic=e.destroy())})},animate:function(c){var m=this,g=this.yAxis,b=m.options,a=this.chart.inverted,d={},f=a?"translateX":"translateY";if(x)if(c)d.scaleY=.001,c=Math.min(g.pos+g.len,Math.max(g.pos,g.toPixels(b.threshold))),a?d.translateX=c-g.len:d.translateY=c,m.clipBox&&m.setClip(),
m.group.attr(d);else{var e=m.group.attr(f);m.group.animate({scaleY:1},u(F(m.options.animation),{step:function(a,b){d[f]=e+b.pos*(g.pos-e);m.group.attr(d)}}));m.animate=null}},remove:function(){var c=this,p=c.chart;p.hasRendered&&p.series.forEach(function(g){g.type===c.type&&(g.isDirty=!0)});C.prototype.remove.apply(c,arguments)}});""});N(H,"parts/BarSeries.js",[H["parts/Globals.js"]],function(c){c=c.seriesType;c("bar","column",null,{inverted:!0});""});N(H,"parts/ScatterSeries.js",[H["parts/Globals.js"]],
function(c){var n=c.Series,A=c.seriesType;A("scatter","line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
n.prototype.drawGraph.call(this)},applyJitter:function(){var c=this,n=this.options.jitter,z=this.points.length;n&&this.points.forEach(function(u,A){["x","y"].forEach(function(y,C){var x="plot"+y.toUpperCase();if(n[y]&&!u.isNull){var m=c[y+"Axis"];var p=n[y]*m.transA;if(m&&!m.isLog){var g=Math.max(0,u[x]-p);m=Math.min(m.len,u[x]+p);C=1E4*Math.sin(A+C*z);u[x]=g+(m-g)*(C-Math.floor(C));"x"===y&&(u.clientX=u.plotX)}}})})}});c.addEvent(n,"afterTranslate",function(){this.applyJitter&&this.applyJitter()});
""});N(H,"mixins/centered-series.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.isNumber,D=c.deg2rad,F=c.pick,z=c.relativeLength;c.CenteredSeriesMixin={getCenter:function(){var c=this.options,n=this.chart,y=2*(c.slicedOffset||0),A=n.plotWidth-2*y;n=n.plotHeight-2*y;var x=c.center;x=[F(x[0],"50%"),F(x[1],"50%"),c.size||"100%",c.innerSize||0];var m=Math.min(A,n),p;for(p=0;4>p;++p){var g=x[p];c=2>p||2===p&&/%$/.test(g);x[p]=z(g,[A,n,m,x[2]][p])+(c?y:0)}x[3]>x[2]&&(x[3]=x[2]);
return x},getStartAndEndRadians:function(c,n){c=A(c)?c:0;n=A(n)&&n>c&&360>n-c?n:c+360;return{start:D*(c+-90),end:D*(n+-90)}}}});N(H,"parts/PieSeries.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isNumber,F=c.addEvent;n=c.CenteredSeriesMixin;var z=n.getStartAndEndRadians,u=c.merge,H=c.noop,y=c.pick,C=c.Point,x=c.Series,m=c.seriesType,p=c.fireEvent,g=c.setAnimation;m("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,
distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},fillColor:void 0,ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group",
"dataLabelsGroup"],axisTypes:[],pointAttribs:c.seriesTypes.column.prototype.pointAttribs,animate:function(b){var a=this,d=a.points,c=a.startAngleRad;b||(d.forEach(function(b){var d=b.graphic,f=b.shapeArgs;d&&(d.attr({r:b.startR||a.center[3]/2,start:c,end:c}),d.animate({r:f.r,start:f.start,end:f.end},a.options.animation))}),a.animate=null)},hasData:function(){return!!this.processedXData.length},updateTotals:function(){var b,a=0,d=this.points,c=d.length,e=this.options.ignoreHiddenPoint;for(b=0;b<c;b++){var h=
d[b];a+=e&&!h.visible?0:h.isNull?0:h.y}this.total=a;for(b=0;b<c;b++)h=d[b],h.percentage=0<a&&(h.visible||!e)?h.y/a*100:0,h.total=a},generatePoints:function(){x.prototype.generatePoints.call(this);this.updateTotals()},getX:function(b,a,d){var c=this.center,e=this.radii?this.radii[d.index]:c[2]/2;return c[0]+(a?-1:1)*Math.cos(Math.asin(Math.max(Math.min((b-c[1])/(e+d.labelDistance),1),-1)))*(e+d.labelDistance)+(0<d.labelDistance?(a?-1:1)*this.options.dataLabels.padding:0)},translate:function(b){this.generatePoints();
var a=0,d=this.options,f=d.slicedOffset,e=f+(d.borderWidth||0),h=z(d.startAngle,d.endAngle),g=this.startAngleRad=h.start;h=(this.endAngleRad=h.end)-g;var m=this.points,q=d.dataLabels.distance;d=d.ignoreHiddenPoint;var v,k=m.length;b||(this.center=b=this.getCenter());for(v=0;v<k;v++){var t=m[v];var n=g+a*h;if(!d||t.visible)a+=t.percentage/100;var u=g+a*h;t.shapeType="arc";t.shapeArgs={x:b[0],y:b[1],r:b[2]/2,innerR:b[3]/2,start:Math.round(1E3*n)/1E3,end:Math.round(1E3*u)/1E3};t.labelDistance=y(t.options.dataLabels&&
t.options.dataLabels.distance,q);t.labelDistance=c.relativeLength(t.labelDistance,t.shapeArgs.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,t.labelDistance);u=(u+n)/2;u>1.5*Math.PI?u-=2*Math.PI:u<-Math.PI/2&&(u+=2*Math.PI);t.slicedTranslation={translateX:Math.round(Math.cos(u)*f),translateY:Math.round(Math.sin(u)*f)};var w=Math.cos(u)*b[2]/2;var l=Math.sin(u)*b[2]/2;t.tooltipPos=[b[0]+.7*w,b[1]+.7*l];t.half=u<-Math.PI/2||u>Math.PI/2?1:0;t.angle=u;n=Math.min(e,t.labelDistance/5);t.labelPosition=
{natural:{x:b[0]+w+Math.cos(u)*t.labelDistance,y:b[1]+l+Math.sin(u)*t.labelDistance},"final":{},alignment:0>t.labelDistance?"center":t.half?"right":"left",connectorPosition:{breakAt:{x:b[0]+w+Math.cos(u)*n,y:b[1]+l+Math.sin(u)*n},touchingSliceAt:{x:b[0]+w,y:b[1]+l}}}}p(this,"afterTranslate")},drawEmpty:function(){var b=this.options;if(0===this.total){var a=this.center[0];var d=this.center[1];this.graph||(this.graph=this.chart.renderer.circle(a,d,0).addClass("highcharts-graph").add(this.group));this.graph.animate({"stroke-width":b.borderWidth,
cx:a,cy:d,r:this.center[2]/2,fill:b.fillColor||"none",stroke:b.color||"#cccccc"})}else this.graph&&(this.graph=this.graph.destroy())},redrawPoints:function(){var b=this,a=b.chart,d=a.renderer,c,e,h,g,m=b.options.shadow;this.drawEmpty();!m||b.shadowGroup||a.styledMode||(b.shadowGroup=d.g("shadow").attr({zIndex:-1}).add(b.group));b.points.forEach(function(f){var q={};e=f.graphic;if(!f.isNull&&e){g=f.shapeArgs;c=f.getTranslate();if(!a.styledMode){var k=f.shadowGroup;m&&!k&&(k=f.shadowGroup=d.g("shadow").add(b.shadowGroup));
k&&k.attr(c);h=b.pointAttribs(f,f.selected&&"select")}f.delayedRendering?(e.setRadialReference(b.center).attr(g).attr(c),a.styledMode||e.attr(h).attr({"stroke-linejoin":"round"}).shadow(m,k),f.delayedRendering=!1):(e.setRadialReference(b.center),a.styledMode||u(!0,q,h),u(!0,q,g,c),e.animate(q));e.attr({visibility:f.visible?"inherit":"hidden"});e.addClass(f.getClassName())}else e&&(f.graphic=e.destroy())})},drawPoints:function(){var b=this.chart.renderer;this.points.forEach(function(a){a.graphic||
(a.graphic=b[a.shapeType](a.shapeArgs).add(a.series.group),a.delayedRendering=!0)})},searchPoint:H,sortByAngle:function(b,a){b.sort(function(b,c){return void 0!==b.angle&&(c.angle-b.angle)*a})},drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,getCenter:n.getCenter,getSymbol:H,drawGraph:null},{init:function(){C.prototype.init.apply(this,arguments);var b=this;b.name=y(b.name,"Slice");var a=function(a){b.slice("select"===a.type)};F(b,"select",a);F(b,"unselect",a);return b},isValid:function(){return D(this.y)&&
0<=this.y},setVisible:function(b,a){var c=this,f=c.series,e=f.chart,h=f.options.ignoreHiddenPoint;a=y(a,h);b!==c.visible&&(c.visible=c.options.visible=b=void 0===b?!c.visible:b,f.options.data[f.data.indexOf(c)]=c.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(a){if(c[a])c[a][b?"show":"hide"](!0)}),c.legendItem&&e.legend.colorizeItem(c,b),b||"hover"!==c.state||c.setState(""),h&&(f.isDirty=!0),a&&e.redraw())},slice:function(b,a,c){var d=this.series;g(c,d.chart);y(a,!0);this.sliced=
this.options.sliced=A(b)?b:!this.sliced;d.options.data[d.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(b){var a=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(a.x,a.y,a.r+b,a.r+b,{innerR:a.r-1,start:a.start,end:a.end})},connectorShapes:{fixedOffset:function(b,
a,c){var d=a.breakAt;a=a.touchingSliceAt;return["M",b.x,b.y].concat(c.softConnector?["C",b.x+("left"===b.alignment?-5:5),b.y,2*d.x-a.x,2*d.y-a.y,d.x,d.y]:["L",d.x,d.y]).concat(["L",a.x,a.y])},straight:function(b,a){a=a.touchingSliceAt;return["M",b.x,b.y,"L",a.x,a.y]},crookedLine:function(b,a,d){a=a.touchingSliceAt;var f=this.series,e=f.center[0],h=f.chart.plotWidth,g=f.chart.plotLeft;f=b.alignment;var m=this.shapeArgs.r;d=c.relativeLength(d.crookDistance,1);d="left"===f?e+m+(h+g-e-m)*(1-d):g+(e-m)*
d;e=["L",d,b.y];if("left"===f?d>b.x||d<a.x:d<b.x||d>a.x)e=[];return["M",b.x,b.y].concat(e).concat(["L",a.x,a.y])}},getConnectorPath:function(){var b=this.labelPosition,a=this.series.options.dataLabels,c=a.connectorShape,f=this.connectorShapes;f[c]&&(c=f[c]);return c.call(this,{x:b.final.x,y:b.final.y,alignment:b.alignment},b.connectorPosition,a)}});""});N(H,"parts/DataLabels.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isArray,F=n.objectEach,z=n.splat,u=c.arrayMax,
H=c.extend,y=c.format,C=c.merge;n=c.noop;var x=c.pick,m=c.relativeLength,p=c.Series,g=c.seriesTypes,b=c.stableSort;c.distribute=function(a,d,f){function e(a,b){return a.target-b.target}var h,g=!0,m=a,q=[];var p=0;var k=m.reducedLen||d;for(h=a.length;h--;)p+=a[h].size;if(p>k){b(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(p=h=0;p<=k;)p+=a[h].size,h++;q=a.splice(h-1,a.length)}b(a,e);for(a=a.map(function(a){return{size:a.size,targets:[a.target],align:x(a.align,.5)}});g;){for(h=a.length;h--;)g=
a[h],p=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=Math.min(Math.max(0,p-g.size*g.align),d-g.size);h=a.length;for(g=!1;h--;)0<h&&a[h-1].pos+a[h-1].size>a[h].pos&&(a[h-1].size+=a[h].size,a[h-1].targets=a[h-1].targets.concat(a[h].targets),a[h-1].align=.5,a[h-1].pos+a[h-1].size>d&&(a[h-1].pos=d-a[h-1].size),a.splice(h,1),g=!0)}m.push.apply(m,q);h=0;a.some(function(a){var b=0;if(a.targets.some(function(){m[h].pos=a.pos+b;if(Math.abs(m[h].pos-m[h].target)>f)return m.slice(0,h+1).forEach(function(a){delete a.pos}),
m.reducedLen=(m.reducedLen||d)-.1*d,m.reducedLen>.1*d&&c.distribute(m,d,f),!0;b+=m[h].size;h++}))return!0});b(m,e)};p.prototype.drawDataLabels=function(){function a(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,">"===b&&a>c||"<"===b&&a<c||">="===b&&a>=c||"<="===b&&a<=c||"=="===b&&a==c||"==="===b&&a===c?!0:!1):!0}function b(a,b){var c=[],d;if(D(a)&&!D(b))c=a.map(function(a){return C(a,b)});else if(D(b)&&!D(a))c=b.map(function(b){return C(a,b)});else if(D(a)||D(b))for(d=Math.max(a.length,
b.length);d--;)c[d]=C(a[d],b[d]);else c=C(a,b);return c}var f=this,e=f.chart,h=f.options,g=h.dataLabels,m=f.points,q,p=f.hasRendered||0,k=c.animObject(h.animation).duration,t=Math.min(k,200),n=!e.renderer.forExport&&x(g.defer,0<t),u=e.renderer;g=b(b(e.options.plotOptions&&e.options.plotOptions.series&&e.options.plotOptions.series.dataLabels,e.options.plotOptions&&e.options.plotOptions[f.type]&&e.options.plotOptions[f.type].dataLabels),g);c.fireEvent(this,"drawDataLabels");if(D(g)||g.enabled||f._hasPointLabels){var w=
f.plotGroup("dataLabelsGroup","data-labels",n&&!p?"hidden":"inherit",g.zIndex||6);n&&(w.attr({opacity:+p}),p||setTimeout(function(){var a=f.dataLabelsGroup;a&&(f.visible&&w.show(!0),a[h.animation?"animate":"attr"]({opacity:1},{duration:t}))},k-t));m.forEach(function(c){q=z(b(g,c.dlOptions||c.options&&c.options.dataLabels));q.forEach(function(b,d){var k=b.enabled&&(!c.isNull||c.dataLabelOnNull)&&a(c,b),g=c.dataLabels?c.dataLabels[d]:c.dataLabel,l=c.connectors?c.connectors[d]:c.connector,q=x(b.distance,
c.labelDistance),m=!g;if(k){var t=c.getLabelConfig();var p=x(b[c.formatPrefix+"Format"],b.format);t=A(p)?y(p,t,e.time):(b[c.formatPrefix+"Formatter"]||b.formatter).call(t,b);p=b.style;var n=b.rotation;e.styledMode||(p.color=x(b.color,p.color,f.color,"#000000"),"contrast"===p.color&&(c.contrastColor=u.getContrast(c.color||f.color),p.color=!A(q)&&b.inside||0>q||h.stacking?c.contrastColor:"#000000"),h.cursor&&(p.cursor=h.cursor));var r={r:b.borderRadius||0,rotation:n,padding:b.padding,zIndex:1};e.styledMode||
(r.fill=b.backgroundColor,r.stroke=b.borderColor,r["stroke-width"]=b.borderWidth);F(r,function(a,b){void 0===a&&delete r[b]})}!g||k&&A(t)?k&&A(t)&&(g?r.text=t:(c.dataLabels=c.dataLabels||[],g=c.dataLabels[d]=n?u.text(t,0,-9999).addClass("highcharts-data-label"):u.label(t,0,-9999,b.shape,null,null,b.useHTML,null,"data-label"),d||(c.dataLabel=g),g.addClass(" highcharts-data-label-color-"+c.colorIndex+" "+(b.className||"")+(b.useHTML?" highcharts-tracker":""))),g.options=b,g.attr(r),e.styledMode||g.css(p).shadow(b.shadow),
g.added||g.add(w),b.textPath&&!b.useHTML&&g.setTextPath(c.getDataLabelPath&&c.getDataLabelPath(g)||c.graphic,b.textPath),f.alignDataLabel(c,g,b,null,m)):(c.dataLabel=c.dataLabel&&c.dataLabel.destroy(),c.dataLabels&&(1===c.dataLabels.length?delete c.dataLabels:delete c.dataLabels[d]),d||delete c.dataLabel,l&&(c.connector=c.connector.destroy(),c.connectors&&(1===c.connectors.length?delete c.connectors:delete c.connectors[d])))})})}c.fireEvent(this,"afterDrawDataLabels")};p.prototype.alignDataLabel=
function(a,b,c,e,h){var d=this.chart,f=this.isCartesian&&d.inverted,g=x(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),m=x(a.plotY,-9999),k=b.getBBox(),p=c.rotation,n=c.align,u=this.visible&&(a.series.forceDL||d.isInsidePlot(g,Math.round(m),f)||e&&d.isInsidePlot(g,f?e.x+1:e.y+e.height-1,f)),w="justify"===x(c.overflow,"justify");if(u){var l=d.renderer.fontMetrics(d.styledMode?void 0:c.style.fontSize,b).b;e=H({x:f?this.yAxis.len-m:g,y:Math.round(f?this.xAxis.len-g:m),width:0,height:0},e);H(c,{width:k.width,
height:k.height});p?(w=!1,g=d.renderer.rotCorr(l,p),g={x:e.x+c.x+e.width/2+g.x,y:e.y+c.y+{top:0,middle:.5,bottom:1}[c.verticalAlign]*e.height},b[h?"attr":"animate"](g).attr({align:n}),m=(p+720)%360,m=180<m&&360>m,"left"===n?g.y-=m?k.height:0:"center"===n?(g.x-=k.width/2,g.y-=k.height/2):"right"===n&&(g.x-=k.width,g.y-=m?0:k.height),b.placed=!0,b.alignAttr=g):(b.align(c,null,e),g=b.alignAttr);w&&0<=e.height?this.justifyDataLabel(b,c,g,k,e,h):x(c.crop,!0)&&(u=d.isInsidePlot(g.x,g.y)&&d.isInsidePlot(g.x+
k.width,g.y+k.height));if(c.shape&&!p)b[h?"attr":"animate"]({anchorX:f?d.plotWidth-a.plotY:a.plotX,anchorY:f?d.plotHeight-a.plotX:a.plotY})}u||(b.hide(!0),b.placed=!1)};p.prototype.justifyDataLabel=function(a,b,c,e,g,m){var d=this.chart,f=b.align,h=b.verticalAlign,k=a.box?0:a.padding||0;var p=c.x+k;if(0>p){"right"===f?(b.align="left",b.inside=!0):b.x=-p;var n=!0}p=c.x+e.width-k;p>d.plotWidth&&("left"===f?(b.align="right",b.inside=!0):b.x=d.plotWidth-p,n=!0);p=c.y+k;0>p&&("bottom"===h?(b.verticalAlign=
"top",b.inside=!0):b.y=-p,n=!0);p=c.y+e.height-k;p>d.plotHeight&&("top"===h?(b.verticalAlign="bottom",b.inside=!0):b.y=d.plotHeight-p,n=!0);n&&(a.placed=!m,a.align(b,null,g));return n};g.pie&&(g.pie.prototype.dataLabelPositioners={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,b,c,e){return a.getX(c<b.top+2||c>b.bottom-2?e:c,b.half,b)},justify:function(a,b,c){return c[0]+(a.half?-1:1)*(b+a.labelDistance)},alignToPlotEdges:function(a,b,c,e){a=a.getBBox().width;
return b?a+e:c-a-e},alignToConnectors:function(a,b,c,e){var d=0,f;a.forEach(function(a){f=a.dataLabel.getBBox().width;f>d&&(d=f)});return b?d+e:c-d-e}},g.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,f,e=a.chart,g=a.options.dataLabels,m=g.connectorPadding,n,q=e.plotWidth,v=e.plotHeight,k=e.plotLeft,t=Math.round(e.chartWidth/3),y,z=a.center,w=z[2]/2,l=z[1],J,D,F,H,L=[[],[]],M,G,N,Q,P=[0,0,0,0],U=a.dataLabelPositioners,V;a.visible&&(g.enabled||a._hasPointLabels)&&(b.forEach(function(a){a.dataLabel&&
a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),p.prototype.drawDataLabels.apply(a),b.forEach(function(a){a.dataLabel&&(a.visible?(L[a.half].push(a),a.dataLabel._pos=null,!A(g.style.width)&&!A(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>t&&(a.dataLabel.css({width:.7*t}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&
1===a.dataLabels.length&&delete a.dataLabels))}),L.forEach(function(b,d){var h=b.length,p=[],n;if(h){a.sortByAngle(b,d-.5);if(0<a.maxLabelDistance){var t=Math.max(0,l-w-a.maxLabelDistance);var r=Math.min(l+w+a.maxLabelDistance,e.plotHeight);b.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,l-w-a.labelDistance),a.bottom=Math.min(l+w+a.labelDistance,e.plotHeight),n=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+n/2,size:n,rank:a.y},p.push(a.distributeBox))});
t=r+n-t;c.distribute(p,t,t/5)}for(Q=0;Q<h;Q++){f=b[Q];F=f.labelPosition;J=f.dataLabel;N=!1===f.visible?"hidden":"inherit";G=t=F.natural.y;p&&A(f.distributeBox)&&(void 0===f.distributeBox.pos?N="hidden":(H=f.distributeBox.size,G=U.radialDistributionY(f)));delete f.positionIndex;if(g.justify)M=U.justify(f,w,z);else switch(g.alignTo){case "connectors":M=U.alignToConnectors(b,d,q,k);break;case "plotEdges":M=U.alignToPlotEdges(J,d,q,k);break;default:M=U.radialDistributionX(a,f,G,t)}J._attr={visibility:N,
align:F.alignment};J._pos={x:M+g.x+({left:m,right:-m}[F.alignment]||0),y:G+g.y-10};F.final.x=M;F.final.y=G;x(g.crop,!0)&&(D=J.getBBox().width,t=null,M-D<m&&1===d?(t=Math.round(D-M+m),P[3]=Math.max(t,P[3])):M+D>q-m&&0===d&&(t=Math.round(M+D-q+m),P[1]=Math.max(t,P[1])),0>G-H/2?P[0]=Math.max(Math.round(-G+H/2),P[0]):G+H/2>v&&(P[2]=Math.max(Math.round(G+H/2-v),P[2])),J.sideOverflow=t)}}}),0===u(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),this.points.forEach(function(b){V=C(g,b.options.dataLabels);
if(n=x(V.connectorWidth,1)){var c;y=b.connector;if((J=b.dataLabel)&&J._pos&&b.visible&&0<b.labelDistance){N=J._attr.visibility;if(c=!y)b.connector=y=e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+b.colorIndex+(b.className?" "+b.className:"")).add(a.dataLabelsGroup),e.styledMode||y.attr({"stroke-width":n,stroke:V.connectorColor||b.color||"#666666"});y[c?"attr":"animate"]({d:b.getConnectorPath()});y.attr("visibility",N)}else y&&(b.connector=y.destroy())}}))},g.pie.prototype.placeDataLabels=
function(){this.points.forEach(function(a){var b=a.dataLabel,c;b&&a.visible&&((c=b._pos)?(b.sideOverflow&&(b._attr.width=Math.max(b.getBBox().width-b.sideOverflow,0),b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](c),b.moved=!0):b&&b.attr({y:-9999}));delete a.distributeBox},this)},g.pie.prototype.alignDataLabel=n,g.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,
c=this.options,e=c.center,g=c.minSize||80,p=null!==c.size;if(!p){if(null!==e[0])var n=Math.max(b[2]-Math.max(a[1],a[3]),g);else n=Math.max(b[2]-a[1]-a[3],g),b[0]+=(a[3]-a[1])/2;null!==e[1]?n=Math.max(Math.min(n,b[2]-Math.max(a[0],a[2])),g):(n=Math.max(Math.min(n,b[2]-a[0]-a[2]),g),b[1]+=(a[0]-a[2])/2);n<b[2]?(b[2]=n,b[3]=Math.min(m(c.innerSize||0,n),n),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):p=!0}return p});g.column&&(g.column.prototype.alignDataLabel=function(a,b,c,e,g){var d=
this.chart.inverted,f=a.series,h=a.dlBox||a.shapeArgs,m=x(a.below,a.plotY>x(this.translatedThreshold,f.yAxis.len)),k=x(c.inside,!!this.options.stacking);h&&(e=C(h),0>e.y&&(e.height+=e.y,e.y=0),h=e.y+e.height-f.yAxis.len,0<h&&(e.height-=h),d&&(e={x:f.yAxis.len-e.y-e.height,y:f.xAxis.len-e.x-e.width,width:e.height,height:e.width}),k||(d?(e.x+=m?0:e.width,e.width=0):(e.y+=m?e.height:0,e.height=0)));c.align=x(c.align,!d||k?"center":m?"right":"left");c.verticalAlign=x(c.verticalAlign,d||k?"middle":m?"top":
"bottom");p.prototype.alignDataLabel.call(this,a,b,c,e,g);c.inside&&a.contrastColor&&b.css({color:a.contrastColor})})});N(H,"modules/overlapping-datalabels.src.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.isArray,D=n.objectEach;n=c.Chart;var F=c.pick,z=c.addEvent,u=c.fireEvent;z(n,"render",function(){var c=[];(this.labelCollectors||[]).forEach(function(n){c=c.concat(n())});(this.yAxis||[]).forEach(function(n){n.options.stackLabels&&!n.options.stackLabels.allowOverlap&&
D(n.stacks,function(n){D(n,function(n){c.push(n.label)})})});(this.series||[]).forEach(function(n){var u=n.options.dataLabels;n.visible&&(!1!==u.enabled||n._hasPointLabels)&&n.points.forEach(function(n){n.visible&&(A(n.dataLabels)?n.dataLabels:n.dataLabel?[n.dataLabel]:[]).forEach(function(m){var p=m.options;m.labelrank=F(p.labelrank,n.labelrank,n.shapeArgs&&n.shapeArgs.height);p.allowOverlap||c.push(m)})})});this.hideOverlappingLabels(c)});n.prototype.hideOverlappingLabels=function(c){var n=this,
z=c.length,x=n.renderer,m,p,g;var b=function(a){var b=a.box?0:a.padding||0;var c=0;if(a&&(!a.alignAttr||a.placed)){var d=a.alignAttr||{x:a.attr("x"),y:a.attr("y")};var f=a.parentGroup;a.width||(c=a.getBBox(),a.width=c.width,a.height=c.height,c=x.fontMetrics(null,a.element).h);return{x:d.x+(f.translateX||0)+b,y:d.y+(f.translateY||0)+b-c,width:a.width-2*b,height:a.height-2*b}}};for(p=0;p<z;p++)if(m=c[p])m.oldOpacity=m.opacity,m.newOpacity=1,m.absoluteBox=b(m);c.sort(function(a,b){return(b.labelrank||
0)-(a.labelrank||0)});for(p=0;p<z;p++){var a=(b=c[p])&&b.absoluteBox;for(m=p+1;m<z;++m){var d=(g=c[m])&&g.absoluteBox;!a||!d||b===g||0===b.newOpacity||0===g.newOpacity||d.x>a.x+a.width||d.x+d.width<a.x||d.y>a.y+a.height||d.y+d.height<a.y||((b.labelrank<g.labelrank?b:g).newOpacity=0)}}c.forEach(function(a){var b;if(a){var c=a.newOpacity;a.oldOpacity!==c&&(a.alignAttr&&a.placed?(c?a.show(!0):b=function(){a.hide(!0);a.placed=!1},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b),u(n,
"afterHideOverlappingLabels")):a.attr({opacity:c}));a.isOld=!0}})}});N(H,"parts/Interaction.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.defined,D=n.isArray,F=n.isObject,z=n.objectEach,u=c.addEvent;n=c.Chart;var H=c.createElement,y=c.css,C=c.defaultOptions,x=c.defaultPlotOptions,m=c.extend,p=c.fireEvent,g=c.hasTouch,b=c.Legend,a=c.merge,d=c.pick,f=c.Point,e=c.Series,h=c.seriesTypes,r=c.svg;var E=c.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,
d=function(a){var b=c.getPointFromEvent(a);void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a))},e;a.points.forEach(function(a){e=D(a.dataLabels)?a.dataLabels:a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);e.forEach(function(b){b.div?b.div.point=a:b.element.point=a})});a._hasTracking||(a.trackerGroups.forEach(function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(g)a[e].on("touchstart",d);!b.styledMode&&a.options.cursor&&
a[e].css(y).css({cursor:a.options.cursor})}}),a._hasTracking=!0);p(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,h=f.pointer,l=f.renderer,m=f.options.tooltip.snap,n=a.tracker,u,x=function(){if(f.hoverSeries!==a)a.onMouseOver()},y="rgba(192,192,192,"+(r?.0001:.002)+")";if(e&&!c)for(u=e+1;u--;)"M"===d[u]&&d.splice(u+1,0,d[u+1]-m,d[u+2],"L"),(u&&"M"===d[u]||u===e)&&d.splice(u,0,"L",d[u-2]+m,d[u-
1]);n?n.attr({d:d}):a.graph&&(a.tracker=l.path(d).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(c?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),f.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:y,fill:c?y:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*m)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",x).on("mouseout",function(a){h.onTrackerMouseOut(a)});b.cursor&&!f.styledMode&&a.css({cursor:b.cursor});
if(g)a.on("touchstart",x)}));p(this,"afterDrawTracker")}};h.column&&(h.column.prototype.drawTracker=E.drawTrackerPoint);h.pie&&(h.pie.prototype.drawTracker=E.drawTrackerPoint);h.scatter&&(h.scatter.prototype.drawTracker=E.drawTrackerPoint);m(b.prototype,{setItemEvents:function(b,c,d){var e=this,g=e.chart.renderer.boxWrapper,k=b instanceof f,h="highcharts-legend-"+(k?"point":"series")+"-active",l=e.chart.styledMode;(d?c:b.legendGroup).on("mouseover",function(){b.visible&&e.allItems.forEach(function(a){b!==
a&&a.setState("inactive",!k)});b.setState("hover");b.visible&&g.addClass(h);l||c.css(e.options.itemHoverStyle)}).on("mouseout",function(){e.chart.styledMode||c.css(a(b.visible?e.itemStyle:e.itemHiddenStyle));e.allItems.forEach(function(a){b!==a&&a.setState("",!k)});g.removeClass(h);b.setState()}).on("click",function(a){var c=function(){b.setVisible&&b.setVisible();e.allItems.forEach(function(a){b!==a&&a.setState(b.visible?"inactive":"",!k)})};g.removeClass(h);a={browserEvent:a};b.firePointEvent?b.firePointEvent("legendItemClick",
a,c):p(b,"legendItemClick",a,c)})},createCheckboxForItem:function(a){a.checkbox=H("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);u(a.checkbox,"click",function(b){p(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});m(n.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=C.lang,d=b.options.chart.resetZoomButton,e=d.theme,f=
e.states,g="chart"===d.relativeTo||"spaceBox"===d.relativeTo?null:"plotBox";p(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,e,f&&f.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,g)});p(this,"afterShowResetZoom")},zoomOut:function(){p(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var b=this,c,e=b.pointer,f=!1,g=b.inverted?e.mouseDownX:e.mouseDownY;!a||
a.resetSelection?(b.axes.forEach(function(a){c=a.zoom()}),e.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var d=a.axis,k=b.inverted?d.left:d.top,h=b.inverted?k+d.width:k+d.height,l=d.isXAxis,m=!1;if(!l&&g>=k&&g<=h||l||!A(g))m=!0;e[l?"zoomX":"zoomY"]&&m&&(c=d.zoom(a.min,a.max),d.displayBtn&&(f=!0))});var h=b.resetZoomButton;f&&!h?b.showResetZoom():!f&&F(h)&&(b.resetZoomButton=h.destroy());c&&b.redraw(d(b.options.chart.animation,a&&a.animation,100>b.pointCount))},pan:function(a,b){var c=
this,d=c.hoverPoints,e;p(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState()});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"];d=d?"mouseDownX":"mouseDownY";var g=c[d],k=(b.pointRange||0)/2,h=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,m=b.getExtremes(),n=b.toValue(g-f,!0)+k*h;h=b.toValue(g+b.len-f,!0)-k*h;var p=h<n;g=p?h:n;n=p?n:h;h=Math.min(m.dataMin,k?m.min:b.toValue(b.toPixels(m.min)-b.minPixelPadding));
k=Math.max(m.dataMax,k?m.max:b.toValue(b.toPixels(m.max)+b.minPixelPadding));p=h-g;0<p&&(n+=p,g=h);p=n-k;0<p&&(n=k,g-=p);b.series.length&&g!==m.min&&n!==m.max&&(b.setExtremes(g,n,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);y(c.container,{cursor:"move"})})}});m(f.prototype,{select:function(a,b){var c=this,e=c.series,f=e.chart;this.selectedStaging=a=d(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;e.options.data[e.data.indexOf(c)]=
c.options;c.setState(a&&"select");b||f.getSelectedPoints().forEach(function(a){var b=a.series;a.selected&&a!==c&&(a.selected=a.options.selected=!1,b.options.data[b.data.indexOf(a)]=a.options,a.setState(f.hoverPoints&&b.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"))})});delete this.selectedStaging},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=
this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,d=a(b.series.options.point,b.options).events;b.events=d;z(d,function(a,d){c.isFunction(a)&&u(b,d,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=this.series,e=this.state,f=c.options.states[a||"normal"]||{},g=x[c.type].marker&&c.options.marker,h=
g&&!1===g.enabled,l=g&&g.states&&g.states[a||"normal"]||{},n=!1===l.enabled,q=c.stateMarkerGraphic,r=this.marker||{},v=c.chart,u=c.halo,y,z=g&&c.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===f.enabled||a&&(n||h&&!1===l.enabled)||a&&r.states&&r.states[a]&&!1===r.states[a].enabled)){this.state=a;z&&(y=c.markerAttribs(this,a));if(this.graphic){e&&this.graphic.removeClass("highcharts-point-"+e);a&&this.graphic.addClass("highcharts-point-"+a);if(!v.styledMode){var A=
c.pointAttribs(this,a);var C=d(v.options.chart.animation,f.animation);c.options.inactiveOtherPoints&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:A.opacity},C)}),this.connector&&this.connector.animate({opacity:A.opacity},C));this.graphic.animate(A,C)}y&&this.graphic.animate(y,d(v.options.chart.animation,l.animation,g.animation));q&&q.hide()}else{if(a&&l){e=r.symbol||c.symbol;q&&q.currentSymbol!==e&&(q=q.destroy());if(y)if(q)q[b?"animate":"attr"]({x:y.x,y:y.y});else e&&(c.stateMarkerGraphic=
q=v.renderer.symbol(e,y.x,y.y,y.width,y.height).add(c.markerGroup),q.currentSymbol=e);!v.styledMode&&q&&q.attr(c.pointAttribs(this,a))}q&&(q[a&&this.isInside?"show":"hide"](),q.element.point=this)}a=f.halo;f=(q=this.graphic||q)&&q.visibility||"inherit";a&&a.size&&q&&"hidden"!==f?(u||(c.halo=u=v.renderer.path().add(q.parentGroup)),u.show()[b?"animate":"attr"]({d:this.haloPath(a.size)}),u.attr({"class":"highcharts-halo highcharts-color-"+d(this.colorIndex,c.colorIndex)+(this.className?" "+this.className:
""),visibility:f,zIndex:-1}),u.point=this,v.styledMode||u.attr(m({fill:this.color||c.color,"fill-opacity":a.opacity},a.attributes))):u&&u.point&&u.point.haloPath&&u.animate({d:u.point.haloPath(0)},null,u.hide);p(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});m(e.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&p(this,"mouseOver");
this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&p(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0)})},setState:function(a,b){var c=this,e=c.options,f=c.graph,g=e.inactiveOtherPoints,h=e.states,l=e.lineWidth,m=e.opacity,n=d(h[a||"normal"]&&h[a||"normal"].animation,c.chart.options.chart.animation);
e=0;a=a||"";if(c.state!==a&&([c.group,c.markerGroup,c.dataLabelsGroup].forEach(function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!c.chart.styledMode)){if(h[a]&&!1===h[a].enabled)return;a&&(l=h[a].lineWidth||l+(h[a].lineWidthPlus||0),m=d(h[a].opacity,m));if(f&&!f.dashstyle)for(h={"stroke-width":l},f.animate(h,n);c["zone-graph-"+e];)c["zone-graph-"+e].attr(h),e+=1;g||[c.group,c.markerGroup,c.dataLabelsGroup,c.labelBySeries].forEach(function(a){a&&
a.animate({opacity:m},n)})}b&&g&&c.points&&c.setAllPointsToState(a)},setAllPointsToState:function(a){this.points.forEach(function(b){b.setState&&b.setState(a)})},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f=d.options.chart.ignoreHiddenSeries,g=c.visible;var h=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!g:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][h]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===
c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});f&&(d.isDirtyBox=!0);p(c,h);!1!==b&&d.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);p(this,a?"select":"unselect")},drawTracker:E.drawTrackerGraph})});
N(H,"parts/Responsive.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=n.isArray,D=n.isObject,F=n.objectEach,z=n.splat;n=c.Chart;var u=c.pick;n.prototype.setResponsive=function(n,u){var y=this.options.responsive,x=[],m=this.currentResponsive;!u&&y&&y.rules&&y.rules.forEach(function(m){void 0===m._id&&(m._id=c.uniqueKey());this.matchResponsiveRule(m,x)},this);u=c.merge.apply(0,x.map(function(m){return c.find(y.rules,function(c){return c._id===m}).chartOptions}));u.isResponsiveOptions=
!0;x=x.toString()||void 0;x!==(m&&m.ruleIds)&&(m&&this.update(m.undoOptions,n,!0),x?(m=this.currentOptions(u),m.isResponsiveOptions=!0,this.currentResponsive={ruleIds:x,mergedOptions:u,undoOptions:m},this.update(u,n,!0)):this.currentResponsive=void 0)};n.prototype.matchResponsiveRule=function(c,n){var y=c.condition;(y.callback||function(){return this.chartWidth<=u(y.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=u(y.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=u(y.minWidth,0)&&this.chartHeight>=u(y.minHeight,
0)}).call(this)&&n.push(c._id)};n.prototype.currentOptions=function(c){function n(c,p,g,b){var a;F(c,function(c,f){if(!b&&-1<u.collectionsWithUpdate.indexOf(f))for(c=z(c),g[f]=[],a=0;a<c.length;a++)p[f][a]&&(g[f][a]={},n(c[a],p[f][a],g[f][a],b+1));else D(c)?(g[f]=A(c)?[]:{},n(c,p[f]||{},g[f],b+1)):g[f]=void 0===p[f]?null:p[f]})}var u=this,x={};n(c,this.options,x,0);return x}});N(H,"masters/highcharts.src.js",[H["parts/Globals.js"],H["parts/Utilities.js"]],function(c,n){var A=c.extend;A(c,{attr:n.attr,
defined:n.defined,erase:n.erase,isArray:n.isArray,isClass:n.isClass,isDOMElement:n.isDOMElement,isNumber:n.isNumber,isObject:n.isObject,isString:n.isString,objectEach:n.objectEach,pInt:n.pInt,splat:n.splat});return c});H["masters/highcharts.src.js"]._modules=H;return H["masters/highcharts.src.js"]});
//# sourceMappingURL=highcharts.js.map
/* jquery.nicescroll
-- version 3.7.6
-- copyright 2017-07-19 InuYaksa*2017
-- licensed under the MIT
--
-- https://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
--
*/

/* jshint expr: true */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function (jQuery) {

  "use strict";

  // globals
  var domfocus = false,
    mousefocus = false,
    tabindexcounter = 0,
    ascrailcounter = 2000,
    globalmaxzindex = 0;

  var $ = jQuery,       // sandbox
    _doc = document,
    _win = window,
    $window = $(_win);

  var delegatevents = [];

  // http://stackoverflow.com/questions/2161159/get-script-path
  function getScriptPath() {
    var scripts = _doc.currentScript || (function () { var s = _doc.getElementsByTagName('script'); return (s.length) ? s[s.length - 1] : false; })();
    var path = scripts ? scripts.src.split('?')[0] : '';
    return (path.split('/').length > 0) ? path.split('/').slice(0, -1).join('/') + '/' : '';
  }

  // based on code by Paul Irish https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/  
  var setAnimationFrame = _win.requestAnimationFrame || _win.webkitRequestAnimationFrame || _win.mozRequestAnimationFrame || false;
  var clearAnimationFrame = _win.cancelAnimationFrame || _win.webkitCancelAnimationFrame || _win.mozCancelAnimationFrame || false;

  if (!setAnimationFrame) {
    var anilasttime = 0;
    setAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - anilasttime));
      var id = _win.setTimeout(function () { callback(currTime + timeToCall); },
        timeToCall);
      anilasttime = currTime + timeToCall;
      return id;
    };
    clearAnimationFrame = function (id) {
      _win.clearTimeout(id);
    };
  } else {
    if (!_win.cancelAnimationFrame) clearAnimationFrame = function (id) { };
  }

  var ClsMutationObserver = _win.MutationObserver || _win.WebKitMutationObserver || false;

  var now = Date.now || function () { return new Date().getTime(); };

  var _globaloptions = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "6px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 40,
    mousescrollstep: 9 * 3,
    touchbehavior: false,   // deprecated
    emulatetouch: false,    // replacing touchbehavior
    hwacceleration: true,
    usetransition: true,
    boxzoom: false,
    dblclickzoom: true,
    gesturezoom: true,
    grabcursorenabled: true,
    autohidemode: true,
    background: "",
    iframeautoresize: true,
    cursorminheight: 32,
    preservenativescrolling: true,
    railoffset: false,
    railhoffset: false,
    bouncescroll: true,
    spacebarenabled: true,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: true,
    horizrailenabled: true,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: true,
    enablemousewheel: true,
    enablekeyboard: true,
    smoothscroll: true,
    sensitiverail: true,
    enablemouselockapi: true,
    //      cursormaxheight:false,
    cursorfixedheight: false,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: true,
    enablescrollonselection: true,
    overflowx: true,
    overflowy: true,
    cursordragspeed: 0.3,
    rtlmode: "auto",
    cursordragontouch: false,
    oneaxismousemode: "auto",
    scriptpath: getScriptPath(),
    preventmultitouchscrolling: true,
    disablemutationobserver: false,
    enableobserver: true,
    scrollbarid: false,
    scrollCLass: false
  };

  var browserdetected = false;

  var getBrowserDetection = function () {

    if (browserdetected) return browserdetected;

    var _el = _doc.createElement('DIV'),
      _style = _el.style,
      _agent = navigator.userAgent,
      _platform = navigator.platform,
      d = {};

    d.haspointerlock = "pointerLockElement" in _doc || "webkitPointerLockElement" in _doc || "mozPointerLockElement" in _doc;

    d.isopera = ("opera" in _win); // 12-
    d.isopera12 = (d.isopera && ("getUserMedia" in navigator));
    d.isoperamini = (Object.prototype.toString.call(_win.operamini) === "[object OperaMini]");

    d.isie = (("all" in _doc) && ("attachEvent" in _el) && !d.isopera); //IE10-
    d.isieold = (d.isie && !("msInterpolationMode" in _style)); // IE6 and older
    d.isie7 = d.isie && !d.isieold && (!("documentMode" in _doc) || (_doc.documentMode === 7));
    d.isie8 = d.isie && ("documentMode" in _doc) && (_doc.documentMode === 8);
    d.isie9 = d.isie && ("performance" in _win) && (_doc.documentMode === 9);
    d.isie10 = d.isie && ("performance" in _win) && (_doc.documentMode === 10);
    d.isie11 = ("msRequestFullscreen" in _el) && (_doc.documentMode >= 11); // IE11+

    d.ismsedge = ("msCredentials" in _win);  // MS Edge 14+

    d.ismozilla = ("MozAppearance" in _style);

    d.iswebkit = !d.ismsedge && ("WebkitAppearance" in _style);

    d.ischrome = d.iswebkit && ("chrome" in _win);
    d.ischrome38 = (d.ischrome && ("touchAction" in _style)); // behavior changed in touch emulation    
    d.ischrome22 = (!d.ischrome38) && (d.ischrome && d.haspointerlock);
    d.ischrome26 = (!d.ischrome38) && (d.ischrome && ("transition" in _style)); // issue with transform detection (maintain prefix)

    d.cantouch = ("ontouchstart" in _doc.documentElement) || ("ontouchstart" in _win); // with detection for Chrome Touch Emulation    
    d.hasw3ctouch = (_win.PointerEvent || false) && ((navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)); //IE11 pointer events, following W3C Pointer Events spec
    d.hasmstouch = (!d.hasw3ctouch) && (_win.MSPointerEvent || false); // IE10 pointer events

    d.ismac = /^mac$/i.test(_platform);

    d.isios = d.cantouch && /iphone|ipad|ipod/i.test(_platform);
    d.isios4 = d.isios && !("seal" in Object);
    d.isios7 = d.isios && ("webkitHidden" in _doc);  //iOS 7+
    d.isios8 = d.isios && ("hidden" in _doc);  //iOS 8+
    d.isios10 = d.isios && _win.Proxy;  //iOS 10+

    d.isandroid = (/android/i.test(_agent));

    d.haseventlistener = ("addEventListener" in _el);

    d.trstyle = false;
    d.hastransform = false;
    d.hastranslate3d = false;
    d.transitionstyle = false;
    d.hastransition = false;
    d.transitionend = false;

    d.trstyle = "transform";
    d.hastransform = ("transform" in _style) || (function () {
      var check = ['msTransform', 'webkitTransform', 'MozTransform', 'OTransform'];
      for (var a = 0, c = check.length; a < c; a++) {
        if (_style[check[a]] !== undefined) {
          d.trstyle = check[a];
          break;
        }
      }
      d.hastransform = (!!d.trstyle);
    })();

    if (d.hastransform) {
      _style[d.trstyle] = "translate3d(1px,2px,3px)";
      d.hastranslate3d = /translate3d/.test(_style[d.trstyle]);
    }

    d.transitionstyle = "transition";
    d.prefixstyle = '';
    d.transitionend = "transitionend";

    d.hastransition = ("transition" in _style) || (function () {

      d.transitionend = false;
      var check = ['webkitTransition', 'msTransition', 'MozTransition', 'OTransition', 'OTransition', 'KhtmlTransition'];
      var prefix = ['-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'];
      var evs = ['webkitTransitionEnd', 'msTransitionEnd', 'transitionend', 'otransitionend', 'oTransitionEnd', 'KhtmlTransitionEnd'];
      for (var a = 0, c = check.length; a < c; a++) {
        if (check[a] in _style) {
          d.transitionstyle = check[a];
          d.prefixstyle = prefix[a];
          d.transitionend = evs[a];
          break;
        }
      }
      if (d.ischrome26) d.prefixstyle = prefix[1];  // always use prefix

      d.hastransition = (d.transitionstyle);

    })();

    function detectCursorGrab() {
      var lst = ['grab', '-webkit-grab', '-moz-grab'];
      if ((d.ischrome && !d.ischrome38) || d.isie) lst = []; // force setting for IE returns false positive and chrome cursor bug
      for (var a = 0, l = lst.length; a < l; a++) {
        var p = lst[a];
        _style.cursor = p;
        if (_style.cursor == p) return p;
      }
      return 'url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize'; // thanks to https://cdnjs.com/ for the openhand cursor!
    }
    d.cursorgrabvalue = detectCursorGrab();

    d.hasmousecapture = ("setCapture" in _el);

    d.hasMutationObserver = (ClsMutationObserver !== false);

    _el = null; //memory released

    browserdetected = d;

    return d;
  };

  var NiceScrollClass = function (myopt, me) {

    var self = this;

    this.version = '3.7.6';
    this.name = 'nicescroll';

    this.me = me;

    var $body = $("body");

    var opt = this.opt = {
      doc: $body,
      win: false
    };

    $.extend(opt, _globaloptions);  // clone opts

    // Options for internal use
    opt.snapbackspeed = 80;

    if (myopt || false) {
      for (var a in opt) {
        if (myopt[a] !== undefined) opt[a] = myopt[a];
      }
    }

    if (opt.disablemutationobserver) ClsMutationObserver = false;

    this.doc = opt.doc;
    this.iddoc = (this.doc && this.doc[0]) ? this.doc[0].id || '' : '';
    this.ispage = /^BODY|HTML/.test((opt.win) ? opt.win[0].nodeName : this.doc[0].nodeName);
    this.haswrapper = (opt.win !== false);
    this.win = opt.win || (this.ispage ? $window : this.doc);
    this.docscroll = (this.ispage && !this.haswrapper) ? $window : this.win;
    this.body = $body;
    this.viewport = false;

    this.isfixed = false;

    this.iframe = false;
    this.isiframe = ((this.doc[0].nodeName == 'IFRAME') && (this.win[0].nodeName == 'IFRAME'));

    this.istextarea = (this.win[0].nodeName == 'TEXTAREA');

    this.forcescreen = false; //force to use screen position on events

    this.canshowonmouseevent = (opt.autohidemode != "scroll");

    // Events jump table    
    this.onmousedown = false;
    this.onmouseup = false;
    this.onmousemove = false;
    this.onmousewheel = false;
    this.onkeypress = false;
    this.ongesturezoom = false;
    this.onclick = false;

    // Nicescroll custom events
    this.onscrollstart = false;
    this.onscrollend = false;
    this.onscrollcancel = false;

    this.onzoomin = false;
    this.onzoomout = false;

    // Let's start!  
    this.view = false;
    this.page = false;

    this.scroll = {
      x: 0,
      y: 0
    };
    this.scrollratio = {
      x: 0,
      y: 0
    };
    this.cursorheight = 20;
    this.scrollvaluemax = 0;

    // http://dev.w3.org/csswg/css-writing-modes-3/#logical-to-physical
    // http://dev.w3.org/csswg/css-writing-modes-3/#svg-writing-mode
    if (opt.rtlmode == "auto") {
      var target = this.win[0] == _win ? this.body : this.win;
      var writingMode = target.css("writing-mode") || target.css("-webkit-writing-mode") || target.css("-ms-writing-mode") || target.css("-moz-writing-mode");

      if (writingMode == "horizontal-tb" || writingMode == "lr-tb" || writingMode === "") {
        this.isrtlmode = (target.css("direction") == "rtl");
        this.isvertical = false;
      } else {
        this.isrtlmode = (writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl" || writingMode == "rl-tb");
        this.isvertical = (writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl");
      }
    } else {
      this.isrtlmode = (opt.rtlmode === true);
      this.isvertical = false;
    }
    //    this.checkrtlmode = false;

    this.scrollrunning = false;

    this.scrollmom = false;

    this.observer = false;  // observer div changes
    this.observerremover = false;  // observer on parent for remove detection
    this.observerbody = false;  // observer on body for position change

    if (opt.scrollbarid !== false) {
      this.id = opt.scrollbarid;
    } else {
      do {
        this.id = "ascrail" + (ascrailcounter++);
      } while (_doc.getElementById(this.id));
    }

    this.rail = false;
    this.cursor = false;
    this.cursorfreezed = false;
    this.selectiondrag = false;

    this.zoom = false;
    this.zoomactive = false;

    this.hasfocus = false;
    this.hasmousefocus = false;

    //this.visibility = true;
    this.railslocked = false;  // locked by resize
    this.locked = false;  // prevent lost of locked status sets by user
    this.hidden = false; // rails always hidden
    this.cursoractive = true; // user can interact with cursors

    this.wheelprevented = false; //prevent mousewheel event

    this.overflowx = opt.overflowx;
    this.overflowy = opt.overflowy;

    this.nativescrollingarea = false;
    this.checkarea = 0;

    this.events = []; // event list for unbind

    this.saved = {};  // style saved

    this.delaylist = {};
    this.synclist = {};

    this.lastdeltax = 0;
    this.lastdeltay = 0;

    this.detected = getBrowserDetection();

    var cap = $.extend({}, this.detected);

    this.canhwscroll = (cap.hastransform && opt.hwacceleration);
    this.ishwscroll = (this.canhwscroll && self.haswrapper);

    if (!this.isrtlmode) {
      this.hasreversehr = false;
    } else if (this.isvertical) { // RTL mode with reverse horizontal axis
      this.hasreversehr = !(cap.iswebkit || cap.isie || cap.isie11);
    } else {
      this.hasreversehr = !(cap.iswebkit || (cap.isie && !cap.isie10 && !cap.isie11));
    }

    this.istouchcapable = false; // desktop devices with touch screen support

    //## Check WebKit-based desktop with touch support
    //## + Firefox 18 nightly build (desktop) false positive (or desktop with touch support)

    if (!cap.cantouch && (cap.hasw3ctouch || cap.hasmstouch)) {  // desktop device with multiple input
      this.istouchcapable = true;
    } else if (cap.cantouch && !cap.isios && !cap.isandroid && (cap.iswebkit || cap.ismozilla)) {
      this.istouchcapable = true;
    }

    //## disable MouseLock API on user request
    if (!opt.enablemouselockapi) {
      cap.hasmousecapture = false;
      cap.haspointerlock = false;
    }

    this.debounced = function (name, fn, tm) {
      if (!self) return;
      var dd = self.delaylist[name] || false;
      if (!dd) {
        self.delaylist[name] = {
          h: setAnimationFrame(function () {
            self.delaylist[name].fn.call(self);
            self.delaylist[name] = false;
          }, tm)
        };
        fn.call(self);
      }
      self.delaylist[name].fn = fn;
    };


    this.synched = function (name, fn) {
      if (self.synclist[name]) self.synclist[name] = fn;
      else {
        self.synclist[name] = fn;
        setAnimationFrame(function () {
          if (!self) return;
          self.synclist[name] && self.synclist[name].call(self);
          self.synclist[name] = null;
        });
      }
    };

    this.unsynched = function (name) {
      if (self.synclist[name]) self.synclist[name] = false;
    };

    this.css = function (el, pars) { // save & set
      for (var n in pars) {
        self.saved.css.push([el, n, el.css(n)]);
        el.css(n, pars[n]);
      }
    };

    this.scrollTop = function (val) {
      return (val === undefined) ? self.getScrollTop() : self.setScrollTop(val);
    };

    this.scrollLeft = function (val) {
      return (val === undefined) ? self.getScrollLeft() : self.setScrollLeft(val);
    };

    // derived by by Dan Pupius www.pupius.net
    var BezierClass = function (st, ed, spd, p1, p2, p3, p4) {

      this.st = st;
      this.ed = ed;
      this.spd = spd;

      this.p1 = p1 || 0;
      this.p2 = p2 || 1;
      this.p3 = p3 || 0;
      this.p4 = p4 || 1;

      this.ts = now();
      this.df = ed - st;
    };
    BezierClass.prototype = {
      B2: function (t) {
        return 3 * (1 - t) * (1 - t) * t;
      },
      B3: function (t) {
        return 3 * (1 - t) * t * t;
      },
      B4: function (t) {
        return t * t * t;
      },
      getPos: function () {
        return (now() - this.ts) / this.spd;
      },
      getNow: function () {
        var pc = (now() - this.ts) / this.spd;
        var bz = this.B2(pc) + this.B3(pc) + this.B4(pc);
        return (pc >= 1) ? this.ed : this.st + (this.df * bz) | 0;
      },
      update: function (ed, spd) {
        this.st = this.getNow();
        this.ed = ed;
        this.spd = spd;
        this.ts = now();
        this.df = this.ed - this.st;
        return this;
      }
    };

    //derived from http://stackoverflow.com/questions/11236090/
    function getMatrixValues() {
      var tr = self.doc.css(cap.trstyle);
      if (tr && (tr.substr(0, 6) == "matrix")) {
        return tr.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
      }
      return false;
    }

    if (this.ishwscroll) {    // hw accelerated scroll

      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      };

      //this one can help to enable hw accel on ios6 http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
      if (cap.hastranslate3d && cap.isios) this.doc.css("-webkit-backface-visibility", "hidden"); // prevent flickering http://stackoverflow.com/questions/3461441/      

      this.getScrollTop = function (last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[13] : -mtx[5]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bz) return self.timerscroll.bz.getNow();
        }
        return self.doc.translate.y;
      };

      this.getScrollLeft = function (last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[12] : -mtx[4]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bh) return self.timerscroll.bh.getNow();
        }
        return self.doc.translate.x;
      };

      this.notifyScrollEvent = function (el) {
        var e = _doc.createEvent("UIEvents");
        e.initUIEvent("scroll", false, false, _win, 1);
        e.niceevent = true;
        el.dispatchEvent(e);
      };

      var cxscrollleft = (this.isrtlmode) ? 1 : -1;

      if (cap.hastranslate3d && opt.enabletranslate3d) {
        this.setScrollTop = function (val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function (val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      } else {
        this.setScrollTop = function (val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function (val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      }
    } else {    // native scroll

      this.getScrollTop = function () {
        return self.docscroll.scrollTop();
      };
      this.setScrollTop = function (val) {
        self.docscroll.scrollTop(val);
      };

      this.getScrollLeft = function () {
        var val;
        if (!self.hasreversehr) {
          val = self.docscroll.scrollLeft();
        } else if (self.detected.ismozilla) {
          val = self.page.maxw - Math.abs(self.docscroll.scrollLeft());
        } else {
          val = self.page.maxw - self.docscroll.scrollLeft();
        }
        return val;
      };
      this.setScrollLeft = function (val) {
        return setTimeout(function () {
          if (!self) return;
          if (self.hasreversehr) {
            if (self.detected.ismozilla) {
              val = -(self.page.maxw - val);
            } else {
              val = self.page.maxw - val;
            }
          }
          return self.docscroll.scrollLeft(val);
        }, 1);
      };
    }

    this.getTarget = function (e) {
      if (!e) return false;
      if (e.target) return e.target;
      if (e.srcElement) return e.srcElement;
      return false;
    };

    this.hasParent = function (e, id) {
      if (!e) return false;
      var el = e.target || e.srcElement || e || false;
      while (el && el.id != id) {
        el = el.parentNode || false;
      }
      return (el !== false);
    };

    function getZIndex() {
      var dom = self.win;
      if ("zIndex" in dom) return dom.zIndex(); // use jQuery UI method when available
      while (dom.length > 0) {
        if (dom[0].nodeType == 9) return false;
        var zi = dom.css('zIndex');
        if (!isNaN(zi) && zi !== 0) return parseInt(zi);
        dom = dom.parent();
      }
      return false;
    }

    //inspired by http://forum.jquery.com/topic/width-includes-border-width-when-set-to-thin-medium-thick-in-ie
    var _convertBorderWidth = {
      "thin": 1,
      "medium": 3,
      "thick": 5
    };

    function getWidthToPixel(dom, prop, chkheight) {
      var wd = dom.css(prop);
      var px = parseFloat(wd);
      if (isNaN(px)) {
        px = _convertBorderWidth[wd] || 0;
        var brd = (px == 3) ? ((chkheight) ? (self.win.outerHeight() - self.win.innerHeight()) : (self.win.outerWidth() - self.win.innerWidth())) : 1; //DON'T TRUST CSS
        if (self.isie8 && px) px += 1;
        return (brd) ? px : 0;
      }
      return px;
    }

    this.getDocumentScrollOffset = function () {
      return {
        top: _win.pageYOffset || _doc.documentElement.scrollTop,
        left: _win.pageXOffset || _doc.documentElement.scrollLeft
      };
    };

    this.getOffset = function () {
      if (self.isfixed) {
        var ofs = self.win.offset();  // fix Chrome auto issue (when right/bottom props only)
        var scrl = self.getDocumentScrollOffset();
        ofs.top -= scrl.top;
        ofs.left -= scrl.left;
        return ofs;
      }
      var ww = self.win.offset();
      if (!self.viewport) return ww;
      var vp = self.viewport.offset();
      return {
        top: ww.top - vp.top,
        left: ww.left - vp.left
      };
    };

    this.updateScrollBar = function (len) {
      var pos, off;
      if (self.ishwscroll) {
        self.rail.css({
          height: self.win.innerHeight() - (opt.railpadding.top + opt.railpadding.bottom)
        });
        if (self.railh) self.railh.css({
          width: self.win.innerWidth() - (opt.railpadding.left + opt.railpadding.right)
        });
      } else {
        var wpos = self.getOffset();
        pos = {
          top: wpos.top,
          left: wpos.left - (opt.railpadding.left + opt.railpadding.right)
        };
        pos.top += getWidthToPixel(self.win, 'border-top-width', true);
        pos.left += (self.rail.align) ? self.win.outerWidth() - getWidthToPixel(self.win, 'border-right-width') - self.rail.width : getWidthToPixel(self.win, 'border-left-width');

        off = opt.railoffset;
        if (off) {
          if (off.top) pos.top += off.top;
          if (off.left) pos.left += off.left;
        }

        if (!self.railslocked) self.rail.css({
          top: pos.top,
          left: pos.left,
          height: ((len) ? len.h : self.win.innerHeight()) - (opt.railpadding.top + opt.railpadding.bottom)
        });

        if (self.zoom) {
          self.zoom.css({
            top: pos.top + 1,
            left: (self.rail.align == 1) ? pos.left - 20 : pos.left + self.rail.width + 4
          });
        }

        if (self.railh && !self.railslocked) {
          pos = {
            top: wpos.top,
            left: wpos.left
          };
          off = opt.railhoffset;
          if (off) {
            if (off.top) pos.top += off.top;
            if (off.left) pos.left += off.left;
          }
          var y = (self.railh.align) ? pos.top + getWidthToPixel(self.win, 'border-top-width', true) + self.win.innerHeight() - self.railh.height : pos.top + getWidthToPixel(self.win, 'border-top-width', true);
          var x = pos.left + getWidthToPixel(self.win, 'border-left-width');
          self.railh.css({
            top: y - (opt.railpadding.top + opt.railpadding.bottom),
            left: x,
            width: self.railh.width
          });
        }

      }
    };

    this.doRailClick = function (e, dbl, hr) {
      var fn, pg, cur, pos;

      if (self.railslocked) return;

      self.cancelEvent(e);

      if (!("pageY" in e)) {
        e.pageX = e.clientX + _doc.documentElement.scrollLeft;
        e.pageY = e.clientY + _doc.documentElement.scrollTop;
      }

      if (dbl) {
        fn = (hr) ? self.doScrollLeft : self.doScrollTop;
        cur = (hr) ? ((e.pageX - self.railh.offset().left - (self.cursorwidth / 2)) * self.scrollratio.x) : ((e.pageY - self.rail.offset().top - (self.cursorheight / 2)) * self.scrollratio.y);
        self.unsynched("relativexy");
        fn(cur|0);
      } else {
        fn = (hr) ? self.doScrollLeftBy : self.doScrollBy;
        cur = (hr) ? self.scroll.x : self.scroll.y;
        pos = (hr) ? e.pageX - self.railh.offset().left : e.pageY - self.rail.offset().top;
        pg = (hr) ? self.view.w : self.view.h;
        fn((cur >= pos) ? pg : -pg);
      }

    };

    self.newscrolly = self.newscrollx = 0;

    self.hasanimationframe = ("requestAnimationFrame" in _win);
    self.hascancelanimationframe = ("cancelAnimationFrame" in _win);

    self.hasborderbox = false;

    this.init = function () {

      self.saved.css = [];

      if (cap.isoperamini) return true; // SORRY, DO NOT WORK!
      if (cap.isandroid && !("hidden" in _doc)) return true; // Android 3- SORRY, DO NOT WORK!

      opt.emulatetouch = opt.emulatetouch || opt.touchbehavior;  // mantain compatibility with "touchbehavior"      

      self.hasborderbox = _win.getComputedStyle && (_win.getComputedStyle(_doc.body)['box-sizing'] === "border-box");

      var _scrollyhidden = { 'overflow-y': 'hidden' };
      if (cap.isie11 || cap.isie10) _scrollyhidden['-ms-overflow-style'] = 'none';  // IE 10 & 11 is always a world apart!

      if (self.ishwscroll) {
        this.doc.css(cap.transitionstyle, cap.prefixstyle + 'transform 0ms ease-out');
        if (cap.transitionend) self.bind(self.doc, cap.transitionend, self.onScrollTransitionEnd, false); //I have got to do something usefull!!
      }

      self.zindex = "auto";
      if (!self.ispage && opt.zindex == "auto") {
        self.zindex = getZIndex() || "auto";
      } else {
        self.zindex = opt.zindex;
      }

      if (!self.ispage && self.zindex != "auto" && self.zindex > globalmaxzindex) {
        globalmaxzindex = self.zindex;
      }

      if (self.isie && self.zindex === 0 && opt.zindex == "auto") { // fix IE auto == 0
        self.zindex = "auto";
      }

      if (!self.ispage || !cap.isieold) {

        var cont = self.docscroll;
        if (self.ispage) cont = (self.haswrapper) ? self.win : self.doc;

        self.css(cont, _scrollyhidden);

        if (self.ispage && (cap.isie11 || cap.isie)) { // IE 7-11
          self.css($("html"), _scrollyhidden);
        }

        if (cap.isios && !self.ispage && !self.haswrapper) self.css($body, {
          "-webkit-overflow-scrolling": "touch"
        }); //force hw acceleration

        var cursor = $(_doc.createElement('div'));
        cursor.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: opt.cursorwidth,
          height: 0,
          'background-color': opt.cursorcolor,
          border: opt.cursorborder,
          'background-clip': 'padding-box',
          '-webkit-border-radius': opt.cursorborderradius,
          '-moz-border-radius': opt.cursorborderradius,
          'border-radius': opt.cursorborderradius
        });

        cursor.addClass('nicescroll-cursors');

        self.cursor = cursor;

        var rail = $(_doc.createElement('div'));
        rail.attr('id', self.id);
        rail.addClass('nicescroll-rails nicescroll-rails-vr');

        if (opt.scrollCLass) {
            rail.addClass(opt.scrollCLass);
        }

        var v, a, kp = ["left", "right", "top", "bottom"];  //**
        for (var n in kp) {
          a = kp[n];
          v = opt.railpadding[a] || 0;
          v && rail.css("padding-" + a, v + "px");
        }

        rail.append(cursor);

        rail.width = Math.max(parseFloat(opt.cursorwidth), cursor.outerWidth());
        rail.css({
          width: rail.width + "px",
          zIndex: self.zindex,
          background: opt.background,
          cursor: "default"
        });

        rail.visibility = true;
        rail.scrollable = true;

        rail.align = (opt.railalign == "left") ? 0 : 1;

        self.rail = rail;

        self.rail.drag = false;

        var zoom = false;
        if (opt.boxzoom && !self.ispage && !cap.isieold) {
          zoom = _doc.createElement('div');

          self.bind(zoom, "click", self.doZoom);
          self.bind(zoom, "mouseenter", function () {
            self.zoom.css('opacity', opt.cursoropacitymax);
          });
          self.bind(zoom, "mouseleave", function () {
            self.zoom.css('opacity', opt.cursoropacitymin);
          });

          self.zoom = $(zoom);
          self.zoom.css({
            cursor: "pointer",
            zIndex: self.zindex,
            backgroundImage: 'url(' + opt.scriptpath + 'zoomico.png)',
            height: 18,
            width: 18,
            backgroundPosition: '0 0'
          });
          if (opt.dblclickzoom) self.bind(self.win, "dblclick", self.doZoom);
          if (cap.cantouch && opt.gesturezoom) {
            self.ongesturezoom = function (e) {
              if (e.scale > 1.5) self.doZoomIn(e);
              if (e.scale < 0.8) self.doZoomOut(e);
              return self.cancelEvent(e);
            };
            self.bind(self.win, "gestureend", self.ongesturezoom);
          }
        }

        // init HORIZ

        self.railh = false;
        var railh;

        if (opt.horizrailenabled) {

          self.css(cont, {
            overflowX: 'hidden'
          });

          cursor = $(_doc.createElement('div'));
          cursor.css({
            position: "absolute",
            top: 0,
            height: opt.cursorwidth,
            width: 0,
            backgroundColor: opt.cursorcolor,
            border: opt.cursorborder,
            backgroundClip: 'padding-box',
            '-webkit-border-radius': opt.cursorborderradius,
            '-moz-border-radius': opt.cursorborderradius,
            'border-radius': opt.cursorborderradius
          });

          if (cap.isieold) cursor.css('overflow', 'hidden');  //IE6 horiz scrollbar issue

          cursor.addClass('nicescroll-cursors');

          self.cursorh = cursor;

          railh = $(_doc.createElement('div'));
          railh.attr('id', self.id + '-hr');
          railh.addClass('nicescroll-rails nicescroll-rails-hr');
          if (opt.scrollCLass) {
              railh.addClass(opt.scrollCLass);
          }

          railh.height = Math.max(parseFloat(opt.cursorwidth), cursor.outerHeight());
          railh.css({
            height: railh.height + "px",
            'zIndex': self.zindex,
            "background": opt.background
          });

          railh.append(cursor);

          railh.visibility = true;
          railh.scrollable = true;

          railh.align = (opt.railvalign == "top") ? 0 : 1;

          self.railh = railh;

          self.railh.drag = false;

        }

        if (self.ispage) {

          rail.css({
            position: "fixed",
            top: 0,
            height: "100%"
          });

          rail.css((rail.align) ? { right: 0 } : { left: 0 });

          self.body.append(rail);
          if (self.railh) {
            railh.css({
              position: "fixed",
              left: 0,
              width: "100%"
            });

            railh.css((railh.align) ? { bottom: 0 } : { top: 0 });

            self.body.append(railh);
          }
        } else {
          if (self.ishwscroll) {
            if (self.win.css('position') == 'static') self.css(self.win, { 'position': 'relative' });
            var bd = (self.win[0].nodeName == 'HTML') ? self.body : self.win;
            $(bd).scrollTop(0).scrollLeft(0);  // fix rail position if content already scrolled
            if (self.zoom) {
              self.zoom.css({
                position: "absolute",
                top: 1,
                right: 0,
                "margin-right": rail.width + 4
              });
              bd.append(self.zoom);
            }
            rail.css({
              position: "absolute",
              top: 0
            });
            rail.css((rail.align) ? { right: 0 } : { left: 0 });
            bd.append(rail);
            if (railh) {
              railh.css({
                position: "absolute",
                left: 0,
                bottom: 0
              });
              railh.css((railh.align) ? { bottom: 0 } : { top: 0 });
              bd.append(railh);
            }
          } else {
            self.isfixed = (self.win.css("position") == "fixed");
            var rlpos = (self.isfixed) ? "fixed" : "absolute";

            if (!self.isfixed) self.viewport = self.getViewport(self.win[0]);
            if (self.viewport) {
              self.body = self.viewport;
              if (!(/fixed|absolute/.test(self.viewport.css("position")))) self.css(self.viewport, {
                "position": "relative"
              });
            }

            rail.css({
              position: rlpos
            });
            if (self.zoom) self.zoom.css({
              position: rlpos
            });
            self.updateScrollBar();
            self.body.append(rail);
            if (self.zoom) self.body.append(self.zoom);
            if (self.railh) {
              railh.css({
                position: rlpos
              });
              self.body.append(railh);
            }
          }

          if (cap.isios) self.css(self.win, {
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
            '-webkit-touch-callout': 'none'
          }); // prevent grey layer on click

          if (opt.disableoutline) {
            if (cap.isie) self.win.attr("hideFocus", "true"); // IE, prevent dotted rectangle on focused div
            if (cap.iswebkit) self.win.css('outline', 'none');  // Webkit outline
          }

        }

        if (opt.autohidemode === false) {
          self.autohidedom = false;
          self.rail.css({
            opacity: opt.cursoropacitymax
          });
          if (self.railh) self.railh.css({
            opacity: opt.cursoropacitymax
          });
        } else if ((opt.autohidemode === true) || (opt.autohidemode === "leave")) {
          self.autohidedom = $().add(self.rail);
          if (cap.isie8) self.autohidedom = self.autohidedom.add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
          if (self.railh && cap.isie8) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (opt.autohidemode == "scroll") {
          self.autohidedom = $().add(self.rail);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
        } else if (opt.autohidemode == "cursor") {
          self.autohidedom = $().add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (opt.autohidemode == "hidden") {
          self.autohidedom = false;
          self.hide();
          self.railslocked = false;
        }

        if (cap.cantouch || self.istouchcapable || opt.emulatetouch || cap.hasmstouch) {

          self.scrollmom = new ScrollMomentumClass2D(self);

          var delayedclick = null;

          self.ontouchstart = function (e) {

            if (self.locked) return false;

            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;  // need test on surface!!

            self.hasmoving = false;

            if (self.scrollmom.timer) {
              self.triggerScrollEnd();
              self.scrollmom.stop();
            }

            if (!self.railslocked) {
              var tg = self.getTarget(e);

              if (tg) {
                var skp = (/INPUT/i.test(tg.nodeName)) && (/range/i.test(tg.type));
                if (skp) return self.stopPropagation(e);
              }

              var ismouse = (e.type === "mousedown");

              if (!("clientX" in e) && ("changedTouches" in e)) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
              }

              if (self.forcescreen) {
                var le = e;
                e = {
                  "original": (e.original) ? e.original : e
                };
                e.clientX = le.screenX;
                e.clientY = le.screenY;
              }

              self.rail.drag = {
                x: e.clientX,
                y: e.clientY,
                sx: self.scroll.x,
                sy: self.scroll.y,
                st: self.getScrollTop(),
                sl: self.getScrollLeft(),
                pt: 2,
                dl: false,
                tg: tg
              };

              if (self.ispage || !opt.directionlockdeadzone) {

                self.rail.drag.dl = "f";

              } else {

                var view = {
                  w: $window.width(),
                  h: $window.height()
                };

                var page = self.getContentSize();

                var maxh = page.h - view.h;
                var maxw = page.w - view.w;

                if (self.rail.scrollable && !self.railh.scrollable) self.rail.drag.ck = (maxh > 0) ? "v" : false;
                else if (!self.rail.scrollable && self.railh.scrollable) self.rail.drag.ck = (maxw > 0) ? "h" : false;
                else self.rail.drag.ck = false;

              }

              if (opt.emulatetouch && self.isiframe && cap.isie) {
                var wp = self.win.position();
                self.rail.drag.x += wp.left;
                self.rail.drag.y += wp.top;
              }

              self.hasmoving = false;
              self.lastmouseup = false;
              self.scrollmom.reset(e.clientX, e.clientY);

              if (tg&&ismouse) {

                var ip = /INPUT|SELECT|BUTTON|TEXTAREA/i.test(tg.nodeName);
                if (!ip) {
                  if (cap.hasmousecapture) tg.setCapture();
                  if (opt.emulatetouch) {
                    if (tg.onclick && !(tg._onclick || false)) { // intercept DOM0 onclick event
                      tg._onclick = tg.onclick;
                      tg.onclick = function (e) {
                        if (self.hasmoving) return false;
                        tg._onclick.call(this, e);
                      };
                    }
                    return self.cancelEvent(e);
                  }
                  return self.stopPropagation(e);
                }

                if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                  self.preventclick = {
                    "tg": tg,
                    "click": false
                  };
                }

              }
            }

          };

          self.ontouchend = function (e) {

            if (!self.rail.drag) return true;

            if (self.rail.drag.pt == 2) {
              //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
              if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;

              self.rail.drag = false;

              var ismouse = (e.type === "mouseup");

              if (self.hasmoving) {
                self.scrollmom.doMomentum();
                self.lastmouseup = true;
                self.hideCursor();
                if (cap.hasmousecapture) _doc.releaseCapture();
                if (ismouse) return self.cancelEvent(e);
              }

            }
            else if (self.rail.drag.pt == 1) {
              return self.onmouseup(e);
            }

          };

          var moveneedoffset = (opt.emulatetouch && self.isiframe && !cap.hasmousecapture);

          var locktollerance = opt.directionlockdeadzone * 0.3 | 0;

          self.ontouchmove = function (e, byiframe) {

            if (!self.rail.drag) return true;

            if (e.targetTouches && opt.preventmultitouchscrolling) {
              if (e.targetTouches.length > 1) return true; // multitouch
            }

            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return true;

            if (self.rail.drag.pt == 2) {

              if (("changedTouches" in e)) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
              }

              var ofy, ofx;
              ofx = ofy = 0;

              if (moveneedoffset && !byiframe) {
                var wp = self.win.position();
                ofx = -wp.left;
                ofy = -wp.top;
              }

              var fy = e.clientY + ofy;
              var my = (fy - self.rail.drag.y);
              var fx = e.clientX + ofx;
              var mx = (fx - self.rail.drag.x);

              var ny = self.rail.drag.st - my;

              if (self.ishwscroll && opt.bouncescroll) {
                if (ny < 0) {
                  ny = Math.round(ny / 2);
                } else if (ny > self.page.maxh) {
                  ny = self.page.maxh + Math.round((ny - self.page.maxh) / 2);
                }
              } else {
                if (ny < 0) {
                  ny = 0;
                  fy = 0;
                }
                else if (ny > self.page.maxh) {
                  ny = self.page.maxh;
                  fy = 0;
                }
                if (fy === 0 && !self.hasmoving) {
                  if (!self.ispage) self.rail.drag = false;
                  return true;
                }
              }

              var nx = self.getScrollLeft();

              if (self.railh && self.railh.scrollable) {
                nx = (self.isrtlmode) ? mx - self.rail.drag.sl : self.rail.drag.sl - mx;

                if (self.ishwscroll && opt.bouncescroll) {
                  if (nx < 0) {
                    nx = Math.round(nx / 2);
                  } else if (nx > self.page.maxw) {
                    nx = self.page.maxw + Math.round((nx - self.page.maxw) / 2);
                  }
                } else {
                  if (nx < 0) {
                    nx = 0;
                    fx = 0;
                  }
                  if (nx > self.page.maxw) {
                    nx = self.page.maxw;
                    fx = 0;
                  }
                }

              }


              if (!self.hasmoving) {

                if (self.rail.drag.y === e.clientY && self.rail.drag.x === e.clientX) return self.cancelEvent(e);  // prevent first useless move event 

                var ay = Math.abs(my);
                var ax = Math.abs(mx);
                var dz = opt.directionlockdeadzone;

                if (!self.rail.drag.ck) {
                  if (ay > dz && ax > dz) self.rail.drag.dl = "f";
                  else if (ay > dz) self.rail.drag.dl = (ax > locktollerance) ? "f" : "v";
                  else if (ax > dz) self.rail.drag.dl = (ay > locktollerance) ? "f" : "h";
                }
                else if (self.rail.drag.ck == "v") {
                  if (ax > dz && ay <= locktollerance) {
                    self.rail.drag = false;
                  }
                  else if (ay > dz) self.rail.drag.dl = "v";

                }
                else if (self.rail.drag.ck == "h") {

                  if (ay > dz && ax <= locktollerance) {
                    self.rail.drag = false;
                  }
                  else if (ax > dz) self.rail.drag.dl = "h";

                }

                if (!self.rail.drag.dl) return self.cancelEvent(e);

                self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);
                self.hasmoving = true;
              }

              if (self.preventclick && !self.preventclick.click) {
                self.preventclick.click = self.preventclick.tg.onclick || false;
                self.preventclick.tg.onclick = self.onpreventclick;
              }

              if (self.rail.drag.dl) {
                if (self.rail.drag.dl == "v") nx = self.rail.drag.sl;
                else if (self.rail.drag.dl == "h") ny = self.rail.drag.st;
              }

              self.synched("touchmove", function () {
                if (self.rail.drag && (self.rail.drag.pt == 2)) {
                  if (self.prepareTransition) self.resetTransition();
                  if (self.rail.scrollable) self.setScrollTop(ny);
                  self.scrollmom.update(fx, fy);
                  if (self.railh && self.railh.scrollable) {
                    self.setScrollLeft(nx);
                    self.showCursor(ny, nx);
                  } else {
                    self.showCursor(ny);
                  }
                  if (cap.isie10) _doc.selection.clear();
                }
              });

              return self.cancelEvent(e);

            }
            else if (self.rail.drag.pt == 1) { // drag on cursor
              return self.onmousemove(e);
            }

          };

          self.ontouchstartCursor = function (e, hronly) {
            if (self.rail.drag && self.rail.drag.pt != 3) return;
            if (self.locked) return self.cancelEvent(e);
            self.cancelScroll();
            self.rail.drag = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
              sx: self.scroll.x,
              sy: self.scroll.y,
              pt: 3,
              hr: (!!hronly)
            };
            var tg = self.getTarget(e);
            if (!self.ispage && cap.hasmousecapture) tg.setCapture();
            if (self.isiframe && !cap.hasmousecapture) {
              self.saved.csspointerevents = self.doc.css("pointer-events");
              self.css(self.doc, { "pointer-events": "none" });
            }
            return self.cancelEvent(e);
          };

          self.ontouchendCursor = function (e) {
            if (self.rail.drag) {
              if (cap.hasmousecapture) _doc.releaseCapture();
              if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
              if (self.rail.drag.pt != 3) return;
              self.rail.drag = false;
              return self.cancelEvent(e);
            }
          };

          self.ontouchmoveCursor = function (e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 3) return;

              self.cursorfreezed = true;

              if (self.rail.drag.hr) {
                self.scroll.x = self.rail.drag.sx + (e.touches[0].clientX - self.rail.drag.x);
                if (self.scroll.x < 0) self.scroll.x = 0;
                var mw = self.scrollvaluemaxw;
                if (self.scroll.x > mw) self.scroll.x = mw;
              } else {
                self.scroll.y = self.rail.drag.sy + (e.touches[0].clientY - self.rail.drag.y);
                if (self.scroll.y < 0) self.scroll.y = 0;
                var my = self.scrollvaluemax;
                if (self.scroll.y > my) self.scroll.y = my;
              }

              self.synched('touchmove', function () {
                if (self.rail.drag && (self.rail.drag.pt == 3)) {
                  self.showCursor();
                  if (self.rail.drag.hr) self.doScrollLeft(Math.round(self.scroll.x * self.scrollratio.x), opt.cursordragspeed);
                  else self.doScrollTop(Math.round(self.scroll.y * self.scrollratio.y), opt.cursordragspeed);
                }
              });

              return self.cancelEvent(e);
            }

          };

        }

        self.onmousedown = function (e, hronly) {
          if (self.rail.drag && self.rail.drag.pt != 1) return;
          if (self.railslocked) return self.cancelEvent(e);
          self.cancelScroll();
          self.rail.drag = {
            x: e.clientX,
            y: e.clientY,
            sx: self.scroll.x,
            sy: self.scroll.y,
            pt: 1,
            hr: hronly || false
          };
          var tg = self.getTarget(e);

          if (cap.hasmousecapture) tg.setCapture();
          if (self.isiframe && !cap.hasmousecapture) {
            self.saved.csspointerevents = self.doc.css("pointer-events");
            self.css(self.doc, {
              "pointer-events": "none"
            });
          }
          self.hasmoving = false;
          return self.cancelEvent(e);
        };

        self.onmouseup = function (e) {
          if (self.rail.drag) {
            if (self.rail.drag.pt != 1) return true;

            if (cap.hasmousecapture) _doc.releaseCapture();
            if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
            self.rail.drag = false;
            self.cursorfreezed = false;
            if (self.hasmoving) self.triggerScrollEnd();
            return self.cancelEvent(e);
          }
        };

        self.onmousemove = function (e) {
          if (self.rail.drag) {
            if (self.rail.drag.pt !== 1) return;

            if (cap.ischrome && e.which === 0) return self.onmouseup(e);

            self.cursorfreezed = true;

            if (!self.hasmoving) self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);

            self.hasmoving = true;

            if (self.rail.drag.hr) {
              self.scroll.x = self.rail.drag.sx + (e.clientX - self.rail.drag.x);
              if (self.scroll.x < 0) self.scroll.x = 0;
              var mw = self.scrollvaluemaxw;
              if (self.scroll.x > mw) self.scroll.x = mw;
            } else {
              self.scroll.y = self.rail.drag.sy + (e.clientY - self.rail.drag.y);
              if (self.scroll.y < 0) self.scroll.y = 0;
              var my = self.scrollvaluemax;
              if (self.scroll.y > my) self.scroll.y = my;
            }

            self.synched('mousemove', function () {

              if (self.cursorfreezed) {
                self.showCursor();

                if (self.rail.drag.hr) {
                  self.scrollLeft(Math.round(self.scroll.x * self.scrollratio.x));
                } else {
                  self.scrollTop(Math.round(self.scroll.y * self.scrollratio.y));
                }

              }
            });

            return self.cancelEvent(e);
          }
          else {
            self.checkarea = 0;
          }
        };

        if (cap.cantouch || opt.emulatetouch) {

          self.onpreventclick = function (e) {
            if (self.preventclick) {
              self.preventclick.tg.onclick = self.preventclick.click;
              self.preventclick = false;
              return self.cancelEvent(e);
            }
          };

          self.onclick = (cap.isios) ? false : function (e) {  // it needs to check IE11 ???
            if (self.lastmouseup) {
              self.lastmouseup = false;
              return self.cancelEvent(e);
            } else {
              return true;
            }
          };

          if (opt.grabcursorenabled && cap.cursorgrabvalue) {
            self.css((self.ispage) ? self.doc : self.win, {
              'cursor': cap.cursorgrabvalue
            });
            self.css(self.rail, {
              'cursor': cap.cursorgrabvalue
            });
          }

        } else {

          var checkSelectionScroll = function (e) {
            if (!self.selectiondrag) return;

            if (e) {
              var ww = self.win.outerHeight();
              var df = (e.pageY - self.selectiondrag.top);
              if (df > 0 && df < ww) df = 0;
              if (df >= ww) df -= ww;
              self.selectiondrag.df = df;
            }
            if (self.selectiondrag.df === 0) return;

            var rt = -(self.selectiondrag.df*2/6)|0;
            self.doScrollBy(rt);

            self.debounced("doselectionscroll", function () {
              checkSelectionScroll();
            }, 50);
          };

          if ("getSelection" in _doc) { // A grade - Major browsers
            self.hasTextSelected = function () {
              return (_doc.getSelection().rangeCount > 0);
            };
          } else if ("selection" in _doc) { //IE9-
            self.hasTextSelected = function () {
              return (_doc.selection.type != "None");
            };
          } else {
            self.hasTextSelected = function () { // no support
              return false;
            };
          }

          self.onselectionstart = function (e) {
            //  More testing - severe chrome issues           
            /* 
                          if (!self.haswrapper&&(e.which&&e.which==2)) {  // fool browser to manage middle button scrolling
                            self.win.css({'overflow':'auto'});
                            setTimeout(function(){
                              self.win.css({'overflow':'hidden'});
                            },10);                
                            return true;
                          }            
            */
            if (self.ispage) return;
            self.selectiondrag = self.win.offset();
          };

          self.onselectionend = function (e) {
            self.selectiondrag = false;
          };
          self.onselectiondrag = function (e) {
            if (!self.selectiondrag) return;
            if (self.hasTextSelected()) self.debounced("selectionscroll", function () {
              checkSelectionScroll(e);
            }, 250);
          };
        }

        if (cap.hasw3ctouch) { //IE11+
          self.css((self.ispage) ? $("html") : self.win, { 'touch-action': 'none' });
          self.css(self.rail, {
            'touch-action': 'none'
          });
          self.css(self.cursor, {
            'touch-action': 'none'
          });
          self.bind(self.win, "pointerdown", self.ontouchstart);
          self.bind(_doc, "pointerup", self.ontouchend);
          self.delegate(_doc, "pointermove", self.ontouchmove);
        } else if (cap.hasmstouch) { //IE10
          self.css((self.ispage) ? $("html") : self.win, { '-ms-touch-action': 'none' });
          self.css(self.rail, {
            '-ms-touch-action': 'none'
          });
          self.css(self.cursor, {
            '-ms-touch-action': 'none'
          });
          self.bind(self.win, "MSPointerDown", self.ontouchstart);
          self.bind(_doc, "MSPointerUp", self.ontouchend);
          self.delegate(_doc, "MSPointerMove", self.ontouchmove);
          self.bind(self.cursor, "MSGestureHold", function (e) {
            e.preventDefault();
          });
          self.bind(self.cursor, "contextmenu", function (e) {
            e.preventDefault();
          });
        } else if (cap.cantouch) { // smartphones/touch devices
          self.bind(self.win, "touchstart", self.ontouchstart, false, true);
          self.bind(_doc, "touchend", self.ontouchend, false, true);
          self.bind(_doc, "touchcancel", self.ontouchend, false, true);
          self.delegate(_doc, "touchmove", self.ontouchmove, false, true);
        }

        if (opt.emulatetouch) {
          self.bind(self.win, "mousedown", self.ontouchstart, false, true);
          self.bind(_doc, "mouseup", self.ontouchend, false, true);
          self.bind(_doc, "mousemove", self.ontouchmove, false, true);
        }

        if (opt.cursordragontouch || (!cap.cantouch && !opt.emulatetouch)) {

          self.rail.css({
            cursor: "default"
          });
          self.railh && self.railh.css({
            cursor: "default"
          });

          self.jqbind(self.rail, "mouseenter", function () {
            if (!self.ispage && !self.win.is(":visible")) return false;
            if (self.canshowonmouseevent) self.showCursor();
            self.rail.active = true;
          });
          self.jqbind(self.rail, "mouseleave", function () {
            self.rail.active = false;
            if (!self.rail.drag) self.hideCursor();
          });

          if (opt.sensitiverail) {
            self.bind(self.rail, "click", function (e) {
              self.doRailClick(e, false, false);
            });
            self.bind(self.rail, "dblclick", function (e) {
              self.doRailClick(e, true, false);
            });
            self.bind(self.cursor, "click", function (e) {
              self.cancelEvent(e);
            });
            self.bind(self.cursor, "dblclick", function (e) {
              self.cancelEvent(e);
            });
          }

          if (self.railh) {
            self.jqbind(self.railh, "mouseenter", function () {
              if (!self.ispage && !self.win.is(":visible")) return false;
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.railh, "mouseleave", function () {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });

            if (opt.sensitiverail) {
              self.bind(self.railh, "click", function (e) {
                self.doRailClick(e, false, true);
              });
              self.bind(self.railh, "dblclick", function (e) {
                self.doRailClick(e, true, true);
              });
              self.bind(self.cursorh, "click", function (e) {
                self.cancelEvent(e);
              });
              self.bind(self.cursorh, "dblclick", function (e) {
                self.cancelEvent(e);
              });
            }

          }

        }

        if (opt.cursordragontouch && (this.istouchcapable || cap.cantouch)) {
          self.bind(self.cursor, "touchstart", self.ontouchstartCursor);
          self.bind(self.cursor, "touchmove", self.ontouchmoveCursor);
          self.bind(self.cursor, "touchend", self.ontouchendCursor);
          self.cursorh && self.bind(self.cursorh, "touchstart", function (e) {
            self.ontouchstartCursor(e, true);
          });
          self.cursorh && self.bind(self.cursorh, "touchmove", self.ontouchmoveCursor);
          self.cursorh && self.bind(self.cursorh, "touchend", self.ontouchendCursor);
        }

//        if (!cap.cantouch && !opt.emulatetouch) {
        if (!opt.emulatetouch && !cap.isandroid && !cap.isios) {

          self.bind((cap.hasmousecapture) ? self.win : _doc, "mouseup", self.onmouseup);
          self.bind(_doc, "mousemove", self.onmousemove);
          if (self.onclick) self.bind(_doc, "click", self.onclick);

          self.bind(self.cursor, "mousedown", self.onmousedown);
          self.bind(self.cursor, "mouseup", self.onmouseup);

          if (self.railh) {
            self.bind(self.cursorh, "mousedown", function (e) {
              self.onmousedown(e, true);
            });
            self.bind(self.cursorh, "mouseup", self.onmouseup);
          }

          if (!self.ispage && opt.enablescrollonselection) {
            self.bind(self.win[0], "mousedown", self.onselectionstart);
            self.bind(_doc, "mouseup", self.onselectionend);
            self.bind(self.cursor, "mouseup", self.onselectionend);
            if (self.cursorh) self.bind(self.cursorh, "mouseup", self.onselectionend);
            self.bind(_doc, "mousemove", self.onselectiondrag);
          }

          if (self.zoom) {
            self.jqbind(self.zoom, "mouseenter", function () {
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.zoom, "mouseleave", function () {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });
          }

        } else {

          self.bind((cap.hasmousecapture) ? self.win : _doc, "mouseup", self.ontouchend);
          if (self.onclick) self.bind(_doc, "click", self.onclick);

          if (opt.cursordragontouch) {
            self.bind(self.cursor, "mousedown", self.onmousedown);
            self.bind(self.cursor, "mouseup", self.onmouseup);
            self.cursorh && self.bind(self.cursorh, "mousedown", function (e) {
              self.onmousedown(e, true);
            });
            self.cursorh && self.bind(self.cursorh, "mouseup", self.onmouseup);
          } else {
            self.bind(self.rail, "mousedown", function (e) { e.preventDefault(); });  // prevent text selection             
            self.railh && self.bind(self.railh, "mousedown", function (e) { e.preventDefault(); });
          }

        }


        if (opt.enablemousewheel) {
          if (!self.isiframe) self.mousewheel((cap.isie && self.ispage) ? _doc : self.win, self.onmousewheel);
          self.mousewheel(self.rail, self.onmousewheel);
          if (self.railh) self.mousewheel(self.railh, self.onmousewheelhr);
        }

        if (!self.ispage && !cap.cantouch && !(/HTML|^BODY/.test(self.win[0].nodeName))) {
          if (!self.win.attr("tabindex")) self.win.attr({
            "tabindex": ++tabindexcounter
          });

          self.bind(self.win, "focus", function (e) {  // better using native events
            domfocus = (self.getTarget(e)).id || self.getTarget(e) || false;
            self.hasfocus = true;
            if (self.canshowonmouseevent) self.noticeCursor();
          });
          self.bind(self.win, "blur", function (e) {  // *
            domfocus = false;
            self.hasfocus = false;
          });

          self.bind(self.win, "mouseenter", function (e) {   // *
            mousefocus = (self.getTarget(e)).id || self.getTarget(e) || false;
            self.hasmousefocus = true;
            if (self.canshowonmouseevent) self.noticeCursor();
          });
          self.bind(self.win, "mouseleave", function (e) {   // *       
            mousefocus = false;
            self.hasmousefocus = false;
            if (!self.rail.drag) self.hideCursor();
          });

        }


        //Thanks to http://www.quirksmode.org !!
        self.onkeypress = function (e) {
          if (self.railslocked && self.page.maxh === 0) return true;

          e = e || _win.event;
          var tg = self.getTarget(e);
          if (tg && /INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
            var tp = tg.getAttribute('type') || tg.type || false;
            if ((!tp) || !(/submit|button|cancel/i.tp)) return true;
          }

          if ($(tg).attr('contenteditable')) return true;

          if (self.hasfocus || (self.hasmousefocus && !domfocus) || (self.ispage && !domfocus && !mousefocus)) {
            var key = e.keyCode;

            if (self.railslocked && key != 27) return self.cancelEvent(e);

            var ctrl = e.ctrlKey || false;
            var shift = e.shiftKey || false;

            var ret = false;
            switch (key) {
              case 38:
              case 63233: //safari
                self.doScrollBy(24 * 3);
                ret = true;
                break;
              case 40:
              case 63235: //safari
                self.doScrollBy(-24 * 3);
                ret = true;
                break;
              case 37:
              case 63232: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(0) : self.doScrollLeftBy(24 * 3);
                  ret = true;
                }
                break;
              case 39:
              case 63234: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(self.page.maxw) : self.doScrollLeftBy(-24 * 3);
                  ret = true;
                }
                break;
              case 33:
              case 63276: // safari
                self.doScrollBy(self.view.h);
                ret = true;
                break;
              case 34:
              case 63277: // safari
                self.doScrollBy(-self.view.h);
                ret = true;
                break;
              case 36:
              case 63273: // safari                
                (self.railh && ctrl) ? self.doScrollPos(0, 0) : self.doScrollTo(0);
                ret = true;
                break;
              case 35:
              case 63275: // safari
                (self.railh && ctrl) ? self.doScrollPos(self.page.maxw, self.page.maxh) : self.doScrollTo(self.page.maxh);
                ret = true;
                break;
              case 32:
                if (opt.spacebarenabled) {
                  (shift) ? self.doScrollBy(self.view.h) : self.doScrollBy(-self.view.h);
                  ret = true;
                }
                break;
              case 27: // ESC
                if (self.zoomactive) {
                  self.doZoom();
                  ret = true;
                }
                break;
            }
            if (ret) return self.cancelEvent(e);
          }
        };

        if (opt.enablekeyboard) self.bind(_doc, (cap.isopera && !cap.isopera12) ? "keypress" : "keydown", self.onkeypress);

        self.bind(_doc, "keydown", function (e) {
          var ctrl = e.ctrlKey || false;
          if (ctrl) self.wheelprevented = true;
        });
        self.bind(_doc, "keyup", function (e) {
          var ctrl = e.ctrlKey || false;
          if (!ctrl) self.wheelprevented = false;
        });
        self.bind(_win, "blur", function (e) {
          self.wheelprevented = false;
        });

        self.bind(_win, 'resize', self.onscreenresize);
        self.bind(_win, 'orientationchange', self.onscreenresize);

        self.bind(_win, "load", self.lazyResize);

        if (cap.ischrome && !self.ispage && !self.haswrapper) { //chrome void scrollbar bug - it persists in version 26
          var tmp = self.win.attr("style");
          var ww = parseFloat(self.win.css("width")) + 1;
          self.win.css('width', ww);
          self.synched("chromefix", function () {
            self.win.attr("style", tmp);
          });
        }


        // Trying a cross-browser implementation - good luck!

        self.onAttributeChange = function (e) {
          self.lazyResize(self.isieold ? 250 : 30);
        };

        if (opt.enableobserver) {

          if ((!self.isie11) && (ClsMutationObserver !== false)) {  // IE11 crashes  #568
            self.observerbody = new ClsMutationObserver(function (mutations) {
              mutations.forEach(function (mut) {
                if (mut.type == "attributes") {
                  return ($body.hasClass("modal-open") && $body.hasClass("modal-dialog") && !$.contains($('.modal-dialog')[0], self.doc[0])) ? self.hide() : self.show();  // Support for Bootstrap modal; Added check if the nice scroll element is inside a modal
                }
              });
              if (self.me.clientWidth != self.page.width || self.me.clientHeight != self.page.height) return self.lazyResize(30);
            });
            self.observerbody.observe(_doc.body, {
              childList: true,
              subtree: true,
              characterData: false,
              attributes: true,
              attributeFilter: ['class']
            });
          }

          if (!self.ispage && !self.haswrapper) {

            var _dom = self.win[0];

            // redesigned MutationObserver for Chrome18+/Firefox14+/iOS6+ with support for: remove div, add/remove content
            if (ClsMutationObserver !== false) {
              self.observer = new ClsMutationObserver(function (mutations) {
                mutations.forEach(self.onAttributeChange);
              });
              self.observer.observe(_dom, {
                childList: true,
                characterData: false,
                attributes: true,
                subtree: false
              });
              self.observerremover = new ClsMutationObserver(function (mutations) {
                mutations.forEach(function (mo) {
                  if (mo.removedNodes.length > 0) {
                    for (var dd in mo.removedNodes) {
                      if (!!self && (mo.removedNodes[dd] === _dom)) return self.remove();
                    }
                  }
                });
              });
              self.observerremover.observe(_dom.parentNode, {
                childList: true,
                characterData: false,
                attributes: false,
                subtree: false
              });
            } else {
              self.bind(_dom, (cap.isie && !cap.isie9) ? "propertychange" : "DOMAttrModified", self.onAttributeChange);
              if (cap.isie9) _dom.attachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug
              self.bind(_dom, "DOMNodeRemoved", function (e) {
                if (e.target === _dom) self.remove();
              });
            }
          }

        }

        //

        if (!self.ispage && opt.boxzoom) self.bind(_win, "resize", self.resizeZoom);
        if (self.istextarea) {
          self.bind(self.win, "keydown", self.lazyResize);
          self.bind(self.win, "mouseup", self.lazyResize);
        }

        self.lazyResize(30);

      }

      if (this.doc[0].nodeName == 'IFRAME') {
        var oniframeload = function () {
          self.iframexd = false;
          var doc;
          try {
            doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow._doc;
            var a = doc.domain;
          } catch (e) {
            self.iframexd = true;
            doc = false;
          }

          if (self.iframexd) {
            if ("console" in _win) console.log('NiceScroll error: policy restriced iframe');
            return true; //cross-domain - I can't manage this        
          }

          self.forcescreen = true;

          if (self.isiframe) {
            self.iframe = {
              "doc": $(doc),
              "html": self.doc.contents().find('html')[0],
              "body": self.doc.contents().find('body')[0]
            };
            self.getContentSize = function () {
              return {
                w: Math.max(self.iframe.html.scrollWidth, self.iframe.body.scrollWidth),
                h: Math.max(self.iframe.html.scrollHeight, self.iframe.body.scrollHeight)
              };
            };
            self.docscroll = $(self.iframe.body);
          }

          if (!cap.isios && opt.iframeautoresize && !self.isiframe) {
            self.win.scrollTop(0); // reset position
            self.doc.height(""); //reset height to fix browser bug
            var hh = Math.max(doc.getElementsByTagName('html')[0].scrollHeight, doc.body.scrollHeight);
            self.doc.height(hh);
          }
          self.lazyResize(30);

          self.css($(self.iframe.body), _scrollyhidden);

          if (cap.isios && self.haswrapper) {
            self.css($(doc.body), {
              '-webkit-transform': 'translate3d(0,0,0)'
            }); // avoid iFrame content clipping - thanks to http://blog.derraab.com/2012/04/02/avoid-iframe-content-clipping-with-css-transform-on-ios/
          }

          if ('contentWindow' in this) {
            self.bind(this.contentWindow, "scroll", self.onscroll); //IE8 & minor
          } else {
            self.bind(doc, "scroll", self.onscroll);
          }

          if (opt.enablemousewheel) {
            self.mousewheel(doc, self.onmousewheel);
          }

          if (opt.enablekeyboard) self.bind(doc, (cap.isopera) ? "keypress" : "keydown", self.onkeypress);

          if (cap.cantouch) {
            self.bind(doc, "touchstart", self.ontouchstart);
            self.bind(doc, "touchmove", self.ontouchmove);
          }
          else if (opt.emulatetouch) {
            self.bind(doc, "mousedown", self.ontouchstart);
            self.bind(doc, "mousemove", function (e) {
              return self.ontouchmove(e, true);
            });
            if (opt.grabcursorenabled && cap.cursorgrabvalue) self.css($(doc.body), {
              'cursor': cap.cursorgrabvalue
            });
          }

          self.bind(doc, "mouseup", self.ontouchend);

          if (self.zoom) {
            if (opt.dblclickzoom) self.bind(doc, 'dblclick', self.doZoom);
            if (self.ongesturezoom) self.bind(doc, "gestureend", self.ongesturezoom);
          }
        };

        if (this.doc[0].readyState && this.doc[0].readyState === "complete") {
          setTimeout(function () {
            oniframeload.call(self.doc[0], false);
          }, 500);
        }
        self.bind(this.doc, "load", oniframeload);

      }

    };

    this.showCursor = function (py, px) {
      if (self.cursortimeout) {
        clearTimeout(self.cursortimeout);
        self.cursortimeout = 0;
      }
      if (!self.rail) return;
      if (self.autohidedom) {
        self.autohidedom.stop().css({
          opacity: opt.cursoropacitymax
        });
        self.cursoractive = true;
      }

      if (!self.rail.drag || self.rail.drag.pt != 1) {
        if (py !== undefined && py !== false) {
          self.scroll.y = (py / self.scrollratio.y) | 0;
        }
        if (px !== undefined) {
          self.scroll.x = (px / self.scrollratio.x) | 0;
        }
      }

      self.cursor.css({
        height: self.cursorheight,
        top: self.scroll.y
      });
      if (self.cursorh) {
        var lx = (self.hasreversehr) ? self.scrollvaluemaxw - self.scroll.x : self.scroll.x;
        self.cursorh.css({
          width: self.cursorwidth,
          left: (!self.rail.align && self.rail.visibility) ? lx + self.rail.width : lx
        });
        self.cursoractive = true;
      }

      if (self.zoom) self.zoom.stop().css({
        opacity: opt.cursoropacitymax
      });
    };

    this.hideCursor = function (tm) {
      if (self.cursortimeout) return;
      if (!self.rail) return;
      if (!self.autohidedom) return;

      if (self.hasmousefocus && opt.autohidemode === "leave") return;
      self.cursortimeout = setTimeout(function () {
        if (!self.rail.active || !self.showonmouseevent) {
          self.autohidedom.stop().animate({
            opacity: opt.cursoropacitymin
          });
          if (self.zoom) self.zoom.stop().animate({
            opacity: opt.cursoropacitymin
          });
          self.cursoractive = false;
        }
        self.cursortimeout = 0;
      }, tm || opt.hidecursordelay);
    };

    this.noticeCursor = function (tm, py, px) {
      self.showCursor(py, px);
      if (!self.rail.active) self.hideCursor(tm);
    };

    this.getContentSize =
      (self.ispage) ?
        function () {
          return {
            w: Math.max(_doc.body.scrollWidth, _doc.documentElement.scrollWidth),
            h: Math.max(_doc.body.scrollHeight, _doc.documentElement.scrollHeight)
          };
        } : (self.haswrapper) ?
          function () {
            return {
              w: self.doc[0].offsetWidth,
              h: self.doc[0].offsetHeight
            };
          } : function () {
            return {
              w: self.docscroll[0].scrollWidth,
              h: self.docscroll[0].scrollHeight
            };
          };

    this.onResize = function (e, page) {

      if (!self || !self.win) return false;

      var premaxh = self.page.maxh,
          premaxw = self.page.maxw,
          previewh = self.view.h,
          previeww = self.view.w;

      self.view = {
        w: (self.ispage) ? self.win.width() : self.win[0].clientWidth,
        h: (self.ispage) ? self.win.height() : self.win[0].clientHeight
      };

      self.page = (page) ? page : self.getContentSize();

      self.page.maxh = Math.max(0, self.page.h - self.view.h);
      self.page.maxw = Math.max(0, self.page.w - self.view.w);

      if ((self.page.maxh == premaxh) && (self.page.maxw == premaxw) && (self.view.w == previeww) && (self.view.h == previewh)) {
        // test position        
        if (!self.ispage) {
          var pos = self.win.offset();
          if (self.lastposition) {
            var lst = self.lastposition;
            if ((lst.top == pos.top) && (lst.left == pos.left)) return self; //nothing to do            
          }
          self.lastposition = pos;
        } else {
          return self; //nothing to do
        }
      }

      if (self.page.maxh === 0) {
        self.hideRail();
        self.scrollvaluemax = 0;
        self.scroll.y = 0;
        self.scrollratio.y = 0;
        self.cursorheight = 0;
        self.setScrollTop(0);
        if (self.rail) self.rail.scrollable = false;
      } else {
        self.page.maxh -= (opt.railpadding.top + opt.railpadding.bottom);
        self.rail.scrollable = true;
      }

      if (self.page.maxw === 0) {
        self.hideRailHr();
        self.scrollvaluemaxw = 0;
        self.scroll.x = 0;
        self.scrollratio.x = 0;
        self.cursorwidth = 0;
        self.setScrollLeft(0);
        if (self.railh) {
          self.railh.scrollable = false;
        }
      } else {
        self.page.maxw -= (opt.railpadding.left + opt.railpadding.right);
        if (self.railh) self.railh.scrollable = (opt.horizrailenabled);
      }

      self.railslocked = (self.locked) || ((self.page.maxh === 0) && (self.page.maxw === 0));
      if (self.railslocked) {
        if (!self.ispage) self.updateScrollBar(self.view);
        return false;
      }

      if (!self.hidden) {
        if (!self.rail.visibility) self.showRail();
        if (self.railh && !self.railh.visibility) self.showRailHr();
      }

      if (self.istextarea && self.win.css('resize') && self.win.css('resize') != 'none') self.view.h -= 20;

      self.cursorheight = Math.min(self.view.h, Math.round(self.view.h * (self.view.h / self.page.h)));
      self.cursorheight = (opt.cursorfixedheight) ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorheight);

      self.cursorwidth = Math.min(self.view.w, Math.round(self.view.w * (self.view.w / self.page.w)));
      self.cursorwidth = (opt.cursorfixedheight) ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorwidth);

      self.scrollvaluemax = self.view.h - self.cursorheight - (opt.railpadding.top + opt.railpadding.bottom);
      if (!self.hasborderbox) self.scrollvaluemax -= self.cursor[0].offsetHeight - self.cursor[0].clientHeight;

      if (self.railh) {
        self.railh.width = (self.page.maxh > 0) ? (self.view.w - self.rail.width) : self.view.w;
        self.scrollvaluemaxw = self.railh.width - self.cursorwidth - (opt.railpadding.left + opt.railpadding.right);
      }

      if (!self.ispage) self.updateScrollBar(self.view);

      self.scrollratio = {
        x: (self.page.maxw / self.scrollvaluemaxw),
        y: (self.page.maxh / self.scrollvaluemax)
      };

      var sy = self.getScrollTop();
      if (sy > self.page.maxh) {
        self.doScrollTop(self.page.maxh);
      } else {
        self.scroll.y = (self.getScrollTop() / self.scrollratio.y) | 0;
        self.scroll.x = (self.getScrollLeft() / self.scrollratio.x) | 0;
        if (self.cursoractive) self.noticeCursor();
      }

      if (self.scroll.y && (self.getScrollTop() === 0)) self.doScrollTo((self.scroll.y * self.scrollratio.y)|0);

      return self;
    };

    this.resize = self.onResize;

    var hlazyresize = 0;

    this.onscreenresize = function(e) {
      clearTimeout(hlazyresize);

      var hiderails = (!self.ispage && !self.haswrapper);
      if (hiderails) self.hideRails();

      hlazyresize = setTimeout(function () {
        if (self) {
          if (hiderails) self.showRails();
          self.resize();
        }
        hlazyresize=0;
      }, 120);
    };

    this.lazyResize = function (tm) { // event debounce

      clearTimeout(hlazyresize);

      tm = isNaN(tm) ? 240 : tm;

      hlazyresize = setTimeout(function () {
        self && self.resize();
        hlazyresize=0;
      }, tm);

      return self;

    };

    // derived by MDN https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/wheel
    function _modernWheelEvent(dom, name, fn, bubble) {
      self._bind(dom, name, function (e) {
        e = e || _win.event;
        var event = {
          original: e,
          target: e.target || e.srcElement,
          type: "wheel",
          deltaMode: e.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function () {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
          },
          stopImmediatePropagation: function () {
            (e.stopImmediatePropagation) ? e.stopImmediatePropagation() : e.cancelBubble = true;
          }
        };

        if (name == "mousewheel") {
          e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX);
          e.wheelDeltaY && (event.deltaY = -1 / 40 * e.wheelDeltaY);
          !event.deltaY && !event.deltaX && (event.deltaY = -1 / 40 * e.wheelDelta);
        } else {
          event.deltaY = e.detail;
        }

        return fn.call(dom, event);
      }, bubble);
    }



    this.jqbind = function (dom, name, fn) { // use jquery bind for non-native events (mouseenter/mouseleave)
      self.events.push({
        e: dom,
        n: name,
        f: fn,
        q: true
      });
      $(dom).on(name, fn);
    };

    this.mousewheel = function (dom, fn, bubble) { // bind mousewheel
      var el = ("jquery" in dom) ? dom[0] : dom;
      if ("onwheel" in _doc.createElement("div")) { // Modern browsers support "wheel"
        self._bind(el, "wheel", fn, bubble || false);
      } else {
        var wname = (_doc.onmousewheel !== undefined) ? "mousewheel" : "DOMMouseScroll"; // older Webkit+IE support or older Firefox          
        _modernWheelEvent(el, wname, fn, bubble || false);
        if (wname == "DOMMouseScroll") _modernWheelEvent(el, "MozMousePixelScroll", fn, bubble || false); // Firefox legacy
      }
    };

    var passiveSupported = false;

    if (cap.haseventlistener) {  // W3C standard event model

      // thanks to https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
      try { var options = Object.defineProperty({}, "passive", { get: function () { passiveSupported = !0; } }); _win.addEventListener("test", null, options); } catch (err) { }

      this.stopPropagation = function (e) {
        if (!e) return false;
        e = (e.original) ? e.original : e;
        e.stopPropagation();
        return false;
      };

      this.cancelEvent = function(e) {
        if (e.cancelable) e.preventDefault();
        e.stopImmediatePropagation();
        if (e.preventManipulation) e.preventManipulation();  // IE10+
        return false;
      };      

    } else {

      // inspired from https://gist.github.com/jonathantneal/2415137      

      Event.prototype.preventDefault = function () {
        this.returnValue = false;
      };

      Event.prototype.stopPropagation = function () {
        this.cancelBubble = true;
      };

      _win.constructor.prototype.addEventListener = _doc.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (type, listener, useCapture) {
        this.attachEvent("on" + type, listener);
      };
      _win.constructor.prototype.removeEventListener = _doc.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (type, listener, useCapture) {
        this.detachEvent("on" + type, listener);
      };

      // Thanks to http://www.switchonthecode.com !!
      this.cancelEvent = function (e) {
        e = e || _win.event;
        if (e) {          
          e.cancelBubble = true;
          e.cancel = true;
          e.returnValue = false;
        }  
        return false;
      };

      this.stopPropagation = function (e) {
        e = e || _win.event;
        if (e) e.cancelBubble = true;
        return false;
      };

    }

    this.delegate = function (dom, name, fn, bubble, active) {

      var de = delegatevents[name] || false;

      if (!de) {

        de = {
          a: [],
          l: [],
          f: function (e) {
            var lst = de.l, l = lst.length - 1;
            var r = false;
            for (var a = l; a >= 0; a--) {
              r = lst[a].call(e.target, e);
              if (r === false) return false;
            }
            return r;
          }
        };

        self.bind(dom, name, de.f, bubble, active);

        delegatevents[name] = de;

      }

      if (self.ispage) {
        de.a = [self.id].concat(de.a);
        de.l = [fn].concat(de.l);
      } else {
        de.a.push(self.id);
        de.l.push(fn);        
      }

    };

    this.undelegate = function (dom, name, fn, bubble, active) {
      var de = delegatevents[name]||false;
      if (de&&de.l) {  // quick fix #683
        for (var a=0,l=de.l.length;a<l;a++) {
          if (de.a[a] === self.id) {
            de.a.splice(a);
            de.l.splice(a);
            if (de.a.length===0) {
              self._unbind(dom,name,de.l.f);
              delegatevents[name] = null;
            }
          }
        }
      }
    };

    this.bind = function (dom, name, fn, bubble, active) {
      var el = ("jquery" in dom) ? dom[0] : dom;
      self._bind(el, name, fn, bubble || false, active || false);
    };

    this._bind = function (el, name, fn, bubble, active) { // primitive bind

      self.events.push({
        e: el,
        n: name,
        f: fn,
        b: bubble,
        q: false
      });

      (passiveSupported && active) ? el.addEventListener(name, fn, { passive: false, capture: bubble }) : el.addEventListener(name, fn, bubble || false);
    };

    this._unbind = function (el, name, fn, bub) { // primitive unbind
      if (delegatevents[name]) self.undelegate(el, name, fn, bub);
      else el.removeEventListener(name, fn, bub);
    };

    this.unbindAll = function () {
      for (var a = 0; a < self.events.length; a++) {
        var r = self.events[a];
        (r.q) ? r.e.unbind(r.n, r.f) : self._unbind(r.e, r.n, r.f, r.b);
      }
    };

    this.showRails = function () {
      return self.showRail().showRailHr();
    };

    this.showRail = function () {
      if ((self.page.maxh !== 0) && (self.ispage || self.win.css('display') != 'none')) {
        //self.visibility = true;
        self.rail.visibility = true;
        self.rail.css('display', 'block');
      }
      return self;
    };

    this.showRailHr = function () {
      if (self.railh) {
        if ((self.page.maxw !== 0) && (self.ispage || self.win.css('display') != 'none')) {
          self.railh.visibility = true;
          self.railh.css('display', 'block');
        }
      }
      return self;
    };

    this.hideRails = function () {
      return self.hideRail().hideRailHr();
    };

    this.hideRail = function () {
      //self.visibility = false;
      self.rail.visibility = false;
      self.rail.css('display', 'none');
      return self;
    };

    this.hideRailHr = function () {
      if (self.railh) {
        self.railh.visibility = false;
        self.railh.css('display', 'none');
      }
      return self;
    };

    this.show = function () {
      self.hidden = false;
      self.railslocked = false;
      return self.showRails();
    };

    this.hide = function () {
      self.hidden = true;
      self.railslocked = true;
      return self.hideRails();
    };

    this.toggle = function () {
      return (self.hidden) ? self.show() : self.hide();
    };

    this.remove = function () {
      self.stop();
      if (self.cursortimeout) clearTimeout(self.cursortimeout);
      for (var n in self.delaylist) if (self.delaylist[n]) clearAnimationFrame(self.delaylist[n].h);
      self.doZoomOut();
      self.unbindAll();

      if (cap.isie9) self.win[0].detachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug

      if (self.observer !== false) self.observer.disconnect();
      if (self.observerremover !== false) self.observerremover.disconnect();
      if (self.observerbody !== false) self.observerbody.disconnect();

      self.events = null;

      if (self.cursor) {
        self.cursor.remove();
      }
      if (self.cursorh) {
        self.cursorh.remove();
      }
      if (self.rail) {
        self.rail.remove();
      }
      if (self.railh) {
        self.railh.remove();
      }
      if (self.zoom) {
        self.zoom.remove();
      }
      for (var a = 0; a < self.saved.css.length; a++) {
        var d = self.saved.css[a];
        d[0].css(d[1], (d[2] === undefined) ? '' : d[2]);
      }
      self.saved = false;
      self.me.data('__nicescroll', ''); //erase all traces

      // memory leak fixed by GianlucaGuarini - thanks a lot!
      // remove the current nicescroll from the $.nicescroll array & normalize array
      var lst = $.nicescroll;
      lst.each(function (i) {
        if (!this) return;
        if (this.id === self.id) {
          delete lst[i];
          for (var b = ++i; b < lst.length; b++ , i++) lst[i] = lst[b];
          lst.length--;
          if (lst.length) delete lst[lst.length];
        }
      });

      for (var i in self) {
        self[i] = null;
        delete self[i];
      }

      self = null;

    };

    this.scrollstart = function (fn) {
      this.onscrollstart = fn;
      return self;
    };
    this.scrollend = function (fn) {
      this.onscrollend = fn;
      return self;
    };
    this.scrollcancel = function (fn) {
      this.onscrollcancel = fn;
      return self;
    };

    this.zoomin = function (fn) {
      this.onzoomin = fn;
      return self;
    };
    this.zoomout = function (fn) {
      this.onzoomout = fn;
      return self;
    };

    this.isScrollable = function (e) {
      var dom = (e.target) ? e.target : e;
      if (dom.nodeName == 'OPTION') return true;
      while (dom && (dom.nodeType == 1) && (dom !== this.me[0]) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if (/scroll|auto/.test(ov)) return (dom.clientHeight != dom.scrollHeight);
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false;
    };

    this.getViewport = function (me) {
      var dom = (me && me.parentNode) ? me.parentNode : false;
      while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        if (/fixed|absolute/.test(dd.css("position"))) return dd;
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if ((/scroll|auto/.test(ov)) && (dom.clientHeight != dom.scrollHeight)) return dd;
        if (dd.getNiceScroll().length > 0) return dd;
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false;
    };

    this.triggerScrollStart = function (cx, cy, rx, ry, ms) {

      if (self.onscrollstart) {
        var info = {
          type: "scrollstart",
          current: {
            x: cx,
            y: cy
          },
          request: {
            x: rx,
            y: ry
          },
          end: {
            x: self.newscrollx,
            y: self.newscrolly
          },
          speed: ms
        };
        self.onscrollstart.call(self, info);
      }

    };

    this.triggerScrollEnd = function () {
      if (self.onscrollend) {

        var px = self.getScrollLeft();
        var py = self.getScrollTop();

        var info = {
          type: "scrollend",
          current: {
            x: px,
            y: py
          },
          end: {
            x: px,
            y: py
          }
        };

        self.onscrollend.call(self, info);

      }

    };

    var scrolldiry = 0, scrolldirx = 0, scrolltmr = 0, scrollspd = 1;

    function doScrollRelative(px, py, chkscroll, iswheel) {

      if (!self.scrollrunning) {
        self.newscrolly = self.getScrollTop();
        self.newscrollx = self.getScrollLeft();
        scrolltmr = now();
      }

      var gap = (now() - scrolltmr);
      scrolltmr = now();

      if (gap > 350) {
        scrollspd = 1;
      } else {
        scrollspd += (2 - scrollspd) / 10;
      }

      px = px * scrollspd | 0;
      py = py * scrollspd | 0;

      if (px) {

        if (iswheel) { // mouse-only
          if (px < 0) {  // fix apple magic mouse swipe back/forward
            if (self.getScrollLeft() >= self.page.maxw) return true;
          } else {
            if (self.getScrollLeft() <= 0) return true;
          }
        }

        var dx = px > 0 ? 1 : -1;

        if (scrolldirx !== dx) {
          if (self.scrollmom) self.scrollmom.stop();
          self.newscrollx = self.getScrollLeft();
          scrolldirx = dx;
        }

        self.lastdeltax -= px;

      }

      if (py) {

        var chk = (function () {
          var top = self.getScrollTop();
          if (py < 0) {
            if (top >= self.page.maxh) return true;
          } else {
            if (top <= 0) return true;
          }
        })();

        if (chk) {
          if (opt.nativeparentscrolling && chkscroll && !self.ispage && !self.zoomactive) return true;
          var ny = self.view.h >> 1;
          if (self.newscrolly < -ny) { self.newscrolly = -ny; py = -1; }
          else if (self.newscrolly > self.page.maxh + ny) { self.newscrolly = self.page.maxh + ny; py = 1; }
          else py = 0;
        }

        var dy = py > 0 ? 1 : -1;

        if (scrolldiry !== dy) {
          if (self.scrollmom) self.scrollmom.stop();
          self.newscrolly = self.getScrollTop();
          scrolldiry = dy;
        }

        self.lastdeltay -= py;

      }

      if (py || px) {
        self.synched("relativexy", function () {

          var dty = self.lastdeltay + self.newscrolly;
          self.lastdeltay = 0;

          var dtx = self.lastdeltax + self.newscrollx;
          self.lastdeltax = 0;

          if (!self.rail.drag) self.doScrollPos(dtx, dty);

        });
      }

    }

    var hasparentscrollingphase = false;

    function execScrollWheel(e, hr, chkscroll) {
      var px, py;

      if (!chkscroll && hasparentscrollingphase) return true;

      if (e.deltaMode === 0) { // PIXEL
        px = -(e.deltaX * (opt.mousescrollstep / (18 * 3))) | 0;
        py = -(e.deltaY * (opt.mousescrollstep / (18 * 3))) | 0;
      } else if (e.deltaMode === 1) { // LINE
        px = -(e.deltaX * opt.mousescrollstep * 50 / 80) | 0;
        py = -(e.deltaY * opt.mousescrollstep * 50 / 80) | 0;
      }

      if (hr && opt.oneaxismousemode && (px === 0) && py) { // classic vertical-only mousewheel + browser with x/y support 
        px = py;
        py = 0;

        if (chkscroll) {
          var hrend = (px < 0) ? (self.getScrollLeft() >= self.page.maxw) : (self.getScrollLeft() <= 0);
          if (hrend) {  // preserve vertical scrolling
            py = px;
            px = 0;
          }
        }

      }

      // invert horizontal direction for rtl mode
      if (self.isrtlmode) px = -px;

      var chk = doScrollRelative(px, py, chkscroll, true);

      if (chk) {
        if (chkscroll) hasparentscrollingphase = true;
      } else {
        hasparentscrollingphase = false;
        e.stopImmediatePropagation();
        return e.preventDefault();
      }

    }

    this.onmousewheel = function (e) {
      if (self.wheelprevented||self.locked) return false;
      if (self.railslocked) {
        self.debounced("checkunlock", self.resize, 250);
        return false;
      }
      if (self.rail.drag) return self.cancelEvent(e);

      if (opt.oneaxismousemode === "auto" && e.deltaX !== 0) opt.oneaxismousemode = false; // check two-axis mouse support (not very elegant)

      if (opt.oneaxismousemode && e.deltaX === 0) {
        if (!self.rail.scrollable) {
          if (self.railh && self.railh.scrollable) {
            return self.onmousewheelhr(e);
          } else {
            return true;
          }
        }
      }

      var nw = now();
      var chk = false;
      if (opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      var ret = execScrollWheel(e, false, chk);
      if (ret) self.checkarea = 0;
      return ret;
    };

    this.onmousewheelhr = function (e) {
      if (self.wheelprevented) return;
      if (self.railslocked || !self.railh.scrollable) return true;
      if (self.rail.drag) return self.cancelEvent(e);

      var nw = now();
      var chk = false;
      if (opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this is not my business
      if (self.railslocked) return self.cancelEvent(e);

      return execScrollWheel(e, true, chk);
    };

    this.stop = function () {
      self.cancelScroll();
      if (self.scrollmon) self.scrollmon.stop();
      self.cursorfreezed = false;
      self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
      self.noticeCursor();
      return self;
    };

    this.getTransitionSpeed = function (dif) {

      return 80 + (dif / 72) * opt.scrollspeed |0;

    };

    if (!opt.smoothscroll) {
      this.doScrollLeft = function (x, spd) { //direct
        var y = self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollTop = function (y, spd) { //direct
        var x = self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollPos = function (x, y, spd) { //direct
        var nx = (x > self.page.maxw) ? self.page.maxw : x;
        if (nx < 0) nx = 0;
        var ny = (y > self.page.maxh) ? self.page.maxh : y;
        if (ny < 0) ny = 0;
        self.synched('scroll', function () {
          self.setScrollTop(ny);
          self.setScrollLeft(nx);
        });
      };
      this.cancelScroll = function () { }; // direct

    } else if (self.ishwscroll && cap.hastransition && opt.usetransition && !!opt.smoothscroll) {

      var lasttransitionstyle = '';

      this.resetTransition = function () {
        lasttransitionstyle = '';
        self.doc.css(cap.prefixstyle + 'transition-duration', '0ms');
      };

      this.prepareTransition = function (dif, istime) {
        var ex = (istime) ? dif : self.getTransitionSpeed(dif);
        var trans = ex + 'ms';
        if (lasttransitionstyle !== trans) {
          lasttransitionstyle = trans;
          self.doc.css(cap.prefixstyle + 'transition-duration', trans);
        }
        return ex;
      };

      this.doScrollLeft = function (x, spd) { //trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function (y, spd) { //trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.cursorupdate = {
        running: false,
        start: function () {
          var m = this;

          if (m.running) return;
          m.running = true;

          var loop = function () {
            if (m.running) setAnimationFrame(loop);
            self.showCursor(self.getScrollTop(), self.getScrollLeft());
            self.notifyScrollEvent(self.win[0]);
          };

          setAnimationFrame(loop);
        },
        stop: function () {
          this.running = false;
        }
      };

      this.doScrollPos = function (x, y, spd) { //trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection      

        if (!opt.bouncescroll) {
          if (y < 0) y = 0;
          else if (y > self.page.maxh) y = self.page.maxh;
          if (x < 0) x = 0;
          else if (x > self.page.maxw) x = self.page.maxw;
        } else {
          if (y < 0) y = y / 2 | 0;
          else if (y > self.page.maxh) y = self.page.maxh + (y - self.page.maxh) / 2 | 0;
          if (x < 0) x = x / 2 | 0;
          else if (x > self.page.maxw) x = self.page.maxw + (x - self.page.maxw) / 2 | 0;
        }

        if (self.scrollrunning && x == self.newscrollx && y == self.newscrolly) return false;

        self.newscrolly = y;
        self.newscrollx = x;

        var top = self.getScrollTop();
        var lft = self.getScrollLeft();

        var dst = {};
        dst.x = x - lft;
        dst.y = y - top;

        var dd = Math.sqrt((dst.x * dst.x) + (dst.y * dst.y)) | 0;

        var ms = self.prepareTransition(dd);

        if (!self.scrollrunning) {
          self.scrollrunning = true;
          self.triggerScrollStart(lft, top, x, y, ms);
          self.cursorupdate.start();
        }

        self.scrollendtrapped = true;

        if (!cap.transitionend) {
          if (self.scrollendtrapped) clearTimeout(self.scrollendtrapped);
          self.scrollendtrapped = setTimeout(self.onScrollTransitionEnd, ms); // simulate transitionend event
        }

        self.setScrollTop(self.newscrolly);
        self.setScrollLeft(self.newscrollx);

      };

      this.cancelScroll = function () {
        if (!self.scrollendtrapped) return true;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.scrollrunning = false;
        if (!cap.transitionend) clearTimeout(cap.transitionend);
        self.scrollendtrapped = false;
        self.resetTransition();
        self.setScrollTop(py); // fire event onscroll
        if (self.railh) self.setScrollLeft(px);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;

        self.cursorfreezed = false;

        self.cursorupdate.stop();
        self.showCursor(py, px);
        return self;
      };

      this.onScrollTransitionEnd = function () {

        if (!self.scrollendtrapped) return;

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (py < 0) py = 0;
        else if (py > self.page.maxh) py = self.page.maxh;
        if (px < 0) px = 0;
        else if (px > self.page.maxw) px = self.page.maxw;
        if ((py != self.newscrolly) || (px != self.newscrollx)) return self.doScrollPos(px, py, opt.snapbackspeed);

        if (self.scrollrunning) self.triggerScrollEnd();
        self.scrollrunning = false;

        self.scrollendtrapped = false;
        self.resetTransition();
        self.timerscroll = false;
        self.setScrollTop(py); // fire event onscroll        
        if (self.railh) self.setScrollLeft(px); // fire event onscroll left

        self.cursorupdate.stop();
        self.noticeCursor(false, py, px);

        self.cursorfreezed = false;

      };

    } else {

      this.doScrollLeft = function (x, spd) { //no-trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function (y, spd) { //no-trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function (x, y, spd) { //no-trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

        var clipped = false;

        if (!self.bouncescroll || !self.rail.visibility) {
          if (y < 0) {
            y = 0;
            clipped = true;
          } else if (y > self.page.maxh) {
            y = self.page.maxh;
            clipped = true;
          }
        }
        if (!self.bouncescroll || !self.railh.visibility) {
          if (x < 0) {
            x = 0;
            clipped = true;
          } else if (x > self.page.maxw) {
            x = self.page.maxw;
            clipped = true;
          }
        }

        if (self.scrollrunning && (self.newscrolly === y) && (self.newscrollx === x)) return true;

        self.newscrolly = y;
        self.newscrollx = x;

        self.dst = {};
        self.dst.x = x - px;
        self.dst.y = y - py;
        self.dst.px = px;
        self.dst.py = py;

        var dd = Math.sqrt((self.dst.x * self.dst.x) + (self.dst.y * self.dst.y)) | 0;
        var ms = self.getTransitionSpeed(dd);

        self.bzscroll = {};

        var p3 = (clipped) ? 1 : 0.58;
        self.bzscroll.x = new BezierClass(px, self.newscrollx, ms, 0, 0, p3, 1);
        self.bzscroll.y = new BezierClass(py, self.newscrolly, ms, 0, 0, p3, 1);

        var loopid = now();

        var loop = function () {

          if (!self.scrollrunning) return;
          var x = self.bzscroll.y.getPos();

          self.setScrollLeft(self.bzscroll.x.getNow());
          self.setScrollTop(self.bzscroll.y.getNow());

          if (x <= 1) {
            self.timer = setAnimationFrame(loop);
          } else {
            self.scrollrunning = false;
            self.timer = 0;
            self.triggerScrollEnd();
          }

        };

        if (!self.scrollrunning) {
          self.triggerScrollStart(px, py, x, y, ms);
          self.scrollrunning = true;
          self.timer = setAnimationFrame(loop);
        }

      };

      this.cancelScroll = function () {
        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;
        self.bzscroll = false;
        self.scrollrunning = false;
        return self;
      };

    }

    this.doScrollBy = function (stp, relative) {
      doScrollRelative(0, stp);
    };

    this.doScrollLeftBy = function (stp, relative) {
      doScrollRelative(stp, 0);
    };

    this.doScrollTo = function (pos, relative) {
      var ny = (relative) ? Math.round(pos * self.scrollratio.y) : pos;
      if (ny < 0) ny = 0;
      else if (ny > self.page.maxh) ny = self.page.maxh;
      self.cursorfreezed = false;
      self.doScrollTop(pos);
    };

    this.checkContentSize = function () {
      var pg = self.getContentSize();
      if ((pg.h != self.page.h) || (pg.w != self.page.w)) self.resize(false, pg);
    };

    self.onscroll = function (e) {
      if (self.rail.drag) return;
      if (!self.cursorfreezed) {
        self.synched('scroll', function () {
          self.scroll.y = Math.round(self.getScrollTop() / self.scrollratio.y);
          if (self.railh) self.scroll.x = Math.round(self.getScrollLeft() / self.scrollratio.x);
          self.noticeCursor();
        });
      }
    };
    self.bind(self.docscroll, "scroll", self.onscroll);

    this.doZoomIn = function (e) {
      if (self.zoomactive) return;
      self.zoomactive = true;

      self.zoomrestore = {
        style: {}
      };
      var lst = ['position', 'top', 'left', 'zIndex', 'backgroundColor', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
      var win = self.win[0].style;
      for (var a in lst) {
        var pp = lst[a];
        self.zoomrestore.style[pp] = (win[pp] !== undefined) ? win[pp] : '';
      }

      self.zoomrestore.style.width = self.win.css('width');
      self.zoomrestore.style.height = self.win.css('height');

      self.zoomrestore.padding = {
        w: self.win.outerWidth() - self.win.width(),
        h: self.win.outerHeight() - self.win.height()
      };

      if (cap.isios4) {
        self.zoomrestore.scrollTop = $window.scrollTop();
        $window.scrollTop(0);
      }

      self.win.css({
        position: (cap.isios4) ? "absolute" : "fixed",
        top: 0,
        left: 0,
        zIndex: globalmaxzindex + 100,
        margin: 0
      });
      var bkg = self.win.css("backgroundColor");
      if ("" === bkg || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(bkg)) self.win.css("backgroundColor", "#fff");
      self.rail.css({
        zIndex: globalmaxzindex + 101
      });
      self.zoom.css({
        zIndex: globalmaxzindex + 102
      });
      self.zoom.css('backgroundPosition', '0 -18px');
      self.resizeZoom();

      if (self.onzoomin) self.onzoomin.call(self);

      return self.cancelEvent(e);
    };

    this.doZoomOut = function (e) {
      if (!self.zoomactive) return;
      self.zoomactive = false;

      self.win.css("margin", "");
      self.win.css(self.zoomrestore.style);

      if (cap.isios4) {
        $window.scrollTop(self.zoomrestore.scrollTop);
      }

      self.rail.css({
        "z-index": self.zindex
      });
      self.zoom.css({
        "z-index": self.zindex
      });
      self.zoomrestore = false;
      self.zoom.css('backgroundPosition', '0 0');
      self.onResize();

      if (self.onzoomout) self.onzoomout.call(self);

      return self.cancelEvent(e);
    };

    this.doZoom = function (e) {
      return (self.zoomactive) ? self.doZoomOut(e) : self.doZoomIn(e);
    };

    this.resizeZoom = function () {
      if (!self.zoomactive) return;

      var py = self.getScrollTop(); //preserve scrolling position
      self.win.css({
        width: $window.width() - self.zoomrestore.padding.w + "px",
        height: $window.height() - self.zoomrestore.padding.h + "px"
      });
      self.onResize();

      self.setScrollTop(Math.min(self.page.maxh, py));
    };

    this.init();

    $.nicescroll.push(this);

  };

  // Inspired by the work of Kin Blas
  // http://webpro.host.adobe.com/people/jblas/momentum/includes/jquery.momentum.0.7.js  
  var ScrollMomentumClass2D = function (nc) {
    var self = this;
    this.nc = nc;

    this.lastx = 0;
    this.lasty = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.lasttime = 0;
    this.steptime = 0;
    this.snapx = false;
    this.snapy = false;
    this.demulx = 0;
    this.demuly = 0;

    this.lastscrollx = -1;
    this.lastscrolly = -1;

    this.chkx = 0;
    this.chky = 0;

    this.timer = 0;

    this.reset = function (px, py) {
      self.stop();
      self.steptime = 0;
      self.lasttime = now();
      self.speedx = 0;
      self.speedy = 0;
      self.lastx = px;
      self.lasty = py;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.update = function (px, py) {
      var tm = now();
      self.steptime = tm - self.lasttime;
      self.lasttime = tm;
      var dy = py - self.lasty;
      var dx = px - self.lastx;
      var sy = self.nc.getScrollTop();
      var sx = self.nc.getScrollLeft();
      var newy = sy + dy;
      var newx = sx + dx;
      self.snapx = (newx < 0) || (newx > self.nc.page.maxw);
      self.snapy = (newy < 0) || (newy > self.nc.page.maxh);
      self.speedx = dx;
      self.speedy = dy;
      self.lastx = px;
      self.lasty = py;
    };

    this.stop = function () {
      self.nc.unsynched("domomentum2d");
      if (self.timer) clearTimeout(self.timer);
      self.timer = 0;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.doSnapy = function (nx, ny) {
      var snap = false;

      if (ny < 0) {
        ny = 0;
        snap = true;
      } else if (ny > self.nc.page.maxh) {
        ny = self.nc.page.maxh;
        snap = true;
      }

      if (nx < 0) {
        nx = 0;
        snap = true;
      } else if (nx > self.nc.page.maxw) {
        nx = self.nc.page.maxw;
        snap = true;
      }

      (snap) ? self.nc.doScrollPos(nx, ny, self.nc.opt.snapbackspeed) : self.nc.triggerScrollEnd();
    };

    this.doMomentum = function (gp) {
      var t = now();
      var l = (gp) ? t + gp : self.lasttime;

      var sl = self.nc.getScrollLeft();
      var st = self.nc.getScrollTop();

      var pageh = self.nc.page.maxh;
      var pagew = self.nc.page.maxw;

      self.speedx = (pagew > 0) ? Math.min(60, self.speedx) : 0;
      self.speedy = (pageh > 0) ? Math.min(60, self.speedy) : 0;

      var chk = l && (t - l) <= 60;

      if ((st < 0) || (st > pageh) || (sl < 0) || (sl > pagew)) chk = false;

      var sy = (self.speedy && chk) ? self.speedy : false;
      var sx = (self.speedx && chk) ? self.speedx : false;

      if (sy || sx) {
        var tm = Math.max(16, self.steptime); //timeout granularity

        if (tm > 50) { // do smooth
          var xm = tm / 50;
          self.speedx *= xm;
          self.speedy *= xm;
          tm = 50;
        }

        self.demulxy = 0;

        self.lastscrollx = self.nc.getScrollLeft();
        self.chkx = self.lastscrollx;
        self.lastscrolly = self.nc.getScrollTop();
        self.chky = self.lastscrolly;

        var nx = self.lastscrollx;
        var ny = self.lastscrolly;

        var onscroll = function () {
          var df = ((now() - t) > 600) ? 0.04 : 0.02;

          if (self.speedx) {
            nx = Math.floor(self.lastscrollx - (self.speedx * (1 - self.demulxy)));
            self.lastscrollx = nx;
            if ((nx < 0) || (nx > pagew)) df = 0.10;
          }

          if (self.speedy) {
            ny = Math.floor(self.lastscrolly - (self.speedy * (1 - self.demulxy)));
            self.lastscrolly = ny;
            if ((ny < 0) || (ny > pageh)) df = 0.10;
          }

          self.demulxy = Math.min(1, self.demulxy + df);

          self.nc.synched("domomentum2d", function () {

            if (self.speedx) {
              var scx = self.nc.getScrollLeft();
              //              if (scx != self.chkx) self.stop();
              self.chkx = nx;
              self.nc.setScrollLeft(nx);
            }

            if (self.speedy) {
              var scy = self.nc.getScrollTop();
              //              if (scy != self.chky) self.stop();
              self.chky = ny;
              self.nc.setScrollTop(ny);
            }

            if (!self.timer) {
              self.nc.hideCursor();
              self.doSnapy(nx, ny);
            }

          });

          if (self.demulxy < 1) {
            self.timer = setTimeout(onscroll, tm);
          } else {
            self.stop();
            self.nc.hideCursor();
            self.doSnapy(nx, ny);
          }
        };

        onscroll();

      } else {
        self.doSnapy(self.nc.getScrollLeft(), self.nc.getScrollTop());
      }

    };

  };


  // override jQuery scrollTop
  var _scrollTop = jQuery.fn.scrollTop; // preserve original function

  jQuery.cssHooks.pageYOffset = {
    get: function (elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(elem);
    },
    set: function (elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)) : _scrollTop.call(elem, value);
      return this;
    }
  };

  jQuery.fn.scrollTop = function (value) {
    if (value === undefined) {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(this);
    } else {
      return this.each(function () {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)) : _scrollTop.call($(this), value);
      });
    }
  };

  // override jQuery scrollLeft
  var _scrollLeft = jQuery.fn.scrollLeft; // preserve original function

  $.cssHooks.pageXOffset = {
    get: function (elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(elem);
    },
    set: function (elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call(elem, value);
      return this;
    }
  };

  jQuery.fn.scrollLeft = function (value) {
    if (value === undefined) {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(this);
    } else {
      return this.each(function () {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call($(this), value);
      });
    }
  };

  var NiceScrollArray = function (doms) {
    var self = this;
    this.length = 0;
    this.name = "nicescrollarray";

    this.each = function (fn) {
      $.each(self, fn);
      return self;
    };

    this.push = function (nice) {
      self[self.length] = nice;
      self.length++;
    };

    this.eq = function (idx) {
      return self[idx];
    };

    if (doms) {
      for (var a = 0; a < doms.length; a++) {
        var nice = $.data(doms[a], '__nicescroll') || false;
        if (nice) {
          this[this.length] = nice;
          this.length++;
        }
      }
    }

    return this;
  };

  function mplex(el, lst, fn) {
    for (var a = 0, l = lst.length; a < l; a++) fn(el, lst[a]);
  }
  mplex(
    NiceScrollArray.prototype, ['show', 'hide', 'toggle', 'onResize', 'resize', 'remove', 'stop', 'doScrollPos'],
    function (e, n) {
      e[n] = function () {
        var args = arguments;
        return this.each(function () {
          this[n].apply(this, args);
        });
      };
    }
  );

  jQuery.fn.getNiceScroll = function (index) {
    if (index === undefined) {
      return new NiceScrollArray(this);
    } else {
      return this[index] && $.data(this[index], '__nicescroll') || false;
    }
  };

  var pseudos = jQuery.expr.pseudos || jQuery.expr[':'];  // jQuery 3 migration
  pseudos.nicescroll = function (a) {
    return $.data(a, '__nicescroll') !== undefined;
  };

  $.fn.niceScroll = function (wrapper, _opt) {
    if (_opt === undefined && typeof wrapper == "object" && !("jquery" in wrapper)) {
      _opt = wrapper;
      wrapper = false;
    }

    var ret = new NiceScrollArray();

    this.each(function () {
      var $this = $(this);

      var opt = $.extend({}, _opt); // cloning

      if (wrapper || false) {
        var wrp = $(wrapper);
        opt.doc = (wrp.length > 1) ? $(wrapper, $this) : wrp;
        opt.win = $this;
      }
      var docundef = !("doc" in opt);
      if (!docundef && !("win" in opt)) opt.win = $this;

      var nice = $this.data('__nicescroll') || false;
      if (!nice) {
        opt.doc = opt.doc || $this;
        nice = new NiceScrollClass(opt, $this);
        $this.data('__nicescroll', nice);
      }
      ret.push(nice);
    });

    return (ret.length === 1) ? ret[0] : ret;
  };

  _win.NiceScroll = {
    getjQuery: function () {
      return jQuery;
    }
  };

  if (!$.nicescroll) {
    $.nicescroll = new NiceScrollArray();
    $.nicescroll.options = _globaloptions;
  }

}));
/**
 * Swiper 5.2.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 26, 2019
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Swiper=t()}(this,(function(){"use strict";var e="undefined"==typeof document?{body:{},addEventListener:function(){},removeEventListener:function(){},activeElement:{blur:function(){},nodeName:""},querySelector:function(){return null},querySelectorAll:function(){return[]},getElementById:function(){return null},createEvent:function(){return{initEvent:function(){}}},createElement:function(){return{children:[],childNodes:[],style:{},setAttribute:function(){},getElementsByTagName:function(){return[]}}},location:{hash:""}}:document,t="undefined"==typeof window?{document:e,navigator:{userAgent:""},location:{},history:{},CustomEvent:function(){return this},addEventListener:function(){},removeEventListener:function(){},getComputedStyle:function(){return{getPropertyValue:function(){return""}}},Image:function(){},Date:function(){},screen:{},setTimeout:function(){},clearTimeout:function(){}}:window,i=function(e){for(var t=0;t<e.length;t+=1)this[t]=e[t];return this.length=e.length,this};function s(s,a){var r=[],n=0;if(s&&!a&&s instanceof i)return s;if(s)if("string"==typeof s){var o,l,d=s.trim();if(d.indexOf("<")>=0&&d.indexOf(">")>=0){var h="div";for(0===d.indexOf("<li")&&(h="ul"),0===d.indexOf("<tr")&&(h="tbody"),0!==d.indexOf("<td")&&0!==d.indexOf("<th")||(h="tr"),0===d.indexOf("<tbody")&&(h="table"),0===d.indexOf("<option")&&(h="select"),(l=e.createElement(h)).innerHTML=d,n=0;n<l.childNodes.length;n+=1)r.push(l.childNodes[n])}else for(o=a||"#"!==s[0]||s.match(/[ .<>:~]/)?(a||e).querySelectorAll(s.trim()):[e.getElementById(s.trim().split("#")[1])],n=0;n<o.length;n+=1)o[n]&&r.push(o[n])}else if(s.nodeType||s===t||s===e)r.push(s);else if(s.length>0&&s[0].nodeType)for(n=0;n<s.length;n+=1)r.push(s[n]);return new i(r)}function a(e){for(var t=[],i=0;i<e.length;i+=1)-1===t.indexOf(e[i])&&t.push(e[i]);return t}s.fn=i.prototype,s.Class=i,s.Dom7=i;var r={addClass:function(e){if(void 0===e)return this;for(var t=e.split(" "),i=0;i<t.length;i+=1)for(var s=0;s<this.length;s+=1)void 0!==this[s]&&void 0!==this[s].classList&&this[s].classList.add(t[i]);return this},removeClass:function(e){for(var t=e.split(" "),i=0;i<t.length;i+=1)for(var s=0;s<this.length;s+=1)void 0!==this[s]&&void 0!==this[s].classList&&this[s].classList.remove(t[i]);return this},hasClass:function(e){return!!this[0]&&this[0].classList.contains(e)},toggleClass:function(e){for(var t=e.split(" "),i=0;i<t.length;i+=1)for(var s=0;s<this.length;s+=1)void 0!==this[s]&&void 0!==this[s].classList&&this[s].classList.toggle(t[i]);return this},attr:function(e,t){var i=arguments;if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var s=0;s<this.length;s+=1)if(2===i.length)this[s].setAttribute(e,t);else for(var a in e)this[s][a]=e[a],this[s].setAttribute(a,e[a]);return this},removeAttr:function(e){for(var t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},data:function(e,t){var i;if(void 0!==t){for(var s=0;s<this.length;s+=1)(i=this[s]).dom7ElementDataStorage||(i.dom7ElementDataStorage={}),i.dom7ElementDataStorage[e]=t;return this}if(i=this[0]){if(i.dom7ElementDataStorage&&e in i.dom7ElementDataStorage)return i.dom7ElementDataStorage[e];var a=i.getAttribute("data-"+e);return a||void 0}},transform:function(e){for(var t=0;t<this.length;t+=1){var i=this[t].style;i.webkitTransform=e,i.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t+=1){var i=this[t].style;i.webkitTransitionDuration=e,i.transitionDuration=e}return this},on:function(){for(var e,t=[],i=arguments.length;i--;)t[i]=arguments[i];var a=t[0],r=t[1],n=t[2],o=t[3];function l(e){var t=e.target;if(t){var i=e.target.dom7EventData||[];if(i.indexOf(e)<0&&i.unshift(e),s(t).is(r))n.apply(t,i);else for(var a=s(t).parents(),o=0;o<a.length;o+=1)s(a[o]).is(r)&&n.apply(a[o],i)}}function d(e){var t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),n.apply(this,t)}"function"==typeof t[1]&&(a=(e=t)[0],n=e[1],o=e[2],r=void 0),o||(o=!1);for(var h,p=a.split(" "),c=0;c<this.length;c+=1){var u=this[c];if(r)for(h=0;h<p.length;h+=1){var v=p[h];u.dom7LiveListeners||(u.dom7LiveListeners={}),u.dom7LiveListeners[v]||(u.dom7LiveListeners[v]=[]),u.dom7LiveListeners[v].push({listener:n,proxyListener:l}),u.addEventListener(v,l,o)}else for(h=0;h<p.length;h+=1){var f=p[h];u.dom7Listeners||(u.dom7Listeners={}),u.dom7Listeners[f]||(u.dom7Listeners[f]=[]),u.dom7Listeners[f].push({listener:n,proxyListener:d}),u.addEventListener(f,d,o)}}return this},off:function(){for(var e,t=[],i=arguments.length;i--;)t[i]=arguments[i];var s=t[0],a=t[1],r=t[2],n=t[3];"function"==typeof t[1]&&(s=(e=t)[0],r=e[1],n=e[2],a=void 0),n||(n=!1);for(var o=s.split(" "),l=0;l<o.length;l+=1)for(var d=o[l],h=0;h<this.length;h+=1){var p=this[h],c=void 0;if(!a&&p.dom7Listeners?c=p.dom7Listeners[d]:a&&p.dom7LiveListeners&&(c=p.dom7LiveListeners[d]),c&&c.length)for(var u=c.length-1;u>=0;u-=1){var v=c[u];r&&v.listener===r?(p.removeEventListener(d,v.proxyListener,n),c.splice(u,1)):r&&v.listener&&v.listener.dom7proxy&&v.listener.dom7proxy===r?(p.removeEventListener(d,v.proxyListener,n),c.splice(u,1)):r||(p.removeEventListener(d,v.proxyListener,n),c.splice(u,1))}}return this},trigger:function(){for(var i=[],s=arguments.length;s--;)i[s]=arguments[s];for(var a=i[0].split(" "),r=i[1],n=0;n<a.length;n+=1)for(var o=a[n],l=0;l<this.length;l+=1){var d=this[l],h=void 0;try{h=new t.CustomEvent(o,{detail:r,bubbles:!0,cancelable:!0})}catch(t){(h=e.createEvent("Event")).initEvent(o,!0,!0),h.detail=r}d.dom7EventData=i.filter((function(e,t){return t>0})),d.dispatchEvent(h),d.dom7EventData=[],delete d.dom7EventData}return this},transitionEnd:function(e){var t,i=["webkitTransitionEnd","transitionend"],s=this;function a(r){if(r.target===this)for(e.call(this,r),t=0;t<i.length;t+=1)s.off(i[t],a)}if(e)for(t=0;t<i.length;t+=1)s.on(i[t],a);return this},outerWidth:function(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetWidth+parseFloat(t.getPropertyValue("margin-right"))+parseFloat(t.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetHeight+parseFloat(t.getPropertyValue("margin-top"))+parseFloat(t.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},offset:function(){if(this.length>0){var i=this[0],s=i.getBoundingClientRect(),a=e.body,r=i.clientTop||a.clientTop||0,n=i.clientLeft||a.clientLeft||0,o=i===t?t.scrollY:i.scrollTop,l=i===t?t.scrollX:i.scrollLeft;return{top:s.top+o-r,left:s.left+l-n}}return null},css:function(e,i){var s;if(1===arguments.length){if("string"!=typeof e){for(s=0;s<this.length;s+=1)for(var a in e)this[s].style[a]=e[a];return this}if(this[0])return t.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(s=0;s<this.length;s+=1)this[s].style[e]=i;return this}return this},each:function(e){if(!e)return this;for(var t=0;t<this.length;t+=1)if(!1===e.call(this[t],t,this[t]))return this;return this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:void 0;for(var t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(var t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(a){var r,n,o=this[0];if(!o||void 0===a)return!1;if("string"==typeof a){if(o.matches)return o.matches(a);if(o.webkitMatchesSelector)return o.webkitMatchesSelector(a);if(o.msMatchesSelector)return o.msMatchesSelector(a);for(r=s(a),n=0;n<r.length;n+=1)if(r[n]===o)return!0;return!1}if(a===e)return o===e;if(a===t)return o===t;if(a.nodeType||a instanceof i){for(r=a.nodeType?[a]:a,n=0;n<r.length;n+=1)if(r[n]===o)return!0;return!1}return!1},index:function(){var e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;var t,s=this.length;return new i(e>s-1?[]:e<0?(t=s+e)<0?[]:[this[t]]:[this[e]])},append:function(){for(var t,s=[],a=arguments.length;a--;)s[a]=arguments[a];for(var r=0;r<s.length;r+=1){t=s[r];for(var n=0;n<this.length;n+=1)if("string"==typeof t){var o=e.createElement("div");for(o.innerHTML=t;o.firstChild;)this[n].appendChild(o.firstChild)}else if(t instanceof i)for(var l=0;l<t.length;l+=1)this[n].appendChild(t[l]);else this[n].appendChild(t)}return this},prepend:function(t){var s,a;for(s=0;s<this.length;s+=1)if("string"==typeof t){var r=e.createElement("div");for(r.innerHTML=t,a=r.childNodes.length-1;a>=0;a-=1)this[s].insertBefore(r.childNodes[a],this[s].childNodes[0])}else if(t instanceof i)for(a=0;a<t.length;a+=1)this[s].insertBefore(t[a],this[s].childNodes[0]);else this[s].insertBefore(t,this[s].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&s(this[0].nextElementSibling).is(e)?new i([this[0].nextElementSibling]):new i([]):this[0].nextElementSibling?new i([this[0].nextElementSibling]):new i([]):new i([])},nextAll:function(e){var t=[],a=this[0];if(!a)return new i([]);for(;a.nextElementSibling;){var r=a.nextElementSibling;e?s(r).is(e)&&t.push(r):t.push(r),a=r}return new i(t)},prev:function(e){if(this.length>0){var t=this[0];return e?t.previousElementSibling&&s(t.previousElementSibling).is(e)?new i([t.previousElementSibling]):new i([]):t.previousElementSibling?new i([t.previousElementSibling]):new i([])}return new i([])},prevAll:function(e){var t=[],a=this[0];if(!a)return new i([]);for(;a.previousElementSibling;){var r=a.previousElementSibling;e?s(r).is(e)&&t.push(r):t.push(r),a=r}return new i(t)},parent:function(e){for(var t=[],i=0;i<this.length;i+=1)null!==this[i].parentNode&&(e?s(this[i].parentNode).is(e)&&t.push(this[i].parentNode):t.push(this[i].parentNode));return s(a(t))},parents:function(e){for(var t=[],i=0;i<this.length;i+=1)for(var r=this[i].parentNode;r;)e?s(r).is(e)&&t.push(r):t.push(r),r=r.parentNode;return s(a(t))},closest:function(e){var t=this;return void 0===e?new i([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){for(var t=[],s=0;s<this.length;s+=1)for(var a=this[s].querySelectorAll(e),r=0;r<a.length;r+=1)t.push(a[r]);return new i(t)},children:function(e){for(var t=[],r=0;r<this.length;r+=1)for(var n=this[r].childNodes,o=0;o<n.length;o+=1)e?1===n[o].nodeType&&s(n[o]).is(e)&&t.push(n[o]):1===n[o].nodeType&&t.push(n[o]);return new i(a(t))},filter:function(e){for(var t=[],s=0;s<this.length;s+=1)e.call(this[s],s,this[s])&&t.push(this[s]);return new i(t)},remove:function(){for(var e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var i,a;for(i=0;i<e.length;i+=1){var r=s(e[i]);for(a=0;a<r.length;a+=1)this[this.length]=r[a],this.length+=1}return this},styles:function(){return this[0]?t.getComputedStyle(this[0],null):{}}};Object.keys(r).forEach((function(e){s.fn[e]=s.fn[e]||r[e]}));var n={deleteProps:function(e){var t=e;Object.keys(t).forEach((function(e){try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))},nextTick:function(e,t){return void 0===t&&(t=0),setTimeout(e,t)},now:function(){return Date.now()},getTranslate:function(e,i){var s,a,r;void 0===i&&(i="x");var n=t.getComputedStyle(e,null);return t.WebKitCSSMatrix?((a=n.transform||n.webkitTransform).split(",").length>6&&(a=a.split(", ").map((function(e){return e.replace(",",".")})).join(", ")),r=new t.WebKitCSSMatrix("none"===a?"":a)):s=(r=n.MozTransform||n.OTransform||n.MsTransform||n.msTransform||n.transform||n.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,")).toString().split(","),"x"===i&&(a=t.WebKitCSSMatrix?r.m41:16===s.length?parseFloat(s[12]):parseFloat(s[4])),"y"===i&&(a=t.WebKitCSSMatrix?r.m42:16===s.length?parseFloat(s[13]):parseFloat(s[5])),a||0},parseUrlQuery:function(e){var i,s,a,r,n={},o=e||t.location.href;if("string"==typeof o&&o.length)for(r=(s=(o=o.indexOf("?")>-1?o.replace(/\S*\?/,""):"").split("&").filter((function(e){return""!==e}))).length,i=0;i<r;i+=1)a=s[i].replace(/#\S+/g,"").split("="),n[decodeURIComponent(a[0])]=void 0===a[1]?void 0:decodeURIComponent(a[1])||"";return n},isObject:function(e){return"object"==typeof e&&null!==e&&e.constructor&&e.constructor===Object},extend:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];for(var i=Object(e[0]),s=1;s<e.length;s+=1){var a=e[s];if(null!=a)for(var r=Object.keys(Object(a)),o=0,l=r.length;o<l;o+=1){var d=r[o],h=Object.getOwnPropertyDescriptor(a,d);void 0!==h&&h.enumerable&&(n.isObject(i[d])&&n.isObject(a[d])?n.extend(i[d],a[d]):!n.isObject(i[d])&&n.isObject(a[d])?(i[d]={},n.extend(i[d],a[d])):i[d]=a[d])}}return i}},o={touch:t.Modernizr&&!0===t.Modernizr.touch||!!(t.navigator.maxTouchPoints>0||"ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch),pointerEvents:!!t.PointerEvent&&"maxTouchPoints"in t.navigator&&t.navigator.maxTouchPoints>0,observer:"MutationObserver"in t||"WebkitMutationObserver"in t,passiveListener:function(){var e=!1;try{var i=Object.defineProperty({},"passive",{get:function(){e=!0}});t.addEventListener("testPassiveListener",null,i)}catch(e){}return e}(),gestures:"ongesturestart"in t},l=function(e){void 0===e&&(e={});var t=this;t.params=e,t.eventsListeners={},t.params&&t.params.on&&Object.keys(t.params.on).forEach((function(e){t.on(e,t.params.on[e])}))},d={components:{configurable:!0}};l.prototype.on=function(e,t,i){var s=this;if("function"!=typeof t)return s;var a=i?"unshift":"push";return e.split(" ").forEach((function(e){s.eventsListeners[e]||(s.eventsListeners[e]=[]),s.eventsListeners[e][a](t)})),s},l.prototype.once=function(e,t,i){var s=this;if("function"!=typeof t)return s;function a(){for(var i=[],r=arguments.length;r--;)i[r]=arguments[r];t.apply(s,i),s.off(e,a),a.f7proxy&&delete a.f7proxy}return a.f7proxy=t,s.on(e,a,i)},l.prototype.off=function(e,t){var i=this;return i.eventsListeners?(e.split(" ").forEach((function(e){void 0===t?i.eventsListeners[e]=[]:i.eventsListeners[e]&&i.eventsListeners[e].length&&i.eventsListeners[e].forEach((function(s,a){(s===t||s.f7proxy&&s.f7proxy===t)&&i.eventsListeners[e].splice(a,1)}))})),i):i},l.prototype.emit=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var i,s,a,r=this;if(!r.eventsListeners)return r;"string"==typeof e[0]||Array.isArray(e[0])?(i=e[0],s=e.slice(1,e.length),a=r):(i=e[0].events,s=e[0].data,a=e[0].context||r);var n=Array.isArray(i)?i:i.split(" ");return n.forEach((function(e){if(r.eventsListeners&&r.eventsListeners[e]){var t=[];r.eventsListeners[e].forEach((function(e){t.push(e)})),t.forEach((function(e){e.apply(a,s)}))}})),r},l.prototype.useModulesParams=function(e){var t=this;t.modules&&Object.keys(t.modules).forEach((function(i){var s=t.modules[i];s.params&&n.extend(e,s.params)}))},l.prototype.useModules=function(e){void 0===e&&(e={});var t=this;t.modules&&Object.keys(t.modules).forEach((function(i){var s=t.modules[i],a=e[i]||{};s.instance&&Object.keys(s.instance).forEach((function(e){var i=s.instance[e];t[e]="function"==typeof i?i.bind(t):i})),s.on&&t.on&&Object.keys(s.on).forEach((function(e){t.on(e,s.on[e])})),s.create&&s.create.bind(t)(a)}))},d.components.set=function(e){this.use&&this.use(e)},l.installModule=function(e){for(var t=[],i=arguments.length-1;i-- >0;)t[i]=arguments[i+1];var s=this;s.prototype.modules||(s.prototype.modules={});var a=e.name||Object.keys(s.prototype.modules).length+"_"+n.now();return s.prototype.modules[a]=e,e.proto&&Object.keys(e.proto).forEach((function(t){s.prototype[t]=e.proto[t]})),e.static&&Object.keys(e.static).forEach((function(t){s[t]=e.static[t]})),e.install&&e.install.apply(s,t),s},l.use=function(e){for(var t=[],i=arguments.length-1;i-- >0;)t[i]=arguments[i+1];var s=this;return Array.isArray(e)?(e.forEach((function(e){return s.installModule(e)})),s):s.installModule.apply(s,[e].concat(t))},Object.defineProperties(l,d);var h={updateSize:function(){var e,t,i=this.$el;e=void 0!==this.params.width?this.params.width:i[0].clientWidth,t=void 0!==this.params.height?this.params.height:i[0].clientHeight,0===e&&this.isHorizontal()||0===t&&this.isVertical()||(e=e-parseInt(i.css("padding-left"),10)-parseInt(i.css("padding-right"),10),t=t-parseInt(i.css("padding-top"),10)-parseInt(i.css("padding-bottom"),10),n.extend(this,{width:e,height:t,size:this.isHorizontal()?e:t}))},updateSlides:function(){var e=this.params,i=this.$wrapperEl,s=this.size,a=this.rtlTranslate,r=this.wrongRTL,o=this.virtual&&e.virtual.enabled,l=o?this.virtual.slides.length:this.slides.length,d=i.children("."+this.params.slideClass),h=o?this.virtual.slides.length:d.length,p=[],c=[],u=[];function v(t){return!e.cssMode||t!==d.length-1}var f=e.slidesOffsetBefore;"function"==typeof f&&(f=e.slidesOffsetBefore.call(this));var m=e.slidesOffsetAfter;"function"==typeof m&&(m=e.slidesOffsetAfter.call(this));var g=this.snapGrid.length,b=this.snapGrid.length,w=e.spaceBetween,y=-f,x=0,T=0;if(void 0!==s){var E,C;"string"==typeof w&&w.indexOf("%")>=0&&(w=parseFloat(w.replace("%",""))/100*s),this.virtualSize=-w,a?d.css({marginLeft:"",marginTop:""}):d.css({marginRight:"",marginBottom:""}),e.slidesPerColumn>1&&(E=Math.floor(h/e.slidesPerColumn)===h/this.params.slidesPerColumn?h:Math.ceil(h/e.slidesPerColumn)*e.slidesPerColumn,"auto"!==e.slidesPerView&&"row"===e.slidesPerColumnFill&&(E=Math.max(E,e.slidesPerView*e.slidesPerColumn)));for(var S,M=e.slidesPerColumn,P=E/M,z=Math.floor(h/e.slidesPerColumn),k=0;k<h;k+=1){C=0;var $=d.eq(k);if(e.slidesPerColumn>1){var L=void 0,I=void 0,D=void 0;if("row"===e.slidesPerColumnFill&&e.slidesPerGroup>1){var O=Math.floor(k/(e.slidesPerGroup*e.slidesPerColumn)),A=k-e.slidesPerColumn*e.slidesPerGroup*O,G=0===O?e.slidesPerGroup:Math.min(Math.ceil((h-O*M*e.slidesPerGroup)/M),e.slidesPerGroup);L=(I=A-(D=Math.floor(A/G))*G+O*e.slidesPerGroup)+D*E/M,$.css({"-webkit-box-ordinal-group":L,"-moz-box-ordinal-group":L,"-ms-flex-order":L,"-webkit-order":L,order:L})}else"column"===e.slidesPerColumnFill?(D=k-(I=Math.floor(k/M))*M,(I>z||I===z&&D===M-1)&&(D+=1)>=M&&(D=0,I+=1)):I=k-(D=Math.floor(k/P))*P;$.css("margin-"+(this.isHorizontal()?"top":"left"),0!==D&&e.spaceBetween&&e.spaceBetween+"px")}if("none"!==$.css("display")){if("auto"===e.slidesPerView){var B=t.getComputedStyle($[0],null),H=$[0].style.transform,N=$[0].style.webkitTransform;if(H&&($[0].style.transform="none"),N&&($[0].style.webkitTransform="none"),e.roundLengths)C=this.isHorizontal()?$.outerWidth(!0):$.outerHeight(!0);else if(this.isHorizontal()){var X=parseFloat(B.getPropertyValue("width")),V=parseFloat(B.getPropertyValue("padding-left")),Y=parseFloat(B.getPropertyValue("padding-right")),F=parseFloat(B.getPropertyValue("margin-left")),W=parseFloat(B.getPropertyValue("margin-right")),R=B.getPropertyValue("box-sizing");C=R&&"border-box"===R?X+F+W:X+V+Y+F+W}else{var q=parseFloat(B.getPropertyValue("height")),j=parseFloat(B.getPropertyValue("padding-top")),K=parseFloat(B.getPropertyValue("padding-bottom")),U=parseFloat(B.getPropertyValue("margin-top")),_=parseFloat(B.getPropertyValue("margin-bottom")),Z=B.getPropertyValue("box-sizing");C=Z&&"border-box"===Z?q+U+_:q+j+K+U+_}H&&($[0].style.transform=H),N&&($[0].style.webkitTransform=N),e.roundLengths&&(C=Math.floor(C))}else C=(s-(e.slidesPerView-1)*w)/e.slidesPerView,e.roundLengths&&(C=Math.floor(C)),d[k]&&(this.isHorizontal()?d[k].style.width=C+"px":d[k].style.height=C+"px");d[k]&&(d[k].swiperSlideSize=C),u.push(C),e.centeredSlides?(y=y+C/2+x/2+w,0===x&&0!==k&&(y=y-s/2-w),0===k&&(y=y-s/2-w),Math.abs(y)<.001&&(y=0),e.roundLengths&&(y=Math.floor(y)),T%e.slidesPerGroup==0&&p.push(y),c.push(y)):(e.roundLengths&&(y=Math.floor(y)),T%e.slidesPerGroup==0&&p.push(y),c.push(y),y=y+C+w),this.virtualSize+=C+w,x=C,T+=1}}if(this.virtualSize=Math.max(this.virtualSize,s)+m,a&&r&&("slide"===e.effect||"coverflow"===e.effect)&&i.css({width:this.virtualSize+e.spaceBetween+"px"}),e.setWrapperSize&&(this.isHorizontal()?i.css({width:this.virtualSize+e.spaceBetween+"px"}):i.css({height:this.virtualSize+e.spaceBetween+"px"})),e.slidesPerColumn>1&&(this.virtualSize=(C+e.spaceBetween)*E,this.virtualSize=Math.ceil(this.virtualSize/e.slidesPerColumn)-e.spaceBetween,this.isHorizontal()?i.css({width:this.virtualSize+e.spaceBetween+"px"}):i.css({height:this.virtualSize+e.spaceBetween+"px"}),e.centeredSlides)){S=[];for(var Q=0;Q<p.length;Q+=1){var J=p[Q];e.roundLengths&&(J=Math.floor(J)),p[Q]<this.virtualSize+p[0]&&S.push(J)}p=S}if(!e.centeredSlides){S=[];for(var ee=0;ee<p.length;ee+=1){var te=p[ee];e.roundLengths&&(te=Math.floor(te)),p[ee]<=this.virtualSize-s&&S.push(te)}p=S,Math.floor(this.virtualSize-s)-Math.floor(p[p.length-1])>1&&p.push(this.virtualSize-s)}if(0===p.length&&(p=[0]),0!==e.spaceBetween&&(this.isHorizontal()?a?d.filter(v).css({marginLeft:w+"px"}):d.filter(v).css({marginRight:w+"px"}):d.filter(v).css({marginBottom:w+"px"})),e.centeredSlides&&e.centeredSlidesBounds){var ie=0;u.forEach((function(t){ie+=t+(e.spaceBetween?e.spaceBetween:0)}));var se=(ie-=e.spaceBetween)-s;p=p.map((function(e){return e<0?-f:e>se?se+m:e}))}if(e.centerInsufficientSlides){var ae=0;if(u.forEach((function(t){ae+=t+(e.spaceBetween?e.spaceBetween:0)})),(ae-=e.spaceBetween)<s){var re=(s-ae)/2;p.forEach((function(e,t){p[t]=e-re})),c.forEach((function(e,t){c[t]=e+re}))}}n.extend(this,{slides:d,snapGrid:p,slidesGrid:c,slidesSizesGrid:u}),h!==l&&this.emit("slidesLengthChange"),p.length!==g&&(this.params.watchOverflow&&this.checkOverflow(),this.emit("snapGridLengthChange")),c.length!==b&&this.emit("slidesGridLengthChange"),(e.watchSlidesProgress||e.watchSlidesVisibility)&&this.updateSlidesOffset()}},updateAutoHeight:function(e){var t,i=[],s=0;if("number"==typeof e?this.setTransition(e):!0===e&&this.setTransition(this.params.speed),"auto"!==this.params.slidesPerView&&this.params.slidesPerView>1)for(t=0;t<Math.ceil(this.params.slidesPerView);t+=1){var a=this.activeIndex+t;if(a>this.slides.length)break;i.push(this.slides.eq(a)[0])}else i.push(this.slides.eq(this.activeIndex)[0]);for(t=0;t<i.length;t+=1)if(void 0!==i[t]){var r=i[t].offsetHeight;s=r>s?r:s}s&&this.$wrapperEl.css("height",s+"px")},updateSlidesOffset:function(){for(var e=this.slides,t=0;t<e.length;t+=1)e[t].swiperSlideOffset=this.isHorizontal()?e[t].offsetLeft:e[t].offsetTop},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);var t=this.params,i=this.slides,a=this.rtlTranslate;if(0!==i.length){void 0===i[0].swiperSlideOffset&&this.updateSlidesOffset();var r=-e;a&&(r=e),i.removeClass(t.slideVisibleClass),this.visibleSlidesIndexes=[],this.visibleSlides=[];for(var n=0;n<i.length;n+=1){var o=i[n],l=(r+(t.centeredSlides?this.minTranslate():0)-o.swiperSlideOffset)/(o.swiperSlideSize+t.spaceBetween);if(t.watchSlidesVisibility){var d=-(r-o.swiperSlideOffset),h=d+this.slidesSizesGrid[n];(d>=0&&d<this.size-1||h>1&&h<=this.size||d<=0&&h>=this.size)&&(this.visibleSlides.push(o),this.visibleSlidesIndexes.push(n),i.eq(n).addClass(t.slideVisibleClass))}o.progress=a?-l:l}this.visibleSlides=s(this.visibleSlides)}},updateProgress:function(e){if(void 0===e){var t=this.rtlTranslate?-1:1;e=this&&this.translate&&this.translate*t||0}var i=this.params,s=this.maxTranslate()-this.minTranslate(),a=this.progress,r=this.isBeginning,o=this.isEnd,l=r,d=o;0===s?(a=0,r=!0,o=!0):(r=(a=(e-this.minTranslate())/s)<=0,o=a>=1),n.extend(this,{progress:a,isBeginning:r,isEnd:o}),(i.watchSlidesProgress||i.watchSlidesVisibility)&&this.updateSlidesProgress(e),r&&!l&&this.emit("reachBeginning toEdge"),o&&!d&&this.emit("reachEnd toEdge"),(l&&!r||d&&!o)&&this.emit("fromEdge"),this.emit("progress",a)},updateSlidesClasses:function(){var e,t=this.slides,i=this.params,s=this.$wrapperEl,a=this.activeIndex,r=this.realIndex,n=this.virtual&&i.virtual.enabled;t.removeClass(i.slideActiveClass+" "+i.slideNextClass+" "+i.slidePrevClass+" "+i.slideDuplicateActiveClass+" "+i.slideDuplicateNextClass+" "+i.slideDuplicatePrevClass),(e=n?this.$wrapperEl.find("."+i.slideClass+'[data-swiper-slide-index="'+a+'"]'):t.eq(a)).addClass(i.slideActiveClass),i.loop&&(e.hasClass(i.slideDuplicateClass)?s.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+r+'"]').addClass(i.slideDuplicateActiveClass):s.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+r+'"]').addClass(i.slideDuplicateActiveClass));var o=e.nextAll("."+i.slideClass).eq(0).addClass(i.slideNextClass);i.loop&&0===o.length&&(o=t.eq(0)).addClass(i.slideNextClass);var l=e.prevAll("."+i.slideClass).eq(0).addClass(i.slidePrevClass);i.loop&&0===l.length&&(l=t.eq(-1)).addClass(i.slidePrevClass),i.loop&&(o.hasClass(i.slideDuplicateClass)?s.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+o.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicateNextClass):s.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+o.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicateNextClass),l.hasClass(i.slideDuplicateClass)?s.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+l.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicatePrevClass):s.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+l.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicatePrevClass))},updateActiveIndex:function(e){var t,i=this.rtlTranslate?this.translate:-this.translate,s=this.slidesGrid,a=this.snapGrid,r=this.params,o=this.activeIndex,l=this.realIndex,d=this.snapIndex,h=e;if(void 0===h){for(var p=0;p<s.length;p+=1)void 0!==s[p+1]?i>=s[p]&&i<s[p+1]-(s[p+1]-s[p])/2?h=p:i>=s[p]&&i<s[p+1]&&(h=p+1):i>=s[p]&&(h=p);r.normalizeSlideIndex&&(h<0||void 0===h)&&(h=0)}if((t=a.indexOf(i)>=0?a.indexOf(i):Math.floor(h/r.slidesPerGroup))>=a.length&&(t=a.length-1),h!==o){var c=parseInt(this.slides.eq(h).attr("data-swiper-slide-index")||h,10);n.extend(this,{snapIndex:t,realIndex:c,previousIndex:o,activeIndex:h}),this.emit("activeIndexChange"),this.emit("snapIndexChange"),l!==c&&this.emit("realIndexChange"),(this.initialized||this.runCallbacksOnInit)&&this.emit("slideChange")}else t!==d&&(this.snapIndex=t,this.emit("snapIndexChange"))},updateClickedSlide:function(e){var t=this.params,i=s(e.target).closest("."+t.slideClass)[0],a=!1;if(i)for(var r=0;r<this.slides.length;r+=1)this.slides[r]===i&&(a=!0);if(!i||!a)return this.clickedSlide=void 0,void(this.clickedIndex=void 0);this.clickedSlide=i,this.virtual&&this.params.virtual.enabled?this.clickedIndex=parseInt(s(i).attr("data-swiper-slide-index"),10):this.clickedIndex=s(i).index(),t.slideToClickedSlide&&void 0!==this.clickedIndex&&this.clickedIndex!==this.activeIndex&&this.slideToClickedSlide()}};var p={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");var t=this.params,i=this.rtlTranslate,s=this.translate,a=this.$wrapperEl;if(t.virtualTranslate)return i?-s:s;if(t.cssMode)return s;var r=n.getTranslate(a[0],e);return i&&(r=-r),r||0},setTranslate:function(e,t){var i=this.rtlTranslate,s=this.params,a=this.$wrapperEl,r=this.wrapperEl,n=this.progress,o=0,l=0;this.isHorizontal()?o=i?-e:e:l=e,s.roundLengths&&(o=Math.floor(o),l=Math.floor(l)),s.cssMode?r[this.isHorizontal()?"scrollLeft":"scrollTop"]=this.isHorizontal()?-o:-l:s.virtualTranslate||a.transform("translate3d("+o+"px, "+l+"px, 0px)"),this.previousTranslate=this.translate,this.translate=this.isHorizontal()?o:l;var d=this.maxTranslate()-this.minTranslate();(0===d?0:(e-this.minTranslate())/d)!==n&&this.updateProgress(e),this.emit("setTranslate",this.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,i,s,a){var r;void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0),void 0===s&&(s=!0);var n=this,o=n.params,l=n.wrapperEl;if(n.animating&&o.preventInteractionOnTransition)return!1;var d,h=n.minTranslate(),p=n.maxTranslate();if(d=s&&e>h?h:s&&e<p?p:e,n.updateProgress(d),o.cssMode){var c=n.isHorizontal();return 0===t?l[c?"scrollLeft":"scrollTop"]=-d:l.scrollTo?l.scrollTo(((r={})[c?"left":"top"]=-d,r.behavior="smooth",r)):l[c?"scrollLeft":"scrollTop"]=-d,!0}return 0===t?(n.setTransition(0),n.setTranslate(d),i&&(n.emit("beforeTransitionStart",t,a),n.emit("transitionEnd"))):(n.setTransition(t),n.setTranslate(d),i&&(n.emit("beforeTransitionStart",t,a),n.emit("transitionStart")),n.animating||(n.animating=!0,n.onTranslateToWrapperTransitionEnd||(n.onTranslateToWrapperTransitionEnd=function(e){n&&!n.destroyed&&e.target===this&&(n.$wrapperEl[0].removeEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.$wrapperEl[0].removeEventListener("webkitTransitionEnd",n.onTranslateToWrapperTransitionEnd),n.onTranslateToWrapperTransitionEnd=null,delete n.onTranslateToWrapperTransitionEnd,i&&n.emit("transitionEnd"))}),n.$wrapperEl[0].addEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.$wrapperEl[0].addEventListener("webkitTransitionEnd",n.onTranslateToWrapperTransitionEnd))),!0}};var c={setTransition:function(e,t){this.params.cssMode||this.$wrapperEl.transition(e),this.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);var i=this.activeIndex,s=this.params,a=this.previousIndex;if(!s.cssMode){s.autoHeight&&this.updateAutoHeight();var r=t;if(r||(r=i>a?"next":i<a?"prev":"reset"),this.emit("transitionStart"),e&&i!==a){if("reset"===r)return void this.emit("slideResetTransitionStart");this.emit("slideChangeTransitionStart"),"next"===r?this.emit("slideNextTransitionStart"):this.emit("slidePrevTransitionStart")}}},transitionEnd:function(e,t){void 0===e&&(e=!0);var i=this.activeIndex,s=this.previousIndex,a=this.params;if(this.animating=!1,!a.cssMode){this.setTransition(0);var r=t;if(r||(r=i>s?"next":i<s?"prev":"reset"),this.emit("transitionEnd"),e&&i!==s){if("reset"===r)return void this.emit("slideResetTransitionEnd");this.emit("slideChangeTransitionEnd"),"next"===r?this.emit("slideNextTransitionEnd"):this.emit("slidePrevTransitionEnd")}}}};var u={slideTo:function(e,t,i,s){var a;void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0);var r=this,n=e;n<0&&(n=0);var o=r.params,l=r.snapGrid,d=r.slidesGrid,h=r.previousIndex,p=r.activeIndex,c=r.rtlTranslate,u=r.wrapperEl;if(r.animating&&o.preventInteractionOnTransition)return!1;var v=Math.floor(n/o.slidesPerGroup);v>=l.length&&(v=l.length-1),(p||o.initialSlide||0)===(h||0)&&i&&r.emit("beforeSlideChangeStart");var f,m=-l[v];if(r.updateProgress(m),o.normalizeSlideIndex)for(var g=0;g<d.length;g+=1)-Math.floor(100*m)>=Math.floor(100*d[g])&&(n=g);if(r.initialized&&n!==p){if(!r.allowSlideNext&&m<r.translate&&m<r.minTranslate())return!1;if(!r.allowSlidePrev&&m>r.translate&&m>r.maxTranslate()&&(p||0)!==n)return!1}if(f=n>p?"next":n<p?"prev":"reset",c&&-m===r.translate||!c&&m===r.translate)return r.updateActiveIndex(n),o.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==o.effect&&r.setTranslate(m),"reset"!==f&&(r.transitionStart(i,f),r.transitionEnd(i,f)),!1;if(o.cssMode){var b=r.isHorizontal();return 0===t?u[b?"scrollLeft":"scrollTop"]=-m:u.scrollTo?u.scrollTo(((a={})[b?"left":"top"]=-m,a.behavior="smooth",a)):u[b?"scrollLeft":"scrollTop"]=-m,!0}return 0===t?(r.setTransition(0),r.setTranslate(m),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,s),r.transitionStart(i,f),r.transitionEnd(i,f)):(r.setTransition(t),r.setTranslate(m),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,s),r.transitionStart(i,f),r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(i,f))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd))),!0},slideToLoop:function(e,t,i,s){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0);var a=e;return this.params.loop&&(a+=this.loopedSlides),this.slideTo(a,t,i,s)},slideNext:function(e,t,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);var s=this.params,a=this.animating;return s.loop?!a&&(this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft,this.slideTo(this.activeIndex+s.slidesPerGroup,e,t,i)):this.slideTo(this.activeIndex+s.slidesPerGroup,e,t,i)},slidePrev:function(e,t,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);var s=this.params,a=this.animating,r=this.snapGrid,n=this.slidesGrid,o=this.rtlTranslate;if(s.loop){if(a)return!1;this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft}function l(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}var d,h=l(o?this.translate:-this.translate),p=r.map((function(e){return l(e)})),c=(n.map((function(e){return l(e)})),r[p.indexOf(h)],r[p.indexOf(h)-1]);return void 0===c&&s.cssMode&&r.forEach((function(e){!c&&h>=e&&(c=e)})),void 0!==c&&(d=n.indexOf(c))<0&&(d=this.activeIndex-1),this.slideTo(d,e,t,i)},slideReset:function(e,t,i){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,i)},slideToClosest:function(e,t,i,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===s&&(s=.5);var a=this.activeIndex,r=Math.floor(a/this.params.slidesPerGroup),n=this.rtlTranslate?this.translate:-this.translate;if(n>=this.snapGrid[r]){var o=this.snapGrid[r];n-o>(this.snapGrid[r+1]-o)*s&&(a+=this.params.slidesPerGroup)}else{var l=this.snapGrid[r-1];n-l<=(this.snapGrid[r]-l)*s&&(a-=this.params.slidesPerGroup)}return a=Math.max(a,0),a=Math.min(a,this.snapGrid.length-1),this.slideTo(a,e,t,i)},slideToClickedSlide:function(){var e,t=this,i=t.params,a=t.$wrapperEl,r="auto"===i.slidesPerView?t.slidesPerViewDynamic():i.slidesPerView,o=t.clickedIndex;if(i.loop){if(t.animating)return;e=parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"),10),i.centeredSlides?o<t.loopedSlides-r/2||o>t.slides.length-t.loopedSlides+r/2?(t.loopFix(),o=a.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]:not(.'+i.slideDuplicateClass+")").eq(0).index(),n.nextTick((function(){t.slideTo(o)}))):t.slideTo(o):o>t.slides.length-r?(t.loopFix(),o=a.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]:not(.'+i.slideDuplicateClass+")").eq(0).index(),n.nextTick((function(){t.slideTo(o)}))):t.slideTo(o)}else t.slideTo(o)}};var v={loopCreate:function(){var t=this,i=t.params,a=t.$wrapperEl;a.children("."+i.slideClass+"."+i.slideDuplicateClass).remove();var r=a.children("."+i.slideClass);if(i.loopFillGroupWithBlank){var n=i.slidesPerGroup-r.length%i.slidesPerGroup;if(n!==i.slidesPerGroup){for(var o=0;o<n;o+=1){var l=s(e.createElement("div")).addClass(i.slideClass+" "+i.slideBlankClass);a.append(l)}r=a.children("."+i.slideClass)}}"auto"!==i.slidesPerView||i.loopedSlides||(i.loopedSlides=r.length),t.loopedSlides=Math.ceil(parseFloat(i.loopedSlides||i.slidesPerView,10)),t.loopedSlides+=i.loopAdditionalSlides,t.loopedSlides>r.length&&(t.loopedSlides=r.length);var d=[],h=[];r.each((function(e,i){var a=s(i);e<t.loopedSlides&&h.push(i),e<r.length&&e>=r.length-t.loopedSlides&&d.push(i),a.attr("data-swiper-slide-index",e)}));for(var p=0;p<h.length;p+=1)a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));for(var c=d.length-1;c>=0;c-=1)a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))},loopFix:function(){var e,t=this.activeIndex,i=this.slides,s=this.loopedSlides,a=this.allowSlidePrev,r=this.allowSlideNext,n=this.snapGrid,o=this.rtlTranslate;this.allowSlidePrev=!0,this.allowSlideNext=!0;var l=-n[t]-this.getTranslate();if(t<s)e=i.length-3*s+t,e+=s,this.slideTo(e,0,!1,!0)&&0!==l&&this.setTranslate((o?-this.translate:this.translate)-l);else if(t>=i.length-s){e=-i.length+t+s,e+=s,this.slideTo(e,0,!1,!0)&&0!==l&&this.setTranslate((o?-this.translate:this.translate)-l)}this.allowSlidePrev=a,this.allowSlideNext=r},loopDestroy:function(){var e=this.$wrapperEl,t=this.params,i=this.slides;e.children("."+t.slideClass+"."+t.slideDuplicateClass+",."+t.slideClass+"."+t.slideBlankClass).remove(),i.removeAttr("data-swiper-slide-index")}};var f={setGrabCursor:function(e){if(!(o.touch||!this.params.simulateTouch||this.params.watchOverflow&&this.isLocked||this.params.cssMode)){var t=this.el;t.style.cursor="move",t.style.cursor=e?"-webkit-grabbing":"-webkit-grab",t.style.cursor=e?"-moz-grabbin":"-moz-grab",t.style.cursor=e?"grabbing":"grab"}},unsetGrabCursor:function(){o.touch||this.params.watchOverflow&&this.isLocked||this.params.cssMode||(this.el.style.cursor="")}};var m,g,b,w,y,x,T,E,C,S,M,P,z,k,$,L={appendSlide:function(e){var t=this.$wrapperEl,i=this.params;if(i.loop&&this.loopDestroy(),"object"==typeof e&&"length"in e)for(var s=0;s<e.length;s+=1)e[s]&&t.append(e[s]);else t.append(e);i.loop&&this.loopCreate(),i.observer&&o.observer||this.update()},prependSlide:function(e){var t=this.params,i=this.$wrapperEl,s=this.activeIndex;t.loop&&this.loopDestroy();var a=s+1;if("object"==typeof e&&"length"in e){for(var r=0;r<e.length;r+=1)e[r]&&i.prepend(e[r]);a=s+e.length}else i.prepend(e);t.loop&&this.loopCreate(),t.observer&&o.observer||this.update(),this.slideTo(a,0,!1)},addSlide:function(e,t){var i=this.$wrapperEl,s=this.params,a=this.activeIndex;s.loop&&(a-=this.loopedSlides,this.loopDestroy(),this.slides=i.children("."+s.slideClass));var r=this.slides.length;if(e<=0)this.prependSlide(t);else if(e>=r)this.appendSlide(t);else{for(var n=a>e?a+1:a,l=[],d=r-1;d>=e;d-=1){var h=this.slides.eq(d);h.remove(),l.unshift(h)}if("object"==typeof t&&"length"in t){for(var p=0;p<t.length;p+=1)t[p]&&i.append(t[p]);n=a>e?a+t.length:a}else i.append(t);for(var c=0;c<l.length;c+=1)i.append(l[c]);s.loop&&this.loopCreate(),s.observer&&o.observer||this.update(),s.loop?this.slideTo(n+this.loopedSlides,0,!1):this.slideTo(n,0,!1)}},removeSlide:function(e){var t=this.params,i=this.$wrapperEl,s=this.activeIndex;t.loop&&(s-=this.loopedSlides,this.loopDestroy(),this.slides=i.children("."+t.slideClass));var a,r=s;if("object"==typeof e&&"length"in e){for(var n=0;n<e.length;n+=1)a=e[n],this.slides[a]&&this.slides.eq(a).remove(),a<r&&(r-=1);r=Math.max(r,0)}else a=e,this.slides[a]&&this.slides.eq(a).remove(),a<r&&(r-=1),r=Math.max(r,0);t.loop&&this.loopCreate(),t.observer&&o.observer||this.update(),t.loop?this.slideTo(r+this.loopedSlides,0,!1):this.slideTo(r,0,!1)},removeAllSlides:function(){for(var e=[],t=0;t<this.slides.length;t+=1)e.push(t);this.removeSlide(e)}},I=(m=t.navigator.platform,g=t.navigator.userAgent,b={ios:!1,android:!1,androidChrome:!1,desktop:!1,iphone:!1,ipod:!1,ipad:!1,edge:!1,ie:!1,firefox:!1,macos:!1,windows:!1,cordova:!(!t.cordova&&!t.phonegap),phonegap:!(!t.cordova&&!t.phonegap),electron:!1},w=t.screen.width,y=t.screen.height,x=g.match(/(Android);?[\s\/]+([\d.]+)?/),T=g.match(/(iPad).*OS\s([\d_]+)/),E=g.match(/(iPod)(.*OS\s([\d_]+))?/),C=!T&&g.match(/(iPhone\sOS|iOS)\s([\d_]+)/),S=g.indexOf("MSIE ")>=0||g.indexOf("Trident/")>=0,M=g.indexOf("Edge/")>=0,P=g.indexOf("Gecko/")>=0&&g.indexOf("Firefox/")>=0,z="Win32"===m,k=g.toLowerCase().indexOf("electron")>=0,$="MacIntel"===m,!T&&$&&o.touch&&(1024===w&&1366===y||834===w&&1194===y||834===w&&1112===y||768===w&&1024===y)&&(T=g.match(/(Version)\/([\d.]+)/),$=!1),b.ie=S,b.edge=M,b.firefox=P,x&&!z&&(b.os="android",b.osVersion=x[2],b.android=!0,b.androidChrome=g.toLowerCase().indexOf("chrome")>=0),(T||C||E)&&(b.os="ios",b.ios=!0),C&&!E&&(b.osVersion=C[2].replace(/_/g,"."),b.iphone=!0),T&&(b.osVersion=T[2].replace(/_/g,"."),b.ipad=!0),E&&(b.osVersion=E[3]?E[3].replace(/_/g,"."):null,b.ipod=!0),b.ios&&b.osVersion&&g.indexOf("Version/")>=0&&"10"===b.osVersion.split(".")[0]&&(b.osVersion=g.toLowerCase().split("version/")[1].split(" ")[0]),b.webView=!(!(C||T||E)||!g.match(/.*AppleWebKit(?!.*Safari)/i)&&!t.navigator.standalone)||t.matchMedia&&t.matchMedia("(display-mode: standalone)").matches,b.webview=b.webView,b.standalone=b.webView,b.desktop=!(b.ios||b.android)||k,b.desktop&&(b.electron=k,b.macos=$,b.windows=z,b.macos&&(b.os="macos"),b.windows&&(b.os="windows")),b.pixelRatio=t.devicePixelRatio||1,b);function D(i){var a=this.touchEventsData,r=this.params,o=this.touches;if(!this.animating||!r.preventInteractionOnTransition){var l=i;l.originalEvent&&(l=l.originalEvent);var d=s(l.target);if(("wrapper"!==r.touchEventsTarget||d.closest(this.wrapperEl).length)&&(a.isTouchEvent="touchstart"===l.type,(a.isTouchEvent||!("which"in l)||3!==l.which)&&!(!a.isTouchEvent&&"button"in l&&l.button>0||a.isTouched&&a.isMoved)))if(r.noSwiping&&d.closest(r.noSwipingSelector?r.noSwipingSelector:"."+r.noSwipingClass)[0])this.allowClick=!0;else if(!r.swipeHandler||d.closest(r.swipeHandler)[0]){o.currentX="touchstart"===l.type?l.targetTouches[0].pageX:l.pageX,o.currentY="touchstart"===l.type?l.targetTouches[0].pageY:l.pageY;var h=o.currentX,p=o.currentY,c=r.edgeSwipeDetection||r.iOSEdgeSwipeDetection,u=r.edgeSwipeThreshold||r.iOSEdgeSwipeThreshold;if(!c||!(h<=u||h>=t.screen.width-u)){if(n.extend(a,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=h,o.startY=p,a.touchStartTime=n.now(),this.allowClick=!0,this.updateSize(),this.swipeDirection=void 0,r.threshold>0&&(a.allowThresholdMove=!1),"touchstart"!==l.type){var v=!0;d.is(a.formElements)&&(v=!1),e.activeElement&&s(e.activeElement).is(a.formElements)&&e.activeElement!==d[0]&&e.activeElement.blur();var f=v&&this.allowTouchMove&&r.touchStartPreventDefault;(r.touchStartForcePreventDefault||f)&&l.preventDefault()}this.emit("touchStart",l)}}}}function O(t){var i=this.touchEventsData,a=this.params,r=this.touches,o=this.rtlTranslate,l=t;if(l.originalEvent&&(l=l.originalEvent),i.isTouched){if(!i.isTouchEvent||"mousemove"!==l.type){var d="touchmove"===l.type&&l.targetTouches&&(l.targetTouches[0]||l.changedTouches[0]),h="touchmove"===l.type?d.pageX:l.pageX,p="touchmove"===l.type?d.pageY:l.pageY;if(l.preventedByNestedSwiper)return r.startX=h,void(r.startY=p);if(!this.allowTouchMove)return this.allowClick=!1,void(i.isTouched&&(n.extend(r,{startX:h,startY:p,currentX:h,currentY:p}),i.touchStartTime=n.now()));if(i.isTouchEvent&&a.touchReleaseOnEdges&&!a.loop)if(this.isVertical()){if(p<r.startY&&this.translate<=this.maxTranslate()||p>r.startY&&this.translate>=this.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(h<r.startX&&this.translate<=this.maxTranslate()||h>r.startX&&this.translate>=this.minTranslate())return;if(i.isTouchEvent&&e.activeElement&&l.target===e.activeElement&&s(l.target).is(i.formElements))return i.isMoved=!0,void(this.allowClick=!1);if(i.allowTouchCallbacks&&this.emit("touchMove",l),!(l.targetTouches&&l.targetTouches.length>1)){r.currentX=h,r.currentY=p;var c=r.currentX-r.startX,u=r.currentY-r.startY;if(!(this.params.threshold&&Math.sqrt(Math.pow(c,2)+Math.pow(u,2))<this.params.threshold)){var v;if(void 0===i.isScrolling)this.isHorizontal()&&r.currentY===r.startY||this.isVertical()&&r.currentX===r.startX?i.isScrolling=!1:c*c+u*u>=25&&(v=180*Math.atan2(Math.abs(u),Math.abs(c))/Math.PI,i.isScrolling=this.isHorizontal()?v>a.touchAngle:90-v>a.touchAngle);if(i.isScrolling&&this.emit("touchMoveOpposite",l),void 0===i.startMoving&&(r.currentX===r.startX&&r.currentY===r.startY||(i.startMoving=!0)),i.isScrolling)i.isTouched=!1;else if(i.startMoving){this.allowClick=!1,a.cssMode||l.preventDefault(),a.touchMoveStopPropagation&&!a.nested&&l.stopPropagation(),i.isMoved||(a.loop&&this.loopFix(),i.startTranslate=this.getTranslate(),this.setTransition(0),this.animating&&this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!a.grabCursor||!0!==this.allowSlideNext&&!0!==this.allowSlidePrev||this.setGrabCursor(!0),this.emit("sliderFirstMove",l)),this.emit("sliderMove",l),i.isMoved=!0;var f=this.isHorizontal()?c:u;r.diff=f,f*=a.touchRatio,o&&(f=-f),this.swipeDirection=f>0?"prev":"next",i.currentTranslate=f+i.startTranslate;var m=!0,g=a.resistanceRatio;if(a.touchReleaseOnEdges&&(g=0),f>0&&i.currentTranslate>this.minTranslate()?(m=!1,a.resistance&&(i.currentTranslate=this.minTranslate()-1+Math.pow(-this.minTranslate()+i.startTranslate+f,g))):f<0&&i.currentTranslate<this.maxTranslate()&&(m=!1,a.resistance&&(i.currentTranslate=this.maxTranslate()+1-Math.pow(this.maxTranslate()-i.startTranslate-f,g))),m&&(l.preventedByNestedSwiper=!0),!this.allowSlideNext&&"next"===this.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!this.allowSlidePrev&&"prev"===this.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),a.threshold>0){if(!(Math.abs(f)>a.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,r.startX=r.currentX,r.startY=r.currentY,i.currentTranslate=i.startTranslate,void(r.diff=this.isHorizontal()?r.currentX-r.startX:r.currentY-r.startY)}a.followFinger&&!a.cssMode&&((a.freeMode||a.watchSlidesProgress||a.watchSlidesVisibility)&&(this.updateActiveIndex(),this.updateSlidesClasses()),a.freeMode&&(0===i.velocities.length&&i.velocities.push({position:r[this.isHorizontal()?"startX":"startY"],time:i.touchStartTime}),i.velocities.push({position:r[this.isHorizontal()?"currentX":"currentY"],time:n.now()})),this.updateProgress(i.currentTranslate),this.setTranslate(i.currentTranslate))}}}}}else i.startMoving&&i.isScrolling&&this.emit("touchMoveOpposite",l)}function A(e){var t=this,i=t.touchEventsData,s=t.params,a=t.touches,r=t.rtlTranslate,o=t.$wrapperEl,l=t.slidesGrid,d=t.snapGrid,h=e;if(h.originalEvent&&(h=h.originalEvent),i.allowTouchCallbacks&&t.emit("touchEnd",h),i.allowTouchCallbacks=!1,!i.isTouched)return i.isMoved&&s.grabCursor&&t.setGrabCursor(!1),i.isMoved=!1,void(i.startMoving=!1);s.grabCursor&&i.isMoved&&i.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);var p,c=n.now(),u=c-i.touchStartTime;if(t.allowClick&&(t.updateClickedSlide(h),t.emit("tap click",h),u<300&&c-i.lastClickTime<300&&t.emit("doubleTap doubleClick",h)),i.lastClickTime=n.now(),n.nextTick((function(){t.destroyed||(t.allowClick=!0)})),!i.isTouched||!i.isMoved||!t.swipeDirection||0===a.diff||i.currentTranslate===i.startTranslate)return i.isTouched=!1,i.isMoved=!1,void(i.startMoving=!1);if(i.isTouched=!1,i.isMoved=!1,i.startMoving=!1,p=s.followFinger?r?t.translate:-t.translate:-i.currentTranslate,!s.cssMode)if(s.freeMode){if(p<-t.minTranslate())return void t.slideTo(t.activeIndex);if(p>-t.maxTranslate())return void(t.slides.length<d.length?t.slideTo(d.length-1):t.slideTo(t.slides.length-1));if(s.freeModeMomentum){if(i.velocities.length>1){var v=i.velocities.pop(),f=i.velocities.pop(),m=v.position-f.position,g=v.time-f.time;t.velocity=m/g,t.velocity/=2,Math.abs(t.velocity)<s.freeModeMinimumVelocity&&(t.velocity=0),(g>150||n.now()-v.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=s.freeModeMomentumVelocityRatio,i.velocities.length=0;var b=1e3*s.freeModeMomentumRatio,w=t.velocity*b,y=t.translate+w;r&&(y=-y);var x,T,E=!1,C=20*Math.abs(t.velocity)*s.freeModeMomentumBounceRatio;if(y<t.maxTranslate())s.freeModeMomentumBounce?(y+t.maxTranslate()<-C&&(y=t.maxTranslate()-C),x=t.maxTranslate(),E=!0,i.allowMomentumBounce=!0):y=t.maxTranslate(),s.loop&&s.centeredSlides&&(T=!0);else if(y>t.minTranslate())s.freeModeMomentumBounce?(y-t.minTranslate()>C&&(y=t.minTranslate()+C),x=t.minTranslate(),E=!0,i.allowMomentumBounce=!0):y=t.minTranslate(),s.loop&&s.centeredSlides&&(T=!0);else if(s.freeModeSticky){for(var S,M=0;M<d.length;M+=1)if(d[M]>-y){S=M;break}y=-(y=Math.abs(d[S]-y)<Math.abs(d[S-1]-y)||"next"===t.swipeDirection?d[S]:d[S-1])}if(T&&t.once("transitionEnd",(function(){t.loopFix()})),0!==t.velocity){if(b=r?Math.abs((-y-t.translate)/t.velocity):Math.abs((y-t.translate)/t.velocity),s.freeModeSticky){var P=Math.abs((r?-y:y)-t.translate),z=t.slidesSizesGrid[t.activeIndex];b=P<z?s.speed:P<2*z?1.5*s.speed:2.5*s.speed}}else if(s.freeModeSticky)return void t.slideToClosest();s.freeModeMomentumBounce&&E?(t.updateProgress(x),t.setTransition(b),t.setTranslate(y),t.transitionStart(!0,t.swipeDirection),t.animating=!0,o.transitionEnd((function(){t&&!t.destroyed&&i.allowMomentumBounce&&(t.emit("momentumBounce"),t.setTransition(s.speed),t.setTranslate(x),o.transitionEnd((function(){t&&!t.destroyed&&t.transitionEnd()})))}))):t.velocity?(t.updateProgress(y),t.setTransition(b),t.setTranslate(y),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,o.transitionEnd((function(){t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(y),t.updateActiveIndex(),t.updateSlidesClasses()}else if(s.freeModeSticky)return void t.slideToClosest();(!s.freeModeMomentum||u>=s.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}else{for(var k=0,$=t.slidesSizesGrid[0],L=0;L<l.length;L+=s.slidesPerGroup)void 0!==l[L+s.slidesPerGroup]?p>=l[L]&&p<l[L+s.slidesPerGroup]&&(k=L,$=l[L+s.slidesPerGroup]-l[L]):p>=l[L]&&(k=L,$=l[l.length-1]-l[l.length-2]);var I=(p-l[k])/$;if(u>s.longSwipesMs){if(!s.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(I>=s.longSwipesRatio?t.slideTo(k+s.slidesPerGroup):t.slideTo(k)),"prev"===t.swipeDirection&&(I>1-s.longSwipesRatio?t.slideTo(k+s.slidesPerGroup):t.slideTo(k))}else{if(!s.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(h.target===t.navigation.nextEl||h.target===t.navigation.prevEl)?h.target===t.navigation.nextEl?t.slideTo(k+s.slidesPerGroup):t.slideTo(k):("next"===t.swipeDirection&&t.slideTo(k+s.slidesPerGroup),"prev"===t.swipeDirection&&t.slideTo(k))}}}function G(){var e=this.params,t=this.el;if(!t||0!==t.offsetWidth){e.breakpoints&&this.setBreakpoint();var i=this.allowSlideNext,s=this.allowSlidePrev,a=this.snapGrid;this.allowSlideNext=!0,this.allowSlidePrev=!0,this.updateSize(),this.updateSlides(),this.updateSlidesClasses(),("auto"===e.slidesPerView||e.slidesPerView>1)&&this.isEnd&&!this.params.centeredSlides?this.slideTo(this.slides.length-1,0,!1,!0):this.slideTo(this.activeIndex,0,!1,!0),this.autoplay&&this.autoplay.running&&this.autoplay.paused&&this.autoplay.run(),this.allowSlidePrev=s,this.allowSlideNext=i,this.params.watchOverflow&&a!==this.snapGrid&&this.checkOverflow()}}function B(e){this.allowClick||(this.params.preventClicks&&e.preventDefault(),this.params.preventClicksPropagation&&this.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))}function H(){var e=this.wrapperEl;this.previousTranslate=this.translate,this.translate=this.isHorizontal()?-e.scrollLeft:-e.scrollTop,-0===this.translate&&(this.translate=0),this.updateActiveIndex(),this.updateSlidesClasses();var t=this.maxTranslate()-this.minTranslate();(0===t?0:(this.translate-this.minTranslate())/t)!==this.progress&&this.updateProgress(this.translate),this.emit("setTranslate",this.translate,!1)}var N=!1;function X(){}var V={init:!0,direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,cssMode:!1,preventInteractionOnTransition:!1,edgeSwipeDetection:!1,edgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!1,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0},Y={update:h,translate:p,transition:c,slide:u,loop:v,grabCursor:f,manipulation:L,events:{attachEvents:function(){var t=this.params,i=this.touchEvents,s=this.el,a=this.wrapperEl;this.onTouchStart=D.bind(this),this.onTouchMove=O.bind(this),this.onTouchEnd=A.bind(this),t.cssMode&&(this.onScroll=H.bind(this)),this.onClick=B.bind(this);var r=!!t.nested;if(!o.touch&&o.pointerEvents)s.addEventListener(i.start,this.onTouchStart,!1),e.addEventListener(i.move,this.onTouchMove,r),e.addEventListener(i.end,this.onTouchEnd,!1);else{if(o.touch){var n=!("touchstart"!==i.start||!o.passiveListener||!t.passiveListeners)&&{passive:!0,capture:!1};s.addEventListener(i.start,this.onTouchStart,n),s.addEventListener(i.move,this.onTouchMove,o.passiveListener?{passive:!1,capture:r}:r),s.addEventListener(i.end,this.onTouchEnd,n),i.cancel&&s.addEventListener(i.cancel,this.onTouchEnd,n),N||(e.addEventListener("touchstart",X),N=!0)}(t.simulateTouch&&!I.ios&&!I.android||t.simulateTouch&&!o.touch&&I.ios)&&(s.addEventListener("mousedown",this.onTouchStart,!1),e.addEventListener("mousemove",this.onTouchMove,r),e.addEventListener("mouseup",this.onTouchEnd,!1))}(t.preventClicks||t.preventClicksPropagation)&&s.addEventListener("click",this.onClick,!0),t.cssMode&&a.addEventListener("scroll",this.onScroll),this.on(I.ios||I.android?"resize orientationchange observerUpdate":"resize observerUpdate",G,!0)},detachEvents:function(){var t=this.params,i=this.touchEvents,s=this.el,a=this.wrapperEl,r=!!t.nested;if(!o.touch&&o.pointerEvents)s.removeEventListener(i.start,this.onTouchStart,!1),e.removeEventListener(i.move,this.onTouchMove,r),e.removeEventListener(i.end,this.onTouchEnd,!1);else{if(o.touch){var n=!("onTouchStart"!==i.start||!o.passiveListener||!t.passiveListeners)&&{passive:!0,capture:!1};s.removeEventListener(i.start,this.onTouchStart,n),s.removeEventListener(i.move,this.onTouchMove,r),s.removeEventListener(i.end,this.onTouchEnd,n),i.cancel&&s.removeEventListener(i.cancel,this.onTouchEnd,n)}(t.simulateTouch&&!I.ios&&!I.android||t.simulateTouch&&!o.touch&&I.ios)&&(s.removeEventListener("mousedown",this.onTouchStart,!1),e.removeEventListener("mousemove",this.onTouchMove,r),e.removeEventListener("mouseup",this.onTouchEnd,!1))}(t.preventClicks||t.preventClicksPropagation)&&s.removeEventListener("click",this.onClick,!0),t.cssMode&&a.removeEventListener("scroll",this.onScroll),this.off(I.ios||I.android?"resize orientationchange observerUpdate":"resize observerUpdate",G)}},breakpoints:{setBreakpoint:function(){var e=this.activeIndex,t=this.initialized,i=this.loopedSlides;void 0===i&&(i=0);var s=this.params,a=this.$el,r=s.breakpoints;if(r&&(!r||0!==Object.keys(r).length)){var o=this.getBreakpoint(r);if(o&&this.currentBreakpoint!==o){var l=o in r?r[o]:void 0;l&&["slidesPerView","spaceBetween","slidesPerGroup","slidesPerColumn"].forEach((function(e){var t=l[e];void 0!==t&&(l[e]="slidesPerView"!==e||"AUTO"!==t&&"auto"!==t?"slidesPerView"===e?parseFloat(t):parseInt(t,10):"auto")}));var d=l||this.originalParams,h=s.slidesPerColumn>1,p=d.slidesPerColumn>1;h&&!p?a.removeClass(s.containerModifierClass+"multirow "+s.containerModifierClass+"multirow-column"):!h&&p&&(a.addClass(s.containerModifierClass+"multirow"),"column"===d.slidesPerColumnFill&&a.addClass(s.containerModifierClass+"multirow-column"));var c=d.direction&&d.direction!==s.direction,u=s.loop&&(d.slidesPerView!==s.slidesPerView||c);c&&t&&this.changeDirection(),n.extend(this.params,d),n.extend(this,{allowTouchMove:this.params.allowTouchMove,allowSlideNext:this.params.allowSlideNext,allowSlidePrev:this.params.allowSlidePrev}),this.currentBreakpoint=o,u&&t&&(this.loopDestroy(),this.loopCreate(),this.updateSlides(),this.slideTo(e-i+this.loopedSlides,0,!1)),this.emit("breakpoint",d)}}},getBreakpoint:function(e){if(e){var i=!1,s=[];Object.keys(e).forEach((function(e){s.push(e)})),s.sort((function(e,t){return parseInt(e,10)-parseInt(t,10)}));for(var a=0;a<s.length;a+=1){var r=s[a];r<=t.innerWidth&&(i=r)}return i||"max"}}},checkOverflow:{checkOverflow:function(){var e=this.params,t=this.isLocked,i=this.slides.length>0&&e.slidesOffsetBefore+e.spaceBetween*(this.slides.length-1)+this.slides[0].offsetWidth*this.slides.length;e.slidesOffsetBefore&&e.slidesOffsetAfter&&i?this.isLocked=i<=this.size:this.isLocked=1===this.snapGrid.length,this.allowSlideNext=!this.isLocked,this.allowSlidePrev=!this.isLocked,t!==this.isLocked&&this.emit(this.isLocked?"lock":"unlock"),t&&t!==this.isLocked&&(this.isEnd=!1,this.navigation.update())}},classes:{addClasses:function(){var e=this.classNames,t=this.params,i=this.rtl,s=this.$el,a=[];a.push("initialized"),a.push(t.direction),t.freeMode&&a.push("free-mode"),t.autoHeight&&a.push("autoheight"),i&&a.push("rtl"),t.slidesPerColumn>1&&(a.push("multirow"),"column"===t.slidesPerColumnFill&&a.push("multirow-column")),I.android&&a.push("android"),I.ios&&a.push("ios"),t.cssMode&&a.push("css-mode"),a.forEach((function(i){e.push(t.containerModifierClass+i)})),s.addClass(e.join(" "))},removeClasses:function(){var e=this.$el,t=this.classNames;e.removeClass(t.join(" "))}},images:{loadImage:function(e,i,s,a,r,n){var o;function l(){n&&n()}e.complete&&r?l():i?((o=new t.Image).onload=l,o.onerror=l,a&&(o.sizes=a),s&&(o.srcset=s),i&&(o.src=i)):l()},preloadImages:function(){var e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(var i=0;i<e.imagesToLoad.length;i+=1){var s=e.imagesToLoad[i];e.loadImage(s,s.currentSrc||s.getAttribute("src"),s.srcset||s.getAttribute("srcset"),s.sizes||s.getAttribute("sizes"),!0,t)}}}},F={},W=function(e){function t(){for(var i,a,r,l=[],d=arguments.length;d--;)l[d]=arguments[d];1===l.length&&l[0].constructor&&l[0].constructor===Object?r=l[0]:(a=(i=l)[0],r=i[1]),r||(r={}),r=n.extend({},r),a&&!r.el&&(r.el=a),e.call(this,r),Object.keys(Y).forEach((function(e){Object.keys(Y[e]).forEach((function(i){t.prototype[i]||(t.prototype[i]=Y[e][i])}))}));var h=this;void 0===h.modules&&(h.modules={}),Object.keys(h.modules).forEach((function(e){var t=h.modules[e];if(t.params){var i=Object.keys(t.params)[0],s=t.params[i];if("object"!=typeof s||null===s)return;if(!(i in r&&"enabled"in s))return;!0===r[i]&&(r[i]={enabled:!0}),"object"!=typeof r[i]||"enabled"in r[i]||(r[i].enabled=!0),r[i]||(r[i]={enabled:!1})}}));var p=n.extend({},V);h.useModulesParams(p),h.params=n.extend({},p,F,r),h.originalParams=n.extend({},h.params),h.passedParams=n.extend({},r),h.$=s;var c=s(h.params.el);if(a=c[0]){if(c.length>1){var u=[];return c.each((function(e,i){var s=n.extend({},r,{el:i});u.push(new t(s))})),u}var v,f,m;return a.swiper=h,c.data("swiper",h),a&&a.shadowRoot&&a.shadowRoot.querySelector?(v=s(a.shadowRoot.querySelector("."+h.params.wrapperClass))).children=function(e){return c.children(e)}:v=c.children("."+h.params.wrapperClass),n.extend(h,{$el:c,el:a,$wrapperEl:v,wrapperEl:v[0],classNames:[],slides:s(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:function(){return"horizontal"===h.params.direction},isVertical:function(){return"vertical"===h.params.direction},rtl:"rtl"===a.dir.toLowerCase()||"rtl"===c.css("direction"),rtlTranslate:"horizontal"===h.params.direction&&("rtl"===a.dir.toLowerCase()||"rtl"===c.css("direction")),wrongRTL:"-webkit-box"===v.css("display"),activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:h.params.allowSlideNext,allowSlidePrev:h.params.allowSlidePrev,touchEvents:(f=["touchstart","touchmove","touchend","touchcancel"],m=["mousedown","mousemove","mouseup"],o.pointerEvents&&(m=["pointerdown","pointermove","pointerup"]),h.touchEventsTouch={start:f[0],move:f[1],end:f[2],cancel:f[3]},h.touchEventsDesktop={start:m[0],move:m[1],end:m[2]},o.touch||!h.params.simulateTouch?h.touchEventsTouch:h.touchEventsDesktop),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,formElements:"input, select, option, textarea, button, video",lastClickTime:n.now(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:h.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),h.useModules(),h.params.init&&h.init(),h}}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var i={extendedDefaults:{configurable:!0},defaults:{configurable:!0},Class:{configurable:!0},$:{configurable:!0}};return t.prototype.slidesPerViewDynamic=function(){var e=this.params,t=this.slides,i=this.slidesGrid,s=this.size,a=this.activeIndex,r=1;if(e.centeredSlides){for(var n,o=t[a].swiperSlideSize,l=a+1;l<t.length;l+=1)t[l]&&!n&&(r+=1,(o+=t[l].swiperSlideSize)>s&&(n=!0));for(var d=a-1;d>=0;d-=1)t[d]&&!n&&(r+=1,(o+=t[d].swiperSlideSize)>s&&(n=!0))}else for(var h=a+1;h<t.length;h+=1)i[h]-i[a]<s&&(r+=1);return r},t.prototype.update=function(){var e=this;if(e&&!e.destroyed){var t=e.snapGrid,i=e.params;i.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode?(s(),e.params.autoHeight&&e.updateAutoHeight()):(("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0))||s(),i.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}function s(){var t=e.rtlTranslate?-1*e.translate:e.translate,i=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(i),e.updateActiveIndex(),e.updateSlidesClasses()}},t.prototype.changeDirection=function(e,t){void 0===t&&(t=!0);var i=this.params.direction;return e||(e="horizontal"===i?"vertical":"horizontal"),e===i||"horizontal"!==e&&"vertical"!==e?this:(this.$el.removeClass(""+this.params.containerModifierClass+i).addClass(""+this.params.containerModifierClass+e),this.params.direction=e,this.slides.each((function(t,i){"vertical"===e?i.style.width="":i.style.height=""})),this.emit("changeDirection"),t&&this.update(),this)},t.prototype.init=function(){this.initialized||(this.emit("beforeInit"),this.params.breakpoints&&this.setBreakpoint(),this.addClasses(),this.params.loop&&this.loopCreate(),this.updateSize(),this.updateSlides(),this.params.watchOverflow&&this.checkOverflow(),this.params.grabCursor&&this.setGrabCursor(),this.params.preloadImages&&this.preloadImages(),this.params.loop?this.slideTo(this.params.initialSlide+this.loopedSlides,0,this.params.runCallbacksOnInit):this.slideTo(this.params.initialSlide,0,this.params.runCallbacksOnInit),this.attachEvents(),this.initialized=!0,this.emit("init"))},t.prototype.destroy=function(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);var i=this,s=i.params,a=i.$el,r=i.$wrapperEl,o=i.slides;return void 0===i.params||i.destroyed?null:(i.emit("beforeDestroy"),i.initialized=!1,i.detachEvents(),s.loop&&i.loopDestroy(),t&&(i.removeClasses(),a.removeAttr("style"),r.removeAttr("style"),o&&o.length&&o.removeClass([s.slideVisibleClass,s.slideActiveClass,s.slideNextClass,s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),i.emit("destroy"),Object.keys(i.eventsListeners).forEach((function(e){i.off(e)})),!1!==e&&(i.$el[0].swiper=null,i.$el.data("swiper",null),n.deleteProps(i)),i.destroyed=!0,null)},t.extendDefaults=function(e){n.extend(F,e)},i.extendedDefaults.get=function(){return F},i.defaults.get=function(){return V},i.Class.get=function(){return e},i.$.get=function(){return s},Object.defineProperties(t,i),t}(l),R={name:"device",proto:{device:I},static:{device:I}},q={name:"support",proto:{support:o},static:{support:o}},j={isEdge:!!t.navigator.userAgent.match(/Edge/g),isSafari:function(){var e=t.navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)},K={name:"browser",proto:{browser:j},static:{browser:j}},U={name:"resize",create:function(){var e=this;n.extend(e,{resize:{resizeHandler:function(){e&&!e.destroyed&&e.initialized&&(e.emit("beforeResize"),e.emit("resize"))},orientationChangeHandler:function(){e&&!e.destroyed&&e.initialized&&e.emit("orientationchange")}}})},on:{init:function(){t.addEventListener("resize",this.resize.resizeHandler),t.addEventListener("orientationchange",this.resize.orientationChangeHandler)},destroy:function(){t.removeEventListener("resize",this.resize.resizeHandler),t.removeEventListener("orientationchange",this.resize.orientationChangeHandler)}}},_={func:t.MutationObserver||t.WebkitMutationObserver,attach:function(e,i){void 0===i&&(i={});var s=this,a=new(0,_.func)((function(e){if(1!==e.length){var i=function(){s.emit("observerUpdate",e[0])};t.requestAnimationFrame?t.requestAnimationFrame(i):t.setTimeout(i,0)}else s.emit("observerUpdate",e[0])}));a.observe(e,{attributes:void 0===i.attributes||i.attributes,childList:void 0===i.childList||i.childList,characterData:void 0===i.characterData||i.characterData}),s.observer.observers.push(a)},init:function(){if(o.observer&&this.params.observer){if(this.params.observeParents)for(var e=this.$el.parents(),t=0;t<e.length;t+=1)this.observer.attach(e[t]);this.observer.attach(this.$el[0],{childList:this.params.observeSlideChildren}),this.observer.attach(this.$wrapperEl[0],{attributes:!1})}},destroy:function(){this.observer.observers.forEach((function(e){e.disconnect()})),this.observer.observers=[]}},Z={name:"observer",params:{observer:!1,observeParents:!1,observeSlideChildren:!1},create:function(){n.extend(this,{observer:{init:_.init.bind(this),attach:_.attach.bind(this),destroy:_.destroy.bind(this),observers:[]}})},on:{init:function(){this.observer.init()},destroy:function(){this.observer.destroy()}}},Q={update:function(e){var t=this,i=t.params,s=i.slidesPerView,a=i.slidesPerGroup,r=i.centeredSlides,o=t.params.virtual,l=o.addSlidesBefore,d=o.addSlidesAfter,h=t.virtual,p=h.from,c=h.to,u=h.slides,v=h.slidesGrid,f=h.renderSlide,m=h.offset;t.updateActiveIndex();var g,b,w,y=t.activeIndex||0;g=t.rtlTranslate?"right":t.isHorizontal()?"left":"top",r?(b=Math.floor(s/2)+a+l,w=Math.floor(s/2)+a+d):(b=s+(a-1)+l,w=a+d);var x=Math.max((y||0)-w,0),T=Math.min((y||0)+b,u.length-1),E=(t.slidesGrid[x]||0)-(t.slidesGrid[0]||0);function C(){t.updateSlides(),t.updateProgress(),t.updateSlidesClasses(),t.lazy&&t.params.lazy.enabled&&t.lazy.load()}if(n.extend(t.virtual,{from:x,to:T,offset:E,slidesGrid:t.slidesGrid}),p===x&&c===T&&!e)return t.slidesGrid!==v&&E!==m&&t.slides.css(g,E+"px"),void t.updateProgress();if(t.params.virtual.renderExternal)return t.params.virtual.renderExternal.call(t,{offset:E,from:x,to:T,slides:function(){for(var e=[],t=x;t<=T;t+=1)e.push(u[t]);return e}()}),void C();var S=[],M=[];if(e)t.$wrapperEl.find("."+t.params.slideClass).remove();else for(var P=p;P<=c;P+=1)(P<x||P>T)&&t.$wrapperEl.find("."+t.params.slideClass+'[data-swiper-slide-index="'+P+'"]').remove();for(var z=0;z<u.length;z+=1)z>=x&&z<=T&&(void 0===c||e?M.push(z):(z>c&&M.push(z),z<p&&S.push(z)));M.forEach((function(e){t.$wrapperEl.append(f(u[e],e))})),S.sort((function(e,t){return t-e})).forEach((function(e){t.$wrapperEl.prepend(f(u[e],e))})),t.$wrapperEl.children(".swiper-slide").css(g,E+"px"),C()},renderSlide:function(e,t){var i=this.params.virtual;if(i.cache&&this.virtual.cache[t])return this.virtual.cache[t];var a=i.renderSlide?s(i.renderSlide.call(this,e,t)):s('<div class="'+this.params.slideClass+'" data-swiper-slide-index="'+t+'">'+e+"</div>");return a.attr("data-swiper-slide-index")||a.attr("data-swiper-slide-index",t),i.cache&&(this.virtual.cache[t]=a),a},appendSlide:function(e){if("object"==typeof e&&"length"in e)for(var t=0;t<e.length;t+=1)e[t]&&this.virtual.slides.push(e[t]);else this.virtual.slides.push(e);this.virtual.update(!0)},prependSlide:function(e){var t=this.activeIndex,i=t+1,s=1;if(Array.isArray(e)){for(var a=0;a<e.length;a+=1)e[a]&&this.virtual.slides.unshift(e[a]);i=t+e.length,s=e.length}else this.virtual.slides.unshift(e);if(this.params.virtual.cache){var r=this.virtual.cache,n={};Object.keys(r).forEach((function(e){var t=r[e],i=t.attr("data-swiper-slide-index");i&&t.attr("data-swiper-slide-index",parseInt(i,10)+1),n[parseInt(e,10)+s]=t})),this.virtual.cache=n}this.virtual.update(!0),this.slideTo(i,0)},removeSlide:function(e){if(null!=e){var t=this.activeIndex;if(Array.isArray(e))for(var i=e.length-1;i>=0;i-=1)this.virtual.slides.splice(e[i],1),this.params.virtual.cache&&delete this.virtual.cache[e[i]],e[i]<t&&(t-=1),t=Math.max(t,0);else this.virtual.slides.splice(e,1),this.params.virtual.cache&&delete this.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);this.virtual.update(!0),this.slideTo(t,0)}},removeAllSlides:function(){this.virtual.slides=[],this.params.virtual.cache&&(this.virtual.cache={}),this.virtual.update(!0),this.slideTo(0,0)}},J={name:"virtual",params:{virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,addSlidesBefore:0,addSlidesAfter:0}},create:function(){n.extend(this,{virtual:{update:Q.update.bind(this),appendSlide:Q.appendSlide.bind(this),prependSlide:Q.prependSlide.bind(this),removeSlide:Q.removeSlide.bind(this),removeAllSlides:Q.removeAllSlides.bind(this),renderSlide:Q.renderSlide.bind(this),slides:this.params.virtual.slides,cache:{}}})},on:{beforeInit:function(){if(this.params.virtual.enabled){this.classNames.push(this.params.containerModifierClass+"virtual");var e={watchSlidesProgress:!0};n.extend(this.params,e),n.extend(this.originalParams,e),this.params.initialSlide||this.virtual.update()}},setTranslate:function(){this.params.virtual.enabled&&this.virtual.update()}}},ee={handle:function(i){var s=this.rtlTranslate,a=i;a.originalEvent&&(a=a.originalEvent);var r=a.keyCode||a.charCode;if(!this.allowSlideNext&&(this.isHorizontal()&&39===r||this.isVertical()&&40===r||34===r))return!1;if(!this.allowSlidePrev&&(this.isHorizontal()&&37===r||this.isVertical()&&38===r||33===r))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||e.activeElement&&e.activeElement.nodeName&&("input"===e.activeElement.nodeName.toLowerCase()||"textarea"===e.activeElement.nodeName.toLowerCase()))){if(this.params.keyboard.onlyInViewport&&(33===r||34===r||37===r||39===r||38===r||40===r)){var n=!1;if(this.$el.parents("."+this.params.slideClass).length>0&&0===this.$el.parents("."+this.params.slideActiveClass).length)return;var o=t.innerWidth,l=t.innerHeight,d=this.$el.offset();s&&(d.left-=this.$el[0].scrollLeft);for(var h=[[d.left,d.top],[d.left+this.width,d.top],[d.left,d.top+this.height],[d.left+this.width,d.top+this.height]],p=0;p<h.length;p+=1){var c=h[p];c[0]>=0&&c[0]<=o&&c[1]>=0&&c[1]<=l&&(n=!0)}if(!n)return}this.isHorizontal()?(33!==r&&34!==r&&37!==r&&39!==r||(a.preventDefault?a.preventDefault():a.returnValue=!1),(34!==r&&39!==r||s)&&(33!==r&&37!==r||!s)||this.slideNext(),(33!==r&&37!==r||s)&&(34!==r&&39!==r||!s)||this.slidePrev()):(33!==r&&34!==r&&38!==r&&40!==r||(a.preventDefault?a.preventDefault():a.returnValue=!1),34!==r&&40!==r||this.slideNext(),33!==r&&38!==r||this.slidePrev()),this.emit("keyPress",r)}},enable:function(){this.keyboard.enabled||(s(e).on("keydown",this.keyboard.handle),this.keyboard.enabled=!0)},disable:function(){this.keyboard.enabled&&(s(e).off("keydown",this.keyboard.handle),this.keyboard.enabled=!1)}},te={name:"keyboard",params:{keyboard:{enabled:!1,onlyInViewport:!0}},create:function(){n.extend(this,{keyboard:{enabled:!1,enable:ee.enable.bind(this),disable:ee.disable.bind(this),handle:ee.handle.bind(this)}})},on:{init:function(){this.params.keyboard.enabled&&this.keyboard.enable()},destroy:function(){this.keyboard.enabled&&this.keyboard.disable()}}};var ie={lastScrollTime:n.now(),lastEventBeforeSnap:void 0,recentWheelEvents:[],event:function(){return t.navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":function(){var t="onwheel"in e;if(!t){var i=e.createElement("div");i.setAttribute("onwheel","return;"),t="function"==typeof i.onwheel}return!t&&e.implementation&&e.implementation.hasFeature&&!0!==e.implementation.hasFeature("","")&&(t=e.implementation.hasFeature("Events.wheel","3.0")),t}()?"wheel":"mousewheel"},normalize:function(e){var t=0,i=0,s=0,a=0;return"detail"in e&&(i=e.detail),"wheelDelta"in e&&(i=-e.wheelDelta/120),"wheelDeltaY"in e&&(i=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=i,i=0),s=10*t,a=10*i,"deltaY"in e&&(a=e.deltaY),"deltaX"in e&&(s=e.deltaX),e.shiftKey&&!s&&(s=a,a=0),(s||a)&&e.deltaMode&&(1===e.deltaMode?(s*=40,a*=40):(s*=800,a*=800)),s&&!t&&(t=s<1?-1:1),a&&!i&&(i=a<1?-1:1),{spinX:t,spinY:i,pixelX:s,pixelY:a}},handleMouseEnter:function(){this.mouseEntered=!0},handleMouseLeave:function(){this.mouseEntered=!1},handle:function(e){var i=e,s=this,a=s.params.mousewheel;if(s.params.cssMode&&i.preventDefault(),!s.mouseEntered&&!a.releaseOnEdges)return!0;i.originalEvent&&(i=i.originalEvent);var r=0,o=s.rtlTranslate?-1:1,l=ie.normalize(i);if(a.forceToAxis)if(s.isHorizontal()){if(!(Math.abs(l.pixelX)>Math.abs(l.pixelY)))return!0;r=l.pixelX*o}else{if(!(Math.abs(l.pixelY)>Math.abs(l.pixelX)))return!0;r=l.pixelY}else r=Math.abs(l.pixelX)>Math.abs(l.pixelY)?-l.pixelX*o:-l.pixelY;if(0===r)return!0;if(a.invert&&(r=-r),s.params.freeMode){var d={time:n.now(),delta:Math.abs(r),direction:Math.sign(r)},h=s.mousewheel.lastEventBeforeSnap,p=h&&d.time<h.time+500&&d.delta<=h.delta&&d.direction===h.direction;if(!p){s.mousewheel.lastEventBeforeSnap=void 0,s.params.loop&&s.loopFix();var c=s.getTranslate()+r*a.sensitivity,u=s.isBeginning,v=s.isEnd;if(c>=s.minTranslate()&&(c=s.minTranslate()),c<=s.maxTranslate()&&(c=s.maxTranslate()),s.setTransition(0),s.setTranslate(c),s.updateProgress(),s.updateActiveIndex(),s.updateSlidesClasses(),(!u&&s.isBeginning||!v&&s.isEnd)&&s.updateSlidesClasses(),s.params.freeModeSticky){clearTimeout(s.mousewheel.timeout),s.mousewheel.timeout=void 0;var f=s.mousewheel.recentWheelEvents;f.length>=15&&f.shift();var m=f.length?f[f.length-1]:void 0,g=f[0];if(f.push(d),m&&(d.delta>m.delta||d.direction!==m.direction))f.splice(0);else if(f.length>=15&&d.time-g.time<500&&g.delta-d.delta>=1&&d.delta<=6){var b=r>0?.8:.2;s.mousewheel.lastEventBeforeSnap=d,f.splice(0),s.mousewheel.timeout=n.nextTick((function(){s.slideToClosest(s.params.speed,!0,void 0,b)}),0)}s.mousewheel.timeout||(s.mousewheel.timeout=n.nextTick((function(){s.mousewheel.lastEventBeforeSnap=d,f.splice(0),s.slideToClosest(s.params.speed,!0,void 0,.5)}),500))}if(p||s.emit("scroll",i),s.params.autoplay&&s.params.autoplayDisableOnInteraction&&s.autoplay.stop(),c===s.minTranslate()||c===s.maxTranslate())return!0}}else{if(n.now()-s.mousewheel.lastScrollTime>60)if(r<0)if(s.isEnd&&!s.params.loop||s.animating){if(a.releaseOnEdges)return!0}else s.slideNext(),s.emit("scroll",i);else if(s.isBeginning&&!s.params.loop||s.animating){if(a.releaseOnEdges)return!0}else s.slidePrev(),s.emit("scroll",i);s.mousewheel.lastScrollTime=(new t.Date).getTime()}return i.preventDefault?i.preventDefault():i.returnValue=!1,!1},enable:function(){var e=ie.event();if(this.params.cssMode)return this.wrapperEl.removeEventListener(e,this.mousewheel.handle),!0;if(!e)return!1;if(this.mousewheel.enabled)return!1;var t=this.$el;return"container"!==this.params.mousewheel.eventsTarged&&(t=s(this.params.mousewheel.eventsTarged)),t.on("mouseenter",this.mousewheel.handleMouseEnter),t.on("mouseleave",this.mousewheel.handleMouseLeave),t.on(e,this.mousewheel.handle),this.mousewheel.enabled=!0,!0},disable:function(){var e=ie.event();if(this.params.cssMode)return this.wrapperEl.addEventListener(e,this.mousewheel.handle),!0;if(!e)return!1;if(!this.mousewheel.enabled)return!1;var t=this.$el;return"container"!==this.params.mousewheel.eventsTarged&&(t=s(this.params.mousewheel.eventsTarged)),t.off(e,this.mousewheel.handle),this.mousewheel.enabled=!1,!0}},se={update:function(){var e=this.params.navigation;if(!this.params.loop){var t=this.navigation,i=t.$nextEl,s=t.$prevEl;s&&s.length>0&&(this.isBeginning?s.addClass(e.disabledClass):s.removeClass(e.disabledClass),s[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](e.lockClass)),i&&i.length>0&&(this.isEnd?i.addClass(e.disabledClass):i.removeClass(e.disabledClass),i[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](e.lockClass))}},onPrevClick:function(e){e.preventDefault(),this.isBeginning&&!this.params.loop||this.slidePrev()},onNextClick:function(e){e.preventDefault(),this.isEnd&&!this.params.loop||this.slideNext()},init:function(){var e,t,i=this.params.navigation;(i.nextEl||i.prevEl)&&(i.nextEl&&(e=s(i.nextEl),this.params.uniqueNavElements&&"string"==typeof i.nextEl&&e.length>1&&1===this.$el.find(i.nextEl).length&&(e=this.$el.find(i.nextEl))),i.prevEl&&(t=s(i.prevEl),this.params.uniqueNavElements&&"string"==typeof i.prevEl&&t.length>1&&1===this.$el.find(i.prevEl).length&&(t=this.$el.find(i.prevEl))),e&&e.length>0&&e.on("click",this.navigation.onNextClick),t&&t.length>0&&t.on("click",this.navigation.onPrevClick),n.extend(this.navigation,{$nextEl:e,nextEl:e&&e[0],$prevEl:t,prevEl:t&&t[0]}))},destroy:function(){var e=this.navigation,t=e.$nextEl,i=e.$prevEl;t&&t.length&&(t.off("click",this.navigation.onNextClick),t.removeClass(this.params.navigation.disabledClass)),i&&i.length&&(i.off("click",this.navigation.onPrevClick),i.removeClass(this.params.navigation.disabledClass))}},ae={update:function(){var e=this.rtl,t=this.params.pagination;if(t.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var i,a=this.virtual&&this.params.virtual.enabled?this.virtual.slides.length:this.slides.length,r=this.pagination.$el,n=this.params.loop?Math.ceil((a-2*this.loopedSlides)/this.params.slidesPerGroup):this.snapGrid.length;if(this.params.loop?((i=Math.ceil((this.activeIndex-this.loopedSlides)/this.params.slidesPerGroup))>a-1-2*this.loopedSlides&&(i-=a-2*this.loopedSlides),i>n-1&&(i-=n),i<0&&"bullets"!==this.params.paginationType&&(i=n+i)):i=void 0!==this.snapIndex?this.snapIndex:this.activeIndex||0,"bullets"===t.type&&this.pagination.bullets&&this.pagination.bullets.length>0){var o,l,d,h=this.pagination.bullets;if(t.dynamicBullets&&(this.pagination.bulletSize=h.eq(0)[this.isHorizontal()?"outerWidth":"outerHeight"](!0),r.css(this.isHorizontal()?"width":"height",this.pagination.bulletSize*(t.dynamicMainBullets+4)+"px"),t.dynamicMainBullets>1&&void 0!==this.previousIndex&&(this.pagination.dynamicBulletIndex+=i-this.previousIndex,this.pagination.dynamicBulletIndex>t.dynamicMainBullets-1?this.pagination.dynamicBulletIndex=t.dynamicMainBullets-1:this.pagination.dynamicBulletIndex<0&&(this.pagination.dynamicBulletIndex=0)),o=i-this.pagination.dynamicBulletIndex,d=((l=o+(Math.min(h.length,t.dynamicMainBullets)-1))+o)/2),h.removeClass(t.bulletActiveClass+" "+t.bulletActiveClass+"-next "+t.bulletActiveClass+"-next-next "+t.bulletActiveClass+"-prev "+t.bulletActiveClass+"-prev-prev "+t.bulletActiveClass+"-main"),r.length>1)h.each((function(e,a){var r=s(a),n=r.index();n===i&&r.addClass(t.bulletActiveClass),t.dynamicBullets&&(n>=o&&n<=l&&r.addClass(t.bulletActiveClass+"-main"),n===o&&r.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),n===l&&r.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next"))}));else{var p=h.eq(i),c=p.index();if(p.addClass(t.bulletActiveClass),t.dynamicBullets){for(var u=h.eq(o),v=h.eq(l),f=o;f<=l;f+=1)h.eq(f).addClass(t.bulletActiveClass+"-main");if(this.params.loop)if(c>=h.length-t.dynamicMainBullets){for(var m=t.dynamicMainBullets;m>=0;m-=1)h.eq(h.length-m).addClass(t.bulletActiveClass+"-main");h.eq(h.length-t.dynamicMainBullets-1).addClass(t.bulletActiveClass+"-prev")}else u.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),v.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next");else u.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),v.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next")}}if(t.dynamicBullets){var g=Math.min(h.length,t.dynamicMainBullets+4),b=(this.pagination.bulletSize*g-this.pagination.bulletSize)/2-d*this.pagination.bulletSize,w=e?"right":"left";h.css(this.isHorizontal()?w:"top",b+"px")}}if("fraction"===t.type&&(r.find("."+t.currentClass).text(t.formatFractionCurrent(i+1)),r.find("."+t.totalClass).text(t.formatFractionTotal(n))),"progressbar"===t.type){var y;y=t.progressbarOpposite?this.isHorizontal()?"vertical":"horizontal":this.isHorizontal()?"horizontal":"vertical";var x=(i+1)/n,T=1,E=1;"horizontal"===y?T=x:E=x,r.find("."+t.progressbarFillClass).transform("translate3d(0,0,0) scaleX("+T+") scaleY("+E+")").transition(this.params.speed)}"custom"===t.type&&t.renderCustom?(r.html(t.renderCustom(this,i+1,n)),this.emit("paginationRender",this,r[0])):this.emit("paginationUpdate",this,r[0]),r[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](t.lockClass)}},render:function(){var e=this.params.pagination;if(e.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var t=this.virtual&&this.params.virtual.enabled?this.virtual.slides.length:this.slides.length,i=this.pagination.$el,s="";if("bullets"===e.type){for(var a=this.params.loop?Math.ceil((t-2*this.loopedSlides)/this.params.slidesPerGroup):this.snapGrid.length,r=0;r<a;r+=1)e.renderBullet?s+=e.renderBullet.call(this,r,e.bulletClass):s+="<"+e.bulletElement+' class="'+e.bulletClass+'"></'+e.bulletElement+">";i.html(s),this.pagination.bullets=i.find("."+e.bulletClass)}"fraction"===e.type&&(s=e.renderFraction?e.renderFraction.call(this,e.currentClass,e.totalClass):'<span class="'+e.currentClass+'"></span> / <span class="'+e.totalClass+'"></span>',i.html(s)),"progressbar"===e.type&&(s=e.renderProgressbar?e.renderProgressbar.call(this,e.progressbarFillClass):'<span class="'+e.progressbarFillClass+'"></span>',i.html(s)),"custom"!==e.type&&this.emit("paginationRender",this.pagination.$el[0])}},init:function(){var e=this,t=e.params.pagination;if(t.el){var i=s(t.el);0!==i.length&&(e.params.uniqueNavElements&&"string"==typeof t.el&&i.length>1&&1===e.$el.find(t.el).length&&(i=e.$el.find(t.el)),"bullets"===t.type&&t.clickable&&i.addClass(t.clickableClass),i.addClass(t.modifierClass+t.type),"bullets"===t.type&&t.dynamicBullets&&(i.addClass(""+t.modifierClass+t.type+"-dynamic"),e.pagination.dynamicBulletIndex=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&i.addClass(t.progressbarOppositeClass),t.clickable&&i.on("click","."+t.bulletClass,(function(t){t.preventDefault();var i=s(this).index()*e.params.slidesPerGroup;e.params.loop&&(i+=e.loopedSlides),e.slideTo(i)})),n.extend(e.pagination,{$el:i,el:i[0]}))}},destroy:function(){var e=this.params.pagination;if(e.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var t=this.pagination.$el;t.removeClass(e.hiddenClass),t.removeClass(e.modifierClass+e.type),this.pagination.bullets&&this.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&t.off("click","."+e.bulletClass)}}},re={setTranslate:function(){if(this.params.scrollbar.el&&this.scrollbar.el){var e=this.scrollbar,t=this.rtlTranslate,i=this.progress,s=e.dragSize,a=e.trackSize,r=e.$dragEl,n=e.$el,o=this.params.scrollbar,l=s,d=(a-s)*i;t?(d=-d)>0?(l=s-d,d=0):-d+s>a&&(l=a+d):d<0?(l=s+d,d=0):d+s>a&&(l=a-d),this.isHorizontal()?(r.transform("translate3d("+d+"px, 0, 0)"),r[0].style.width=l+"px"):(r.transform("translate3d(0px, "+d+"px, 0)"),r[0].style.height=l+"px"),o.hide&&(clearTimeout(this.scrollbar.timeout),n[0].style.opacity=1,this.scrollbar.timeout=setTimeout((function(){n[0].style.opacity=0,n.transition(400)}),1e3))}},setTransition:function(e){this.params.scrollbar.el&&this.scrollbar.el&&this.scrollbar.$dragEl.transition(e)},updateSize:function(){if(this.params.scrollbar.el&&this.scrollbar.el){var e=this.scrollbar,t=e.$dragEl,i=e.$el;t[0].style.width="",t[0].style.height="";var s,a=this.isHorizontal()?i[0].offsetWidth:i[0].offsetHeight,r=this.size/this.virtualSize,o=r*(a/this.size);s="auto"===this.params.scrollbar.dragSize?a*r:parseInt(this.params.scrollbar.dragSize,10),this.isHorizontal()?t[0].style.width=s+"px":t[0].style.height=s+"px",i[0].style.display=r>=1?"none":"",this.params.scrollbar.hide&&(i[0].style.opacity=0),n.extend(e,{trackSize:a,divider:r,moveDivider:o,dragSize:s}),e.$el[this.params.watchOverflow&&this.isLocked?"addClass":"removeClass"](this.params.scrollbar.lockClass)}},getPointerPosition:function(e){return this.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientX:e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientY:e.clientY},setDragPosition:function(e){var t,i=this.scrollbar,s=this.rtlTranslate,a=i.$el,r=i.dragSize,n=i.trackSize,o=i.dragStartPos;t=(i.getPointerPosition(e)-a.offset()[this.isHorizontal()?"left":"top"]-(null!==o?o:r/2))/(n-r),t=Math.max(Math.min(t,1),0),s&&(t=1-t);var l=this.minTranslate()+(this.maxTranslate()-this.minTranslate())*t;this.updateProgress(l),this.setTranslate(l),this.updateActiveIndex(),this.updateSlidesClasses()},onDragStart:function(e){var t=this.params.scrollbar,i=this.scrollbar,s=this.$wrapperEl,a=i.$el,r=i.$dragEl;this.scrollbar.isTouched=!0,this.scrollbar.dragStartPos=e.target===r[0]||e.target===r?i.getPointerPosition(e)-e.target.getBoundingClientRect()[this.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),s.transition(100),r.transition(100),i.setDragPosition(e),clearTimeout(this.scrollbar.dragTimeout),a.transition(0),t.hide&&a.css("opacity",1),this.params.cssMode&&this.$wrapperEl.css("scroll-snap-type","none"),this.emit("scrollbarDragStart",e)},onDragMove:function(e){var t=this.scrollbar,i=this.$wrapperEl,s=t.$el,a=t.$dragEl;this.scrollbar.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,t.setDragPosition(e),i.transition(0),s.transition(0),a.transition(0),this.emit("scrollbarDragMove",e))},onDragEnd:function(e){var t=this.params.scrollbar,i=this.scrollbar,s=this.$wrapperEl,a=i.$el;this.scrollbar.isTouched&&(this.scrollbar.isTouched=!1,this.params.cssMode&&(this.$wrapperEl.css("scroll-snap-type",""),s.transition("")),t.hide&&(clearTimeout(this.scrollbar.dragTimeout),this.scrollbar.dragTimeout=n.nextTick((function(){a.css("opacity",0),a.transition(400)}),1e3)),this.emit("scrollbarDragEnd",e),t.snapOnRelease&&this.slideToClosest())},enableDraggable:function(){if(this.params.scrollbar.el){var t=this.scrollbar,i=this.touchEventsTouch,s=this.touchEventsDesktop,a=this.params,r=t.$el[0],n=!(!o.passiveListener||!a.passiveListeners)&&{passive:!1,capture:!1},l=!(!o.passiveListener||!a.passiveListeners)&&{passive:!0,capture:!1};o.touch?(r.addEventListener(i.start,this.scrollbar.onDragStart,n),r.addEventListener(i.move,this.scrollbar.onDragMove,n),r.addEventListener(i.end,this.scrollbar.onDragEnd,l)):(r.addEventListener(s.start,this.scrollbar.onDragStart,n),e.addEventListener(s.move,this.scrollbar.onDragMove,n),e.addEventListener(s.end,this.scrollbar.onDragEnd,l))}},disableDraggable:function(){if(this.params.scrollbar.el){var t=this.scrollbar,i=this.touchEventsTouch,s=this.touchEventsDesktop,a=this.params,r=t.$el[0],n=!(!o.passiveListener||!a.passiveListeners)&&{passive:!1,capture:!1},l=!(!o.passiveListener||!a.passiveListeners)&&{passive:!0,capture:!1};o.touch?(r.removeEventListener(i.start,this.scrollbar.onDragStart,n),r.removeEventListener(i.move,this.scrollbar.onDragMove,n),r.removeEventListener(i.end,this.scrollbar.onDragEnd,l)):(r.removeEventListener(s.start,this.scrollbar.onDragStart,n),e.removeEventListener(s.move,this.scrollbar.onDragMove,n),e.removeEventListener(s.end,this.scrollbar.onDragEnd,l))}},init:function(){if(this.params.scrollbar.el){var e=this.scrollbar,t=this.$el,i=this.params.scrollbar,a=s(i.el);this.params.uniqueNavElements&&"string"==typeof i.el&&a.length>1&&1===t.find(i.el).length&&(a=t.find(i.el));var r=a.find("."+this.params.scrollbar.dragClass);0===r.length&&(r=s('<div class="'+this.params.scrollbar.dragClass+'"></div>'),a.append(r)),n.extend(e,{$el:a,el:a[0],$dragEl:r,dragEl:r[0]}),i.draggable&&e.enableDraggable()}},destroy:function(){this.scrollbar.disableDraggable()}},ne={setTransform:function(e,t){var i=this.rtl,a=s(e),r=i?-1:1,n=a.attr("data-swiper-parallax")||"0",o=a.attr("data-swiper-parallax-x"),l=a.attr("data-swiper-parallax-y"),d=a.attr("data-swiper-parallax-scale"),h=a.attr("data-swiper-parallax-opacity");if(o||l?(o=o||"0",l=l||"0"):this.isHorizontal()?(o=n,l="0"):(l=n,o="0"),o=o.indexOf("%")>=0?parseInt(o,10)*t*r+"%":o*t*r+"px",l=l.indexOf("%")>=0?parseInt(l,10)*t+"%":l*t+"px",null!=h){var p=h-(h-1)*(1-Math.abs(t));a[0].style.opacity=p}if(null==d)a.transform("translate3d("+o+", "+l+", 0px)");else{var c=d-(d-1)*(1-Math.abs(t));a.transform("translate3d("+o+", "+l+", 0px) scale("+c+")")}},setTranslate:function(){var e=this,t=e.$el,i=e.slides,a=e.progress,r=e.snapGrid;t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t,i){e.parallax.setTransform(i,a)})),i.each((function(t,i){var n=i.progress;e.params.slidesPerGroup>1&&"auto"!==e.params.slidesPerView&&(n+=Math.ceil(t/2)-a*(r.length-1)),n=Math.min(Math.max(n,-1),1),s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t,i){e.parallax.setTransform(i,n)}))}))},setTransition:function(e){void 0===e&&(e=this.params.speed);this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t,i){var a=s(i),r=parseInt(a.attr("data-swiper-parallax-duration"),10)||e;0===e&&(r=0),a.transition(r)}))}},oe={getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var t=e.targetTouches[0].pageX,i=e.targetTouches[0].pageY,s=e.targetTouches[1].pageX,a=e.targetTouches[1].pageY;return Math.sqrt(Math.pow(s-t,2)+Math.pow(a-i,2))},onGestureStart:function(e){var t=this.params.zoom,i=this.zoom,a=i.gesture;if(i.fakeGestureTouched=!1,i.fakeGestureMoved=!1,!o.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;i.fakeGestureTouched=!0,a.scaleStart=oe.getDistanceBetweenTouches(e)}a.$slideEl&&a.$slideEl.length||(a.$slideEl=s(e.target).closest(".swiper-slide"),0===a.$slideEl.length&&(a.$slideEl=this.slides.eq(this.activeIndex)),a.$imageEl=a.$slideEl.find("img, svg, canvas"),a.$imageWrapEl=a.$imageEl.parent("."+t.containerClass),a.maxRatio=a.$imageWrapEl.attr("data-swiper-zoom")||t.maxRatio,0!==a.$imageWrapEl.length)?(a.$imageEl.transition(0),this.zoom.isScaling=!0):a.$imageEl=void 0},onGestureChange:function(e){var t=this.params.zoom,i=this.zoom,s=i.gesture;if(!o.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;i.fakeGestureMoved=!0,s.scaleMove=oe.getDistanceBetweenTouches(e)}s.$imageEl&&0!==s.$imageEl.length&&(o.gestures?i.scale=e.scale*i.currentScale:i.scale=s.scaleMove/s.scaleStart*i.currentScale,i.scale>s.maxRatio&&(i.scale=s.maxRatio-1+Math.pow(i.scale-s.maxRatio+1,.5)),i.scale<t.minRatio&&(i.scale=t.minRatio+1-Math.pow(t.minRatio-i.scale+1,.5)),s.$imageEl.transform("translate3d(0,0,0) scale("+i.scale+")"))},onGestureEnd:function(e){var t=this.params.zoom,i=this.zoom,s=i.gesture;if(!o.gestures){if(!i.fakeGestureTouched||!i.fakeGestureMoved)return;if("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2&&!I.android)return;i.fakeGestureTouched=!1,i.fakeGestureMoved=!1}s.$imageEl&&0!==s.$imageEl.length&&(i.scale=Math.max(Math.min(i.scale,s.maxRatio),t.minRatio),s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale("+i.scale+")"),i.currentScale=i.scale,i.isScaling=!1,1===i.scale&&(s.$slideEl=void 0))},onTouchStart:function(e){var t=this.zoom,i=t.gesture,s=t.image;i.$imageEl&&0!==i.$imageEl.length&&(s.isTouched||(I.android&&e.preventDefault(),s.isTouched=!0,s.touchesStart.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,s.touchesStart.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))},onTouchMove:function(e){var t=this.zoom,i=t.gesture,s=t.image,a=t.velocity;if(i.$imageEl&&0!==i.$imageEl.length&&(this.allowClick=!1,s.isTouched&&i.$slideEl)){s.isMoved||(s.width=i.$imageEl[0].offsetWidth,s.height=i.$imageEl[0].offsetHeight,s.startX=n.getTranslate(i.$imageWrapEl[0],"x")||0,s.startY=n.getTranslate(i.$imageWrapEl[0],"y")||0,i.slideWidth=i.$slideEl[0].offsetWidth,i.slideHeight=i.$slideEl[0].offsetHeight,i.$imageWrapEl.transition(0),this.rtl&&(s.startX=-s.startX,s.startY=-s.startY));var r=s.width*t.scale,o=s.height*t.scale;if(!(r<i.slideWidth&&o<i.slideHeight)){if(s.minX=Math.min(i.slideWidth/2-r/2,0),s.maxX=-s.minX,s.minY=Math.min(i.slideHeight/2-o/2,0),s.maxY=-s.minY,s.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,s.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!s.isMoved&&!t.isScaling){if(this.isHorizontal()&&(Math.floor(s.minX)===Math.floor(s.startX)&&s.touchesCurrent.x<s.touchesStart.x||Math.floor(s.maxX)===Math.floor(s.startX)&&s.touchesCurrent.x>s.touchesStart.x))return void(s.isTouched=!1);if(!this.isHorizontal()&&(Math.floor(s.minY)===Math.floor(s.startY)&&s.touchesCurrent.y<s.touchesStart.y||Math.floor(s.maxY)===Math.floor(s.startY)&&s.touchesCurrent.y>s.touchesStart.y))return void(s.isTouched=!1)}e.preventDefault(),e.stopPropagation(),s.isMoved=!0,s.currentX=s.touchesCurrent.x-s.touchesStart.x+s.startX,s.currentY=s.touchesCurrent.y-s.touchesStart.y+s.startY,s.currentX<s.minX&&(s.currentX=s.minX+1-Math.pow(s.minX-s.currentX+1,.8)),s.currentX>s.maxX&&(s.currentX=s.maxX-1+Math.pow(s.currentX-s.maxX+1,.8)),s.currentY<s.minY&&(s.currentY=s.minY+1-Math.pow(s.minY-s.currentY+1,.8)),s.currentY>s.maxY&&(s.currentY=s.maxY-1+Math.pow(s.currentY-s.maxY+1,.8)),a.prevPositionX||(a.prevPositionX=s.touchesCurrent.x),a.prevPositionY||(a.prevPositionY=s.touchesCurrent.y),a.prevTime||(a.prevTime=Date.now()),a.x=(s.touchesCurrent.x-a.prevPositionX)/(Date.now()-a.prevTime)/2,a.y=(s.touchesCurrent.y-a.prevPositionY)/(Date.now()-a.prevTime)/2,Math.abs(s.touchesCurrent.x-a.prevPositionX)<2&&(a.x=0),Math.abs(s.touchesCurrent.y-a.prevPositionY)<2&&(a.y=0),a.prevPositionX=s.touchesCurrent.x,a.prevPositionY=s.touchesCurrent.y,a.prevTime=Date.now(),i.$imageWrapEl.transform("translate3d("+s.currentX+"px, "+s.currentY+"px,0)")}}},onTouchEnd:function(){var e=this.zoom,t=e.gesture,i=e.image,s=e.velocity;if(t.$imageEl&&0!==t.$imageEl.length){if(!i.isTouched||!i.isMoved)return i.isTouched=!1,void(i.isMoved=!1);i.isTouched=!1,i.isMoved=!1;var a=300,r=300,n=s.x*a,o=i.currentX+n,l=s.y*r,d=i.currentY+l;0!==s.x&&(a=Math.abs((o-i.currentX)/s.x)),0!==s.y&&(r=Math.abs((d-i.currentY)/s.y));var h=Math.max(a,r);i.currentX=o,i.currentY=d;var p=i.width*e.scale,c=i.height*e.scale;i.minX=Math.min(t.slideWidth/2-p/2,0),i.maxX=-i.minX,i.minY=Math.min(t.slideHeight/2-c/2,0),i.maxY=-i.minY,i.currentX=Math.max(Math.min(i.currentX,i.maxX),i.minX),i.currentY=Math.max(Math.min(i.currentY,i.maxY),i.minY),t.$imageWrapEl.transition(h).transform("translate3d("+i.currentX+"px, "+i.currentY+"px,0)")}},onTransitionEnd:function(){var e=this.zoom,t=e.gesture;t.$slideEl&&this.previousIndex!==this.activeIndex&&(t.$imageEl.transform("translate3d(0,0,0) scale(1)"),t.$imageWrapEl.transform("translate3d(0,0,0)"),e.scale=1,e.currentScale=1,t.$slideEl=void 0,t.$imageEl=void 0,t.$imageWrapEl=void 0)},toggle:function(e){var t=this.zoom;t.scale&&1!==t.scale?t.out():t.in(e)},in:function(e){var t,i,a,r,n,o,l,d,h,p,c,u,v,f,m,g,b=this.zoom,w=this.params.zoom,y=b.gesture,x=b.image;(y.$slideEl||(y.$slideEl=this.clickedSlide?s(this.clickedSlide):this.slides.eq(this.activeIndex),y.$imageEl=y.$slideEl.find("img, svg, canvas"),y.$imageWrapEl=y.$imageEl.parent("."+w.containerClass)),y.$imageEl&&0!==y.$imageEl.length)&&(y.$slideEl.addClass(""+w.zoomedSlideClass),void 0===x.touchesStart.x&&e?(t="touchend"===e.type?e.changedTouches[0].pageX:e.pageX,i="touchend"===e.type?e.changedTouches[0].pageY:e.pageY):(t=x.touchesStart.x,i=x.touchesStart.y),b.scale=y.$imageWrapEl.attr("data-swiper-zoom")||w.maxRatio,b.currentScale=y.$imageWrapEl.attr("data-swiper-zoom")||w.maxRatio,e?(m=y.$slideEl[0].offsetWidth,g=y.$slideEl[0].offsetHeight,a=y.$slideEl.offset().left+m/2-t,r=y.$slideEl.offset().top+g/2-i,l=y.$imageEl[0].offsetWidth,d=y.$imageEl[0].offsetHeight,h=l*b.scale,p=d*b.scale,v=-(c=Math.min(m/2-h/2,0)),f=-(u=Math.min(g/2-p/2,0)),(n=a*b.scale)<c&&(n=c),n>v&&(n=v),(o=r*b.scale)<u&&(o=u),o>f&&(o=f)):(n=0,o=0),y.$imageWrapEl.transition(300).transform("translate3d("+n+"px, "+o+"px,0)"),y.$imageEl.transition(300).transform("translate3d(0,0,0) scale("+b.scale+")"))},out:function(){var e=this.zoom,t=this.params.zoom,i=e.gesture;i.$slideEl||(i.$slideEl=this.clickedSlide?s(this.clickedSlide):this.slides.eq(this.activeIndex),i.$imageEl=i.$slideEl.find("img, svg, canvas"),i.$imageWrapEl=i.$imageEl.parent("."+t.containerClass)),i.$imageEl&&0!==i.$imageEl.length&&(e.scale=1,e.currentScale=1,i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),i.$slideEl.removeClass(""+t.zoomedSlideClass),i.$slideEl=void 0)},enable:function(){var e=this.zoom;if(!e.enabled){e.enabled=!0;var t=!("touchstart"!==this.touchEvents.start||!o.passiveListener||!this.params.passiveListeners)&&{passive:!0,capture:!1},i=!o.passiveListener||{passive:!1,capture:!0};o.gestures?(this.$wrapperEl.on("gesturestart",".swiper-slide",e.onGestureStart,t),this.$wrapperEl.on("gesturechange",".swiper-slide",e.onGestureChange,t),this.$wrapperEl.on("gestureend",".swiper-slide",e.onGestureEnd,t)):"touchstart"===this.touchEvents.start&&(this.$wrapperEl.on(this.touchEvents.start,".swiper-slide",e.onGestureStart,t),this.$wrapperEl.on(this.touchEvents.move,".swiper-slide",e.onGestureChange,i),this.$wrapperEl.on(this.touchEvents.end,".swiper-slide",e.onGestureEnd,t),this.touchEvents.cancel&&this.$wrapperEl.on(this.touchEvents.cancel,".swiper-slide",e.onGestureEnd,t)),this.$wrapperEl.on(this.touchEvents.move,"."+this.params.zoom.containerClass,e.onTouchMove,i)}},disable:function(){var e=this.zoom;if(e.enabled){this.zoom.enabled=!1;var t=!("touchstart"!==this.touchEvents.start||!o.passiveListener||!this.params.passiveListeners)&&{passive:!0,capture:!1},i=!o.passiveListener||{passive:!1,capture:!0};o.gestures?(this.$wrapperEl.off("gesturestart",".swiper-slide",e.onGestureStart,t),this.$wrapperEl.off("gesturechange",".swiper-slide",e.onGestureChange,t),this.$wrapperEl.off("gestureend",".swiper-slide",e.onGestureEnd,t)):"touchstart"===this.touchEvents.start&&(this.$wrapperEl.off(this.touchEvents.start,".swiper-slide",e.onGestureStart,t),this.$wrapperEl.off(this.touchEvents.move,".swiper-slide",e.onGestureChange,i),this.$wrapperEl.off(this.touchEvents.end,".swiper-slide",e.onGestureEnd,t),this.touchEvents.cancel&&this.$wrapperEl.off(this.touchEvents.cancel,".swiper-slide",e.onGestureEnd,t)),this.$wrapperEl.off(this.touchEvents.move,"."+this.params.zoom.containerClass,e.onTouchMove,i)}}},le={loadInSlide:function(e,t){void 0===t&&(t=!0);var i=this,a=i.params.lazy;if(void 0!==e&&0!==i.slides.length){var r=i.virtual&&i.params.virtual.enabled?i.$wrapperEl.children("."+i.params.slideClass+'[data-swiper-slide-index="'+e+'"]'):i.slides.eq(e),n=r.find("."+a.elementClass+":not(."+a.loadedClass+"):not(."+a.loadingClass+")");!r.hasClass(a.elementClass)||r.hasClass(a.loadedClass)||r.hasClass(a.loadingClass)||(n=n.add(r[0])),0!==n.length&&n.each((function(e,n){var o=s(n);o.addClass(a.loadingClass);var l=o.attr("data-background"),d=o.attr("data-src"),h=o.attr("data-srcset"),p=o.attr("data-sizes");i.loadImage(o[0],d||l,h,p,!1,(function(){if(null!=i&&i&&(!i||i.params)&&!i.destroyed){if(l?(o.css("background-image",'url("'+l+'")'),o.removeAttr("data-background")):(h&&(o.attr("srcset",h),o.removeAttr("data-srcset")),p&&(o.attr("sizes",p),o.removeAttr("data-sizes")),d&&(o.attr("src",d),o.removeAttr("data-src"))),o.addClass(a.loadedClass).removeClass(a.loadingClass),r.find("."+a.preloaderClass).remove(),i.params.loop&&t){var e=r.attr("data-swiper-slide-index");if(r.hasClass(i.params.slideDuplicateClass)){var s=i.$wrapperEl.children('[data-swiper-slide-index="'+e+'"]:not(.'+i.params.slideDuplicateClass+")");i.lazy.loadInSlide(s.index(),!1)}else{var n=i.$wrapperEl.children("."+i.params.slideDuplicateClass+'[data-swiper-slide-index="'+e+'"]');i.lazy.loadInSlide(n.index(),!1)}}i.emit("lazyImageReady",r[0],o[0])}})),i.emit("lazyImageLoad",r[0],o[0])}))}},load:function(){var e=this,t=e.$wrapperEl,i=e.params,a=e.slides,r=e.activeIndex,n=e.virtual&&i.virtual.enabled,o=i.lazy,l=i.slidesPerView;function d(e){if(n){if(t.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]').length)return!0}else if(a[e])return!0;return!1}function h(e){return n?s(e).attr("data-swiper-slide-index"):s(e).index()}if("auto"===l&&(l=0),e.lazy.initialImageLoaded||(e.lazy.initialImageLoaded=!0),e.params.watchSlidesVisibility)t.children("."+i.slideVisibleClass).each((function(t,i){var a=n?s(i).attr("data-swiper-slide-index"):s(i).index();e.lazy.loadInSlide(a)}));else if(l>1)for(var p=r;p<r+l;p+=1)d(p)&&e.lazy.loadInSlide(p);else e.lazy.loadInSlide(r);if(o.loadPrevNext)if(l>1||o.loadPrevNextAmount&&o.loadPrevNextAmount>1){for(var c=o.loadPrevNextAmount,u=l,v=Math.min(r+u+Math.max(c,u),a.length),f=Math.max(r-Math.max(u,c),0),m=r+l;m<v;m+=1)d(m)&&e.lazy.loadInSlide(m);for(var g=f;g<r;g+=1)d(g)&&e.lazy.loadInSlide(g)}else{var b=t.children("."+i.slideNextClass);b.length>0&&e.lazy.loadInSlide(h(b));var w=t.children("."+i.slidePrevClass);w.length>0&&e.lazy.loadInSlide(h(w))}}},de={LinearSpline:function(e,t){var i,s,a,r,n,o=function(e,t){for(s=-1,i=e.length;i-s>1;)e[a=i+s>>1]<=t?s=a:i=a;return i};return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(n=o(this.x,e),r=n-1,(e-this.x[r])*(this.y[n]-this.y[r])/(this.x[n]-this.x[r])+this.y[r]):0},this},getInterpolateFunction:function(e){this.controller.spline||(this.controller.spline=this.params.loop?new de.LinearSpline(this.slidesGrid,e.slidesGrid):new de.LinearSpline(this.snapGrid,e.snapGrid))},setTranslate:function(e,t){var i,s,a=this,r=a.controller.control;function n(e){var t=a.rtlTranslate?-a.translate:a.translate;"slide"===a.params.controller.by&&(a.controller.getInterpolateFunction(e),s=-a.controller.spline.interpolate(-t)),s&&"container"!==a.params.controller.by||(i=(e.maxTranslate()-e.minTranslate())/(a.maxTranslate()-a.minTranslate()),s=(t-a.minTranslate())*i+e.minTranslate()),a.params.controller.inverse&&(s=e.maxTranslate()-s),e.updateProgress(s),e.setTranslate(s,a),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(r))for(var o=0;o<r.length;o+=1)r[o]!==t&&r[o]instanceof W&&n(r[o]);else r instanceof W&&t!==r&&n(r)},setTransition:function(e,t){var i,s=this,a=s.controller.control;function r(t){t.setTransition(e,s),0!==e&&(t.transitionStart(),t.params.autoHeight&&n.nextTick((function(){t.updateAutoHeight()})),t.$wrapperEl.transitionEnd((function(){a&&(t.params.loop&&"slide"===s.params.controller.by&&t.loopFix(),t.transitionEnd())})))}if(Array.isArray(a))for(i=0;i<a.length;i+=1)a[i]!==t&&a[i]instanceof W&&r(a[i]);else a instanceof W&&t!==a&&r(a)}},he={makeElFocusable:function(e){return e.attr("tabIndex","0"),e},addElRole:function(e,t){return e.attr("role",t),e},addElLabel:function(e,t){return e.attr("aria-label",t),e},disableEl:function(e){return e.attr("aria-disabled",!0),e},enableEl:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){var t=this.params.a11y;if(13===e.keyCode){var i=s(e.target);this.navigation&&this.navigation.$nextEl&&i.is(this.navigation.$nextEl)&&(this.isEnd&&!this.params.loop||this.slideNext(),this.isEnd?this.a11y.notify(t.lastSlideMessage):this.a11y.notify(t.nextSlideMessage)),this.navigation&&this.navigation.$prevEl&&i.is(this.navigation.$prevEl)&&(this.isBeginning&&!this.params.loop||this.slidePrev(),this.isBeginning?this.a11y.notify(t.firstSlideMessage):this.a11y.notify(t.prevSlideMessage)),this.pagination&&i.is("."+this.params.pagination.bulletClass)&&i[0].click()}},notify:function(e){var t=this.a11y.liveRegion;0!==t.length&&(t.html(""),t.html(e))},updateNavigation:function(){if(!this.params.loop){var e=this.navigation,t=e.$nextEl,i=e.$prevEl;i&&i.length>0&&(this.isBeginning?this.a11y.disableEl(i):this.a11y.enableEl(i)),t&&t.length>0&&(this.isEnd?this.a11y.disableEl(t):this.a11y.enableEl(t))}},updatePagination:function(){var e=this,t=e.params.a11y;e.pagination&&e.params.pagination.clickable&&e.pagination.bullets&&e.pagination.bullets.length&&e.pagination.bullets.each((function(i,a){var r=s(a);e.a11y.makeElFocusable(r),e.a11y.addElRole(r,"button"),e.a11y.addElLabel(r,t.paginationBulletMessage.replace(/{{index}}/,r.index()+1))}))},init:function(){this.$el.append(this.a11y.liveRegion);var e,t,i=this.params.a11y;this.navigation&&this.navigation.$nextEl&&(e=this.navigation.$nextEl),this.navigation&&this.navigation.$prevEl&&(t=this.navigation.$prevEl),e&&(this.a11y.makeElFocusable(e),this.a11y.addElRole(e,"button"),this.a11y.addElLabel(e,i.nextSlideMessage),e.on("keydown",this.a11y.onEnterKey)),t&&(this.a11y.makeElFocusable(t),this.a11y.addElRole(t,"button"),this.a11y.addElLabel(t,i.prevSlideMessage),t.on("keydown",this.a11y.onEnterKey)),this.pagination&&this.params.pagination.clickable&&this.pagination.bullets&&this.pagination.bullets.length&&this.pagination.$el.on("keydown","."+this.params.pagination.bulletClass,this.a11y.onEnterKey)},destroy:function(){var e,t;this.a11y.liveRegion&&this.a11y.liveRegion.length>0&&this.a11y.liveRegion.remove(),this.navigation&&this.navigation.$nextEl&&(e=this.navigation.$nextEl),this.navigation&&this.navigation.$prevEl&&(t=this.navigation.$prevEl),e&&e.off("keydown",this.a11y.onEnterKey),t&&t.off("keydown",this.a11y.onEnterKey),this.pagination&&this.params.pagination.clickable&&this.pagination.bullets&&this.pagination.bullets.length&&this.pagination.$el.off("keydown","."+this.params.pagination.bulletClass,this.a11y.onEnterKey)}},pe={init:function(){if(this.params.history){if(!t.history||!t.history.pushState)return this.params.history.enabled=!1,void(this.params.hashNavigation.enabled=!0);var e=this.history;e.initialized=!0,e.paths=pe.getPathValues(),(e.paths.key||e.paths.value)&&(e.scrollToSlide(0,e.paths.value,this.params.runCallbacksOnInit),this.params.history.replaceState||t.addEventListener("popstate",this.history.setHistoryPopState))}},destroy:function(){this.params.history.replaceState||t.removeEventListener("popstate",this.history.setHistoryPopState)},setHistoryPopState:function(){this.history.paths=pe.getPathValues(),this.history.scrollToSlide(this.params.speed,this.history.paths.value,!1)},getPathValues:function(){var e=t.location.pathname.slice(1).split("/").filter((function(e){return""!==e})),i=e.length;return{key:e[i-2],value:e[i-1]}},setHistory:function(e,i){if(this.history.initialized&&this.params.history.enabled){var s=this.slides.eq(i),a=pe.slugify(s.attr("data-history"));t.location.pathname.includes(e)||(a=e+"/"+a);var r=t.history.state;r&&r.value===a||(this.params.history.replaceState?t.history.replaceState({value:a},null,a):t.history.pushState({value:a},null,a))}},slugify:function(e){return e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,t,i){if(t)for(var s=0,a=this.slides.length;s<a;s+=1){var r=this.slides.eq(s);if(pe.slugify(r.attr("data-history"))===t&&!r.hasClass(this.params.slideDuplicateClass)){var n=r.index();this.slideTo(n,e,i)}}else this.slideTo(0,e,i)}},ce={onHashCange:function(){var t=e.location.hash.replace("#","");if(t!==this.slides.eq(this.activeIndex).attr("data-hash")){var i=this.$wrapperEl.children("."+this.params.slideClass+'[data-hash="'+t+'"]').index();if(void 0===i)return;this.slideTo(i)}},setHash:function(){if(this.hashNavigation.initialized&&this.params.hashNavigation.enabled)if(this.params.hashNavigation.replaceState&&t.history&&t.history.replaceState)t.history.replaceState(null,null,"#"+this.slides.eq(this.activeIndex).attr("data-hash")||"");else{var i=this.slides.eq(this.activeIndex),s=i.attr("data-hash")||i.attr("data-history");e.location.hash=s||""}},init:function(){if(!(!this.params.hashNavigation.enabled||this.params.history&&this.params.history.enabled)){this.hashNavigation.initialized=!0;var i=e.location.hash.replace("#","");if(i)for(var a=0,r=this.slides.length;a<r;a+=1){var n=this.slides.eq(a);if((n.attr("data-hash")||n.attr("data-history"))===i&&!n.hasClass(this.params.slideDuplicateClass)){var o=n.index();this.slideTo(o,0,this.params.runCallbacksOnInit,!0)}}this.params.hashNavigation.watchState&&s(t).on("hashchange",this.hashNavigation.onHashCange)}},destroy:function(){this.params.hashNavigation.watchState&&s(t).off("hashchange",this.hashNavigation.onHashCange)}},ue={run:function(){var e=this,t=e.slides.eq(e.activeIndex),i=e.params.autoplay.delay;t.attr("data-swiper-autoplay")&&(i=t.attr("data-swiper-autoplay")||e.params.autoplay.delay),clearTimeout(e.autoplay.timeout),e.autoplay.timeout=n.nextTick((function(){e.params.autoplay.reverseDirection?e.params.loop?(e.loopFix(),e.slidePrev(e.params.speed,!0,!0),e.emit("autoplay")):e.isBeginning?e.params.autoplay.stopOnLastSlide?e.autoplay.stop():(e.slideTo(e.slides.length-1,e.params.speed,!0,!0),e.emit("autoplay")):(e.slidePrev(e.params.speed,!0,!0),e.emit("autoplay")):e.params.loop?(e.loopFix(),e.slideNext(e.params.speed,!0,!0),e.emit("autoplay")):e.isEnd?e.params.autoplay.stopOnLastSlide?e.autoplay.stop():(e.slideTo(0,e.params.speed,!0,!0),e.emit("autoplay")):(e.slideNext(e.params.speed,!0,!0),e.emit("autoplay")),e.params.cssMode&&e.autoplay.running&&e.autoplay.run()}),i)},start:function(){return void 0===this.autoplay.timeout&&(!this.autoplay.running&&(this.autoplay.running=!0,this.emit("autoplayStart"),this.autoplay.run(),!0))},stop:function(){return!!this.autoplay.running&&(void 0!==this.autoplay.timeout&&(this.autoplay.timeout&&(clearTimeout(this.autoplay.timeout),this.autoplay.timeout=void 0),this.autoplay.running=!1,this.emit("autoplayStop"),!0))},pause:function(e){this.autoplay.running&&(this.autoplay.paused||(this.autoplay.timeout&&clearTimeout(this.autoplay.timeout),this.autoplay.paused=!0,0!==e&&this.params.autoplay.waitForTransition?(this.$wrapperEl[0].addEventListener("transitionend",this.autoplay.onTransitionEnd),this.$wrapperEl[0].addEventListener("webkitTransitionEnd",this.autoplay.onTransitionEnd)):(this.autoplay.paused=!1,this.autoplay.run())))}},ve={setTranslate:function(){for(var e=this.slides,t=0;t<e.length;t+=1){var i=this.slides.eq(t),s=-i[0].swiperSlideOffset;this.params.virtualTranslate||(s-=this.translate);var a=0;this.isHorizontal()||(a=s,s=0);var r=this.params.fadeEffect.crossFade?Math.max(1-Math.abs(i[0].progress),0):1+Math.min(Math.max(i[0].progress,-1),0);i.css({opacity:r}).transform("translate3d("+s+"px, "+a+"px, 0px)")}},setTransition:function(e){var t=this,i=t.slides,s=t.$wrapperEl;if(i.transition(e),t.params.virtualTranslate&&0!==e){var a=!1;i.transitionEnd((function(){if(!a&&t&&!t.destroyed){a=!0,t.animating=!1;for(var e=["webkitTransitionEnd","transitionend"],i=0;i<e.length;i+=1)s.trigger(e[i])}}))}}},fe={setTranslate:function(){var e,t=this.$el,i=this.$wrapperEl,a=this.slides,r=this.width,n=this.height,o=this.rtlTranslate,l=this.size,d=this.params.cubeEffect,h=this.isHorizontal(),p=this.virtual&&this.params.virtual.enabled,c=0;d.shadow&&(h?(0===(e=i.find(".swiper-cube-shadow")).length&&(e=s('<div class="swiper-cube-shadow"></div>'),i.append(e)),e.css({height:r+"px"})):0===(e=t.find(".swiper-cube-shadow")).length&&(e=s('<div class="swiper-cube-shadow"></div>'),t.append(e)));for(var u=0;u<a.length;u+=1){var v=a.eq(u),f=u;p&&(f=parseInt(v.attr("data-swiper-slide-index"),10));var m=90*f,g=Math.floor(m/360);o&&(m=-m,g=Math.floor(-m/360));var b=Math.max(Math.min(v[0].progress,1),-1),w=0,y=0,x=0;f%4==0?(w=4*-g*l,x=0):(f-1)%4==0?(w=0,x=4*-g*l):(f-2)%4==0?(w=l+4*g*l,x=l):(f-3)%4==0&&(w=-l,x=3*l+4*l*g),o&&(w=-w),h||(y=w,w=0);var T="rotateX("+(h?0:-m)+"deg) rotateY("+(h?m:0)+"deg) translate3d("+w+"px, "+y+"px, "+x+"px)";if(b<=1&&b>-1&&(c=90*f+90*b,o&&(c=90*-f-90*b)),v.transform(T),d.slideShadows){var E=h?v.find(".swiper-slide-shadow-left"):v.find(".swiper-slide-shadow-top"),C=h?v.find(".swiper-slide-shadow-right"):v.find(".swiper-slide-shadow-bottom");0===E.length&&(E=s('<div class="swiper-slide-shadow-'+(h?"left":"top")+'"></div>'),v.append(E)),0===C.length&&(C=s('<div class="swiper-slide-shadow-'+(h?"right":"bottom")+'"></div>'),v.append(C)),E.length&&(E[0].style.opacity=Math.max(-b,0)),C.length&&(C[0].style.opacity=Math.max(b,0))}}if(i.css({"-webkit-transform-origin":"50% 50% -"+l/2+"px","-moz-transform-origin":"50% 50% -"+l/2+"px","-ms-transform-origin":"50% 50% -"+l/2+"px","transform-origin":"50% 50% -"+l/2+"px"}),d.shadow)if(h)e.transform("translate3d(0px, "+(r/2+d.shadowOffset)+"px, "+-r/2+"px) rotateX(90deg) rotateZ(0deg) scale("+d.shadowScale+")");else{var S=Math.abs(c)-90*Math.floor(Math.abs(c)/90),M=1.5-(Math.sin(2*S*Math.PI/360)/2+Math.cos(2*S*Math.PI/360)/2),P=d.shadowScale,z=d.shadowScale/M,k=d.shadowOffset;e.transform("scale3d("+P+", 1, "+z+") translate3d(0px, "+(n/2+k)+"px, "+-n/2/z+"px) rotateX(-90deg)")}var $=j.isSafari||j.isUiWebView?-l/2:0;i.transform("translate3d(0px,0,"+$+"px) rotateX("+(this.isHorizontal()?0:c)+"deg) rotateY("+(this.isHorizontal()?-c:0)+"deg)")},setTransition:function(e){var t=this.$el;this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),this.params.cubeEffect.shadow&&!this.isHorizontal()&&t.find(".swiper-cube-shadow").transition(e)}},me={setTranslate:function(){for(var e=this.slides,t=this.rtlTranslate,i=0;i<e.length;i+=1){var a=e.eq(i),r=a[0].progress;this.params.flipEffect.limitRotation&&(r=Math.max(Math.min(a[0].progress,1),-1));var n=-180*r,o=0,l=-a[0].swiperSlideOffset,d=0;if(this.isHorizontal()?t&&(n=-n):(d=l,l=0,o=-n,n=0),a[0].style.zIndex=-Math.abs(Math.round(r))+e.length,this.params.flipEffect.slideShadows){var h=this.isHorizontal()?a.find(".swiper-slide-shadow-left"):a.find(".swiper-slide-shadow-top"),p=this.isHorizontal()?a.find(".swiper-slide-shadow-right"):a.find(".swiper-slide-shadow-bottom");0===h.length&&(h=s('<div class="swiper-slide-shadow-'+(this.isHorizontal()?"left":"top")+'"></div>'),a.append(h)),0===p.length&&(p=s('<div class="swiper-slide-shadow-'+(this.isHorizontal()?"right":"bottom")+'"></div>'),a.append(p)),h.length&&(h[0].style.opacity=Math.max(-r,0)),p.length&&(p[0].style.opacity=Math.max(r,0))}a.transform("translate3d("+l+"px, "+d+"px, 0px) rotateX("+o+"deg) rotateY("+n+"deg)")}},setTransition:function(e){var t=this,i=t.slides,s=t.activeIndex,a=t.$wrapperEl;if(i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),t.params.virtualTranslate&&0!==e){var r=!1;i.eq(s).transitionEnd((function(){if(!r&&t&&!t.destroyed){r=!0,t.animating=!1;for(var e=["webkitTransitionEnd","transitionend"],i=0;i<e.length;i+=1)a.trigger(e[i])}}))}}},ge={setTranslate:function(){for(var e=this.width,t=this.height,i=this.slides,a=this.$wrapperEl,r=this.slidesSizesGrid,n=this.params.coverflowEffect,l=this.isHorizontal(),d=this.translate,h=l?e/2-d:t/2-d,p=l?n.rotate:-n.rotate,c=n.depth,u=0,v=i.length;u<v;u+=1){var f=i.eq(u),m=r[u],g=(h-f[0].swiperSlideOffset-m/2)/m*n.modifier,b=l?p*g:0,w=l?0:p*g,y=-c*Math.abs(g),x=l?0:n.stretch*g,T=l?n.stretch*g:0;Math.abs(T)<.001&&(T=0),Math.abs(x)<.001&&(x=0),Math.abs(y)<.001&&(y=0),Math.abs(b)<.001&&(b=0),Math.abs(w)<.001&&(w=0);var E="translate3d("+T+"px,"+x+"px,"+y+"px)  rotateX("+w+"deg) rotateY("+b+"deg)";if(f.transform(E),f[0].style.zIndex=1-Math.abs(Math.round(g)),n.slideShadows){var C=l?f.find(".swiper-slide-shadow-left"):f.find(".swiper-slide-shadow-top"),S=l?f.find(".swiper-slide-shadow-right"):f.find(".swiper-slide-shadow-bottom");0===C.length&&(C=s('<div class="swiper-slide-shadow-'+(l?"left":"top")+'"></div>'),f.append(C)),0===S.length&&(S=s('<div class="swiper-slide-shadow-'+(l?"right":"bottom")+'"></div>'),f.append(S)),C.length&&(C[0].style.opacity=g>0?g:0),S.length&&(S[0].style.opacity=-g>0?-g:0)}}(o.pointerEvents||o.prefixedPointerEvents)&&(a[0].style.perspectiveOrigin=h+"px 50%")},setTransition:function(e){this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}},be={init:function(){var e=this.params.thumbs,t=this.constructor;e.swiper instanceof t?(this.thumbs.swiper=e.swiper,n.extend(this.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),n.extend(this.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1})):n.isObject(e.swiper)&&(this.thumbs.swiper=new t(n.extend({},e.swiper,{watchSlidesVisibility:!0,watchSlidesProgress:!0,slideToClickedSlide:!1})),this.thumbs.swiperCreated=!0),this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),this.thumbs.swiper.on("tap",this.thumbs.onThumbClick)},onThumbClick:function(){var e=this.thumbs.swiper;if(e){var t=e.clickedIndex,i=e.clickedSlide;if(!(i&&s(i).hasClass(this.params.thumbs.slideThumbActiveClass)||null==t)){var a;if(a=e.params.loop?parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"),10):t,this.params.loop){var r=this.activeIndex;this.slides.eq(r).hasClass(this.params.slideDuplicateClass)&&(this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft,r=this.activeIndex);var n=this.slides.eq(r).prevAll('[data-swiper-slide-index="'+a+'"]').eq(0).index(),o=this.slides.eq(r).nextAll('[data-swiper-slide-index="'+a+'"]').eq(0).index();a=void 0===n?o:void 0===o?n:o-r<r-n?o:n}this.slideTo(a)}}},update:function(e){var t=this.thumbs.swiper;if(t){var i="auto"===t.params.slidesPerView?t.slidesPerViewDynamic():t.params.slidesPerView;if(this.realIndex!==t.realIndex){var s,a=t.activeIndex;if(t.params.loop){t.slides.eq(a).hasClass(t.params.slideDuplicateClass)&&(t.loopFix(),t._clientLeft=t.$wrapperEl[0].clientLeft,a=t.activeIndex);var r=t.slides.eq(a).prevAll('[data-swiper-slide-index="'+this.realIndex+'"]').eq(0).index(),n=t.slides.eq(a).nextAll('[data-swiper-slide-index="'+this.realIndex+'"]').eq(0).index();s=void 0===r?n:void 0===n?r:n-a==a-r?a:n-a<a-r?n:r}else s=this.realIndex;t.visibleSlidesIndexes&&t.visibleSlidesIndexes.indexOf(s)<0&&(t.params.centeredSlides?s=s>a?s-Math.floor(i/2)+1:s+Math.floor(i/2)-1:s>a&&(s=s-i+1),t.slideTo(s,e?0:void 0))}var o=1,l=this.params.thumbs.slideThumbActiveClass;if(this.params.slidesPerView>1&&!this.params.centeredSlides&&(o=this.params.slidesPerView),t.slides.removeClass(l),t.params.loop||t.params.virtual&&t.params.virtual.enabled)for(var d=0;d<o;d+=1)t.$wrapperEl.children('[data-swiper-slide-index="'+(this.realIndex+d)+'"]').addClass(l);else for(var h=0;h<o;h+=1)t.slides.eq(this.realIndex+h).addClass(l)}}},we=[R,q,K,U,Z,J,te,{name:"mousewheel",params:{mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarged:"container"}},create:function(){n.extend(this,{mousewheel:{enabled:!1,enable:ie.enable.bind(this),disable:ie.disable.bind(this),handle:ie.handle.bind(this),handleMouseEnter:ie.handleMouseEnter.bind(this),handleMouseLeave:ie.handleMouseLeave.bind(this),lastScrollTime:n.now(),lastEventBeforeSnap:void 0,recentWheelEvents:[]}})},on:{init:function(){!this.params.mousewheel.enabled&&this.params.cssMode&&this.mousewheel.disable(),this.params.mousewheel.enabled&&this.mousewheel.enable()},destroy:function(){this.params.cssMode&&this.mousewheel.enable(),this.mousewheel.enabled&&this.mousewheel.disable()}}},{name:"navigation",params:{navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}},create:function(){n.extend(this,{navigation:{init:se.init.bind(this),update:se.update.bind(this),destroy:se.destroy.bind(this),onNextClick:se.onNextClick.bind(this),onPrevClick:se.onPrevClick.bind(this)}})},on:{init:function(){this.navigation.init(),this.navigation.update()},toEdge:function(){this.navigation.update()},fromEdge:function(){this.navigation.update()},destroy:function(){this.navigation.destroy()},click:function(e){var t,i=this.navigation,a=i.$nextEl,r=i.$prevEl;!this.params.navigation.hideOnClick||s(e.target).is(r)||s(e.target).is(a)||(a?t=a.hasClass(this.params.navigation.hiddenClass):r&&(t=r.hasClass(this.params.navigation.hiddenClass)),!0===t?this.emit("navigationShow",this):this.emit("navigationHide",this),a&&a.toggleClass(this.params.navigation.hiddenClass),r&&r.toggleClass(this.params.navigation.hiddenClass))}}},{name:"pagination",params:{pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:function(e){return e},formatFractionTotal:function(e){return e},bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",modifierClass:"swiper-pagination-",currentClass:"swiper-pagination-current",totalClass:"swiper-pagination-total",hiddenClass:"swiper-pagination-hidden",progressbarFillClass:"swiper-pagination-progressbar-fill",progressbarOppositeClass:"swiper-pagination-progressbar-opposite",clickableClass:"swiper-pagination-clickable",lockClass:"swiper-pagination-lock"}},create:function(){n.extend(this,{pagination:{init:ae.init.bind(this),render:ae.render.bind(this),update:ae.update.bind(this),destroy:ae.destroy.bind(this),dynamicBulletIndex:0}})},on:{init:function(){this.pagination.init(),this.pagination.render(),this.pagination.update()},activeIndexChange:function(){this.params.loop?this.pagination.update():void 0===this.snapIndex&&this.pagination.update()},snapIndexChange:function(){this.params.loop||this.pagination.update()},slidesLengthChange:function(){this.params.loop&&(this.pagination.render(),this.pagination.update())},snapGridLengthChange:function(){this.params.loop||(this.pagination.render(),this.pagination.update())},destroy:function(){this.pagination.destroy()},click:function(e){this.params.pagination.el&&this.params.pagination.hideOnClick&&this.pagination.$el.length>0&&!s(e.target).hasClass(this.params.pagination.bulletClass)&&(!0===this.pagination.$el.hasClass(this.params.pagination.hiddenClass)?this.emit("paginationShow",this):this.emit("paginationHide",this),this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))}}},{name:"scrollbar",params:{scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag"}},create:function(){n.extend(this,{scrollbar:{init:re.init.bind(this),destroy:re.destroy.bind(this),updateSize:re.updateSize.bind(this),setTranslate:re.setTranslate.bind(this),setTransition:re.setTransition.bind(this),enableDraggable:re.enableDraggable.bind(this),disableDraggable:re.disableDraggable.bind(this),setDragPosition:re.setDragPosition.bind(this),getPointerPosition:re.getPointerPosition.bind(this),onDragStart:re.onDragStart.bind(this),onDragMove:re.onDragMove.bind(this),onDragEnd:re.onDragEnd.bind(this),isTouched:!1,timeout:null,dragTimeout:null}})},on:{init:function(){this.scrollbar.init(),this.scrollbar.updateSize(),this.scrollbar.setTranslate()},update:function(){this.scrollbar.updateSize()},resize:function(){this.scrollbar.updateSize()},observerUpdate:function(){this.scrollbar.updateSize()},setTranslate:function(){this.scrollbar.setTranslate()},setTransition:function(e){this.scrollbar.setTransition(e)},destroy:function(){this.scrollbar.destroy()}}},{name:"parallax",params:{parallax:{enabled:!1}},create:function(){n.extend(this,{parallax:{setTransform:ne.setTransform.bind(this),setTranslate:ne.setTranslate.bind(this),setTransition:ne.setTransition.bind(this)}})},on:{beforeInit:function(){this.params.parallax.enabled&&(this.params.watchSlidesProgress=!0,this.originalParams.watchSlidesProgress=!0)},init:function(){this.params.parallax.enabled&&this.parallax.setTranslate()},setTranslate:function(){this.params.parallax.enabled&&this.parallax.setTranslate()},setTransition:function(e){this.params.parallax.enabled&&this.parallax.setTransition(e)}}},{name:"zoom",params:{zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}},create:function(){var e=this,t={enabled:!1,scale:1,currentScale:1,isScaling:!1,gesture:{$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0}};"onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function(i){t[i]=oe[i].bind(e)})),n.extend(e,{zoom:t});var i=1;Object.defineProperty(e.zoom,"scale",{get:function(){return i},set:function(t){if(i!==t){var s=e.zoom.gesture.$imageEl?e.zoom.gesture.$imageEl[0]:void 0,a=e.zoom.gesture.$slideEl?e.zoom.gesture.$slideEl[0]:void 0;e.emit("zoomChange",t,s,a)}i=t}})},on:{init:function(){this.params.zoom.enabled&&this.zoom.enable()},destroy:function(){this.zoom.disable()},touchStart:function(e){this.zoom.enabled&&this.zoom.onTouchStart(e)},touchEnd:function(e){this.zoom.enabled&&this.zoom.onTouchEnd(e)},doubleTap:function(e){this.params.zoom.enabled&&this.zoom.enabled&&this.params.zoom.toggle&&this.zoom.toggle(e)},transitionEnd:function(){this.zoom.enabled&&this.params.zoom.enabled&&this.zoom.onTransitionEnd()},slideChange:function(){this.zoom.enabled&&this.params.zoom.enabled&&this.params.cssMode&&this.zoom.onTransitionEnd()}}},{name:"lazy",params:{lazy:{enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}},create:function(){n.extend(this,{lazy:{initialImageLoaded:!1,load:le.load.bind(this),loadInSlide:le.loadInSlide.bind(this)}})},on:{beforeInit:function(){this.params.lazy.enabled&&this.params.preloadImages&&(this.params.preloadImages=!1)},init:function(){this.params.lazy.enabled&&!this.params.loop&&0===this.params.initialSlide&&this.lazy.load()},scroll:function(){this.params.freeMode&&!this.params.freeModeSticky&&this.lazy.load()},resize:function(){this.params.lazy.enabled&&this.lazy.load()},scrollbarDragMove:function(){this.params.lazy.enabled&&this.lazy.load()},transitionStart:function(){this.params.lazy.enabled&&(this.params.lazy.loadOnTransitionStart||!this.params.lazy.loadOnTransitionStart&&!this.lazy.initialImageLoaded)&&this.lazy.load()},transitionEnd:function(){this.params.lazy.enabled&&!this.params.lazy.loadOnTransitionStart&&this.lazy.load()},slideChange:function(){this.params.lazy.enabled&&this.params.cssMode&&this.lazy.load()}}},{name:"controller",params:{controller:{control:void 0,inverse:!1,by:"slide"}},create:function(){n.extend(this,{controller:{control:this.params.controller.control,getInterpolateFunction:de.getInterpolateFunction.bind(this),setTranslate:de.setTranslate.bind(this),setTransition:de.setTransition.bind(this)}})},on:{update:function(){this.controller.control&&this.controller.spline&&(this.controller.spline=void 0,delete this.controller.spline)},resize:function(){this.controller.control&&this.controller.spline&&(this.controller.spline=void 0,delete this.controller.spline)},observerUpdate:function(){this.controller.control&&this.controller.spline&&(this.controller.spline=void 0,delete this.controller.spline)},setTranslate:function(e,t){this.controller.control&&this.controller.setTranslate(e,t)},setTransition:function(e,t){this.controller.control&&this.controller.setTransition(e,t)}}},{name:"a11y",params:{a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}"}},create:function(){var e=this;n.extend(e,{a11y:{liveRegion:s('<span class="'+e.params.a11y.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>')}}),Object.keys(he).forEach((function(t){e.a11y[t]=he[t].bind(e)}))},on:{init:function(){this.params.a11y.enabled&&(this.a11y.init(),this.a11y.updateNavigation())},toEdge:function(){this.params.a11y.enabled&&this.a11y.updateNavigation()},fromEdge:function(){this.params.a11y.enabled&&this.a11y.updateNavigation()},paginationUpdate:function(){this.params.a11y.enabled&&this.a11y.updatePagination()},destroy:function(){this.params.a11y.enabled&&this.a11y.destroy()}}},{name:"history",params:{history:{enabled:!1,replaceState:!1,key:"slides"}},create:function(){n.extend(this,{history:{init:pe.init.bind(this),setHistory:pe.setHistory.bind(this),setHistoryPopState:pe.setHistoryPopState.bind(this),scrollToSlide:pe.scrollToSlide.bind(this),destroy:pe.destroy.bind(this)}})},on:{init:function(){this.params.history.enabled&&this.history.init()},destroy:function(){this.params.history.enabled&&this.history.destroy()},transitionEnd:function(){this.history.initialized&&this.history.setHistory(this.params.history.key,this.activeIndex)},slideChange:function(){this.history.initialized&&this.params.cssMode&&this.history.setHistory(this.params.history.key,this.activeIndex)}}},{name:"hash-navigation",params:{hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}},create:function(){n.extend(this,{hashNavigation:{initialized:!1,init:ce.init.bind(this),destroy:ce.destroy.bind(this),setHash:ce.setHash.bind(this),onHashCange:ce.onHashCange.bind(this)}})},on:{init:function(){this.params.hashNavigation.enabled&&this.hashNavigation.init()},destroy:function(){this.params.hashNavigation.enabled&&this.hashNavigation.destroy()},transitionEnd:function(){this.hashNavigation.initialized&&this.hashNavigation.setHash()},slideChange:function(){this.hashNavigation.initialized&&this.params.cssMode&&this.hashNavigation.setHash()}}},{name:"autoplay",params:{autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1}},create:function(){var e=this;n.extend(e,{autoplay:{running:!1,paused:!1,run:ue.run.bind(e),start:ue.start.bind(e),stop:ue.stop.bind(e),pause:ue.pause.bind(e),onVisibilityChange:function(){"hidden"===document.visibilityState&&e.autoplay.running&&e.autoplay.pause(),"visible"===document.visibilityState&&e.autoplay.paused&&(e.autoplay.run(),e.autoplay.paused=!1)},onTransitionEnd:function(t){e&&!e.destroyed&&e.$wrapperEl&&t.target===this&&(e.$wrapperEl[0].removeEventListener("transitionend",e.autoplay.onTransitionEnd),e.$wrapperEl[0].removeEventListener("webkitTransitionEnd",e.autoplay.onTransitionEnd),e.autoplay.paused=!1,e.autoplay.running?e.autoplay.run():e.autoplay.stop())}}})},on:{init:function(){this.params.autoplay.enabled&&(this.autoplay.start(),document.addEventListener("visibilitychange",this.autoplay.onVisibilityChange))},beforeTransitionStart:function(e,t){this.autoplay.running&&(t||!this.params.autoplay.disableOnInteraction?this.autoplay.pause(e):this.autoplay.stop())},sliderFirstMove:function(){this.autoplay.running&&(this.params.autoplay.disableOnInteraction?this.autoplay.stop():this.autoplay.pause())},touchEnd:function(){this.params.cssMode&&this.autoplay.paused&&!this.params.autoplay.disableOnInteraction&&this.autoplay.run()},destroy:function(){this.autoplay.running&&this.autoplay.stop(),document.removeEventListener("visibilitychange",this.autoplay.onVisibilityChange)}}},{name:"effect-fade",params:{fadeEffect:{crossFade:!1}},create:function(){n.extend(this,{fadeEffect:{setTranslate:ve.setTranslate.bind(this),setTransition:ve.setTransition.bind(this)}})},on:{beforeInit:function(){if("fade"===this.params.effect){this.classNames.push(this.params.containerModifierClass+"fade");var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};n.extend(this.params,e),n.extend(this.originalParams,e)}},setTranslate:function(){"fade"===this.params.effect&&this.fadeEffect.setTranslate()},setTransition:function(e){"fade"===this.params.effect&&this.fadeEffect.setTransition(e)}}},{name:"effect-cube",params:{cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}},create:function(){n.extend(this,{cubeEffect:{setTranslate:fe.setTranslate.bind(this),setTransition:fe.setTransition.bind(this)}})},on:{beforeInit:function(){if("cube"===this.params.effect){this.classNames.push(this.params.containerModifierClass+"cube"),this.classNames.push(this.params.containerModifierClass+"3d");var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0};n.extend(this.params,e),n.extend(this.originalParams,e)}},setTranslate:function(){"cube"===this.params.effect&&this.cubeEffect.setTranslate()},setTransition:function(e){"cube"===this.params.effect&&this.cubeEffect.setTransition(e)}}},{name:"effect-flip",params:{flipEffect:{slideShadows:!0,limitRotation:!0}},create:function(){n.extend(this,{flipEffect:{setTranslate:me.setTranslate.bind(this),setTransition:me.setTransition.bind(this)}})},on:{beforeInit:function(){if("flip"===this.params.effect){this.classNames.push(this.params.containerModifierClass+"flip"),this.classNames.push(this.params.containerModifierClass+"3d");var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};n.extend(this.params,e),n.extend(this.originalParams,e)}},setTranslate:function(){"flip"===this.params.effect&&this.flipEffect.setTranslate()},setTransition:function(e){"flip"===this.params.effect&&this.flipEffect.setTransition(e)}}},{name:"effect-coverflow",params:{coverflowEffect:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0}},create:function(){n.extend(this,{coverflowEffect:{setTranslate:ge.setTranslate.bind(this),setTransition:ge.setTransition.bind(this)}})},on:{beforeInit:function(){"coverflow"===this.params.effect&&(this.classNames.push(this.params.containerModifierClass+"coverflow"),this.classNames.push(this.params.containerModifierClass+"3d"),this.params.watchSlidesProgress=!0,this.originalParams.watchSlidesProgress=!0)},setTranslate:function(){"coverflow"===this.params.effect&&this.coverflowEffect.setTranslate()},setTransition:function(e){"coverflow"===this.params.effect&&this.coverflowEffect.setTransition(e)}}},{name:"thumbs",params:{thumbs:{swiper:null,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-container-thumbs"}},create:function(){n.extend(this,{thumbs:{swiper:null,init:be.init.bind(this),update:be.update.bind(this),onThumbClick:be.onThumbClick.bind(this)}})},on:{beforeInit:function(){var e=this.params.thumbs;e&&e.swiper&&(this.thumbs.init(),this.thumbs.update(!0))},slideChange:function(){this.thumbs.swiper&&this.thumbs.update()},update:function(){this.thumbs.swiper&&this.thumbs.update()},resize:function(){this.thumbs.swiper&&this.thumbs.update()},observerUpdate:function(){this.thumbs.swiper&&this.thumbs.update()},setTransition:function(e){var t=this.thumbs.swiper;t&&t.setTransition(e)},beforeDestroy:function(){var e=this.thumbs.swiper;e&&this.thumbs.swiperCreated&&e&&e.destroy()}}}];return void 0===W.use&&(W.use=W.Class.use,W.installModule=W.Class.installModule),W.use(we),W}));
//# sourceMappingURL=swiper.min.js.map
$(document).ready(function () {
    $(".accordion-body").hide();
    $(".accordion-section").first().addClass("open");
    $(".accordion-section").first().children(".accordion-body").slideDown();
    $(".accordion-header").click(function () {
        if (!$(this).parent(".accordion-section").hasClass("open")) {
            $(".accordion-body").slideUp();
            $(".accordion-section").removeClass("open");
            $(this).siblings(".accordion-body").slideDown();
            $(this).parent(".accordion-section").addClass("open");
        }
    });
});
// main.js

function dropdownFunction() {
  document.getElementById("unitsDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];

      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function initMap() {
  var locations = [
    [
      (unit = "616517"),
      (lat = 45.5471),
      (long = -122.9139),
      (propertyId = 4),
      (property = "Intel-RB1"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis one")
    ],
    [
      (unit = "610512"),
      (lat = 42.9961),
      (long = -89.5689),
      (propertyId = 3),
      (property = "Voyager Hall"),
      (alert = true),
      (status = "Disconnected"),
      (type = "otis one")
    ],
    [
      (unit = "616540"),
      (lat = 33.723),
      (long = -117.8024),
      (propertyId = 2),
      (property = "Kaiser Permanente Tustin Ranch Medical Offices"),
      (alert = false),
      (status = "Shutdown"),
      (type = "otis one")
    ],
    [
      (unit = "636863"),
      (lat = 26.88179),
      (long = -80.125),
      (propertyId = 1),
      (property = "UTC Center for Intelligent Buildings"),
      (alert = false),
      (status = "Disconnected"),
      (type = "otis one")
    ],
    [
      (unit = "636864"),
      (lat = 26.88177),
      (long = -80.12502),
      (propertyId = 1),
      (property = "UTC Center for Intelligent Buildings"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis one")
    ],
    [
      (unit = "636874"),
      (lat = 22.88177),
      (long = -80.12502),
      (propertyId = 6),
      (property = "Building 1"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis")
    ],
    [
      (unit = "636870"),
      (lat = 20.88177),
      (long = -80.12502),
      (propertyId = 5),
      (property = "Building 2"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis")
    ]
  ];
  var styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ffffff"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e"
        }
      ]
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878"
        }
      ]
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#172f50"
        }
      ]
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#172f50"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680"
        }
      ]
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#172f50"
        }
      ]
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70"
        }
      ]
    }
  ];

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    disableDefaultUI: true,
    styles: styles
  });
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow();
  var alertwindow = new google.maps.InfoWindow();
  var marker,
    alertMarker,
    i,
    j,
    alertCount = 0,
    otisOneCount = 0,
    otisOneIcon = "";
  //number of units in dropdown
  var totalNumberOfUnits = (function() {
    var dropbtn = document.getElementById("dropbtn");
    var selected = "Select from all units (" + locations.length + ")";
    dropbtn.innerHTML += selected;
  })();

  for (i = 0; i < locations.length; i++) {
    var num = locations[i][3];
    var name = locations[i][4];
    var filterLoc = locations
      .filter(function(loc) {
        return loc[3] === num;
      })
      .map(function(locat) {
        return locat;
      });

    //number of alerts in map footer
    var totalNumberOfAlerts = (function() {
      if (locations[i][5] && locations[i][7] == "otis one") {
        alertCount++;
        document.getElementById("otis-map__alert").innerHTML =
          "<i class='icon-alert'></i>Alerts (" + alertCount + ")";
      }
    })();

    //map footer alerts tooltip
    var footerAlertsToolTip = (function() {
      var alertLoc =
        locations[i][5] && locations[i][7] == "otis one"
          ? locations
              .filter(function(loc) {
                return loc[3] === locations[i][3];
              })
              .map(function(locat) {
                return locat;
              })
              .filter(function(loc) {
                return loc[5] == true;
              })
              .map(function(loc) {
                return loc[0];
              })
          : "";
      var alertUnits =
        locations[i][5] && locations[i][7] == "otis one"
          ? "<div class='alertwindow'><span class='alertwindow__header'><span>" +
            locations[i][4] +
            "</span></span><ul class='alertwindow__list'>" +
            alertLoc.map(function(loc) {
              return (
                "<li><img src='assets/images/alert.svg'/><a href='unitsUrl/" +
                loc +
                "'>Unit : " +
                loc +
                "<span class='alertwindow__status'>" +
                locations[i][6] +
                "</span></a></li>"
              );
            }) +
            "</ul></div>"
          : "";
      document.getElementById(
        "otis-map__alert-tooltip"
      ).innerHTML += alertUnits;
    })();

    //number  of otis one units in map footer
    var numberOfOtisOneUnits = (function() {
      if (locations[i][7] == "otis one") {
        otisOneCount++;
        document.getElementById("otis-map__unit").innerHTML =
          "<i class='icon-location'></i>Displaying " +
          otisOneCount +
          " Otis One units";
      }
    })();
    //dropdown options
    var dropdownOptions = (function() {
      var dropdown = document.getElementById("unitsDropdown");
      if (locations[i][7] == "otis one") {
        otisOneIcon = "<i class='icon-smart-energy'></i>";
      } else otisOneIcon = "<img style='width:28px'></img>";

      $("#unitsDropdown, #otis-map__alert-tooltip").niceScroll({
        cursorcolor: "#021227",
        cursorborder: "1px solid #586981",
        cursorwidth: "6px"
      });
      var option =
        "<ul><span id='" +
        num +
        "'>" +
        name +
        "</span>" +
        filterLoc
          .map(function(loc) {
            return (
              "<li><a href='unitsUrl/" +
              loc[0] +
              "'>" +
              otisOneIcon +
              "  " +
              loc[0] +
              "</a></li>"
            );
          })
          .join("") +
        "";
      if (!document.getElementById(num)) dropdown.innerHTML += option;
    })();

    //adding markers on map
    var addMarkersOnMap = (function() {
      var markerImage = {
        url: "assets/images/marker.svg",
        size: new google.maps.Size(46, 46),
        scaledSize: new google.maps.Size(50, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(25, 12)
      };
      marker =
        locations[i][7] == "otis one"
          ? new google.maps.Marker({
              position: new google.maps.LatLng(
                locations[i][1],
                locations[i][2]
              ),
              map: map,
              label: {
                text: "" + filterLoc.length,
                color: "black"
              },
              icon: markerImage,
              zIndex: 1
            })
          : "";
      if (locations[i][7] == "otis one") {
        loc = new google.maps.LatLng(
          marker.position.lat(),
          marker.position.lng()
        );
        bounds.extend(loc);
      }
    })();
    //adding alerts markers on map
    var addingAlertMarkersOnMap = (function() {
      var alertImage = {
        url: "assets/images/alert.svg",
        size: new google.maps.Size(46, 46),
        scaledSize: new google.maps.Size(50, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 0),
        labelOrigin: new google.maps.Point(25, 16)
      };
      alertMarker =
        locations[i][5] && locations[i][7] == "otis one"
          ? new google.maps.Marker({
              position: new google.maps.LatLng(
                locations[i][1],
                locations[i][2]
              ),
              map: map,
              label: {
                text:
                  "" +
                  filterLoc
                    .filter(function(loc) {
                      return loc[5] == true;
                    })
                    .map(function(loc) {
                      return loc;
                    }).length,
                color: "black"
              },
              icon: alertImage,
              zIndex: 1
            })
          : "";
    })();

    //normal markers events
    var markersEvents = (function() {
      markerHover =
        locations[i][7] == "otis one"
          ? google.maps.event.addListener(
              marker,
              "mouseover",
              (function(marker, i) {
                return function() {
                  var filtLoc = locations
                    .filter(function(loc) {
                      return loc[3] === locations[i][3];
                    })
                    .map(function(locat) {
                      return locat[0];
                    });
                  var units =
                    "<div class='infowindow'><span class='infowindow__header'><span>" +
                    locations[i][4] +
                    "</span></span><ul class='infowindow__list'>" +
                    filtLoc
                      .map(function(loc) {
                        return (
                          "<li><a href='unitsUrl/" +
                          loc +
                          "'>Unit : " +
                          loc +
                          "</a></li>"
                        );
                      })
                      .join(" ") +
                    "</ul></div>";
                  alertwindow.close();
                  infowindow.setContent(units);
                  infowindow.innerHTML += units;
                  infowindow.open(map, marker);
                };
              })(marker, i)
            )
          : "";

      var windX = window.matchMedia("(max-width: 1024px)");
      if (windX.matches) {
        markerClickMobile =
          locations[i][7] == "otis one"
            ? google.maps.event.addListener(
                marker,
                "click",
                (function(marker, i) {
                  return function() {
                    var filtLoc = locations
                      .filter(function(loc) {
                        return loc[3] === locations[i][3];
                      })
                      .map(function(locat) {
                        return locat[0];
                      });
                    var units =
                      "<div class='infowindow'><span class='infowindow__header'><span>" +
                      locations[i][4] +
                      "</span></span><ul class='infowindow__list'>" +
                      filtLoc
                        .map(function(loc) {
                          return (
                            "<li><a href='unitsUrl/" +
                            loc +
                            "'>Unit : " +
                            loc +
                            "</a></li>"
                          );
                        })
                        .join(" ") +
                      "</ul></div>";
                    alertwindow.close();
                    infowindow.setContent(units);
                    infowindow.innerHTML += units;
                    infowindow.open(map, marker);
                  };
                })(marker, i)
              )
            : "";
      } else {
        markerClick =
          locations[i][7] == "otis one"
            ? google.maps.event.addListener(
                marker,
                "click",
                (function(marker, i) {
                  return function() {
                    var filtLoc = locations
                      .filter(function(loc) {
                        return loc[3] === locations[i][3];
                      })
                      .map(function(locat) {
                        return locat[0];
                      });
                    window.location = "/unitUrl/" + locations[i][0];
                  };
                })(marker, i)
              )
            : "";
      }
    })();

    //alert markers events
    var alertMarkerEvents = (function() {
      alertHover =
        locations[i][5] && locations[i][7] == "otis one"
          ? google.maps.event.addListener(
              alertMarker,
              "mouseover",
              (function(alertMarker, i) {
                return function() {
                  var filtLoc = locations
                    .filter(function(loc) {
                      return loc[3] === locations[i][3];
                    })
                    .map(function(locat) {
                      return locat;
                    })
                    .filter(function(loc) {
                      return loc[5] == true;
                    })
                    .map(function(loc) {
                      return loc[0];
                    });
                  var unit =
                    "<div class='alertwindow'><span class='alertwindow__header'><span>" +
                    locations[i][4] +
                    "</span></span><ul class='alertwindow__list'>" +
                    filtLoc.map(function(loc) {
                      return (
                        "<li><img src='assets/images/alert.svg'/><a href='unitsUrl/" +
                        loc +
                        "'>Unit : " +
                        loc +
                        "<span class='alertwindow__status'>" +
                        locations[i][6] +
                        "</span></a></li>"
                      );
                    }) +
                    "</ul></div>";
                  infowindow.close();
                  alertwindow.setContent(unit);
                  alertwindow.innerHTML += unit;
                  alertwindow.open(map, alertMarker);
                };
              })(alertMarker, i)
            )
          : "";
      alertClick =
        locations[i][5] && locations[i][7] == "otis one"
          ? google.maps.event.addListener(
              alertMarker,
              "click",
              (function(alertMarker, i) {
                return function() {
                  var filtLoc = locations
                    .filter(function(loc) {
                      return loc[3] === locations[i][3];
                    })
                    .map(function(locat) {
                      return locat;
                    })
                    .filter(function(loc) {
                      return loc[5] == true;
                    })
                    .map(function(loc) {
                      return loc[0];
                    });
                  var unit =
                    "<div class='alertwindow'><span class='alertwindow__header'><span>" +
                    locations[i][4] +
                    "</span></span><ul class='alertwindow__list'>" +
                    filtLoc.map(function(loc) {
                      return (
                        "<li><img src='assets/images/alert.svg'/><a href=unitsUrl/" +
                        loc +
                        "'>Unit : " +
                        loc +
                        "<span class='alertwindow__status'>" +
                        locations[i][6] +
                        "</span></a></li>"
                      );
                    }) +
                    "</ul></div>";
                  infowindow.close();
                  alertwindow.setContent(unit);
                  alertwindow.innerHTML += unit;
                  alertwindow.open(map, alertMarker);
                };
              })(alertMarker, i)
            )
          : "";
    })();
  }
  map.fitBounds(bounds);
  map.panToBounds(bounds);
}

$(document).ready(function () {
    if ($('#reports__chart').length) {
        Highcharts.chart('reports__chart', {
            chart: {
                // Edit chart spacing
                spacingBottom: 0,
                spacingTop: 35,
                spacingLeft: 16,
                spacingRight: 20,
                // Explicitly tell the width and height of a chart
                width: null,
                height: null
            },
            yAxis: {
                gridLineColor: '#67859E',
                title: {
                    text: ""
                }
            },
            plotOptions: {
                line: {
                    color: "#fff"
                }
            },
            series: [{
                name: "",
                data: [5, 20, 25, 50, 37, 70, 75, 50, 55, 60, 90]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 767
                    },
                    chartOptions: {
                        chart: {
                            height: 300
                        }
                    }
                }]
            }
        });
    }
})
$(document).ready(function() {
  var form = document.getElementById("service-request__form");
  var formInvalidText = document.getElementById("service-request__invalid-text");
  var formBtn = document.getElementById("service-request__button");
  //invalid form state
  form.addEventListener(
    "invalid",
    function(event) {
      this.classList.add("check");
      formInvalidText.classList.add("service-request__invalid-text--show");
      formBtn.classList.add("service-request__button-invalid");
      event.preventDefault();
    },
    true
  );

  //reset form
  form.addEventListener("reset", function(event) {
    this.classList.remove("check");
    formInvalidText.classList.remove("service-request__invalid-text--show");
    formBtn.classList.remove("service-request__button-invalid");
  });
});

$(document).ready(function () {
    // Detect Media & Handle Responsive 
    let desktopMedia = window.matchMedia("(min-width: 768px)");
    detectMedia(desktopMedia) // Call listener function at run time
    desktopMedia.addListener(detectMedia) // Attach listener function on state changes
    function detectMedia(desktopMedia) {
        if (desktopMedia.matches) {
            //Monica
            if ($(".service-requests-section").hasClass("full-height")) {
                $(".tickets-accordion__body").addClass("inline");
                showFullHeight();
            } else {
                initSwiper();
            }
            showAllTickets();
        } else {
            handleShowMoreBtn();
        }
    }
    //this function for showing all tickets before init swiper to fix resizing issue
    function showAllTickets() {
        $('.tickets-accordion__ticket-card').show();
    }
    function showFullHeight() {
        var count = 3;
        if ($(window).width() > 1400) { count = 8 }
    
        else if ($(window).width() > 1200) { count = 5 }
        else if ($(window).width() > 992) { count = 3 }
        $(".swiper-wrapper").each(function () {
            if ($(this).find(".swiper-slide").length > count) {
                $(this).find(".swiper-slide").show(5);
                $(this).find(".swiper-slide:nth-child(n+" + (count + 1) + ")").hide(5);
                $(this).find(".swiper-slide.more").remove();
                $(this).append("<div class='swiper-slide tickets-accordion__ticket-card open more'>" +
                    "and <span class='count'>" +
                    ( $(this).find(".swiper-slide:not('.more')").length - count )+
                    "</span> more tickets in service requests page." +
                    "<a href='javascript:void(0);' class='view-all'>view all <span class='icon-right-arrow'></span>" +
                    "</a></div>");
            }
        });
    }
    $(window).resize(function () {
        showFullHeight();
    });
    // Initialize Swiper
    function initSwiper() {
        let op_swiper = new Swiper('.opened-tickets-swiper', {
            spaceBetween: 8,
            speed: 500,
            slidesPerView: 3,
            loadPrevNext: true,
            navigation: {
                nextEl: '.swiper-button-next.open',
                prevEl: '.swiper-button-prev.open',
            },
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1250: {
                    slidesPerView: 3
                }
            },
            on: {
                observerUpdate: function () {
                    op_swiper.slideTo(0);
                }
            }
        });
        let cl_swiper = new Swiper('.closed-tickets-swiper', {
            spaceBetween: 8,
            speed: 500,
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next.closed',
                prevEl: '.swiper-button-prev.closed',
            },
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1250: {
                    slidesPerView: 3
                }
            }
        });
        document.getElementById("service-request__form").addEventListener(
            "submit",
            function (event) {
                event.preventDefault();
                var d = new Date($.now());
                var hours = d.getHours() % 12;
                hours = hours ? hours : 12;
                var time = d.getHours() >= 12 ? 'PM' : 'AM';
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                op_swiper.prependSlide([
                    "<div class='swiper-slide tickets-accordion__ticket-card open swiper-slide-active added'>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--title'>" +
                    "<i class='icon-tickets'></i>" +
                    $("#service-request__form [placeholder='Details']").val() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--elevator'>" +
                    $("#service-request__form #unit option:selected").text() +
                    "<br/>" +
                    23890487 +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--location'>" +
                    "<i class='icon-location'></i> " +
                    $("#service-request__form #location option:selected").text() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time first'><span>Created:</span> <b>" +
                    hours + ":" + d.getMinutes() + time + " " + d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear() + " " +
                    "</b>" +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time'><span>Updated:</span> <b>" +
                    "New" +
                    "</b>" +
                    "</div>" +
                    "</div>"
                ]);
                setTimeout(
                    function () {
                        $(".swiper-slide").removeClass("added");
                    }, 2000);
                $(this).trigger("reset");
                $('.tickets-accordion__header-counter--open').html(parseInt($('.tickets-accordion__header-counter--open').html(), 10) + 1);
            }
        );
    }
    // Prevent accordion from closing itself & keep at least one opened
    $('[data-toggle="collapse"]').on('click', function (e) {
        if ($(this).parents('.accordion').find('.collapse.show')) {
            var idx = $(this).index('[data-toggle="collapse"]');
            if (idx == $('.collapse.show').index('.collapse')) {
                e.stopPropagation();
                e.preventDefault();
            }
        }
    });
    // Handling open closed tickets on mobile
    $('#headingTwo2').on('click', function (e) {
        if (!desktopMedia.matches) {
            $('html, body').animate({
                scrollTop: $('#collapseTwo2').offset().top
            }, 500);
        }
    })
    // Handling Load More functionality
    function handleShowMoreBtn() {
        let open_clicks = 0;
        let closed_clicks = 0;
        // Show more open tickets
        if ($('.tickets-accordion__ticket-card.open').length > 3) {
            $('#show-more-open').show();
            $('.tickets-accordion__ticket-card.open:gt(2)').hide();
            $('#show-more-open button').on('click', function () {
                switch (open_clicks) {
                    case 0:
                        $('.tickets-accordion__ticket-card.open').slice(2, 6).show();
                        ++open_clicks;
                        break;
                    case 1:
                        $('.tickets-accordion__ticket-card.open').slice(6).show();
                        ++open_clicks;
                        break;
                    case 2:
                        confirm("Go to Service Requests Page!");
                        break;
                }
            });
        }
        // Show more closed tickets
        if ($('.tickets-accordion__ticket-card.closed').length > 3) {
            $('#show-more-closed').show();
            $('.tickets-accordion__ticket-card.closed:gt(2)').hide();
            $('#show-more-closed button').on('click', function () {
                switch (closed_clicks) {
                    case 0:
                        $('.tickets-accordion__ticket-card.closed').slice(2, 6).show();
                        ++closed_clicks;
                        break;
                    case 1:
                        $('.tickets-accordion__ticket-card.closed').slice(6).show();
                        ++closed_clicks;
                        break;
                    case 2:
                        confirm("Go to Service Requests Page!");
                        break;
                }
            });
        }
    }
    //adding item to full-height component
    document.getElementById("service-request__form").addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            if ($(".service-requests-section").hasClass("full-height")) {
                var d = new Date($.now());
                var hours = d.getHours() % 12;
                hours = hours ? hours : 12;
                var time = d.getHours() >= 12 ? 'PM' : 'AM';
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                $("#opened-tickets-collapse .swiper-wrapper").prepend(
                    "<div class='swiper-slide tickets-accordion__ticket-card open swiper-slide-active added'>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--title'>" +
                    "<i class='icon-tickets'></i>" +
                    $("#service-request__form [placeholder='Details']").val() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--elevator'>" +
                    $("#service-request__form #unit option:selected").text() +
                    "<br/>" +
                    23890487 +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--location'>" +
                    "<i class='icon-location'></i> " +
                    $("#service-request__form #location option:selected").text() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time first'><span>Created:</span> <b>" +
                    hours + ":" + d.getMinutes() + time + " " + d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear() + " " +
                    "</b>" +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time'><span>Updated:</span> <b>" +
                    "New" +
                    "</b>" +
                    "</div>" +
                    "</div>"
                );
                showFullHeight();
                setTimeout(
                    function () {
                        $(".swiper-slide").removeClass("added");
                    }, 2000);
                $(this).trigger("reset");
            }
        }
    );
});
$(document).ready(function() {
  $(".otis-nav__toggle").click(function() {
    //toggle icon-bar
    $(this).toggleClass("change");
    $(".otis-nav__items").toggleClass("change-toggle");

   });

  //toogle active link
  $("li.otis-nav__link").click(function() {
    $(this).addClass("active-link").siblings().removeClass("active-link");

    //hide red notification circle
    $(".otis-nav__notification-alert").hide();
  });

  //toggle notifications
  $(".otis__notifications,.otis-nav__notifications-close").click(function() {
    $(".otis-nav__notifications-items").toggleClass("toogle-notifications");
  });
  
  // hide notification when click pages link
  $("li.otis-nav__link:not(:first-child)").click(function() {
    $(".otis-nav__notifications-items").addClass("toogle-notifications");
  });
});
