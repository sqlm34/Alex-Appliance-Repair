(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var scrollMarks = [25, 50, 75, 90];
  var sentScrollMarks = {};
  var scrollFrame = null;

  document.documentElement.setAttribute("data-gtm-monitoring", "ready");

  function extend(target, source) {
    var key;

    target = target || {};
    source = source || {};

    for (key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }

    return target;
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 140);
  }

  var cityMap = {
    carmel: "Carmel",
    fishers: "Fishers",
    noblesville: "Noblesville",
    westfield: "Westfield",
    zionsville: "Zionsville",
    mccordsville: "McCordsville",
    indianapolis: "Indianapolis",
    castleton: "Castleton"
  };

  var serviceMap = {
    refrigerator: "Refrigerator Repair",
    washer: "Washer Repair",
    dryer: "Dryer Repair",
    dishwasher: "Dishwasher Repair",
    microwave: "Microwave Repair",
    freezer: "Freezer Repair",
    stove: "Stove Repair",
    cooktop: "Cooktop Repair",
    oven: "Oven Repair",
    icemaker: "Ice Maker Repair",
    "ice-maker": "Ice Maker Repair"
  };

  function findMappedValue(path, map) {
    var key;

    for (key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key) && path.indexOf(key) !== -1) {
        return map[key];
      }
    }

    return "";
  }

  function getPageType(path) {
    if (path === "/" || path === "/index.html") {
      return "home";
    }
    if (path.indexOf("/blog") === 0 || path.indexOf("blog-") !== -1) {
      return "blog";
    }
    if (path.indexOf("/brands") === 0 || path.indexOf("appliance-repair.html") !== -1) {
      return "brand";
    }
    if (path.indexOf("repair") !== -1 || path.indexOf("services") !== -1) {
      return "service";
    }
    if (findMappedValue(path, cityMap)) {
      return "city";
    }

    return "general";
  }

  function pageContext() {
    var path = window.location.pathname.toLowerCase();

    return {
      page_path: window.location.pathname,
      page_title: document.title,
      page_type: getPageType(path),
      service_city: findMappedValue(path, cityMap),
      service_type: findMappedValue(path, serviceMap)
    };
  }

  function eventPayload(extra) {
    return extend(pageContext(), extra || {});
  }

  function sendEvent(name, extra) {
    var payload = eventPayload(extra);

    document.documentElement.setAttribute("data-gtm-last-event", name);

    window.dataLayer.push(extend({
      event: name
    }, payload));
  }

  function classifyLink(link) {
    var href = link.getAttribute("href") || "";
    var text = cleanText(link.textContent || link.getAttribute("aria-label") || "");
    var lowerHref = href.toLowerCase();
    var lowerText = text.toLowerCase();

    if (lowerHref.indexOf("tel:") === 0) {
      return { event: "phone_click", type: "phone" };
    }
    if (lowerHref.indexOf("mailto:") === 0) {
      return { event: "email_click", type: "email" };
    }
    if (lowerHref.indexOf("online-booking.workiz.com") !== -1 || lowerText.indexOf("booking") !== -1 || lowerText.indexOf("book") !== -1) {
      return { event: "booking_click", type: "booking" };
    }
    if (lowerHref.indexOf("whatsapp") !== -1) {
      return { event: "whatsapp_click", type: "whatsapp" };
    }
    if (lowerHref.indexOf("telegram") !== -1 || lowerHref.indexOf("t.me") !== -1) {
      return { event: "telegram_click", type: "telegram" };
    }
    if (link.hostname && link.hostname !== window.location.hostname) {
      return { event: "outbound_click", type: "outbound" };
    }

    return null;
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");

    if (!link) {
      return;
    }

    var classified = classifyLink(link);

    if (!classified) {
      return;
    }

    var shouldDelayBooking = classified.type === "booking" &&
      !event.defaultPrevented &&
      (typeof event.button !== "number" || event.button === 0) &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !link.target &&
      link.href;

    sendEvent(classified.event, {
      link_type: classified.type,
      link_url: link.href,
      link_text: cleanText(link.textContent || link.getAttribute("aria-label") || link.href)
    });

    if (shouldDelayBooking) {
      event.preventDefault();
      window.setTimeout(function () {
        window.location.href = link.href;
      }, 350);
    }
  }, true);

  document.addEventListener("submit", function (event) {
    var form = event.target;

    if (!form || form.tagName !== "FORM") {
      return;
    }

    sendEvent("form_submit", {
      form_id: form.id || "",
      form_name: form.getAttribute("name") || "",
      form_action: form.action || window.location.href
    });
  }, true);

  function handleScrollDepth() {
    var doc = document.documentElement;
    var body = document.body;
    var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
    var scrollHeight = Math.max(body.scrollHeight, doc.scrollHeight, body.offsetHeight, doc.offsetHeight);
    var viewport = window.innerHeight || doc.clientHeight || 0;
    var available = scrollHeight - viewport;

    if (available <= 0) {
      return;
    }

    var percent = Math.round((scrollTop / available) * 100);

    scrollMarks.forEach(function (mark) {
      if (percent >= mark && !sentScrollMarks[mark]) {
        sentScrollMarks[mark] = true;
        sendEvent("scroll_depth", {
          scroll_percent: mark
        });
      }
    });
  }

  function scheduleScrollDepth() {
    if (scrollFrame) {
      return;
    }
    scrollFrame = window.requestAnimationFrame(function () {
      scrollFrame = null;
      handleScrollDepth();
    });
  }

  window.addEventListener("scroll", scheduleScrollDepth, { passive: true });
  window.addEventListener("load", function () {
    sendEvent("site_monitoring_ready", {
      monitor_version: "20260624"
    });
    scheduleScrollDepth();
  });
})();
