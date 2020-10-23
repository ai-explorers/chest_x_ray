# Frontend configuration
This folder contains the frontend configuration file (`config.json`)

## Changing the configuration that gets deployed to AWS
If you want to change the **structure** of the configuration: **Adapt `.github/workflows/frontend.yml`**

If you want to change **data (e.g. URL)** but keep the current structure: **Adapt github secrets via [https://github.com/Sultanow/chest_x_ray](https://github.com/Sultanow/chest_x_ray)**

## Changing the local configuration
To use a local configuration for development purposes, create a `config.json`.

The example configuration (`example_config.json`) can be copied and used as a starting point `config.json`.<br>
