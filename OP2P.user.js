// ==UserScript==
// @name         OP2P1v1
// @namespace    https://example.com/
// @version      11.7.0
// @updateURL    https://raw.githubusercontent.com/OP2P/OP2P-LatestUpdate/main/OP2P.user.js
// @downloadURL  https://raw.githubusercontent.com/OP2P/OP2P-LatestUpdate/main/OP2P.user.js
// @description  OP2P1 Premium Dashboard with hardened license security, audit, browser identity, health monitoring and secure fail-closed recovery
// @match        https://www.facebook.com/*
// @match        https://web.facebook.com/*
// @match        https://m.facebook.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @connect      script.google.com
// @connect      script.googleusercontent.com
// ==/UserScript==

/* OP2P Secure Distribution V11.7.0 | Production Hardening | Idle auto-refresh | Integrity baseline aligned */
(() => {
"use strict";


if (window.top !== window.self) return;




const _0x001 = "https://script.google.com/macros/s/AKfycbzb8GMrYF7dfz2QHTpxGOvbxwpYmBMTzrlT84dPRYuaIWtOyklY8Dhszf_A_SxDC7m5Yw/exec";
const _0x002 = "OP2P_LICENSE_KEY_V7";
const _0x003 = "OP2P_BROWSER_ID_V7";
const _0x004 = "OP2P_SESSION_ID_V2";
const _0x005 = "OP2P_LAST_VALID_TS_V1";
const _0x006 = 15 * 60 * 1000; 
const _0x007 = "11.7.0";
const OP2P_UPDATE_CENTER_URL = "https://op2p.github.io/OP2P-LatestUpdate/index.html";
const _0x008 = "OP2P_CLIENT_HEALTH_V10";
const OP2P_POLICY_STORAGE = "OP2P_SERVER_POLICY_V11_7_0";
const OP2P_AUTO_REFRESH_MS = 15 * 60 * 1000;
const OP2P_AUTO_REFRESH_CHECK_MS = 30 * 1000;
const OP2P_AUTO_REFRESH_STATE = "OP2P_AUTO_REFRESH_STATE_V1";
let op2pServerPolicy = { plan:"PRO", customer:"", status:"ACTIVE", licenseState:"ACTIVATED", expiry:"", startDate:"", browserLocked:true, sessionExpires:"", actionsUsed:0, maxActionsPerSession:0, clientStatus:"ONLINE", lastHealthSeen:"", lastSeen:"", securityAlerts:0, healthErrors:0, systemStatus:"ACTIVE", features:{FOLLOW:true,FRIEND:true,LIKE:true,COMMENT:true,SCROLL:true}, config:{minDelaySeconds:1,maxDelaySeconds:60,forceDelaySeconds:0,maxActionsPerSession:0}, updatedAt:0 };
const _0x009 = 60 * 1000;
const _0x00a = 15000;
const _0x00b = 8000;
const OP2P_RUNTIME_FAIL_LIMIT = 3;


// V11.3.4 FIREFOX PERSISTENCE FIX: explicit modern GM.getValue/GM.setValue bridge for Greasemonkey 4+.
function _0x00c(key, fallback = "") {
    try {
        if (typeof GM_getValue === "function") {
            const val = GM_getValue(key, null);
            if (val !== null && val !== undefined && val !== "") return String(val);
        }
    } catch(e) {}
    try {
        const v = localStorage.getItem(key);
        if (v !== null && v !== undefined && v !== "") return String(v);
    } catch(e) {}
    return fallback;
}

function _0x00d(key, value) {
    const val = String(value ?? "");
    try {
        if (typeof GM_setValue === "function") {
            GM_setValue(key, val);
        }
    } catch(e) {}
    try {
        localStorage.setItem(key, val);
    } catch(e) {}
}

async function _0x00e(key, fallback = "") {
    // Primary: modern Greasemonkey 4+ async storage.
    try {
        if (typeof GM !== "undefined" && typeof GM.getValue === "function") {
            const val = await GM.getValue(key, fallback);
            if (val !== null && val !== undefined && val !== "") return String(val);
        }
    } catch(e) {}
    // Secondary: legacy GM synchronous storage.
    try {
        if (typeof GM_getValue === "function") {
            const val = GM_getValue(key, fallback);
            if (val !== null && val !== undefined && val !== "") return String(val);
        }
    } catch(e) {}
    // Last resort: page localStorage.
    try {
        const v = localStorage.getItem(key);
        if (v !== null && v !== undefined && v !== "") return String(v);
    } catch(e) {}
    return fallback;
}

async function _0x00f(key, value) {
    const val = String(value ?? "");
    let saved = false;
    try {
        if (typeof GM !== "undefined" && typeof GM.setValue === "function") {
            await GM.setValue(key, val);
            saved = true;
        }
    } catch(e) {}
    if (!saved) {
        try {
            if (typeof GM_setValue === "function") {
                GM_setValue(key, val);
                saved = true;
            }
        } catch(e) {}
    }
    try { localStorage.setItem(key, val); saved = true; } catch(e) {}
    return saved;
}

async function _0x010() {
    return String(await _0x00e(_0x002, "") || "").trim();
}

async function _0x011(key) {
    const val = String(key || "").trim();
    await _0x00f(_0x002, val);
}

async function _0x012() {
    try { await _0x00f(_0x002, ""); } catch(e) {}
    try { localStorage.removeItem(_0x002); } catch(e) {}
}

async function _0x013() {
    let id = String(await _0x00e(_0x003, "") || "").trim();
    if (id) return id;
    id = "BR-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2) + "-" + Math.random().toString(36).slice(2);
    await _0x00f(_0x003, id);
    return id;
}


function _0x014() {
    const ua = String(navigator.userAgent || "");
    let browser = "Unknown";
    let version = "Unknown";
    if (/Edg\/([\d.]+)/i.test(ua)) { browser = "Microsoft Edge"; version = ua.match(/Edg\/([\d.]+)/i)[1]; }
    else if (/OPR\/([\d.]+)/i.test(ua)) { browser = "Opera"; version = ua.match(/OPR\/([\d.]+)/i)[1]; }
    else if (/SamsungBrowser\/([\d.]+)/i.test(ua)) { browser = "Samsung Internet"; version = ua.match(/SamsungBrowser\/([\d.]+)/i)[1]; }
    else if (/Firefox\/([\d.]+)/i.test(ua)) { browser = "Mozilla Firefox"; version = ua.match(/Firefox\/([\d.]+)/i)[1]; }
    else if (/Chrome\/([\d.]+)/i.test(ua)) { browser = "Google Chrome"; version = ua.match(/Chrome\/([\d.]+)/i)[1]; }
    else if (/Safari\/([\d.]+)/i.test(ua) && /Version\/([\d.]+)/i.test(ua)) { browser = "Apple Safari"; version = ua.match(/Version\/([\d.]+)/i)[1]; }
    let os = "Unknown OS";
    if (/Windows NT/i.test(ua)) os = "Windows";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/(iPhone|iPad|iPod)/i.test(ua)) os = "iOS/iPadOS";
    else if (/Mac OS X/i.test(ua)) os = "macOS";
    else if (/Linux/i.test(ua)) os = "Linux";
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    const deviceType = mobile ? ((/iPad/i.test(ua) || /Tablet/i.test(ua)) ? "Tablet" : "Mobile") : "Desktop";
    return { browser, version, os, deviceType };
}
const _0x015 = _0x014();
const _0x016 = { running:false, actionInProgress:false, lastEvent:"INIT", lastDetail:"", lastSent:0, recoveryCount:0, lastRecovery:0 };
let op2pUiStop = null;
let op2pUiStart = null;
let op2pUiSchedule = null;

function _0x017(){
    try { const raw=localStorage.getItem(_0x008); const a=JSON.parse(raw||"[]"); return Array.isArray(a)?a.slice(-50):[]; } catch(e){ return []; }
}
function _0x018(event, detail, severity="INFO") {
    const item={ts:new Date().toISOString(),event:String(event||"EVENT"),detail:String(detail||""),severity:String(severity||"INFO")};
    try { const a=_0x017(); a.push(item); localStorage.setItem(_0x008, JSON.stringify(a.slice(-50))); } catch(e) {}
    _0x016.lastEvent=item.event; _0x016.lastDetail=item.detail;
    return item;
}

function op2pNormalizePolicy(policy) {
    const p = policy && typeof policy === "object" ? policy : {};
    const srcFeatures = p.features && typeof p.features === "object" ? p.features : {};
    const srcConfig = p.config && typeof p.config === "object" ? p.config : {};
    const features = {
        FOLLOW: srcFeatures.FOLLOW !== false,
        FRIEND: srcFeatures.FRIEND !== false,
        LIKE: srcFeatures.LIKE !== false,
        COMMENT: srcFeatures.COMMENT !== false,
        SCROLL: srcFeatures.SCROLL !== false
    };
    const n = (v, d) => { const x = Number(v); return Number.isFinite(x) ? x : d; };
    const config = {
        minDelaySeconds: Math.max(0.1, n(srcConfig.minDelaySeconds, 1)),
        maxDelaySeconds: Math.max(0.1, n(srcConfig.maxDelaySeconds, 60)),
        forceDelaySeconds: Math.max(0, n(srcConfig.forceDelaySeconds, 0)),
        maxActionsPerSession: Math.max(0, Math.floor(n(srcConfig.maxActionsPerSession, 0)))
    };
    if (config.maxDelaySeconds < config.minDelaySeconds) config.maxDelaySeconds = config.minDelaySeconds;
    return { plan:String(p.plan || "PRO"), customer:String(p.customer || ""), status:String(p.status || "ACTIVE"), licenseState:String(p.licenseState || "ACTIVATED"), expiry:String(p.expiry || ""), startDate:String(p.startDate || ""), browserLocked:p.browserLocked !== false, sessionExpires:String(p.sessionExpires || ""), actionsUsed:Math.max(0,Math.floor(n(p.actionsUsed,0))), maxActionsPerSession:Math.max(0,Math.floor(n(p.maxActionsPerSession,config.maxActionsPerSession))), clientStatus:String(p.clientStatus || "ONLINE"), lastHealthSeen:String(p.lastHealthSeen || ""), lastSeen:String(p.lastSeen || ""), securityAlerts:Math.max(0,Math.floor(n(p.securityAlerts,0))), healthErrors:Math.max(0,Math.floor(n(p.healthErrors,0))), systemStatus:String(p.systemStatus || "ACTIVE"), features, config, policyVersion:String(p.policyVersion || "11.6.1"), updatedAt:Number(p.updatedAt || Date.now()) };
}

async function op2pLoadServerPolicy(showAlert=false) {
    try {
        const key = String(await _0x010() || "").trim();
        if (!key) return false;
        const res = await _0x01a("security_policy", key);
        if (res && res.ok === true) {
            op2pServerPolicy = op2pNormalizePolicy(res);
            try { localStorage.setItem(OP2P_POLICY_STORAGE, JSON.stringify(op2pServerPolicy)); } catch(e) {}
            if (typeof window.op2pPolicyRefresh === "function") window.op2pPolicyRefresh();
            return true;
        }
        return false;
    } catch(e) {
        if (showAlert) { try { alert("OP2P: gagal mendapatkan server policy."); } catch(_) {} }
        return false;
    }
}

function op2pFeatureAllowed(feature) {
    const f = String(feature || "").toUpperCase();
    return !!(op2pServerPolicy && op2pServerPolicy.features && op2pServerPolicy.features[f]);
}

function op2pModeAllowed(mode) {
    const m = String(mode || "").toUpperCase();
    if (m === "BOTH") return op2pFeatureAllowed("FOLLOW") && op2pFeatureAllowed("FRIEND");
    if (m === "F") return op2pFeatureAllowed("FOLLOW");
    if (m === "A") return op2pFeatureAllowed("FRIEND");
    if (m === "LIKE_FOLLOW") return op2pFeatureAllowed("LIKE") && op2pFeatureAllowed("FOLLOW");
    if (m === "LIKE") return op2pFeatureAllowed("LIKE");
    if (m === "COMMENT") return op2pFeatureAllowed("COMMENT");
    if (m === "SCROLL") return op2pFeatureAllowed("SCROLL");
    return false;
}

function op2pActionLimitReached() {
    const max = Number(op2pServerPolicy?.config?.maxActionsPerSession || 0);
    return max > 0 && statsTotal() >= max;
}

async function op2pRuntimeIntegrityHash() {
    try {
        const critical = [typeof _0x01a === "function" ? _0x01a.toString() : "", typeof _0x01c === "function" ? _0x01c.toString() : "", typeof op2pSecurityHardStop === "function" ? op2pSecurityHardStop.toString() : "", typeof _0x041 === "function" ? _0x041.toString() : "", typeof _0x045 === "function" ? _0x045.toString() : ""].join("\n/*OP2P*/\n");
        if (!window.crypto?.subtle) return "";
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(critical));
        return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
    } catch(e) { return ""; }
}

async function _0x019(event, detail, severity="INFO") {
    const now=Date.now();
    const item=_0x018(event,detail,severity);
    if (now-_0x016.lastSent < 1500 && severity === "INFO") return;
    _0x016.lastSent=now;
    try {
        const key=String(await _0x010()||"").trim();
        if(!key) return;
        const res=await _0x01a("client_health", key, {health_event:item.event,health_detail:item.detail,health_severity:item.severity,runtime_integrity_hash:await op2pRuntimeIntegrityHash(),plan:op2pServerPolicy.plan});
        if(res && res.ok!==true && res.error) _0x016.lastDetail="Health send: "+res.error;
    } catch(e) {}
}

