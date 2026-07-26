{ pkgs }: {
  deps = [
    pkgs.nano
    pkgs.nodejs
    pkgs.glib 
    pkgs.nspr 
    pkgs.nss
  ];
}