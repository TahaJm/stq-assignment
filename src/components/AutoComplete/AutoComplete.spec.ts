import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AutoComplete from './AutoComplete.vue'
import type { AutocompleteProps } from './AutoComplete.types'

// Mock the SearchComponent to avoid full rendering complexity
vi.mock('@/components/Search/SearchComponent.vue', () => ({
  default: {
    name: 'SearchComponent',
    template: `<div>
                 <input :placeholder="placeholder" @input="onChange($event.target.value)" />
                 <ul>
                   <li v-for="result in results" :key="getResultKey(result)">
                     <span @click="$emit('select', result)">{{ result.name || result }}</span>
                   </li>
                 </ul>
               </div>`,
    props: ['query', 'results', 'getResultKey', 'label', 'placeholder', 'onChange']
  }
}))

describe('AutoComplete Component', () => {
  const mockFetchResults = vi.fn()

  const props: AutocompleteProps = {
    label: 'Search Books',
    placeholder: 'Type to search...',
    fetchResults: mockFetchResults,
    results: [],
    getResultKey: (result: any) => result.id || result
  }

  it('calls fetchResults when query is updated', async () => {
    const wrapper = mount(AutoComplete, { props })
    const input = wrapper.find('input')
    await input.setValue('Harry Potter')
    expect(mockFetchResults).toHaveBeenCalledWith('Harry Potter')
  })

  it('displays search results', async () => {
    const wrapper = mount(AutoComplete, {
      props: {
        ...props,
        results: [{ title: 'Harry Potter', author: 'JK' }]
      }
    })

    await wrapper.setProps({ results: [{ title: 'Harry Potter', author: 'JK' }] })

    expect(wrapper.text()).toContain('Harry Potter')
    expect(wrapper.text()).toContain('JK')
  })

})
