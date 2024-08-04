import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchInput from './SearchInput.vue';

describe('SearchInput.vue', () => {
  it('renders input with correct label and placeholder', () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search',
        placeholder: 'Type to search...',
        onChange: vi.fn(),
        value: ''
      }
    });

    expect(wrapper.find('label').text()).toBe('Search');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Type to search...');
  });

  it('emits focus and blur events', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search',
        placeholder: 'Type to search...',
        onChange: vi.fn(),
        value: ''
      }
    });

    const input = wrapper.find('input');
    await input.trigger('focus');
    expect(wrapper.emitted()).toHaveProperty('focus');

    await input.trigger('blur');
    expect(wrapper.emitted()).toHaveProperty('blur');
  });

  it('updates internal value on prop change', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search',
        placeholder: 'Type to search...',
        onChange: vi.fn(),
        value: 'initial value'
      }
    });

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('initial value');
    await wrapper.setProps({ value: 'updated value' });
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('updated value');
  });
});
