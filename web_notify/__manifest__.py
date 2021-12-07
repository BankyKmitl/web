# pylint: disable=missing-docstring
# Copyright 2016 ACSONE SA/NV
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

{
    "name": "Web Notify",
    "summary": """
        Send notification messages to user""",
    "version": "15.0.1.0.0",
    "license": "AGPL-3",
    "author": "ACSONE SA/NV," "AdaptiveCity," "Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/web",
    "depends": ["web", "bus", "base"],
    "data": ["views/res_users_demo.xml"],
    "demo": ["views/res_users_demo.xml"],
    "installable": True,
    "assets": {
        "web.assets_backend": [
            "web_notify/static/src/components/webclient/webclient.esm.js",
            # "web_notify/static/src/legacy/scss/webclient.scss",
            # "web_notify/static/src/legacy/js/widgets/notification.js",
            # "web_notify/static/src/legacy/js/web_client.js",
            # "web_notify/static/src/legacy/scss/webclient.scss",
        ],
    },
}
