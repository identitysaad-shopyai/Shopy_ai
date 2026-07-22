{ pkgs }: {
  deps = [
    pkgs.nodejs
    pkgs.glib 
    pkgs.nspr 
    pkgs.nss
  ];
}