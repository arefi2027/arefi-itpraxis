/* Arefi ITPraxis – Kurs Virtualisierung, Backup und Monitoring: Registrierung. */
(() => {
'use strict';
window.ArefiCourseRegister({
  id: 'infra', group: 2, shell: 'Bash', C: window.ArefiKInfra,
  title: ['دورهٔ مجازی‌سازی، پشتیبان‌گیری و پایش', 'Lernstrecke Virtualisierung, Backup und Monitoring', 'Virtualization, backup and monitoring course'],
  lead: ['Proxmox VE، VMware vSphere، کلاستر و HA، Veeam با مخزن Immutable، بازیابی و RPO/RTO و برنامهٔ اضطراری، پایش با Checkmk، SNMPv3 و Syslog مرکزی.', 'Proxmox VE, VMware vSphere, Cluster und HA, Veeam mit unveränderbarem Repository, Wiederherstellung mit RPO/RTO und Notfallplan, Monitoring mit Checkmk, SNMPv3 und zentralem Syslog.', 'Proxmox VE, VMware vSphere, clustering and HA, Veeam with an immutable repository, restores with RPO/RTO and a DR plan, monitoring with Checkmk, SNMPv3 and central syslog.'],
  part: [['بخش ۱: مجازی‌سازی', 'Teil 1: Virtualisierung', 'Part 1: Virtualization'], ['بخش ۲: پشتیبان‌گیری و بازیابی', 'Teil 2: Backup und Wiederherstellung', 'Part 2: Backup and restore'], ['بخش ۳: پایش', 'Teil 3: Monitoring', 'Part 3: Monitoring']]
});
})();
