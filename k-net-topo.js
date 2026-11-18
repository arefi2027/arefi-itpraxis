/* Arefi ITPraxis – Netzpläne für die Labore der Lernstrecke Netzwerk und Speicher. */
(() => {
'use strict';
const T = {
  'net-storage': { w: 600, h: 190, n: [
    ['L', 'server', 130, 70, 'LNX01 · iSCSI-Target', '10.20.0.30 · LUN 2 GB'],
    ['S', 'server', 470, 70, 'SRV01 · Initiator', '10.20.0.20']],
    l: [['L', 'S', 'iSCSI TCP 3260']] },
  'net-ipv6': { w: 600, h: 190, n: [
    ['L', 'server', 130, 70, 'LNX01', 'fd3a:7c41:9b2e:20::30/64'],
    ['S', 'server', 470, 70, 'SRV01', 'fd3a:7c41:9b2e:20::20/64']],
    l: [['L', 'S', 'ULA /64 · ICMPv6']] },
  'net-vlan': { w: 640, h: 360, n: [
    ['R1', 'router', 320, 50, 'R1 (ISR 4331)', 'Gateways .1 · ip helper-address'],
    ['SW', 'switch', 320, 170, 'SW1 (2960)', 'VLAN 10 · 20 · 99 · 999'],
    ['P1', 'pc', 80, 300, 'PC1', 'VLAN 10 · DHCP'],
    ['P2', 'pc', 240, 300, 'PC2', 'VLAN 10 · DHCP'],
    ['P3', 'pc', 400, 300, 'PC3', 'VLAN 20 · DHCP'],
    ['S', 'server', 560, 300, 'DHCP-Server', '10.20.20.10 · VLAN 20']],
    l: [['R1', 'SW', 'Gi0/1 Trunk · native 999'], ['SW', 'P1', 'Fa0/1'], ['SW', 'P2', 'Fa0/2'], ['SW', 'P3', 'Fa0/11'], ['SW', 'S', 'Fa0/12']] },
  'net-stp-lacp': { w: 600, h: 330, n: [
    ['S1', 'l3switch', 300, 50, 'SW1 (Core)', 'Root Bridge'],
    ['S2', 'switch', 300, 170, 'SW2 (Access)', 'PortFast + BPDU Guard'],
    ['PC', 'pc', 300, 280, 'PC', 'user port']],
    l: [['S1', 'S2', 'Po1 · LACP Gi0/1–2', 'double'], ['S2', 'PC', 'Fa0/1']] },
  'net-routing': { w: 640, h: 330, n: [
    ['NET', 'cloud', 320, 40, 'Internet', '203.0.113.1'],
    ['R1', 'router', 170, 150, 'R1 (HQ)', 'NAT Overload · default-info'],
    ['R2', 'router', 470, 150, 'R2 (branch)', ''],
    ['P1', 'pc', 170, 280, 'HQ LAN', '10.20.10.0/24'],
    ['P2', 'pc', 470, 280, 'Branch LAN', '10.30.10.0/24']],
    l: [['R1', 'NET', 'Gi0/0/2 203.0.113.2/30'], ['R1', 'R2', '10.255.0.0/30 · OSPF area 0'], ['R1', 'P1', 'passive'], ['R2', 'P2', 'passive']] },
  'net-vpn': { w: 620, h: 200, n: [
    ['C', 'laptop', 100, 70, 'CL01 · WireGuard', 'Tunnel 10.99.0.2/32'],
    ['NET', 'cloud', 310, 70, 'Internet / LAN', ''],
    ['L', 'server', 520, 70, 'LNX01 · wg0', '10.99.0.1/24 · UDP 51820']],
    l: [['C', 'NET', 'encrypted'], ['NET', 'L', 'UDP 51820']] },
  'net-firewall': { w: 640, h: 360, n: [
    ['NET', 'cloud', 320, 40, 'Internet (WAN)', 'port forward 443'],
    ['FW', 'firewall', 320, 160, 'FW01 · OPNsense', 'LAN .0.1 · DMZ .50.1'],
    ['C', 'pc', 130, 290, 'CL01 · LAN', '10.20.0.0/24'],
    ['W', 'server', 510, 290, 'WEB01 · DMZ', '10.20.50.10 · nginx']],
    l: [['NET', 'FW', 'WAN'], ['FW', 'C', 'LAN → WEB01 80/443'], ['FW', 'W', 'DMZ → LAN blocked']] },
  'net-wlan': { w: 640, h: 210, n: [
    ['U', 'laptop', 90, 80, 'User anna', 'PEAP-MSCHAPv2'],
    ['AP', 'ap', 300, 80, 'LNX01 as AP', '10.20.0.30 · eapol_test'],
    ['N', 'server', 530, 80, 'SRV01 · NPS', 'RADIUS 1812 · certificate']],
    l: [['U', 'AP', '802.1X / EAP', 'wifi'], ['AP', 'N', 'RADIUS · Shared Secret']] }
};
const C = window.ArefiKNet; if (!C) return;
C.modules.forEach(m => { if (T[m.id]) m.lab.topo = T[m.id]; });
window.ArefiTopoData = Object.assign(window.ArefiTopoData || {}, T);
})();