function _0x01a(action, key, extraParams = {}) {
    return new Promise(async (resolve, reject) => {
        const browserId = await _0x013();
        const sessionId = String(await _0x00e(_0x004, "") || "").trim();
        const ts = Date.now();
        const nonce = "N-" + ts.toString(36) + "-" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        const url = _0x001 + "?action=" + encodeURIComponent(action) + "&key=" + encodeURIComponent(key) + "&browser_id=" + encodeURIComponent(browserId) + "&session_id=" + encodeURIComponent(sessionId) + "&ts=" + encodeURIComponent(ts) + "&nonce=" + encodeURIComponent(nonce) + "&browser_type=" + encodeURIComponent(_0x015.browser) + "&browser_version=" + encodeURIComponent(_0x015.version) + "&os=" + encodeURIComponent(_0x015.os) + "&device_type=" + encodeURIComponent(_0x015.deviceType) + "&client_version=" + encodeURIComponent(_0x007) + "&_=" + Date.now();
        const extraQuery = Object.keys(extraParams || {}).map(k => "&" + encodeURIComponent(k) + "=" + encodeURIComponent(String(extraParams[k] ?? ""))).join("");
        const finalUrl = url + extraQuery;

        let finished = false;
        const finish = (fn, value) => { if (finished) return; finished = true; fn(value); };

        const parseResponse = (value) => {
            if (value == null) return null;
            if (typeof value === "object") return value;
            const raw = String(value).trim();
            if (!raw) return null;
            try { return JSON.parse(raw); } catch (e) {}
            const s = raw.indexOf("{"); const e = raw.lastIndexOf("}");
            if (s >= 0 && e > s) { try { return JSON.parse(raw.slice(s, e + 1)); } catch (err) {} }
            return null;
        };

        const processResult = (res) => {
            const data = parseResponse(res && typeof res === "object" ? (res.responseText || res.response) : res);
            if (!data) return false;
            data._browserId = browserId;
            if (data.sessionId) {
                void _0x00f(_0x004, String(data.sessionId));
            }
            finish(resolve, data);
            return true;
        };

        const fail = msg => finish(reject, new Error(msg));

        try {
            if (typeof GM_xmlhttpRequest === "function") {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: finalUrl,
                    timeout: 15000,
                    onload: r => { if (!processResult(r)) fail("INVALID_API_RESPONSE"); },
                    onerror: () => fail("NETWORK_ERROR"),
                    ontimeout: () => fail("TIMEOUT")
                });
                return;
            }
        } catch(e) {}

        try {
            if (typeof GM !== "undefined" && typeof GM.xmlHttpRequest === "function") {
                GM.xmlHttpRequest({
                    method: "GET",
                    url: finalUrl,
                    timeout: 15000,
                    onload: r => { if (!processResult(r)) fail("INVALID_API_RESPONSE"); },
                    onerror: () => fail("NETWORK_ERROR"),
                    ontimeout: () => fail("TIMEOUT")
                });
                return;
            }
        } catch(e) {}

        try {
            fetch(finalUrl, { method: "GET", cache: "no-store" })
                .then(r => r.text())
                .then(t => { if (!processResult(t)) fail("INVALID_API_RESPONSE"); })
                .catch(() => fail("NETWORK_ERROR"));
        } catch(e) {
            fail("NETWORK_ERROR");
        }
    });
}

async function _0x01b(res, key) {
    try {
        if (!res || !res.ok || !res.expiry) return;
        const expiryText = String(res.expiry || '').trim();
        const expiryDate = new Date(expiryText);
        if (isNaN(expiryDate.getTime())) return;
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const expiryDay = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
        const daysLeft = Math.ceil((expiryDay.getTime() - today.getTime()) / 86400000);
        if (daysLeft < 0 || daysLeft > 7) return;
        const storageKey = 'OP2P_EXPIRY_REMINDER_V1';
        const level = daysLeft <= 1 ? 1 : (daysLeft <= 3 ? 3 : 7);
        const reminderKey = String(key || '') + '|' + level + '|' + today.toISOString().slice(0, 10);
        const last = String(_0x00c(storageKey, '') || '');
        if (last === reminderKey) return;
        _0x00d(storageKey, reminderKey);
        const title = 'OP2P: License hampir tamat';
        const msg = 'License OP2P anda akan tamat dalam ' + daysLeft + ' hari (' + expiryText + ').\n\nSila renew license untuk terus menggunakan OP2P.';
        alert(title + '\n\n' + msg);
    } catch (e) {}
}

async function _0x01c() {
    let storedKey = await _0x010();
    let lastValidTs = Number(await _0x00e(_0x005, "0")) || 0;
    const now = Date.now();

    // V11.5.7 SECURITY FIX:
    // Startup MUST contact the server. Do not allow the local 15-minute cache
    // to bypass REVOKE / LOCK / SUSPEND / EXPIRED status after page refresh.

    let key = storedKey;
    const isFirstTime = !storedKey;

    if (!key) {
        key = String(prompt("OP2P License Key:") || "").trim();
        if (!key) {
            alert("OP2P: License key diperlukan.");
            return false;
        }
        
        await _0x011(key);
    }

    try {
        let action = storedKey ? "validate" : "activate";
        let res = await _0x01a(action, key);

        if (res && res.error === "LICENSE_NOT_ACTIVATED") {
            res = await _0x01a("activate", key);
        }

        
        if (res && res.error === "BROWSER_RESET_REQUIRED") {
            const newBrowserId = "BR-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2) + "-" + Math.random().toString(36).slice(2);
            await _0x00f(_0x003, newBrowserId);
            await _0x00f(_0x004, "");
            res = await _0x01a("activate", key);
        }

        if (res && res.ok === true && res.status === "ACTIVE") {
            await _0x011(key);
            void _0x00f(_0x005, String(Date.now()));

            if (isFirstTime) {
                alert("✓ OP2P: License Key berjaya dimasukkan dan disahkan!");
            }

            await _0x01b(res, key);
            _0x019(isFirstTime ? "ACTIVATED" : "VALIDATED", "License gate passed").catch(()=>{});
            return true;
        }

        const err = String((res && res.error) || "LICENSE_ERROR");

        if (err === "SESSION_INVALID" || err === "SESSION_EXPIRED" || err === "MISSING_SESSION") {
            try {
                const reauth = await _0x01a("activate", key);
                if (reauth && reauth.ok === true && reauth.status === "ACTIVE") {
                    await _0x011(key);
                    void _0x00f(_0x005, String(Date.now()));
                    return true;
                }
            } catch(e) {}
        }

        if (err === "BROWSER_LOCKED" || err === "LICENSE_LOCKED") {
            const resetChoice = confirm(
                "OP2P: License ini sedang digunakan pada browser lain (contoh: Firefox/Chrome)!\n\n" +
                "Satu key hanya sah untuk 1 browser sahaja.\n\n" +
                "Klik OK untuk padam key ini di browser ini supaya boleh masukkan key yang lain."
            );
            if (resetChoice) {
                await _0x012();
                void _0x00f(_0x005, "0");
                location.reload();
            }
            return false;
        }

        if (err === "LICENSE_MANUALLY_LOCKED") {
            op2pSecurityHardStop("LICENSE_MANUALLY_LOCKED");
            try { alert("OP2P: License ini dikunci oleh admin."); } catch(e) {}
            return false;
        }

        if (err === "LICENSE_INACTIVE") {
            op2pSecurityHardStop("LICENSE_INACTIVE");
            try { alert("OP2P: License ini telah di-suspend oleh admin."); } catch(e) {}
            return false;
        }

        if (err === "LICENSE_EXPIRED") {
            alert("OP2P: License sudah expired.");
            return false;
        }

        if (err === "LICENSE_NOT_FOUND") {
            const resetChoice = confirm("OP2P: License key tidak sah.\n\nKlik OK untuk masukkan semula.");
            if (resetChoice) {
                await _0x012();
                void _0x00f(_0x005, "0");
                location.reload();
            }
            return false;
        }

        if (err === "LICENSE_REVOKED") {
            await _0x012();
            void _0x00f(_0x005, "0");
            op2pSecurityHardStop("LICENSE_REVOKED");
            try { alert("OP2P: License telah direvoke."); } catch(e) {}
            return false;
        }

        
        // SECURITY HARDENING V11.5.7: fail closed.
        // Never trust a stored license when the server rejects validation.
        // This prevents offline/network-failure bypass of LOCK/SUSPEND/REVOKE/EXPIRED.
        if (err === "NETWORK_ERROR" || err === "TIMEOUT" || err === "INVALID_API_RESPONSE" || err === "LICENSE_ERROR") {
            op2pSecurityHardStop("SERVER_VALIDATION_FAILED");
            alert("OP2P: Server license validation gagal (" + err + "). OP2P dikunci untuk keselamatan. Sila semak internet dan cuba lagi.");
            return false;
        }

        alert("OP2P Amaran: " + err);
        return false;

    } catch(e) {
        // SECURITY HARDENING V11.5.7: fail closed on unexpected validation errors.
        op2pSecurityHardStop("SERVER_VALIDATION_EXCEPTION");
        alert("OP2P: Gagal semak license (" + String(e.message || e) + "). OP2P dikunci untuk keselamatan. Sila semak sambungan internet.");
        return false;
    }
}

const HOST_ID = "GM_FB_FA_MACRO_56";
if (document.getElementById(HOST_ID)) return;

let running = false;
let timer = null;
let countdownTimer = null;
let durationTimer = null;

let remaining = 0;
let remainingDuration = 0;
let totalCount = 0;




const _0x01d = "OP2P_SECURITY_LOG_V4";
const _0x01e = 20;
const _0x01f = 60 * 1000;

const _0x020 = 30 * 1000;
const _0x021 = 5;
const _0x022 = 15 * 1000;
const _0x023 = 5;
const _0x024 = 1500;
const _0x025 = 3000;

const _0x026 = "4.0";
const _0x027 =
    "OP2P1v1|v6.9|SECURITYv4|"
    + HOST_ID
    + "|"
    + _0x01e
    + "|"
    + _0x01f
    + "|LICENSE|BROWSER|SECURITY";

const _0x028 = "8adb5fb47ceb62450fb082fde5711662fefca14d9faed96a0d70cd08d4f223f4";

let securityPaused = false;
let securityActionTimes = [];
let securityLog = [];
let securityActivityState = "NORMAL";
let securityIntegrityState = "UNKNOWN";
let securityLastCheck = 0;
let securityCooldownUntil = 0;

async function _0x029() {
    try {
        const raw = await _0x00e(_0x01d, "[]");
        const parsed = JSON.parse(String(raw || "[]"));
        securityLog = Array.isArray(parsed) ? parsed.slice(-100) : [];
    } catch (e) {
        securityLog = [];
    }
}

async function _0x02a() {
    try {
        await _0x00f(_0x01d, JSON.stringify(securityLog.slice(-100)));
    } catch (e) {}
}

function _0x02b(type, detail) {
    securityLog.push({
        time: new Date().toLocaleTimeString(),
        type: String(type || "EVENT"),
        detail: String(detail || "")
    });

    securityLog = securityLog.slice(-100);
    _0x02a();

    if (typeof window.op2pSecurityRefresh === "function") {
        window.op2pSecurityRefresh();
    }
}

function _0x02c() {
    const cutoff = Date.now() - _0x01f;
    securityActionTimes = securityActionTimes.filter(t => t >= cutoff);
}

function _0x02d() {
    _0x02c();

    const now = Date.now();
    const recent30 = securityActionTimes.filter(t => t >= now - _0x020);
    const recent15 = securityActionTimes.filter(t => t >= now - _0x022);

    let clustered = false;
    if (securityActionTimes.length >= 2) {
        const last = securityActionTimes[securityActionTimes.length - 1];
        const previous = securityActionTimes[securityActionTimes.length - 2];
        clustered = (last - previous) < _0x024;
    }

    if (recent15.length >= _0x023 && clustered) {
        securityActivityState = "PAUSED";
        return securityActivityState;
    }

    if (recent30.length >= _0x021 || clustered) {
        securityActivityState = "WATCH";
        if (securityCooldownUntil < now) {
            securityCooldownUntil = now + _0x025;
        }
        return securityActivityState;
    }

    securityActivityState = "NORMAL";
    return securityActivityState;
}

let securityAutoResumeTimer = null;
let securityAutoResumeWasRunning = false;

async function _0x02e(type) {
    if (securityPaused) return false;
    const state = _0x02d();

    if (state === "PAUSED") {
        _0x030("Safety Pause: clustered activity detected", true);
        _0x02b("SAFETY", "Automatic cooldown before " + String(type || "ACTION"));
        return false;
    }

    if (state === "WATCH") {
        const waitMs = Math.max(0, securityCooldownUntil - Date.now());
        if (waitMs > 0) {
            _0x02b("SAFETY", "Watch cooldown before " + String(type || "ACTION") + " (" + (waitMs / 1000).toFixed(1) + "s)");
            await wait(waitMs);
        }
    }

    return !securityPaused;
}

function _0x02f(type) {
    if (securityPaused) return false;
    _0x02c();
    securityActionTimes.push(Date.now());

    if (securityActionTimes.length > _0x01e) {
        _0x030("Activity safety limit reached", true);
        return false;
    }

    _0x02b("ACTION", type || "OP2P action");
    _0x02d();

    if (securityActivityState === "PAUSED") {
        _0x030("Safety Pause: activity pattern", true);
        return false;
    }

    if (typeof window.op2pSecurityRefresh === "function") {
        window.op2pSecurityRefresh();
    }
    return true;
}

