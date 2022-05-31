const accessTokenReducer = (state = '', action) => {
    switch(action.type){
        case 'SAVEACCESSTOKEN':
            return {
                access_token: action.access_token
            } 
    }
}