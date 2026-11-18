/* Arefi ITPraxis – Netzpläne für die Packet-Tracer-Labore der Cisco-Lernstrecke. */
(() => {
'use strict';
const T = {
  'ccna-ios': { w: 620, h: 190, n: [
    ['R1', 'router', 100, 70, 'R1 (ISR4331)', 'G0/0/0 192.168.10.1'],
    ['SW1', 'switch', 310, 70, 'SW1 (2960)', 'VLAN 1: 192.168.10.2'],
    ['PC1', 'pc', 520, 70, 'PC1', '192.168.10.10/24']],
    l: [['R1', 'SW1', 'G0/0/0 – G0/1'], ['SW1', 'PC1', 'Fa0/1']] },
  'ccna-vlan': { w: 620, h: 330, n: [
    ['R1', 'router', 310, 50, 'R1', 'Subinterfaces .10 .20 .99'],
    ['SW1', 'switch', 310, 160, 'SW1', 'MGMT VLAN 99: .99.2'],
    ['P10', 'pc', 150, 270, 'PC10 · VLAN 10', '192.168.10.10'],
    ['P20', 'pc', 470, 270, 'PC20 · VLAN 20', '192.168.20.10']],
    l: [['R1', 'SW1', 'Trunk 802.1Q · native 999'], ['SW1', 'P10', 'Fa0/1 access'], ['SW1', 'P20', 'Fa0/13 access']] },
  'ccna-stp': { w: 620, h: 400, n: [
    ['D1', 'l3switch', 150, 60, 'DSW1', 'Root primary'],
    ['D2', 'l3switch', 470, 60, 'DSW2', 'Root secondary'],
    ['A1', 'switch', 310, 200, 'ASW1', 'PortFast + BPDU Guard'],
    ['PC', 'pc', 310, 340, 'PC1', 'VLAN 10']],
    l: [['D1', 'D2', 'Po1 · LACP (G0/1–2)', 'double'], ['A1', 'D1', 'G0/1 Root Port'], ['A1', 'D2', 'G0/2 Alternate', 'alt'], ['A1', 'PC', 'Fa0/5']] },
  'ccna-route': { w: 640, h: 330, n: [
    ['R1', 'router', 110, 120, 'R1', 'LAN A 192.168.10.0/24'],
    ['R2', 'router', 320, 50, 'R2', ''],
    ['R3', 'router', 530, 120, 'R3', 'Lo0 203.0.113.1'],
    ['PA', 'pc', 110, 260, 'PC-A', '192.168.10.10'],
    ['PC', 'pc', 530, 260, 'PC-C', '192.168.30.10']],
    l: [['R1', 'R2', '10.0.12.0/30'], ['R2', 'R3', '10.0.23.0/30'], ['R1', 'R3', '10.0.13.0/30 · AD 200', 'alt'], ['R1', 'PA', 'G0/0/1'], ['R3', 'PC', 'G0/0/0']] },
  'ccna-ospf': { w: 640, h: 330, n: [
    ['R1', 'router', 110, 120, 'R1', 'RID 1.1.1.1'],
    ['R2', 'router', 320, 50, 'R2', 'RID 2.2.2.2'],
    ['R3', 'router', 530, 120, 'R3', 'RID 3.3.3.3 · default-info'],
    ['PA', 'pc', 110, 260, 'LAN A (passive)', '192.168.10.0/24'],
    ['PC', 'pc', 530, 260, 'LAN C (passive)', '192.168.30.0/24']],
    l: [['R1', 'R2', 'area 0 · p2p'], ['R2', 'R3', 'area 0 · p2p'], ['R1', 'R3', 'area 0 · cost 5000 (Test)', 'alt'], ['R1', 'PA', ''], ['R3', 'PC', '']] },
  'ccna-svc': { w: 640, h: 390, n: [
    ['ISP', 'cloud', 320, 40, 'ISP / Internet', '203.0.113.1'],
    ['R1', 'router', 320, 140, 'R1', 'DHCP VLAN 10 · PAT'],
    ['SW1', 'switch', 320, 240, 'SW1', ''],
    ['P10', 'pc', 140, 330, 'PC10', 'DHCP from R1'],
    ['P20', 'pc', 320, 330, 'PC20', 'DHCP via relay'],
    ['S1', 'server', 500, 330, 'SRV1 192.168.10.10', 'DHCP · NTP · Syslog']],
    l: [['ISP', 'R1', 'G0/0/0 · nat outside'], ['R1', 'SW1', 'Trunk · nat inside'], ['SW1', 'P10', 'VLAN 10'], ['SW1', 'P20', 'VLAN 20'], ['SW1', 'S1', 'VLAN 10']] },
  'ccna-sec': { w: 640, h: 390, n: [
    ['R1', 'router', 320, 50, 'R1', 'ACL VLAN20-IN · MGMT-SSH'],
    ['SW1', 'switch', 320, 160, 'SW1', 'Port Security · Snooping · DAI'],
    ['AD', 'pc', 90, 290, 'Admin-PC', 'VLAN 99 · .99.50'],
    ['P10', 'pc', 245, 290, 'PC10', 'VLAN 10'],
    ['P20', 'pc', 400, 290, 'PC20', 'VLAN 20'],
    ['RG', 'server', 560, 290, 'Rogue DHCP', 'dropped']],
    l: [['R1', 'SW1', 'G0/1 trust'], ['SW1', 'AD', ''], ['SW1', 'P10', ''], ['SW1', 'P20', ''], ['SW1', 'RG', 'untrusted', 'alt']] },
  'ccna-v6wlan': { w: 640, h: 455, n: [
    ['R2', 'router', 120, 60, 'R2', 'LAN 2001:db8:20::/64'],
    ['R1', 'router', 400, 60, 'R1', 'fe80::1 · VLAN 30 guest'],
    ['SW1', 'switch', 400, 200, 'SW1', ''],
    ['WLC', 'wlc', 160, 200, 'WLC1', 'Mgmt VLAN 99'],
    ['AP', 'ap', 585, 290, 'LAP1', 'Local Mode'],
    ['PC', 'pc', 400, 320, 'PC (VLAN 10)', 'SLAAC 2001:db8:10::'],
    ['NB', 'laptop', 585, 390, 'Laptop', 'SSID Firma / Gast']],
    l: [['R2', 'R1', '2001:db8:12::/64'], ['R1', 'SW1', 'Trunk'], ['WLC', 'SW1', 'Trunk 10,30,99'], ['SW1', 'AP', 'Access VLAN 99'], ['SW1', 'PC', ''], ['AP', 'NB', 'WPA2/WPA3', 'wifi']] }
};
const C = window.ArefiKCcna; if (!C) return;
C.modules.forEach(m => { if (T[m.id]) m.lab.topo = T[m.id]; });
window.ArefiTopoData = Object.assign(window.ArefiTopoData || {}, T);
})();