function _0x030(reason, autoResume = false) {
    if (securityPaused) return;
    securityPaused = true;
    securityAutoResumeWasRunning = !!running && !!autoResume;
    running = false;

    clearTimeout(timer);
    clearInterval(countdownTimer);
    clearInterval(durationTimer);
    clearTimeout(securityAutoResumeTimer);

    timer = null;
    countdownTimer = null;
    durationTimer = null;
    securityAutoResumeTimer = null;

    securityActivityState = "PAUSED";
    _0x02b(autoResume ? "SAFETY COOLDOWN" : "SAFETY PAUSE", reason || "Manual safety pause");

    if (autoResume) {
        securityAutoResumeTimer = setTimeout(() => {
            securityAutoResumeTimer = null;
            if (!securityPaused) return;
            _0x031();
            if (securityAutoResumeWasRunning) {
                securityAutoResumeWasRunning = false;
                try {
                    if (typeof schedule === "function") schedule();
                } catch (e) {}
            }
        }, _0x025);
    }
}

function _0x031() {
    clearTimeout(securityAutoResumeTimer);
    securityAutoResumeTimer = null;
    securityPaused = false;
    securityAutoResumeWasRunning = false;
    securityActionTimes = [];
    securityCooldownUntil = 0;
    securityActivityState = "NORMAL";
    _0x02b("RESUMED", "Security pause cleared");
}

function _0x032() {
    securityPaused = true;
    running = false;

    clearTimeout(timer);
    clearInterval(countdownTimer);
    clearInterval(durationTimer);

    timer = null;
    countdownTimer = null;
    durationTimer = null;

    securityActivityState = "PAUSED";
    _0x02b("EMERGENCY STOP", "All OP2P actions stopped");
    _0x019("EMERGENCY_STOP", "All OP2P actions stopped", "WARNING").catch(()=>{});
}

async function _0x033(text) {
    try {
        if (!window.crypto || !window.crypto.subtle) return "";
        const data = new TextEncoder().encode(String(text));
        const buffer = await window.crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
        return "";
    }
}

async function _0x034() {
    const actual = await _0x033(_0x027);
    if (!actual) {
        securityIntegrityState = "UNAVAILABLE";
        _0x02b("INTEGRITY", "SHA-256 unavailable");
        return false;
    }

    const ok = actual === _0x028;
    securityIntegrityState = ok ? "VERIFIED" : "TAMPER";
    _0x02b("INTEGRITY", ok ? "Local fingerprint verified" : "Local fingerprint mismatch");
    return ok;
}

async function _0x035() {
    const runtimeOk =
        typeof _0x01c === "function" &&
        typeof _0x01a === "function" &&
        typeof _0x00e === "function" &&
        typeof _0x00f === "function" &&
        document.querySelectorAll("#" + HOST_ID).length <= 1;

    const integrityOk = await _0x034();
    securityLastCheck = Date.now();
    const ok = runtimeOk && integrityOk;

    _0x02b("SECURITY CHECK", ok ? "Runtime + integrity OK" : "Runtime/integrity warning");
    return ok;
}

window.op2pSecurityState = {
    get paused() { return securityPaused; },
    get integrity() { return securityIntegrityState; },
    get activity() { return securityActivityState; }
};

let lastCommentBox = null;
let commentBusy = false;
let lastSubmittedComment = "";
let lastSubmittedBox = null;
let lastSubmittedArticle = null;
let lastSubmitTime = 0;

const selectedModes = new Set();

const HUMAN_COMMENTS = [
    "This is really nice 👍", "Love this one!", "Wow, this looks good 🔥", "Really enjoyed this",
    "This turned out great", "Nice one 👌", "I like this!", "This is pretty cool",
    "Great sharing 👍", "That looks amazing", "Really nice post!", "This caught my attention 👀",
    "Love the idea behind this", "Very nice!", "This is so good 🔥", "Definitely worth seeing",
    "Looks great!", "Really enjoyed this one", "Nice work 👏", "This is interesting",
    "Well done 👍", "Love the vibe here", "Pretty awesome!", "This came out really well", "Great one 👌"
];

const COMMENT_CATEGORIES = {
    "SANTAI & NATURAL": [
        "Padu ni", "Menarik ni", "Nice sharing", "Terbaik 👍", "Fuhh menarik", "Nampak menarik ni",
        "Yang ni memang cun", "Not bad", "Boleh tahan", "Memang menarik", "Nice one", "Aku suka yang ni",
        "Terus teringin nak cuba", "Ini memang best", "Fuhh solid", "Simple tapi menarik", "Memang ngam",
        "Yang ni lain macam", "Best juga ni", "Menarik untuk cuba"
    ],
    "SUPPORT & POSITIF": [
        "Terbaik bro 👍", "Good sharing", "Memang berbaloi", "Keep it up 🔥", "Teruskan bro",
        "Semoga dipermudahkan", "All the best", "Support sini 👍", "Mantap!", "Padu betul",
        "Respect bro", "Semoga makin maju", "Bagus perkongsian ni", "Teruskan berkongsi",
        "Memang terbaik", "Nice sharing bro", "Support 💪", "Good one bro", "Teruskan usaha", "Memang win"
    ],
    "REAKSI NATURAL": [
        "Fuhhh 🔥", "Wow menarik", "Eh bestnya", "Hahaha boleh tahan 😄", "Seriuslah?",
        "Ohh macam tu", "Menarik juga", "Eh yang ni best", "Ooo baru tahu", "Patutlah",
        "Betul juga tu", "Haah memang", "Aku pun rasa macam tu", "Boleh tahan ni", "Nampak solid",
        "Fuh memang padu", "Ini menarik", "Okay yang ni aku suka", "Lawa juga", "Memang cun"
    ],
    "PENDAPAT": [
        "Setuju sangat", "Betul juga tu", "Aku pun fikir macam ni", "Memang ada betulnya",
        "Menarik pandangan ni", "Aku setuju dengan ni", "Pandangan yang menarik", "Ada point juga",
        "Boleh relate dengan ni", "Memang kena dengan situasi", "Ramai boleh relate", "Point yang bagus",
        "Aku faham apa yang dimaksudkan", "Menarik perspektif ni", "Ada logiknya", "Memang betul",
        "Aku pun pernah lalui", "Boleh jadi juga", "Makes sense", "Good point"
    ],
    "RINGKAS": [
        "Padu 🔥", "Terbaik 👍", "Nice!", "Mantap!", "Solid!", "Cun!", "Menarik!", "Best!",
        "Wow!", "Setuju!", "Nice sharing", "Good one", "Awesome!", "Respect!", "Fuhh!",
        "Win!", "Power!", "Steady!", "Ngam!", "On point!"
    ]
};

const RANDOM_COMMENT_COUNT = 5;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




const _0x036 = "OP2P_STATS_V1";
const defaultStats = { follow: 0, friend: 0, like: 0, comment: 0, scroll: 0 };
let op2pStats = { ...defaultStats };

async function _0x037() {
    const fallback = JSON.stringify(defaultStats);
    try {
        const raw = await _0x00e(_0x036, fallback);
        const parsed = JSON.parse(String(raw || fallback));
        op2pStats = { ...defaultStats, ...(parsed && typeof parsed === "object" ? parsed : {}) };
    } catch (e) {
        op2pStats = { ...defaultStats };
    }

    try {
        const localRaw = localStorage.getItem(_0x036);
        if (localRaw) {
            const localParsed = JSON.parse(localRaw);
            const localLooksUseful = localParsed && typeof localParsed === "object" && Object.keys(defaultStats).some(key => Number(localParsed[key] || 0) > 0);
            if (localLooksUseful) op2pStats = { ...defaultStats, ...localParsed };
        }
    } catch (e) {}

    for (const key of Object.keys(defaultStats)) {
        const n = Number(op2pStats[key]);
        op2pStats[key] = Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
    }
}

async function _0x038() {
    const payload = JSON.stringify(op2pStats);
    try { await _0x00f(_0x036, payload); } catch (e) {}
    try { localStorage.setItem(_0x036, payload); } catch (e) {}
}

function statsTotal() {
    return Object.values(op2pStats).reduce((sum, value) => sum + Number(value || 0), 0);
}

function incrementStat(type) {
    if (!Object.prototype.hasOwnProperty.call(op2pStats, type)) return;
    op2pStats[type] = Number(op2pStats[type] || 0) + 1;
    _0x038();
    if (typeof window.op2pStatsRefresh === "function") window.op2pStatsRefresh();
}

async function _0x039() {
    op2pStats = { ...defaultStats };
    await _0x038();
    if (typeof window.op2pStatsRefresh === "function") window.op2pStatsRefresh();
}

const _0x03a = "OP2P_SETTINGS_V1";
const defaultSettings = { scrollStep: "80", scrollWait: "1", delay: "5", runMode: "loop", minutes: "1", autoRefresh: "true" };

async function _0x03b() {
    try {
        const raw = await _0x00e(_0x03a, JSON.stringify(defaultSettings));
        const parsed = JSON.parse(String(raw || "{}"));
        return { ...defaultSettings, ...(parsed && typeof parsed === "object" ? parsed : {}) };
    } catch (e) {
        return { ...defaultSettings };
    }
}

let settingsSaveTimer = null;
function _0x03c() {
    clearTimeout(settingsSaveTimer);
    settingsSaveTimer = setTimeout(_0x03d, 250);
}

async function _0x03d() {
    try {
        const data = {
            scrollStep: String(scrollStepInput.value || defaultSettings.scrollStep),
            scrollWait: String(scrollWaitInput.value || defaultSettings.scrollWait),
            delay: String(delayInput.value || defaultSettings.delay),
            runMode: String(runMode.value || defaultSettings.runMode),
            minutes: String(minutesInput.value || defaultSettings.minutes),
            autoRefresh: autoRefreshCheck ? String(!!autoRefreshCheck.checked) : defaultSettings.autoRefresh
        };
        await _0x00f(_0x03a, JSON.stringify(data));
    } catch (e) {}
}

async function _0x03e() {
    const settings = await _0x03b();
    scrollStepInput.value = settings.scrollStep;
    scrollWaitInput.value = settings.scrollWait;
    delayInput.value = settings.delay;
    runMode.value = settings.runMode;
    minutesInput.value = settings.minutes;
    durationBox.style.display = runMode.value === "minutes" ? "block" : "none";
    if (autoRefreshCheck) autoRefreshCheck.checked = String(settings.autoRefresh).toLowerCase() !== "false";
}

function op2pIsBusyForRefresh() {
    return !!(_0x016.running || _0x016.actionInProgress || _0x016.timerActive || running);
}

function op2pPersistRefreshState() {
    try {
        const state = {
            selectedModes: [...selectedModes],
            comments: String((document.getElementById("comments") || {}).value || ""),
            panelVisible: !!(document.getElementById(HOST_ID) && document.getElementById(HOST_ID).style.display !== "none"),
            savedAt: Date.now()
        };
        sessionStorage.setItem(OP2P_AUTO_REFRESH_STATE, JSON.stringify(state));
    } catch (e) {}
}

function op2pRestoreRefreshState() {
    try {
        const raw = sessionStorage.getItem(OP2P_AUTO_REFRESH_STATE);
        if (!raw) return;
        const state = JSON.parse(raw);
        if (Array.isArray(state.selectedModes)) {
            selectedModes.clear();
            state.selectedModes.forEach(mode => {
                if (typeof mode === "string" && op2pModeAllowed(mode)) selectedModes.add(mode);
            });
        }
        const commentsBox = document.getElementById("comments");
        if (typeof state.comments === "string" && commentsBox) commentsBox.value = state.comments;
        sessionStorage.removeItem(OP2P_AUTO_REFRESH_STATE);
    } catch (e) {}
}

function op2pDoIdleRefresh() {
    if (op2pSecurityBlocked() || !autoRefreshCheck || !autoRefreshCheck.checked) {
        op2pScheduleAutoRefresh();
        return;
    }
    if (op2pIsBusyForRefresh()) {
        op2pAutoRefreshTimer = setTimeout(op2pDoIdleRefresh, OP2P_AUTO_REFRESH_CHECK_MS);
        return;
    }
    op2pPersistRefreshState();
    try { _0x019("AUTO_REFRESH", "Refreshing Facebook browser after 15 minutes of idle time").catch(() => {}); } catch (e) {}
    setTimeout(() => { try { location.reload(); } catch (e) {} }, 250);
}

function op2pScheduleAutoRefresh() {
    clearTimeout(op2pAutoRefreshTimer);
    if (!autoRefreshCheck || !autoRefreshCheck.checked || op2pSecurityBlocked()) return;
    op2pAutoRefreshDeadline = Date.now() + OP2P_AUTO_REFRESH_MS;
    op2pAutoRefreshTimer = setTimeout(op2pDoIdleRefresh, OP2P_AUTO_REFRESH_MS);
}

function init() {
    if (!document.documentElement) {
        setTimeout(init, 100);
        return;
    }
    if (!document.getElementById(HOST_ID)) {
        _0x03f();
    }
}

let scrollStepInput, scrollWaitInput, delayInput, runMode, minutesInput, durationBox, autoRefreshCheck;
let op2pAutoRefreshTimer = null;
let op2pAutoRefreshDeadline = 0;

