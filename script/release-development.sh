#! /bin/bash

git switch development

if [ $? != 0 ]; then
  echo -e "\033[31merror\033[0m missing development branch"
  exit 1
fi

development_last_local_commit_sha=$(git log -1 --pretty=%H | cat) &&
(git pull || git push --set-upstream origin development ) &&
development_last_origin_commit_sha=$(git log -1 --pretty=%H | cat)

if [ "$development_last_local_commit_sha" != "$development_last_origin_commit_sha" ]; then 
  echo -e "\033[33mwarning\033[0m your local development commit is different from remote one"
  echo -e "\033[33mwarning\033[0m check the changes!"
  exit 1
fi

development_last_commit=$(git log -1 --pretty=%B | cat)
if [[ "$development_last_commit" == "chore(release)"* ]]; then 
  echo -e "\033[31merror\033[0m no changes were applied since last release"
  exit 1
fi

yarn release &&
git push --follow-tags --set-upstream origin development