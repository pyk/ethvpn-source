'use strict';

function GenerateConfig (url: string): string {
  return `
# Specify that we are a client and that we
# will be pulling certain config file directives
# from the server.
client

dev tun

proto tcp

remote ${url} 443

resolv-retry infinite

nobind

persist-key
persist-tun

remote-cert-tls server

cipher AES-128-CBC
auth SHA256
auth-user-pass

key-direction 1

comp-lzo

# Set log file verbosity.
verb 3

# The server public certificate
<ca>
-----BEGIN CERTIFICATE-----
MIIEpzCCA4+gAwIBAgIJAMbq+pebeoUZMA0GCSqGSIb3DQEBCwUAMIGTMQswCQYD
VQQGEwJVUzELMAkGA1UECBMCVFgxDzANBgNVBAcTBkRhbGxhczEPMA0GA1UEChMG
RXRoVlBOMQ8wDQYDVQQLEwZFdGhWUE4xEjAQBgNVBAMTCUV0aFZQTiBDQTEPMA0G
A1UEKRMGc2VydmVyMR8wHQYJKoZIhvcNAQkBFhBjaGFuY2VAZXRodnBuLmlvMB4X
DTE3MDkxMDE3NDIyMVoXDTI3MDkwODE3NDIyMVowgZMxCzAJBgNVBAYTAlVTMQsw
CQYDVQQIEwJUWDEPMA0GA1UEBxMGRGFsbGFzMQ8wDQYDVQQKEwZFdGhWUE4xDzAN
BgNVBAsTBkV0aFZQTjESMBAGA1UEAxMJRXRoVlBOIENBMQ8wDQYDVQQpEwZzZXJ2
ZXIxHzAdBgkqhkiG9w0BCQEWEGNoYW5jZUBldGh2cG4uaW8wggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQDNR5vG9EEj4wspLfkKUt7lLE5+yp8o9SAyh2c6
ImZOXBijtV27CNThGcURn8RZa+lJMmoxWA/efjUgK+zWyBRwW03FYCw+GEHtiOBi
GIi6V4Qz7FBlzKex963ZZ3TwFULc5ejZqkC8VKzyzpQDr+h1tmoAxXwY1YhYGFYe
ztVh8YHxihGUvEbN+BiRwJt4/Pd/jKfagH79N29lunhm/iVUfu98Qj2cdO2kICAw
IwQO7kUqGTZUacn+TWkCtKz2R28RVxYEAmKhslnCrQ/b/K4AsL2tyhuelrgC7dnR
ywKXSlZUCb+YyYbQ4HSqqh2uiovuOqclYI85tPypJ8r9TbLpAgMBAAGjgfswgfgw
HQYDVR0OBBYEFAQyJmRmDsmtOfnTuTLEYGoDQ71xMIHIBgNVHSMEgcAwgb2AFAQy
JmRmDsmtOfnTuTLEYGoDQ71xoYGZpIGWMIGTMQswCQYDVQQGEwJVUzELMAkGA1UE
CBMCVFgxDzANBgNVBAcTBkRhbGxhczEPMA0GA1UEChMGRXRoVlBOMQ8wDQYDVQQL
EwZFdGhWUE4xEjAQBgNVBAMTCUV0aFZQTiBDQTEPMA0GA1UEKRMGc2VydmVyMR8w
HQYJKoZIhvcNAQkBFhBjaGFuY2VAZXRodnBuLmlvggkAxur6l5t6hRkwDAYDVR0T
BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAY6Vnh8Z1TaNcpZugCMH8p3neGOWg
poJ8/QhoqKSF4WEEUE5twSMusO/xfk7yS5tzRGE8ZiSTdf5AJGmJUqCgdKOgs2q/
gE7nwFHM4052fTMO+/bHoI08OVwYmQTonFJWW/9xW6eCBmacM+od5LoSkX1/F1gA
vKyopPKBLy73KnHFxH21SQ/+e/EZNntBlO0bPurx7U1CCYEoc9tokO1YT33/44gm
cpsRSO7wp/Oie75Z9AR2kBvm2bA0OCmhrtFixFxxbPox5Q9+nA49Jr9fbDTeugft
+hw4q8VqGLYPD9Woqxa8jf0qAYH3bVBX0qxWmWIQ2vRgNJouphJZ3lEaGQ==
-----END CERTIFICATE-----
</ca>
# TLS auth key
<tls-auth>
#
# 2048 bit OpenVPN static key
#
-----BEGIN OpenVPN Static key V1-----
2673341707135ef13de61d6dfb78ae0e
2fb361ad037285c7ce2bdfac5e2e33f7
45a2aab6be572766eb266e63bb5c5101
4c7568d270cc3bd00c5907994ab42928
ccc321540b4cc12736e5494e62b269ef
1f434c2e955f4bffcf0a1093a05dc6e3
9afdab298fb601b129f298cbc45d048c
2c662225438f36d615b0eb1c2db819af
dcd72cdedeec6cd7f208ce96324934f2
26c5d100fa5e71de57a1d131b19a03e9
c2ed4510ad292b558c8c461b36004094
291f0b92101f20fde65bb29236420609
5507b60654db37a8ed7311b7962e71f4
4747b72dcbe5bffaf14012dafc09b4c9
d942356af210a4f57bea4ed072676fbe
57cd28d216a22231f41b8cb4f3e68584
-----END OpenVPN Static key V1-----
</tls-auth>
`;
}

const MimeType = 'application/x-openvpn-profile';

function DownloadConfig(url: string): string {
  const data = Buffer.from(GenerateConfig(url)).toString('base64');
  return `data:${MimeType};base64,${data}`;
}

export { DownloadConfig, GenerateConfig, MimeType };
