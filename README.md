# FOSTR
FOSTR (pronounced "Foster") is a **F**ree and **O**pen **S**ource **T**ournament **R**ecorder. It is an Electron-based multiplatform application written with TypeScript and styled with React and Material UI.

Looking for [releases](https://github.com/slashinfty/FOSTR/releases)?

## Cloning
```
git clone git@github.com:slashinfty/FOSTR.git
cd FOSTR
npm i
```
Running `npm run dev:electron` will compile the Electron portion and start a Webpack development server. Hot reloading and React dev tools are enabled. The command `npm run dev` can be used to start the dev server without recompiling Electron. Files for distribution can be generated with the command `npm run build:{os}` where `{os}` is `win`, `mac`, or `linux`.

## Pull Requests
After forking the project, create a new branch, make the changes, then commit and push.
```
git checkout -b nameOfFeature
git commit -m "a descriptive message about the feature"
git push origin nameOfFeature
```
Once complete, [open a pull request](https://github.com/slashinfty/FOSTR/compare).

## Issues
Be specific and include any and all details when [creating a new issue](https://github.com/slashinfty/FOSTR/issues/new/choose).