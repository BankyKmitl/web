/** @odoo-module **/

import {WebClient} from "@web/webclient/webclient";
import { useService } from "@web/core/utils/hooks";
import session from "web.session";
import {patch} from "web.utils";

patch(WebClient.prototype, "web_notify.WebClient", {
    setup() {
        this._super();
        this.notification = useService("notification")
        this.start_polling();
    },
    start_polling() {
        this.channel_success = "notify_success_" + session.uid;
        this.channel_danger = "notify_danger_" + session.uid;
        this.channel_warning = "notify_warning_" + session.uid;
        this.channel_info = "notify_info_" + session.uid;
        this.channel_default = "notify_default_" + session.uid;
        this.all_channels = [
            this.channel_success,
            this.channel_danger,
            this.channel_warning,
            this.channel_info,
            this.channel_default,
        ];

        this.env.bus.on("WEB_CLIENT_READY", null, async () => {
            this.legacyEnv = owl.Component.env;
            this.legacyEnv.services.bus_service.startPolling();

            if (this.legacyEnv.services.bus_service.isMasterTab()) {
                this.legacyEnv.services.bus_service.addChannel(this.channel_success);
                this.legacyEnv.services.bus_service.addChannel(this.channel_danger);
                this.legacyEnv.services.bus_service.addChannel(this.channel_warning);
                this.legacyEnv.services.bus_service.addChannel(this.channel_info);
                this.legacyEnv.services.bus_service.addChannel(this.channel_default);
            }

            this.legacyEnv.services.bus_service.onNotification(this, this.bus_notification);
        });
    },
    bus_notification: function (notifications) {
        var self = this;
        _.each(notifications, function (notification) {
            if (self.all_channels !== null) {
                self.on_message(notification.payload);
            }
        });
    },
    on_message: function (message) {
        this.notification.add(message.message, {
            type: message.type,
            title: message.title,
            sticky: message.sticky,
        });
    },
})
