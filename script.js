fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then(value => {
        let usersWrap = document.getElementsByClassName('users-wrap')[0];
        for (const user of value) {
            let div = document.createElement('div');
            div.innerText = user.id + ' ' + user.username;
            let btn = document.createElement('button');
            btn.innerText = 'see posts';
            btn.onclick = function () {
                fetch(`http://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                    .then(value => value.json())
                    .then(postsOfUser => {
                        let postsBox = document.getElementsByClassName('posts')[0];
                        postsBox.innerText = '';
                        for (const post of postsOfUser) {
                            let postDiv = document.createElement('div');
                            postDiv.innerText = post.title;
                            let btn1 = document.createElement('button');
                            btn1.innerText = 'see comments';
                            btn1.onclick = function () {
                                fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                                    .then(value => value.json())
                                    .then(commentsOfPost => {
                                        let commentsBox = document.getElementsByClassName('comments')[0];
                                        commentsBox.innerText = '';
                                        for (const comment of commentsOfPost) {
                                            let commentDiv = document.createElement('div');
                                            commentDiv.innerHTML = `${comment.name} <br> ${comment.email} <br> ${comment.body}`;
                                            commentsBox.append(commentDiv);
                                        }
                                    });
                            };
                            postDiv.appendChild(btn1);

                            postsBox.append(postDiv);
                        }
                    });
            };
            div.appendChild(btn);
            usersWrap.append(div);
        }
    });
