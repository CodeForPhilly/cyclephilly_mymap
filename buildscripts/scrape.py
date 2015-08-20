#!/usr/bin/env python

import sys

def main(): #{
  #def __init__(self, arg1, arg2): #{
  #
  ##}
  
  if len(sys.argv) < 1 or len(sys.argv) > 1: #{
      sys.stderr.write("usage: PROG [-h]\n")
      sys.stderr.flush()
      sys.exit(1)
  #}
  else: #{
    print "Hello World!"
  #}
#}

if __name__ == "__main__": #{
  main()
#}