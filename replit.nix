{ pkgs }: {
  deps = [
    pkgs.dbus
    pkgs.nano
    pkgs.nodejs
    pkgs.glib 
    pkgs.nspr 
    pkgs.nss
  ];
}