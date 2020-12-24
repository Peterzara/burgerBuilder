import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth test', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it( 'should store token upon login', () => {
        expect( reducer( {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: '123',
                userId: '123'
        } ) ).toEqual( {
            token: '123',
            userId: '123',
            error: null,
            loading: false,
            authRedirectPath: '/'
        } );
    } );

});