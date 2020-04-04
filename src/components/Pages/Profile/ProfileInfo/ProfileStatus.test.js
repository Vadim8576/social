import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='test status' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('test status');
    });

    test('after creation span with be displayed with correct status', () => {
        const component = create(<ProfileStatus status='test status' />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after creation input with be displayed with correct status', () => {
        const component = create(<ProfileStatus status='test status' />);
        const root = component.root;
        
        expect( () => {
            const input = root.findByType('input');
        }).toThrow();
    });

    test('input should be displayed in editMode', () => {
        const component = create(<ProfileStatus status='test status' />);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('test status');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='test status' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})