function _0x03f() {
    const host = document.createElement("div");
    host.id = HOST_ID;
    host.style.cssText = `
        position:fixed!important;
        left:20px!important;
        bottom:20px!important;
        width:102px!important;
        height:38px!important;
        z-index:2147483647!important;
    `;

    const shadow = host.attachShadow({ mode:"open" });
    const openButton = document.createElement("button");
    openButton.textContent = "⚡ OP2P PRO";
    openButton.style.cssText = `
        all:initial;
        position:fixed;
        left:20px;
        bottom:20px;
        width:128px;
        height:46px;
        background:#111;
        color:#fff;
        border:2px solid #00ff88;
        border-radius:10px;
        font-family:Arial,sans-serif;
        font-size:11px;
        font-weight:bold;
        cursor:pointer;
        text-align:center;
        box-shadow:0 8px 28px rgba(0,0,0,.55),0 0 18px rgba(0,255,136,.08);
    `;
    shadow.appendChild(openButton);

    const panel = document.createElement("div");
    panel.innerHTML = `
    <style>
        *{box-sizing:border-box;}
        .panel{position:fixed;right:10px;top:50%;transform:translateY(-50%);width:245px;max-height:calc(100vh - 24px);overflow-y:auto;padding:8px;background:linear-gradient(180deg,#0b0f0d,#111714 55%,#0d1110);color:#fff;border:1px solid #2d3a33;border-radius:11px;font-family:Arial,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.66),0 0 0 1px rgba(0,255,136,.05) inset;z-index:2147483646;}
        .panel::-webkit-scrollbar{width:5px;}
        .panel::-webkit-scrollbar-thumb{background:#444;border-radius:6px;}
        .title{font-size:14px;font-weight:800;margin-bottom:2px;letter-spacing:.2px;}
        .status{font-size:8px;font-weight:800;color:#60a5fa;margin-bottom:6px;letter-spacing:.3px;}
        .label{font-size:8px;color:#999;margin:5px 0 3px;}
        .brandRow{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px;}
        .brandBadge{padding:3px 7px;border-radius:999px;background:rgba(0,255,136,.09);border:1px solid rgba(0,255,136,.25);color:#6bffb5;font-size:7px;font-weight:800;letter-spacing:.7px;}
        .subtle{font-size:7px;color:#7d8982;margin-bottom:6px;}
        .dashGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:4px;margin:5px 0;}
        .dashCard{padding:5px;background:linear-gradient(180deg,#171d19,#121714);border:1px solid #28352e;border-radius:5px;min-height:44px;box-shadow:0 5px 16px rgba(0,0,0,.18);}
        .dashCard.wide{grid-column:1 / -1;}
        .dashLabel{font-size:7px;color:#819088;text-transform:uppercase;letter-spacing:.65px;}
        .dashValue{font-size:10px;font-weight:800;color:#fff;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .dashMeta{font-size:7px;color:#7ee8a7;margin-top:3px;}
        .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,.55);margin-right:4px;vertical-align:1px;}
        .overviewHead{display:flex;align-items:center;justify-content:space-between;margin:6px 0 3px;font-size:9px;font-weight:800;color:#dfe8e2;}
        .overviewHead span:last-child{font-size:7px;color:#6d7a72;font-weight:600;}
        .actionCard{padding:5px;background:#0f1411;border:1px solid #2a382f;border-radius:5px;margin-bottom:5px;}
        .sectionHint{font-size:7px;color:#67736c;margin-top:2px;margin-bottom:5px;}
        .quickBar{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:4px;}
        .quickBar button{font-size:7px;padding:4px 2px;background:#18211b;border:1px solid #2e4035;color:#cce8d6;}
        .statusPill{display:inline-flex;align-items:center;padding:3px 6px;border-radius:999px;background:#17231b;border:1px solid #2d4637;color:#80f1aa;font-size:7px;font-weight:800;}
        .premiumDivider{height:1px;background:#203027;margin:8px 0;}
        @media (max-width:520px){.panel{width:min(245px,calc(100vw - 14px))!important;right:7px!important;}.dashGrid{grid-template-columns:1fr 1fr;}}

        .modes{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;}
        button{width:100%;min-width:0;padding:5px 2px;border:0;border-radius:5px;color:#fff;background:#333;font-weight:bold;font-size:8px;line-height:1.05;cursor:pointer;}
        button:hover{filter:brightness(1.15);}
        #f{background:#2563eb;}
        #a{background:#7c3aed;}
        #both{background:#0891b2;}
        #like{background:#e11d48;}
        #lf{background:#ea580c;}
        #comment{background:#16a34a;}
        #scroll{background:#ca8a04;}
        #start{background:#16803c;}
        #stop{background:#b42318;}
        .sectionHead{display:flex;align-items:center;justify-content:space-between;margin-top:4px;padding:5px 6px;background:#1b1b1b;border:1px solid #333;border-radius:6px;color:#ddd;font-size:9px;font-weight:bold;cursor:pointer;}
         .sectionHead span:last-child{font-size:8px;color:#aaa;}
        .sectionBody{display:none;padding-top:5px;}
        .sectionBody.open{display:block;}
        .commentTools{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px;margin-bottom:4px;}
        .commentTools button{padding:5px 2px;background:#262626;border:1px solid #444;font-size:8px;}
         .commentList{max-height:80px;overflow-y:auto;background:#181818;border:1px solid #333;border-radius:5px;padding:4px;}
        .commentCategory{margin-bottom:3px;}
        .commentCategoryTitle{font-size:8px;font-weight:bold;color:#aaa;padding:2px;}
        .commentItem{display:flex;align-items:flex-start;gap:4px;padding:2px;color:#eee;font-size:8px;line-height:1.1;}
        .commentItem input{width:11px;height:11px;margin:1px 0 0;flex:0 0 11px;accent-color:#00ff88;}
        .commentItem span{flex:1;}
        textarea,input,select{width:100%;padding:6px;background:#222;color:#fff;border:1px solid #444;border-radius:5px;outline:none;font-size:9px;}
        textarea{height:60px;resize:vertical;}
        .settingsGrid{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
        .settingsCell .label{margin-top:0;}
        .autoRefreshRow{display:flex;align-items:center;gap:6px;min-height:26px;cursor:pointer;}
        .autoRefreshRow input[type="checkbox"]{width:13px;height:13px;min-width:13px;margin:0;padding:0;flex:0 0 13px;accent-color:#00ff88;}
        .autoRefreshText{font-size:8px;line-height:1.1;color:#fff;white-space:nowrap;}
        .infoRow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-top:5px;}
        .info{padding:5px;background:#1b1b1b;border-radius:5px;color:#aaa;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .info b{color:#fff;}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-top:4px;}
        .close{margin-top:4px;background:#333;}
         .statsBox{margin-top:4px;padding:5px;background:#161616;border:1px solid #333;border-radius:5px;}
        .statsHead{display:flex;pointer-events:auto;user-select:none;justify-content:space-between;align-items:center;font-size:9px;font-weight:bold;cursor:pointer;}
        .statsBody{display:none;padding-top:5px;}
        .statsBody.open{display:block;}
        .statsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;}
         .statsItem{padding:4px;background:#202020;border-radius:5px;font-size:7px;color:#aaa;text-align:center;}
         .statsItem b{display:block;color:#fff;font-size:9px;margin-top:1px;}
        .statsReset{margin-top:5px;background:#292929;border:1px solid #444;font-size:8px;padding:5px;}
         .securityBox{margin-top:4px;padding:5px;background:#161616;border:1px solid #333;border-radius:5px;}
        .securityHead{display:flex;justify-content:space-between;align-items:center;font-size:9px;font-weight:bold;cursor:pointer;}
        .securityBody{display:none;padding-top:5px;}
        .securityBody.open{display:block;}
        .securityGrid{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
        .securityItem{padding:5px;background:#202020;border-radius:5px;font-size:7px;color:#aaa;}
        .securityItem b{display:block;color:#fff;font-size:8px;margin-top:1px;}
        .securityGood{color:#4ade80!important;}
        .securityWatch{color:#facc15!important;}
        .securityBad{color:#fb7185!important;}
         .securityActions{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-top:3px;}
         .securityActions button{font-size:7px;padding:4px 2px;background:#292929;border:1px solid #444;}
        .securityLog{display:none;max-height:80px;overflow:auto;margin-top:4px;background:#0f0f0f;border:1px solid #333;border-radius:5px;padding:4px;font-size:7px;color:#aaa;}
        .securityLog div{padding:2px 0;border-bottom:1px solid #222;}
        .updateBox{margin-top:4px;padding:5px;background:#161616;border:1px solid #333;border-radius:5px;}
        .updateHead{display:flex;justify-content:space-between;align-items:center;font-size:9px;font-weight:bold;cursor:pointer;}
        .updateBody{display:none;padding-top:5px;}
        .updateBody.open{display:block;}
        .updateStatus{font-size:8px;color:#aaa;margin-bottom:4px;line-height:1.25;}
        .updateMeta{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
        .updateItem{padding:4px;background:#202020;border-radius:5px;font-size:7px;color:#aaa;}
        .updateItem b{display:block;color:#fff;font-size:8px;margin-top:1px;}
        .updateActions{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-top:4px;}
        .updateActions button{font-size:7px;padding:4px 2px;background:#292929;border:1px solid #444;}
    </style>

    <div class="panel">
        <div class="brandRow">
            <div class="title">⚡ OP2P PRO</div>
            <span class="brandBadge">V11.6.1 • PREMIUM</span>
        </div>
        <div class="subtle">Automation Control Dashboard</div>
        <div id="status" class="status">● READY</div>

        <div class="dashGrid">
            <div class="dashCard"><div class="dashLabel">License</div><div class="dashValue" id="dashLicense">✓ ACTIVE</div><div class="dashMeta" id="dashLicenseMeta">License verified</div></div>
            <div class="dashCard"><div class="dashLabel">Plan</div><div class="dashValue" id="dashPlan">PRO</div><div class="dashMeta" id="dashPlanMeta">Server entitlement</div></div>
            <div class="dashCard"><div class="dashLabel">Browser</div><div class="dashValue" id="dashBrowser">✓ LOCKED</div><div class="dashMeta" id="dashBrowserMeta">Loading...</div></div>
            <div class="dashCard"><div class="dashLabel">Expiry</div><div class="dashValue" id="dashExpiry">—</div><div class="dashMeta" id="dashExpiryMeta">—</div></div>
            <div class="dashCard"><div class="dashLabel">Client Health</div><div class="dashValue" id="dashHealth"><span class="dot"></span>ONLINE</div><div class="dashMeta" id="dashHealthMeta">Watchdog ready</div></div>
            <div class="dashCard"><div class="dashLabel">Quota</div><div class="dashValue" id="dashQuota">0 / ∞</div><div class="dashMeta" id="dashQuotaMeta">Server action quota</div></div>
            <div class="dashCard"><div class="dashLabel">Integrity</div><div class="dashValue" id="dashIntegrity">CHECKING</div><div class="dashMeta" id="dashIntegrityMeta">Runtime verification</div></div>
            <div class="dashCard"><div class="dashLabel">Server</div><div class="dashValue" id="dashServer">ACTIVE</div><div class="dashMeta" id="dashServerMeta">Policy sync</div></div>
            <div class="dashCard wide"><div class="dashLabel">Live Overview</div><div class="dashValue" id="dashOverview">0 actions • 0 recovery</div><div class="dashMeta" id="dashOverviewMeta">Activity NORMAL</div></div>
        </div>

        <div class="overviewHead"><span>🎮 ACTION CONTROL</span><span>SELECT MODE(S)</span></div>
        <div class="actionCard">
        <div class="modes">
            <button id="f">F</button>
            <button id="a">A</button>
            <button id="both">F + A</button>
            <button id="like">LIKE</button>
            <button id="lf">LF</button>
            <button id="comment">CM</button>
            <button id="scroll">SC</button>
        </div>
        <div class="quickBar">
            <span class="statusPill" id="dashModePill">READY</span>
            <button id="start">▶ START</button>
            <button id="stop">■ STOP</button>
        </div>
        </div>
        <div id="commentHead" class="sectionHead">
            <span>💬 COMMENTS</span><span>▼</span>
        </div>
        <div id="commentBody" class="sectionBody">
            <div class="commentTools">
                <button id="commentAll">ALL</button>
                <button id="commentNatural">NATURAL</button>
                <button id="commentClear">CLEAR</button>
                <button id="commentRandom">RANDOM</button>
            </div>
            <div id="commentList" class="commentList"></div>
            <textarea id="comments" style="display:none"></textarea>
        </div>

        <div id="settingsHead" class="sectionHead">
            <span>⚙ AUTOMATION SETTINGS</span><span>▼</span>
        </div>
        <div id="settingsBody" class="sectionBody">
            <div class="settingsGrid">
                <div class="settingsCell">
                    <div class="label">STEP %</div>
                    <input id="scrollStep" type="number" value="80" min="10" max="200" step="5">
                </div>
                <div class="settingsCell">
                    <div class="label">SCROLL WAIT</div>
                    <input id="scrollWait" type="number" value="1" min="0.1" step="0.1">
                </div>
                <div class="settingsCell">
                    <div class="label">DELAY</div>
                    <input id="delay" type="number" value="5" min="0.1" step="0.1">
                </div>
                <div class="settingsCell">
                    <div class="label">RUN MODE</div>
                    <select id="runMode">
                        <option value="loop">LOOP</option>
                        <option value="minutes">MINUTES</option>
                        <option value="until">UNTIL STOP</option>
                    </select>
                </div>
                <div class="settingsCell">
                    <div class="label">AUTO REFRESH</div>
                    <label class="autoRefreshRow" title="Refresh Facebook every 15 minutes when OP2P is idle">
                        <input id="autoRefresh" type="checkbox" checked>
                        <span class="autoRefreshText">15 MIN • IDLE</span>
                    </label>
                </div>
            </div>
            <div id="durationBox" style="display:none">
                <div class="label">MINUTES</div>
                <input id="minutes" type="number" value="1" min="0.1" step="0.1">
            </div>
        </div>

        <div class="infoRow">
            <div class="info">NEXT <b id="next">-</b></div>
            <div class="info">COUNT <b id="count">0</b></div>
            <div class="info">LEFT <b id="remaining">-</b></div>
        </div>


        <div class="statsBox">
            <div id="statsHead" class="statsHead">
                <span>📊 LIVE STATISTICS</span>
                <span id="statsArrow">▼</span>
            </div>

            <div id="statsBody" class="statsBody">
                <div class="statsGrid">
                    <div class="statsItem">FOLLOW<b id="statFollow">0</b></div>
                    <div class="statsItem">FRIEND<b id="statFriend">0</b></div>
                    <div class="statsItem">LIKE<b id="statLike">0</b></div>
                    <div class="statsItem">COMMENT<b id="statComment">0</b></div>
                    <div class="statsItem">SCROLL<b id="statScroll">0</b></div>
                    <div class="statsItem">TOTAL<b id="statTotal">0</b></div>
                </div>

                <button id="resetStats" class="statsReset">RESET</button>
            </div>
        </div>

        <div class="updateBox">
            <div id="updateHead" class="updateHead">
                <span>🔄 UPDATE CENTER</span>
                <span id="updateLevel">CURRENT ▼</span>
            </div>
            <div id="updateBody" class="updateBody">
                <div id="updateStatus" class="updateStatus">Checking update policy...</div>
                <div class="updateMeta">
                    <div class="updateItem">CURRENT<b id="updateCurrent">V11.6.1</b></div>
                    <div class="updateItem">LATEST<b id="updateLatest">—</b></div>
                </div>
                <div class="updateActions">
                    <button id="updateCheck">🔍 CHECK</button>
                    <button id="updateOpen">⬇ OPEN UPDATE</button>
                </div>
            </div>
        </div>

        <div class="securityBox">
            <div id="securityHead" class="securityHead">
                <span>🛡 SECURITY & HEALTH</span>
                <span id="securityLevel">HIGH ▼</span>
            </div>

            <div id="securityBody" class="securityBody">
                <div class="securityGrid">
                    <div class="securityItem">LICENSE<b id="securityLicense">✓ ACTIVE</b></div>
                    <div class="securityItem">BROWSER<b id="securityBrowser">✓ LOCKED</b></div>
                    <div class="securityItem">INTEGRITY<b id="securityIntegrity">CHECKING</b></div>
                    <div class="securityItem">ACTIVITY<b id="securityActivity">NORMAL</b></div>
                    <div class="securityItem" style="grid-column:1 / -1">BROWSER DETAILS<b id="securityBrowserInfo">Loading...</b></div>
                </div>

                <div class="securityActions">
                    <button id="securityCheck">🔍 CHECK</button>
                    <button id="securityLogBtn">📋 LOG</button>
                    <button id="securityPauseBtn">⏸ PAUSE</button>
                    <button id="securityEmergencyBtn">🛑 STOP</button><button id="securityRecoverBtn">♻ RECOVER</button>
                </div>

                <div id="securityLog" class="securityLog"></div>
            </div>
        </div>

        <button id="close" class="close">CLOSE</button>
    </div>
    `;

    shadow.appendChild(panel);

    const $ = id => shadow.getElementById(id);

    const status = $("status");
    const next = $("next");
    const count = $("count");
    const remainingEl = $("remaining");
    const f = $("f");
    const a = $("a");
    const both = $("both");
    const like = $("like");
    const lf = $("lf");
    const comment = $("comment");
    const scroll = $("scroll");
    const commentsInput = $("comments");
    const commentList = $("commentList");
    const commentAll = $("commentAll");
    const commentNatural = $("commentNatural");
    const commentClear = $("commentClear");
    const commentRandom = $("commentRandom");

    scrollStepInput = $("scrollStep");
    scrollWaitInput = $("scrollWait");
    delayInput = $("delay");
    runMode = $("runMode");
    minutesInput = $("minutes");
    durationBox = $("durationBox");
    autoRefreshCheck = $("autoRefresh");

    [scrollStepInput, scrollWaitInput, delayInput, minutesInput].forEach(input => {
        input.addEventListener("input", _0x03c);
        input.addEventListener("change", _0x03c);
    });

    runMode.addEventListener("change", _0x03c);
    autoRefreshCheck.addEventListener("change", () => { _0x03c(); op2pScheduleAutoRefresh(); });

    const statsHead = $("statsHead");
    const statsBody = $("statsBody");
    const statsArrow = $("statsArrow");
    const statFollow = $("statFollow");
    const statFriend = $("statFriend");
    const statLike = $("statLike");
    const statComment = $("statComment");
    const statScroll = $("statScroll");
    const statTotal = $("statTotal");
    const resetStatsBtn = $("resetStats");

    const securityHead = $("securityHead");
    const securityBrowserInfo = $("securityBrowserInfo");
    if (securityBrowserInfo) securityBrowserInfo.textContent = _0x015.browser + " " + _0x015.version + " · " + _0x015.os + " · " + _0x015.deviceType;
    const securityBody = $("securityBody");
    const securityLevel = $("securityLevel");
    const securityLicense = $("securityLicense");
    const securityBrowser = $("securityBrowser");
    const securityIntegrity = $("securityIntegrity");
    const securityActivity = $("securityActivity");
    const securityCheckBtn = $("securityCheck");
    const securityLogBtn = $("securityLogBtn");
    const securityPauseBtn = $("securityPauseBtn");
    const securityEmergencyBtn = $("securityEmergencyBtn");
    const securityRecoverBtn = $("securityRecoverBtn");
    const securityLogBox = $("securityLog");
    const updateHead = $("updateHead");
    const updateBody = $("updateBody");
    const updateLevel = $("updateLevel");
    const updateStatus = $("updateStatus");
    const updateCurrent = $("updateCurrent");
    const updateLatest = $("updateLatest");
    const updateCheckBtn = $("updateCheck");
    const updateOpenBtn = $("updateOpen");
    let latestUpdateUrl = "";
    let latestUpdateVersion = _0x007;

    async function checkForUpdates(showResult = true) {
        try {
            updateStatus.textContent = "Checking update policy...";
            updateLevel.textContent = "CHECKING ▼";
            updateCurrent.textContent = _0x007;
            const key = String(await _0x010() || "").trim();
            if (!key) throw new Error("LICENSE_REQUIRED");
            const res = await _0x01a("security_policy", key);
            if (!res || res.ok !== true) {
                let cached = null;
                try {
                    const raw = localStorage.getItem(OP2P_POLICY_STORAGE);
                    cached = raw ? JSON.parse(raw) : null;
                } catch (_) {}
                const latestCached = String(cached && (cached.latestClientVersion || cached.minClientVersion) || "").trim();
                if (latestCached) {
                    latestUpdateVersion = latestCached;
                    latestUpdateUrl = String((cached && cached.updateUrl) || "").trim();
                    updateLatest.textContent = latestCached;
                    const cmpCached = compareUiVersions(_0x007, latestCached);
                    if (cmpCached < 0) {
                        updateLevel.textContent = "UPDATE AVAILABLE ▼";
                        updateLevel.className = "securityWatch";
                        updateStatus.textContent = String((cached && cached.updateNotes) || ("New OP2P version " + latestCached + " is available."));
                        updateOpenBtn.disabled = !latestUpdateUrl;
                    } else {
                        updateLevel.textContent = "CURRENT • CACHED ▼";
                        updateLevel.className = "securityGood";
                        updateStatus.textContent = "Using the last verified server update policy.";
                        updateOpenBtn.disabled = !latestUpdateUrl;
                    }
                    return true;
                }
                const err = String((res && res.error) || "UPDATE_CHECK_FAILED");
                updateLevel.textContent = "RETRY ▼";
                updateStatus.textContent = "Update policy unavailable: " + err;
                updateLatest.textContent = "—";
                updateOpenBtn.disabled = false;
                return false;
            }
            const latest = String(res.latestClientVersion || res.minClientVersion || _0x007).trim() || _0x007;
            latestUpdateVersion = latest;
            latestUpdateUrl = String(res.updateUrl || "").trim();
            updateLatest.textContent = latest;
            const cmp = compareUiVersions(_0x007, latest);
            if (cmp < 0) {
                updateLevel.textContent = "UPDATE AVAILABLE ▼";
                updateLevel.className = "securityWatch";
                updateStatus.textContent = String(res.updateNotes || ("New OP2P version " + latest + " is available."));
                updateOpenBtn.disabled = !latestUpdateUrl;
                updateOpenBtn.title = latestUpdateUrl ? "Open update" : "Admin has not published the update link yet";
                if (showResult) status.textContent = "UPDATE AVAILABLE";
            } else {
                updateLevel.textContent = "CURRENT ▼";
                updateLevel.className = "securityGood";
                updateStatus.textContent = "You are using the latest published OP2P version.";
                updateOpenBtn.disabled = true;
            }
            return true;
        } catch (e) {
            let cached = null;
            try {
                const raw = localStorage.getItem(OP2P_POLICY_STORAGE);
                cached = raw ? JSON.parse(raw) : null;
            } catch (_) {}
            const latestCached = String(cached && (cached.latestClientVersion || cached.minClientVersion) || "").trim();
            if (latestCached) {
                latestUpdateVersion = latestCached;
                latestUpdateUrl = String((cached && cached.updateUrl) || "").trim();
                updateLatest.textContent = latestCached;
                const cmpCached = compareUiVersions(_0x007, latestCached);
                updateLevel.textContent = cmpCached < 0 ? "UPDATE AVAILABLE • CACHED ▼" : "CURRENT • CACHED ▼";
                updateLevel.className = cmpCached < 0 ? "securityWatch" : "securityGood";
                updateStatus.textContent = "Using the last verified server update policy. Retry when online.";
                updateOpenBtn.disabled = !latestUpdateUrl;
                if (showResult) status.textContent = "UPDATE POLICY CACHED";
                return true;
            }
            updateLevel.textContent = "RETRY ▼";
            updateStatus.textContent = "Unable to check updates right now. Retry when the server is reachable.";
            updateLatest.textContent = "—";
            updateOpenBtn.disabled = false;
            if (showResult) status.textContent = "UPDATE CHECK RETRY";
            return false;
        }
    }

    function compareUiVersions(a,b){
        const pa=String(a||"").match(/\d+/g)||["0"];
        const pb=String(b||"").match(/\d+/g)||["0"];
        for(let i=0;i<3;i++){const x=Number(pa[i]||0),y=Number(pb[i]||0);if(x!==y)return x>y?1:-1;}
        return 0;
    }

    const dashLicense = $("dashLicense");
    const dashLicenseMeta = $("dashLicenseMeta");
    const dashPlan = $("dashPlan");
    const dashPlanMeta = $("dashPlanMeta");
    const dashExpiry = $("dashExpiry");
    const dashExpiryMeta = $("dashExpiryMeta");
    const dashQuota = $("dashQuota");
    const dashQuotaMeta = $("dashQuotaMeta");
    const dashServer = $("dashServer");
    const dashServerMeta = $("dashServerMeta");
    const dashBrowser = $("dashBrowser");
    const dashBrowserMeta = $("dashBrowserMeta");
    const dashHealth = $("dashHealth");
    const dashHealthMeta = $("dashHealthMeta");
    const dashIntegrity = $("dashIntegrity");
    const dashIntegrityMeta = $("dashIntegrityMeta");
    const dashOverview = $("dashOverview");
    const dashOverviewMeta = $("dashOverviewMeta");
    const dashModePill = $("dashModePill");

    function renderPremiumDashboard(){
        try {
            const activity = String(securityActivityState || "NORMAL");
            const integrity = String(securityIntegrityState || "UNKNOWN");
            const healthOnline = _0x016.lastEvent !== "";
            const planText = String(op2pServerPolicy.plan || "PRO");
            const licStatus = String(op2pServerPolicy.status || "ACTIVE").toUpperCase();
            const licState = String(op2pServerPolicy.licenseState || "ACTIVATED").toUpperCase();
            const expiry = String(op2pServerPolicy.expiry || "").trim();
            const maxQuota = Number(op2pServerPolicy.maxActionsPerSession || op2pServerPolicy.config?.maxActionsPerSession || 0);
            const usedQuota = Number(op2pServerPolicy.actionsUsed || 0);
            dashLicense.textContent = (licStatus === "ACTIVE" ? "✓ " : "⚠ ") + licStatus;
            dashLicense.className = "dashValue " + (licStatus === "ACTIVE" ? "securityGood" : "securityBad");
            dashLicenseMeta.textContent = licState + (op2pServerPolicy.customer ? " • " + op2pServerPolicy.customer : "");
            dashPlan.textContent = planText;
            dashPlan.className = "dashValue securityGood";
            dashPlanMeta.textContent = "Policy v" + String(op2pServerPolicy.policyVersion || "11.6.1");
            dashBrowser.textContent = op2pServerPolicy.browserLocked ? "✓ LOCKED" : "⚠ UNBOUND";
            dashBrowser.className = "dashValue " + (op2pServerPolicy.browserLocked ? "securityGood" : "securityWatch");
            dashBrowserMeta.textContent = _0x015.browser + " " + _0x015.version;
            dashExpiry.textContent = expiry || "—";
            dashExpiryMeta.textContent = expiry ? "Session " + (op2pServerPolicy.sessionExpires || "—") : "Expiry unavailable";
            dashHealth.innerHTML = '<span class="dot"></span>' + (healthOnline ? String(op2pServerPolicy.clientStatus || "ONLINE") : "READY");
            dashHealthMeta.textContent = "Recovery " + Number(_0x016.recoveryCount || 0) + " • " + (_0x016.lastEvent || "INIT");
            dashQuota.textContent = maxQuota > 0 ? (usedQuota + " / " + maxQuota) : (usedQuota + " / ∞");
            dashQuota.className = "dashValue " + (maxQuota > 0 && usedQuota >= maxQuota ? "securityBad" : "securityGood");
            dashQuotaMeta.textContent = maxQuota > 0 ? "Server action quota" : "Unlimited by plan";
            dashIntegrity.textContent = integrity === "VERIFIED" ? "✓ VERIFIED" : integrity === "TAMPER" ? "⚠ TAMPER" : integrity;
            dashIntegrity.className = "dashValue " + (integrity === "VERIFIED" ? "securityGood" : integrity === "TAMPER" ? "securityBad" : "securityWatch");
            dashIntegrityMeta.textContent = "Last check " + (securityLastCheck ? new Date(securityLastCheck).toLocaleTimeString() : "—");
            dashServer.textContent = String(op2pServerPolicy.systemStatus || "ACTIVE");
            dashServer.className = "dashValue " + (String(op2pServerPolicy.systemStatus || "ACTIVE") === "ACTIVE" ? "securityGood" : "securityBad");
            dashServerMeta.textContent = "Last health " + (op2pServerPolicy.lastHealthSeen || "—");
            dashOverview.textContent = statsTotal() + " actions • " + Number(_0x016.recoveryCount || 0) + " recovery";
            dashOverviewMeta.textContent = "Activity " + activity + " • " + (running ? "RUNNING" : "IDLE") + (op2pServerPolicy.securityAlerts ? " • alerts " + op2pServerPolicy.securityAlerts : "");
            dashModePill.textContent = selectedModes.size ? ([...selectedModes].join(" + ")) : (running ? "RUNNING" : "READY");
            const planBadge = shadow.querySelector(".brandBadge");
            if (planBadge) planBadge.textContent = "V11.6.1 • " + planText + " • SERVER";
        } catch(e) {}
    }

    panel.style.display = "none";

    const commentHead = $("commentHead");
    const commentBody = $("commentBody");
    const settingsHead = $("settingsHead");
    const settingsBody = $("settingsBody");

    function toggleCompactSection(head, body) {
        const open = body.classList.toggle("open");
        const arrow = head.querySelector("span:last-child");
        if (arrow) arrow.textContent = open ? "▲" : "▼";
    }

    commentHead.onclick = () => toggleCompactSection(commentHead, commentBody);
    settingsHead.onclick = () => toggleCompactSection(settingsHead, settingsBody);
    updateHead.onclick = () => toggleCompactSection(updateHead, updateBody);
    updateCheckBtn.onclick = async event => {
        event.stopPropagation();
        await checkForUpdates(true);
    };
    updateOpenBtn.onclick = event => {
        event.stopPropagation();
        if (!latestUpdateUrl) return;
        window.open("https://op2p.github.io/OP2P-LatestUpdate/index.html", "_blank", "noopener,noreferrer");
    };
    updateCurrent.textContent = _0x007;
    updateOpenBtn.disabled = true;
    setTimeout(() => checkForUpdates(false), 1200);

    function renderServerPolicyUi() {
        try {
            Object.entries(modeButtons).forEach(([mode, button]) => {
                button.style.opacity = op2pModeAllowed(mode) ? "1" : "0.38";
                button.title = op2pModeAllowed(mode) ? ("Enabled • " + String(op2pServerPolicy.plan || "PRO")) : "Disabled by server plan";
            });
            renderPremiumDashboard();
        } catch(e) {}
    }
    window.op2pPolicyRefresh = renderServerPolicyUi;

    function renderStats() {
        statFollow.textContent = String(op2pStats.follow);
        statFriend.textContent = String(op2pStats.friend);
        statLike.textContent = String(op2pStats.like);
        statComment.textContent = String(op2pStats.comment);
        statScroll.textContent = String(op2pStats.scroll);
        statTotal.textContent = String(statsTotal());
    }

    window.op2pStatsRefresh = renderStats;

    statsHead.addEventListener("click", event => {
        event.stopPropagation();
        const open = statsBody.classList.toggle("open");
        statsArrow.textContent = open ? "▲" : "▼";
    }, true);

    resetStatsBtn.addEventListener("click", async event => {
        event.stopPropagation();
        if (!confirm("Reset all OP2P statistics?")) return;
        await _0x039();
    });

    renderStats();

    function renderSecurityLog() {
        securityLogBox.innerHTML = "";
        if (!securityLog.length) {
            securityLogBox.textContent = "No security events yet.";
            return;
        }

        securityLog.slice().reverse().slice(0, 30).forEach(item => {
            const row = document.createElement("div");
            row.textContent = item.time + " • " + item.type + " — " + item.detail;
            securityLogBox.appendChild(row);
        });
    }

    window.op2pSecurityRefresh = () => {
        _0x02d();
        const level = securityActivityState === "NORMAL" ? "HIGH" : securityActivityState === "WATCH" ? "WATCH" : "PAUSED";
        securityLevel.textContent = level + " ▼";
        securityLevel.className = securityActivityState === "NORMAL" ? "securityGood" : securityActivityState === "WATCH" ? "securityWatch" : "securityBad";
        securityActivity.textContent = securityActivityState;
        securityActivity.className = securityActivityState === "NORMAL" ? "securityGood" : securityActivityState === "WATCH" ? "securityWatch" : "securityBad";

        securityIntegrity.textContent = securityIntegrityState === "VERIFIED" ? "✓ VERIFIED" : securityIntegrityState === "TAMPER" ? "⚠ TAMPER" : "⚠ " + securityIntegrityState;
        securityIntegrity.className = securityIntegrityState === "VERIFIED" ? "securityGood" : securityIntegrityState === "TAMPER" ? "securityBad" : "securityWatch";

        securityPauseBtn.textContent = securityPaused ? "▶ RESUME" : "⏸ PAUSE";
        renderSecurityLog();
    };

    securityHead.onclick = () => {
        const open = securityBody.classList.toggle("open");
        const arrow = securityHead.querySelector("span:last-child");
        if (arrow && !arrow.id) {
            const levelText = securityActivityState === "NORMAL" ? "HIGH" : securityActivityState === "WATCH" ? "WATCH" : "PAUSED";
            arrow.textContent = levelText + (open ? " ▲" : " ▼");
        }
    };

    securityCheckBtn.onclick = async () => {
        securityIntegrity.textContent = "CHECKING...";
        securityIntegrity.className = "";
        const ok = await _0x035();
        if (securityIntegrityState === "TAMPER") _0x030("Integrity mismatch detected");
        window.op2pSecurityRefresh();
        if (!ok) {
            status.textContent = "SECURITY WARNING";
            status.style.color = "#facc15";
        }
    };

    securityLogBtn.onclick = () => {
        const open = securityLogBox.style.display === "block";
        securityLogBox.style.display = open ? "none" : "block";
        renderSecurityLog();
    };

    securityPauseBtn.onclick = () => {
        if (securityPaused) {
            _0x031();
            status.textContent = "SECURITY RESUMED";
            status.style.color = "#60a5fa";
        } else {
            _0x030("Manual safety pause");
            status.textContent = "SAFETY PAUSE";
            status.style.color = "#facc15";
        }
        window.op2pSecurityRefresh();
    };

    securityEmergencyBtn.onclick = () => {
        _0x032();
        status.textContent = "EMERGENCY STOP";
        status.style.color = "#fb7185";
        window.op2pSecurityRefresh();
    };

    securityRecoverBtn.onclick = async () => {
        if (op2pSecurityBlocked()) { status.textContent = "SERVER SECURITY LOCK"; status.style.color = "#fb7185"; return; }
        _0x031();
        const okPolicy = await op2pLoadServerPolicy(true);
        const okHeartbeat = await _0x041(false);
        status.textContent = (okPolicy || okHeartbeat) ? "RECOVERY CHECKED" : "RECOVERY RETRY";
        status.style.color = (okPolicy || okHeartbeat) ? "#4ade80" : "#facc15";
        window.op2pSecurityRefresh();
        renderPremiumDashboard();
    };

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !event.repeat) {
            _0x032();
            status.textContent = "EMERGENCY STOP";
            status.style.color = "#fb7185";
            window.op2pSecurityRefresh();
        }
    }, true);

    securityLicense.textContent = "✓ ACTIVE";
    securityBrowser.textContent = "✓ LOCKED";

    _0x029()
        .then(() => _0x034())
        .then(() => _0x037())
        .then(() => _0x03e())
        .then(() => {
            op2pRestoreRefreshState();
            refreshModes();
            renderStats();
            window.op2pSecurityRefresh();
            renderPremiumDashboard();
            op2pScheduleAutoRefresh();
            setInterval(renderPremiumDashboard, 2000);
        });

    openButton.onclick = () => {
        panel.style.display = panel.style.display === "none" ? "block" : "none";
        renderPremiumDashboard();
    };

    $("close").onclick = () => {
        stop();
        panel.style.display = "none";
    };

    function syncSelectedComments() {
        const selected = [...commentList.querySelectorAll('input[type="checkbox"][data-comment]')]
            .filter(cb => cb.checked).map(cb => cb.dataset.comment);
        commentsInput.value = selected.join("\n");
    }

    function setAllComments(checked) {
        commentList.querySelectorAll('input[type="checkbox"][data-comment]').forEach(cb => { cb.checked = checked; });
        syncSelectedComments();
    }

    function setNaturalComments() {
        const natural = new Set(COMMENT_CATEGORIES["SANTAI & NATURAL"]);
        commentList.querySelectorAll('input[type="checkbox"][data-comment]').forEach(cb => { cb.checked = natural.has(cb.dataset.comment); });
        syncSelectedComments();
    }

    function setRandomComments() {
        const boxes = [...commentList.querySelectorAll('input[type="checkbox"][data-comment]')];
        boxes.forEach(cb => { cb.checked = false; });
        const shuffled = boxes.slice().sort(() => Math.random() - 0.5).slice(0, Math.min(RANDOM_COMMENT_COUNT, boxes.length));
        shuffled.forEach(cb => { cb.checked = true; });
        syncSelectedComments();
    }

    function renderCommentList() {
        commentList.innerHTML = "";
        Object.entries(COMMENT_CATEGORIES).forEach(([category,items]) => {
            const group = document.createElement("div");
            group.className = "commentCategory";
            const title = document.createElement("div");
            title.className = "commentCategoryTitle";
            title.textContent = category;
            group.appendChild(title);

            items.forEach(text => {
                const label = document.createElement("label");
                label.className = "commentItem";
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = true;
                checkbox.dataset.comment = text;
                checkbox.addEventListener("change", syncSelectedComments);
                const span = document.createElement("span");
                span.textContent = text;
                label.appendChild(checkbox);
                label.appendChild(span);
                group.appendChild(label);
            });
            commentList.appendChild(group);
        });
        syncSelectedComments();
    }

    commentAll.onclick = () => setAllComments(true);
    commentNatural.onclick = setNaturalComments;
    commentClear.onclick = () => setAllComments(false);
    commentRandom.onclick = setRandomComments;

    renderCommentList();

    const modeButtons = { F:f, A:a, BOTH:both, LIKE:like, LIKE_FOLLOW:lf, COMMENT:comment, SCROLL:scroll };
    const modeColors = { F:"#60a5fa", A:"#c084fc", BOTH:"#22d3ee", LIKE:"#fb7185", LIKE_FOLLOW:"#fb923c", COMMENT:"#4ade80", SCROLL:"#facc15" };

    function refreshModes() {
        Object.entries(modeButtons).forEach(([mode,button]) => {
            button.style.outline = selectedModes.has(mode) ? `2px solid ${modeColors[mode]}` : "none";
        });
        status.textContent = selectedModes.size ? "READY " + [...selectedModes].join(" + ") : "READY -";
        status.style.color = "#60a5fa";
        renderPremiumDashboard();
    }

    function toggleMode(mode) {
        if (running) return;
        if (!op2pModeAllowed(mode)) { status.textContent = "FEATURE DISABLED BY PLAN"; status.style.color = "#fb7185"; return; }
        if (mode === "BOTH") {
            const enable = !selectedModes.has("BOTH");
            selectedModes.delete("F");
            selectedModes.delete("A");
            if (enable) selectedModes.add("BOTH");
            else selectedModes.delete("BOTH");
        } else if (mode === "F" || mode === "A") {
            selectedModes.delete("BOTH");
            if (selectedModes.has(mode)) selectedModes.delete(mode);
            else selectedModes.add(mode);
        } else {
            if (selectedModes.has(mode)) selectedModes.delete(mode);
            else selectedModes.add(mode);
        }
        refreshModes();
    }

    f.onclick = () => toggleMode("F");
    a.onclick = () => toggleMode("A");
    both.onclick = () => toggleMode("BOTH");
    like.onclick = () => toggleMode("LIKE");
    lf.onclick = () => toggleMode("LIKE_FOLLOW");
    comment.onclick = () => toggleMode("COMMENT");
    scroll.onclick = () => toggleMode("SCROLL");

    refreshModes();

    runMode.onchange = () => {
        durationBox.style.display = runMode.value === "minutes" ? "block" : "none";
        _0x03c();
    };

    function isVisible(el) {
        if (!(el instanceof HTMLElement)) return false;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight && s.display !== "none" && s.visibility !== "hidden");
    }

    function getText(el) {
        return [
            el.getAttribute("aria-label") || "",
            el.getAttribute("title") || "",
            el.getAttribute("data-testid") || "",
            el.innerText || "",
            el.textContent || ""
        ].join(" ").trim().toLowerCase();
    }

    function isAlreadyLiked(el) {
        const text = getText(el);
        return (text.includes("unlike") || text.includes("remove like") || text.includes("remove reaction") || text.includes("tidak suka"));
    }

    function findClickable(el) {
        let node = el;
        for (let i = 0; i < 12 && node; i++) {
            if (node instanceof HTMLElement && isVisible(node)) {
                const tag = node.tagName.toLowerCase();
                const role = node.getAttribute("role");
                if (tag === "button" || role === "button") return node;
            }
            node = node.parentElement;
        }
        return null;
    }

    function findLikeButton() {
        const ariaNodes = document.querySelectorAll("[aria-label]");
        for (const el of ariaNodes) {
            if (!isVisible(el) || isAlreadyLiked(el)) continue;
            const aria = (el.getAttribute("aria-label") || "").trim().toLowerCase();
            if (aria === "like" || aria === "suka") {
                const button = findClickable(el);
                if (button && !isAlreadyLiked(button)) return button;
            }
        }
        const buttons = [...document.querySelectorAll("button"), ...document.querySelectorAll('[role="button"]')];
        for (const el of buttons) {
            if (!isVisible(el) || isAlreadyLiked(el)) continue;
            const text = getText(el);
            if (text === "like" || text === "suka") return el;
        }
        return null;
    }

    async function clickLike() {
        const actionToken = await authorizeServerAction("LIKE");
        if (!actionToken) return false;
        let committed = false;
        let actionPerformed = false;
        try {
        const button = findLikeButton();
        if (!button) {
            status.textContent = "LIKE NOT FOUND";
            status.style.color = "#fb7185";
            return false;
        }
        try { button.scrollIntoView({behavior:"smooth", block:"center"}); } catch(e){}
        await wait(400);

        if (isAlreadyLiked(button)) {
            status.textContent = "ALREADY LIKED";
            status.style.color = "#ffaa00";
            return false;
        }
        if (!await _0x02e("LIKE")) {
            status.textContent = "SAFETY PAUSE";
            status.style.color = "#facc15";
            return false;
        }

        button.click();
        actionPerformed = true;
        incrementStat("like");
        status.textContent = "LIKE";
        status.style.color = "#4ade80";
        const finalized = await finalizeServerAction("LIKE", actionToken, true);
        committed = finalized;
        return finalized;
        } finally { if (!committed && !actionPerformed) await finalizeServerAction("LIKE", actionToken, false); }
    }

    function getButtonText(el) {
        return [el.getAttribute("aria-label") || "", el.getAttribute("title") || "", el.innerText || "", el.textContent || ""]
            .join(" ").replace(/\s+/g, " ").trim().toLowerCase();
    }

    function findFollowButton() {
        const elements = [...document.querySelectorAll("button"), ...document.querySelectorAll('[role="button"]')];
        const blocked = ["following", "unfollow", "remove follow", "diikuti", "berhenti mengikuti"];
        for (const el of elements) {
            if (!isVisible(el)) continue;
            const text = getButtonText(el);
            if (blocked.some(x => text === x || text.includes(x))) continue;
            if (text === "follow" || text === "ikuti" || text.includes("follow") || text.includes("ikuti")) return el;
        }
        return null;
    }

    function findAddFriendButton() {
        const elements = [...document.querySelectorAll("button"), ...document.querySelectorAll('[role="button"]')];
        const labels = ["add friend", "tambah rakan", "tambah kawan", "add a friend", "send friend request", "hantar permintaan rakan"];
        for (const el of elements) {
            if (!isVisible(el)) continue;
            const text = getButtonText(el);
            if (labels.some(label => text === label || text.includes(label))) return el;
        }
        return null;
    }

    async function followCurrent() {
        const actionToken = await authorizeServerAction("FOLLOW");
        if (!actionToken) return false;
        let committed = false;
        let actionPerformed = false;
        try {
        const button = findFollowButton();
        if (!button) {
            status.textContent = "FOLLOW NOT FOUND";
            status.style.color = "#fb7185";
            return false;
        }
        try { button.scrollIntoView({behavior:"smooth", block:"center"}); } catch(e) {}
        await wait(400);
        if (!await _0x02e("FOLLOW")) {
            status.textContent = "SAFETY PAUSE";
            status.style.color = "#facc15";
            return false;
        }

        button.click();
        actionPerformed = true;
        incrementStat("follow");
        status.textContent = "FOLLOW";
        status.style.color = "#60a5fa";
        const finalized = await finalizeServerAction("FOLLOW", actionToken, true);
        committed = finalized;
        return finalized;
        } finally { if (!committed && !actionPerformed) await finalizeServerAction("FOLLOW", actionToken, false); }
    }

    async function addFriendCurrent() {
        const actionToken = await authorizeServerAction("FRIEND");
        if (!actionToken) return false;
        let committed = false;
        let actionPerformed = false;
        try {
        const button = findAddFriendButton();
        if (!button) {
            status.textContent = "ADD FRIEND NOT FOUND";
            status.style.color = "#fb7185";
            return false;
        }
        try { button.scrollIntoView({behavior:"smooth", block:"center"}); } catch(e) {}
        await wait(400);
        if (!await _0x02e("ADD FRIEND")) {
            status.textContent = "SAFETY PAUSE";
            status.style.color = "#facc15";
            return false;
        }

        button.click();
        actionPerformed = true;
        incrementStat("friend");
        status.textContent = "ADD FRIEND";
        status.style.color = "#c084fc";
        const finalized = await finalizeServerAction("FRIEND", actionToken, true);
        committed = finalized;
        return finalized;
        } finally { if (!committed && !actionPerformed) await finalizeServerAction("FRIEND", actionToken, false); }
    }

    function getCenterDistance(el) {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        return Math.abs(center - window.innerHeight / 2);
    }

    function findCommentBox() {
        const articles = [...document.querySelectorAll('[role="article"]')].filter(isVisible)
            .sort((x,y) => getCenterDistance(x) - getCenterDistance(y));

        for (const article of articles) {
            const boxes = [...article.querySelectorAll('div[contenteditable="true"][role="textbox"]'), ...article.querySelectorAll('div[contenteditable="true"]')]
                .filter(isVisible);
            if (boxes.length) return boxes.find(x => x !== lastCommentBox) || boxes[0];
        }

        const boxes = [...document.querySelectorAll('div[contenteditable="true"][role="textbox"]'), ...document.querySelectorAll('div[contenteditable="true"]')]
            .filter(isVisible).sort((x,y) => getCenterDistance(x) - getCenterDistance(y));

        return boxes.find(x => x !== lastCommentBox) || boxes[0] || null;
    }

    async function autoComment() {
        if (commentBusy) return false;
        const actionToken = await authorizeServerAction("COMMENT");
        if (!actionToken) return false;
        let committed = false;
        let actionPerformed = false;
        commentBusy = true;

        try {
            const box = findCommentBox();
            if (!box) {
                status.textContent = "COMMENT BOX NOT FOUND";
                status.style.color = "#fb7185";
                return false;
            }

            const selectedComments = commentsInput.value.split("\n").map(x => x.trim()).filter(Boolean);
            const pool = selectedComments.length ? selectedComments : HUMAN_COMMENTS;
            const comment = pool[Math.floor(Math.random() * pool.length)];

            const article = box.closest('[role="article"]');
            if ((article && article === lastSubmittedArticle) || box === lastSubmittedBox) {
                status.textContent = "DUPLICATE BLOCKED";
                status.style.color = "#ffaa00";
                return false;
            }

            lastCommentBox = box;
            lastSubmittedBox = box;
            lastSubmittedArticle = article;
            lastSubmitTime = Date.now();

            try { box.scrollIntoView({behavior:"smooth", block:"center"}); } catch(e){}
            await wait(700 + Math.random() * 900);
            box.focus();

            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(box);
            selection.removeAllRanges();
            selection.addRange(range);

            document.execCommand("delete", false, null);
            document.execCommand("insertText", false, comment);

            next.textContent = comment;
            await wait(900 + Math.random() * 700);

            box.focus();
            if (!await _0x02e("COMMENT")) {
                status.textContent = "SAFETY PAUSE";
                status.style.color = "#facc15";
                return false;
            }

            actionPerformed = true;
            box.dispatchEvent(
                new KeyboardEvent("keydown", {
                    key:"Enter",
                    code:"Enter",
                    keyCode:13,
                    which:13,
                    bubbles:true,
                    cancelable:true
                })
            );
            incrementStat("comment");

            status.textContent = "AUTO COMMENT";
            status.style.color = "#4ade80";
            await wait(1500);
            const finalized = await finalizeServerAction("COMMENT", actionToken, true);
            committed = finalized;
            return finalized;

        } finally {
            if (!committed && !actionPerformed) await finalizeServerAction("COMMENT", actionToken, false);
            commentBusy = false;
        }
    }

    async function autoScroll() {
        const actionToken = await authorizeServerAction("SCROLL");
        if (!actionToken) return false;
        let committed = false;
        let actionPerformed = false;
        try {
        let step = Number(scrollStepInput.value);
        if (!Number.isFinite(step) || step <= 0) { step = 80; scrollStepInput.value = "80"; }
        step = Math.min(200, Math.max(10, step));

        let waitSeconds = Number(scrollWaitInput.value);
        if (!Number.isFinite(waitSeconds) || waitSeconds < 0.1) { waitSeconds = 1; scrollWaitInput.value = "1"; }

        const distance = Math.round(window.innerHeight * (step / 100));
        window.scrollBy({ top:distance, left:0, behavior:"smooth" });
        actionPerformed = true;

        incrementStat("scroll");
        status.textContent = "AUTO SCROLL";
        status.style.color = "#facc15";

        await wait(waitSeconds * 1000);
        const finalized = await finalizeServerAction("SCROLL", actionToken, true);
        committed = finalized;
        return finalized;
        } finally { if (!committed && !actionPerformed) await finalizeServerAction("SCROLL", actionToken, false); }
    }

    async function authorizeServerAction(feature) {
        if (op2pSecurityBlocked()) return null;
        try {
            const key = String(await _0x010() || "").trim();
            if (!key) return null;
            const res = await _0x01a("authorize_action", key, { feature:String(feature||"").toUpperCase() });
            if (res && res.ok === true && res.actionToken) return String(res.actionToken);
            const err = String((res && res.error) || "ACTION_AUTH_FAILED");
            if (["SYSTEM_KILLED","CLIENT_UPDATE_REQUIRED","LICENSE_MANUALLY_LOCKED","LICENSE_INACTIVE","BROWSER_LOCKED","LICENSE_REVOKED","LICENSE_EXPIRED","LICENSE_NOT_ACTIVATED","SESSION_INVALID","SESSION_EXPIRED","MISSING_SESSION"].includes(err)) {
                op2pSecurityHardStop(err);
                try { alert("OP2P: Server action authorization gagal (" + err + ")."); } catch(e) {}
            } else if (err === "ACTION_QUOTA_REACHED") {
                status.textContent = "SERVER QUOTA REACHED";
                status.style.color = "#fb7185";
                running = false;
            } else if (err === "FEATURE_NOT_ALLOWED") {
                _0x018("FEATURE_BLOCKED", feature, "WARNING");
            }
            return null;
        } catch(e) {
            _0x018("ACTION_AUTH_ERROR", String(e && e.message || e), "ERROR");
            return null;
        }
    }

    async function finalizeServerAction(feature, actionToken, success) {
        if (!actionToken) return false;
        try {
            const key = String(await _0x010() || "").trim();
            if (!key) return false;
            const endpoint = success ? "commit_action" : "release_action";
            const res = await _0x01a(endpoint, key, { action_token:String(actionToken), feature:String(feature||"").toUpperCase() });
            if (res && res.ok === true) return true;
            _0x018(success ? "ACTION_COMMIT_ERROR" : "ACTION_RELEASE_ERROR", String((res && res.error) || "FINALIZE_FAILED"), "WARNING");
            return false;
        } catch(e) {
            _0x018(success ? "ACTION_COMMIT_ERROR" : "ACTION_RELEASE_ERROR", String(e && e.message || e), "WARNING");
            return false;
        }
    }

    async function executeMode() {
        if (op2pSecurityBlocked()) return;
        if (!selectedModes.size) {
            status.textContent = "NO ACTION SELECTED";
            status.style.color = "#fb7185";
            return;
        }

        const order = ["BOTH", "F", "A", "LIKE_FOLLOW", "LIKE", "COMMENT", "SCROLL"];

        for (const mode of order) {
            if (op2pSecurityBlocked()) break;
            if (!selectedModes.has(mode) || !running) continue;
            if (!op2pModeAllowed(mode)) { _0x018("FEATURE_BLOCKED", mode, "WARNING"); continue; }
            if (op2pActionLimitReached()) { status.textContent = "SERVER LIMIT REACHED"; status.style.color = "#fb7185"; running=false; break; }

            if (mode === "BOTH") {
                const followed = await followCurrent();
                if (op2pSecurityBlocked()) break;
                await wait(500);
                if (!running) break;
                const added = await addFriendCurrent();
                if (followed) totalCount++;
                if (added) totalCount++;
                status.textContent = followed && added ? "F + A" : followed ? "FOLLOW" : added ? "ADD FRIEND" : "F + A NOT FOUND";
            } else if (mode === "F") {
                const followed = await followCurrent();
                if (op2pSecurityBlocked()) break;
                if (followed) totalCount++;
            } else if (mode === "A") {
                const added = await addFriendCurrent();
                if (op2pSecurityBlocked()) break;
                if (added) totalCount++;
            } else if (mode === "LIKE_FOLLOW") {
                const liked = await clickLike();
                if (op2pSecurityBlocked()) break;
                if (!running) break;
                await wait(500);
                if (!running) break;
                const followed = await followCurrent();
                if (liked) totalCount++;
                if (followed) totalCount++;
                status.textContent = liked && followed ? "LIKE + FOLLOW" : followed ? "FOLLOW" : liked ? "LIKE" : "LIKE + FOLLOW NOT FOUND";
            } else if (mode === "LIKE") {
                const liked = await clickLike();
                if (op2pSecurityBlocked()) break;
                if (liked) totalCount++;
            } else if (mode === "COMMENT") {
                const commented = await autoComment();
                if (op2pSecurityBlocked()) break;
                if (commented) totalCount++;
            } else if (mode === "SCROLL") {
                await autoScroll();
                if (op2pSecurityBlocked()) break;
            }

            count.textContent = String(totalCount);
            await wait(300);
            if (!running) break;
        }
    }

    function getDelay() {
        let seconds = Number(delayInput.value);
        const cfg = op2pServerPolicy.config || {};
        const min = Math.max(0.1, Number(cfg.minDelaySeconds || 1));
        const max = Math.max(min, Number(cfg.maxDelaySeconds || 60));
        const forced = Math.max(0, Number(cfg.forceDelaySeconds || 0));
        if (!Number.isFinite(seconds) || seconds <= 0) seconds = 5;
        seconds = Math.max(min, Math.min(max, seconds));
        if (forced > 0) seconds = Math.max(seconds, forced);
        delayInput.value = String(seconds);
        return seconds * 1000;
    }

    function updateCountdown() {
        next.textContent = (remaining / 1000).toFixed(1) + "s";
    }

    function updateDuration() {
        const seconds = Math.max(0, Math.ceil(remainingDuration / 1000));
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        remainingEl.textContent = minutes + "m " + String(secs).padStart(2, "0") + "s";
    }

    function start() {
        if (op2pSecurityBlocked()) {
            status.textContent = "SECURITY LOCKED";
            status.style.color = "#fb7185";
            return;
        }
        if (securityPaused) {
            status.textContent = "SECURITY PAUSED";
            status.style.color = "#facc15";
            return;
        }

        if (running) return;
        if (!selectedModes.size) {
            status.textContent = "NO ACTION SELECTED";
            status.style.color = "#fb7185";
            return;
        }

        running = true;
        _0x016.running = true;
        _0x019("START", "OP2P started").catch(()=>{});
        status.textContent = "RUNNING";
        status.style.color = "#4ade80";
        renderPremiumDashboard();

        if (runMode.value === "minutes") {
            let minutes = Number(minutesInput.value);
            if (!Number.isFinite(minutes) || minutes <= 0) { minutes = 1; minutesInput.value = "1"; }
            remainingDuration = minutes * 60 * 1000;
            updateDuration();
            clearInterval(durationTimer);
            durationTimer = setInterval(() => {
                if (!running) return;
                remainingDuration -= 1000;
                if (remainingDuration <= 0) {
                    remainingDuration = 0;
                    updateDuration();
                    stop();
                    status.textContent = "DONE";
                    status.style.color = "#60a5fa";
                    return;
                }
                updateDuration();
            }, 1000);
        } else {
            remainingEl.textContent = "∞";
        }
        schedule();
    }

    function stop(reason = "MANUAL_STOP") {
        const wasRunning = running;
        running = false;
        _0x016.timerActive = false;
        _0x016.running = false;
        if (wasRunning || reason !== "MANUAL_STOP") _0x019(reason, "OP2P stopped").catch(()=>{});
        clearTimeout(timer);
        clearInterval(countdownTimer);
        clearInterval(durationTimer);
        timer = null;
        countdownTimer = null;
        durationTimer = null;
        next.textContent = "-";
        remainingEl.textContent = "-";
        if (op2pSecurityBlocked()) {
            status.textContent = "SECURITY LOCKED";
            status.style.color = "#fb7185";
        } else {
            status.textContent = "STOPPED";
            status.style.color = "#ff6666";
        }
        renderPremiumDashboard();
    }

    function schedule() {
        if (op2pSecurityBlocked() || !running) return;
        clearTimeout(timer);
        clearInterval(countdownTimer);

        remaining = getDelay();
        updateCountdown();

        countdownTimer = setInterval(() => {
            if (!running) { clearInterval(countdownTimer); return; }
            remaining -= 100;
            if (remaining < 0) remaining = 0;
            updateCountdown();
        }, 100);

        _0x016.timerActive = true;
        timer = setTimeout(async () => {
            clearInterval(countdownTimer);
            _0x016.timerActive = false;
            if (op2pSecurityBlocked() || !running) return;
            _0x016.actionInProgress = true;
            try { await executeMode(); } catch (e) { _0x019("RUNTIME_ERROR", String(e && e.message || e), "ERROR").catch(()=>{}); }
            _0x016.actionInProgress = false;
            if (!op2pSecurityBlocked() && running) schedule();
        }, remaining);
    }

    $("start").onclick = start;
    $("stop").onclick = stop;

    op2pUiStop = stop;
    op2pUiStart = start;
    op2pUiSchedule = schedule;
    document.documentElement.appendChild(host);
}




