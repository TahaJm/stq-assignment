import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchResults from './SearchResults.vue';

describe('SearchResults.vue', () => {
  it('displays results when query length is 3 or more', () => {
    const wrapper = mount(SearchResults, {
      props: {
        query: 'tes',
        results: [{ name: 'Test Result' }],
        getResultKey: (result: any) => result.name,
        isVisible: true
      },
      slots: {
        default: '<span>{{ result.name }}</span>'
      }
    });

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.find('li').text()).toBe('Test Result');
  });

  it('shows no results message if results array is empty', () => {
    const wrapper = mount(SearchResults, {
      props: {
        query: 'tes',
        results: [],
        getResultKey: (result: any) => result.name,
        isVisible: true
      }
    });

    expect(wrapper.find('li').text()).toBe('No results found');
  });

  it('shows prompt if query length is less than 3', () => {
    const wrapper = mount(SearchResults, {
      props: {
        query: 'te',
        results: [{ name: 'Test Result' }],
        getResultKey: (result: any) => result.name,
        isVisible: true
      }
    });

    expect(wrapper.find('p').text()).toBe('Type at least 3 characters');
  });

  it('emits select event when result is clicked', async () => {
    const wrapper = mount(SearchResults, {
      props: {
        query: 'tes',
        results: [{ name: 'Test Result' }],
        getResultKey: (result: any) => result.name,
        isVisible: true
      },
      slots: {
        default: '<span>{{ result.name }}</span>'
      }
    });

    await wrapper.find('li').trigger('mousedown');
    expect(wrapper.emitted()).toHaveProperty('select');
    expect(wrapper.emitted('select')?.[0]).toEqual([{ name: 'Test Result' }]);
  });
});
