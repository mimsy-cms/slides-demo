{
  description = "Mimsy development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];

      imports = [
      ];

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        # Development shell
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js development
            nodejs_22
            pnpm
            nodePackages.typescript
            nodePackages.svelte-language-server
            nodePackages.vscode-langservers-extracted

            # Development utilities
            git
            curl
            jq
            httpie
            just
            watchexec

            # Nix tools
            nil
            nixpkgs-fmt
            gh
          ];

          shellHook = ''
            echo "🚀 slides-demo development environment"
          '';

          # Environment variables
        };
      };
    };
}