const _0x040 = 60 * 1000; 
let op2pV6HeartbeatTimer = null;
let op2pV6Locked = false;
let op2pHeartbeatFailures = 0;
let op2pPolicyFailures = 0;

function op2pSecurityHardStop(reason = "SECURITY_LOCK") {
    const wasLocked = op2pV6Locked;
    op2pV6Locked = true;

    // Remove the visible OP2P UI immediately when access is revoked/locked.
    try {
        const host = document.getElementById(HOST_ID);
        if (host) host.remove();
    } catch(e) {}
    try { clearInterval(op2pHealthHeartbeatTimer); } catch(e) {}
    if (!wasLocked) {
        try { _0x019("SECURITY_LOCKED", String(reason || "SECURITY_LOCK"), "ERROR").catch(()=>{}); } catch(e) {}
    }
    try {
        if (typeof stop === "function") stop(reason);
    } catch(e) {}
    try {
        _0x016.running = false;
        _0x016.actionInProgress = false;
        _0x016.timerActive = false;
    } catch(e) {}
    try {
        running = false;
    } catch(e) {}
}

function op2pSecurityBlocked() {
    return !!op2pV6Locked;
}

async function _0x041(showAlert = false) {
    if (op2pV6Locked) return false;

    try {
        const key = String(await _0x010() || "").trim();
        if (!key) return false;
        const res = await _0x01a("heartbeat", key);
        if (res && res.ok === true && res.status === "ACTIVE") {
            op2pHeartbeatFailures = 0;
            void _0x00f(_0x005, String(Date.now()));
            return true;
        }

        const err = String((res && res.error) || "LICENSE_ERROR");
        if (["BROWSER_RESET_REQUIRED","BROWSER_LOCKED","LICENSE_LOCKED","LICENSE_MANUALLY_LOCKED","LICENSE_INACTIVE","LICENSE_REVOKED","LICENSE_EXPIRED","SYSTEM_KILLED","CLIENT_UPDATE_REQUIRED","SESSION_INVALID","SESSION_EXPIRED","MISSING_SESSION"].includes(err)) {
            op2pSecurityHardStop(err);
            if (showAlert) { try { alert("OP2P: License/security session tidak sah (" + err + ")."); } catch(e) {} }
            return false;
        }

        op2pHeartbeatFailures++;
        _0x019("HEARTBEAT_FAILED", err, "WARNING").catch(()=>{});
        if (op2pHeartbeatFailures >= OP2P_RUNTIME_FAIL_LIMIT) {
            op2pSecurityHardStop("RUNTIME_HEARTBEAT_FAILED");
            try { alert("OP2P: Sambungan server gagal berulang kali. OP2P dikunci sementara untuk keselamatan."); } catch(e) {}
        }
        return false;
    } catch(e) {
        op2pHeartbeatFailures++;
        _0x019("HEARTBEAT_NETWORK_ERROR", String(e && e.message || e), "WARNING").catch(()=>{});
        if (op2pHeartbeatFailures >= OP2P_RUNTIME_FAIL_LIMIT) {
            op2pSecurityHardStop("RUNTIME_HEARTBEAT_FAILED");
            try { alert("OP2P: Server tidak dapat dicapai selepas beberapa percubaan. OP2P dikunci untuk keselamatan."); } catch(_) {}
        }
        return false;
    }
}

