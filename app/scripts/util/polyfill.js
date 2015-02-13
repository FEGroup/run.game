this.Event = function Event(type, eventInitDict) {
    if (!type) {
        throw new Error('Not enough arguments');
    }

    var event = document.createEvent('Event'),
        bubbles = eventInitDict && eventInitDict.bubbles !== void 0 ? eventInitDict.bubbles : false,
        cancelable = eventInitDict && eventInitDict.cancelable !== void 0 ? eventInitDict.cancelable : false;

    event.initEvent(type, bubbles, cancelable);

    return event;
};
