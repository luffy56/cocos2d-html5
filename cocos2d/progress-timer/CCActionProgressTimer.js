/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (C) 2010      Lam Pham

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * Progress to percentage
 * @class
 * @extends cc.ActionInterval
 */
cc.ProgressTo = cc.ActionInterval.extend(/** @lends cc.ProgressTo# */{
    _to:0,
    _from:0,

	/**
	 * Creates a ProgressTo action with a duration and a percent
	 * Constructor of cc.ProgressTo
	 * @param {Number} duration duration in seconds
	 * @param {Number} percent
	 * @example
	 * var to = new cc.ProgressTo(2, 100);
	 */
    ctor: function(duration, percent){
        cc.ActionInterval.prototype.ctor.call(this);
        this._to = 0;
        this._from = 0;

		percent !== undefined && this.initWithDuration(duration, percent);
    },

    /** Initializes with a duration and a percent
     * @param {Number} duration duration in seconds
     * @param {Number} percent
     * @return {Boolean}
     */
    initWithDuration:function (duration, percent) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this._to = percent;
            return true;
        }
        return false;
    },

    clone:function(){
        var action = new cc.ProgressTo();
        action.initWithDuration(this._duration, this._to);
        return action;
    },

    reverse: function(){
        cc.log("cc.ProgressTo.reverse(): reverse hasn't been supported.");
        return null;
    },

    /**
     * @param {cc.Node} target
     */
    startWithTarget:function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this._from = target.percentage;

        // XXX: Is this correct ?
        // Adding it to support CCRepeat
        if (this._from == 100)
            this._from = 0;
    },

    /**
     * @param {Number} time time in seconds
     */
    update:function (time) {
        if (this.target  instanceof cc.ProgressTimer)
            this.target.percentage = this._from + (this._to - this._from) * time;
    }
});

/** Creates and initializes with a duration and a percent
 * @deprecated
 * @param {Number} duration duration in seconds
 * @param {Number} percent
 * @return {cc.ProgressTo}
 * @example
 * // example
 * var to = cc.ProgressTo.create(2, 100);
 */
cc.ProgressTo.create = function (duration, percent) {
    return new cc.ProgressTo(duration, percent);
};

/**
 * Progress from a percentage to another percentage
 * @class
 * @extends cc.ActionInterval
 */
cc.ProgressFromTo = cc.ActionInterval.extend(/** @lends cc.ProgressFromTo# */{
    _to:0,
    _from:0,

	/**
	 * Creates and initializes the action with a duration, a "from" percentage and a "to" percentage
	 * Constructor of cc.ProgressFromTo
	 * @param {Number} duration duration in seconds
	 * @param {Number} fromPercentage
	 * @param {Number} toPercentage
	 * @example
	 *  var fromTo = new cc.ProgressFromTo(2, 100.0, 0.0);
	 */
    ctor:function(duration, fromPercentage, toPercentage){
        cc.ActionInterval.prototype.ctor.call(this);
        this._to = 0;
        this._from = 0;

		toPercentage !== undefined && this.initWithDuration(duration, fromPercentage, toPercentage);
    },

    /** Initializes the action with a duration, a "from" percentage and a "to" percentage
     * @param {Number} duration duration in seconds
     * @param {Number} fromPercentage
     * @param {Number} toPercentage
     * @return {Boolean}
     */
    initWithDuration:function (duration, fromPercentage, toPercentage) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this._to = toPercentage;
            this._from = fromPercentage;
            return true;
        }
        return false;
    },

    clone:function(){
        var action = new cc.ProgressFromTo();
        action.initWithDuration(this._duration, this._from, this._to);
        return action;
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.ProgressFromTo.create(this._duration, this._to, this._from);
    },

    /**
     * @param {cc.Node} target
     */
    startWithTarget:function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
    },

    /**
     * @param {Number} time time in seconds
     */
    update:function (time) {
        if (this.target  instanceof cc.ProgressTimer)
            this.target.percentage = this._from + (this._to - this._from) * time;
    }
});

/** Creates and initializes the action with a duration, a "from" percentage and a "to" percentage
 * @deprecated
 * @param {Number} duration duration in seconds
 * @param {Number} fromPercentage
 * @param {Number} toPercentage
 * @return {cc.ProgressFromTo}
 * @example
 * // example
 *  var fromTO = cc.ProgressFromTo.create(2, 100.0, 0.0);
 */
cc.ProgressFromTo.create = function (duration, fromPercentage, toPercentage) {
    return new cc.ProgressFromTo(duration, fromPercentage, toPercentage);
};