let op2pSecurityPolicyTimer = null;
async function _0x045() {
    if (op2pV6Locked) return false;
    try {
        const key = String(await _0x010() || "").trim();
        if (!key) return false;
        const res = await _0x01a("security_policy", key);
        if (res && res.ok === true) {
            op2pPolicyFailures = 0;
            op2pServerPolicy = op2pNormalizePolicy(res);
            try { localStorage.setItem(OP2P_POLICY_STORAGE, JSON.stringify(op2pServerPolicy)); } catch(e) {}
            if (typeof window.op2pPolicyRefresh === "function") window.op2pPolicyRefresh();
            return true;
        }
        const err = String((res && res.error) || "POLICY_CHECK_FAILED");
        if (["SYSTEM_KILLED","CLIENT_UPDATE_REQUIRED","LICENSE_MANUALLY_LOCKED","LICENSE_INACTIVE","BROWSER_LOCKED","LICENSE_REVOKED","LICENSE_EXPIRED","SESSION_INVALID","SESSION_EXPIRED","MISSING_SESSION"].includes(err)) {
            op2pSecurityHardStop(err);
            _0x019("SECURITY_LOCK", err, "ERROR").catch(()=>{});
            try { alert("OP2P: Security Monitor mengunci client (" + err + ")."); } catch(e) {}
            return false;
        }
        op2pPolicyFailures++;
        _0x019("POLICY_CHECK_FAILED", err, "WARNING").catch(()=>{});
        if (op2pPolicyFailures >= OP2P_RUNTIME_FAIL_LIMIT) {
            op2pSecurityHardStop("RUNTIME_POLICY_FAILED");
            try { alert("OP2P: Server policy gagal diperoleh berulang kali. OP2P dikunci untuk keselamatan."); } catch(e) {}
        }
    } catch(e) {
        op2pPolicyFailures++;
        _0x019("POLICY_NETWORK_ERROR", String(e && e.message || e), "WARNING").catch(()=>{});
        if (op2pPolicyFailures >= OP2P_RUNTIME_FAIL_LIMIT) {
            op2pSecurityHardStop("RUNTIME_POLICY_FAILED");
            try { alert("OP2P: Sambungan policy server gagal berulang kali. OP2P dikunci untuk keselamatan."); } catch(_) {}
        }
    }
    return false;
}
function _0x046() {
    clearInterval(op2pSecurityPolicyTimer);
    op2pSecurityPolicyTimer = setInterval(() => _0x045().catch(()=>{}), 60 * 1000);
}

