import profileReducer, { addPost, deletePost } from './profileReducer';


let state = {
    posts: [
        {id: 1, message: 'Hello!', likesCount: 10},
        {id: 2, message: 'Это переданный...', likesCount: 0},
        {id: 3, message: '...параметр Props,', likesCount: 5},
        {id: 4, message: 'а это значение переменной...', likesCount: 24}
    ]
};


it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPost('new some text');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expection
    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPost('new some text');
    
    // 2. action
    let newState = profileReducer(state, action);

    // 3. expection
    expect(newState.posts[4].message).toBe('new some text');
});


it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1);
    
    // 2. action
    let newState = profileReducer(state, action);

    // 3. expection
    expect(newState.posts.length).toBe(3);
});

it('after deleting length should`t be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(1000);
    
    // 2. action
    let newState = profileReducer(state, action);

    // 3. expection
    expect(newState.posts.length).toBe(4);
});