#! /bin/bash

git switch release 

if [ $? != 0 ]; then
  git switch -c release
fi

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
if [[ "$development_last_commit" != "chore(release)"* ]]; then 
  yarn release &&
  git push --follow-tags &&
  development_last_commit=$(git log -1 --pretty=%B | cat)
fi

git switch release &&
git push --set-upstream origin release &&
git pull &&
git switch development &&
git switch -c tmp development &&
git merge -s ours release -m "merge commit" &&
git switch release &&
git pull &&
stage_last_commit=$(git log -1 --pretty=%B | cat)

if [ "$stage_last_commit" == "$development_last_commit" ]; then 
  git branch -D tmp &&
  git switch development &&
  echo -e "\033[31merror\033[0m you have already released this version" &&
  exit 1
fi

git merge tmp --squash &&
git commit -m "$development_last_commit" &&
git branch -D tmp &&
git push --set-upstream origin release &&
git switch development 