function _0x042() {
    setInterval(() => {
        if (op2pSecurityBlocked() || !op2pUiSchedule || !_0x016.running || _0x016.actionInProgress || _0x016.timerActive) return;
        _0x016.recoveryCount++; _0x016.lastRecovery=Date.now();
        _0x019("SAFE_RESTART", "Scheduler watchdog recovered an idle runtime", "WARNING").catch(()=>{});
        try { op2pUiSchedule(); } catch(e) { _0x019("SAFE_RESTART_FAILED", String(e&&e.message||e), "ERROR").catch(()=>{}); }
    }, _0x00a);
}

let op2pHealthHeartbeatTimer = null;
function _0x043() {
    clearInterval(op2pHealthHeartbeatTimer);
    op2pHealthHeartbeatTimer = setInterval(() => {
        if (op2pV6Locked) return;
        _0x019("HEARTBEAT", "Client health heartbeat").catch(()=>{});
    }, _0x009);
}

function _0x044() {
    clearInterval(op2pV6HeartbeatTimer);
    op2pV6HeartbeatTimer = setInterval(
        () => _0x041(false).catch(() => {}),
        _0x040
    );
}

_0x01c().then(async ok => {
    if (!ok) return;
    try { localStorage.removeItem("OP2P_SERVER_POLICY_V11_5_4"); } catch(e) {}
    try { localStorage.removeItem("OP2P_SERVER_POLICY_V11_7_0"); } catch(e) {}
    try { localStorage.removeItem("OP2P_SERVER_POLICY_V11_6_0"); } catch(e) {}
    const freshPolicyOk = await op2pLoadServerPolicy(true);
    if (!freshPolicyOk) {
        op2pSecurityHardStop("SERVER_POLICY_UNAVAILABLE");
        try { alert("OP2P: Server policy tidak dapat disahkan. OP2P dikunci untuk keselamatan."); } catch(e) {}
        return;
    }
    init();
    renderServerPolicyUi?.();
    _0x044(); _0x042(); _0x043(); _0x046();
    _0x019("CLIENT_ONLINE", "Client started").catch(()=>{});
});

})();
