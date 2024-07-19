import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const repoOwner = 'Bailey-Moir'; // replace with the owner of the repo
    const repoName = 'vault'; // replace with the repository name
    const branch = 'master'; // replace with the desired branch

    
    var git = new Git('https://github.com/Bailey-Moir/vault');
    const simpleGit = require('simple-git');
    const git = simpleGit();

    // Path to your public directory
    const publicDir = './public';

    // Clone the repository into the public directory if it doesn't exist

    git.checkIsRepo()
       .then(isRepo => {
          if (!isRepo) {
             return git.clone('https://github.com/Bailey-Moir/vault', publicDir); // Replace with your repository URL
          } else {
             return git.cwd(publicDir).pull('origin', 'main'); // Replace 'main' with your branch name if different
          }
       })
       .then(() => console.log('Operation successful'))
       .catch(err => console.error('Operation failed', err));
}
